#!/usr/bin/env node
/**
 * DaySteady — generate 8" × 11" print PDFs from chart HTML.
 * Requires Google Chrome / Chromium.
 */
import { spawn } from 'node:child_process';
import { mkdir, readdir, access, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlDir = path.join(__dirname, 'html');
const outDir = path.join(__dirname, 'output', 'pdf');

const chromeCandidates = [
  process.env.CHROME_PATH,
  'google-chrome',
  'google-chrome-stable',
  'chromium',
  'chromium-browser',
  '/usr/bin/google-chrome',
  '/usr/local/bin/google-chrome',
].filter(Boolean);

async function findChrome() {
  for (const bin of chromeCandidates) {
    const ok = await new Promise((resolve) => {
      const child = spawn(bin, ['--version'], { stdio: 'ignore' });
      child.on('error', () => resolve(false));
      child.on('exit', (code) => resolve(code === 0));
    });
    if (ok) return bin;
  }
  throw new Error('Google Chrome / Chromium not found');
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function printPdf(chrome, htmlFile, pdfFile) {
  const fileUrl = pathToFileURL(htmlFile).href;
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--allow-file-access-from-files',
    '--font-render-hinting=none',
    '--virtual-time-budget=15000',
    '--run-all-compositor-stages-before-draw',
    '--no-pdf-header-footer',
    `--print-to-pdf=${pdfFile}`,
    fileUrl,
  ];

  const child = spawn(chrome, args, { stdio: ['ignore', 'pipe', 'pipe'] });
  let stderr = '';
  child.stderr.on('data', (d) => {
    stderr += d.toString();
  });

  const started = Date.now();
  const timeoutMs = 45000;

  while (Date.now() - started < timeoutMs) {
    try {
      const s = await stat(pdfFile);
      if (s.size > 1000) {
        // Give Chrome a moment to finish flushing, then stop it.
        await sleep(800);
        child.kill('SIGKILL');
        return;
      }
    } catch {
      // not ready
    }
    const exited = await new Promise((resolve) => {
      if (child.exitCode !== null) resolve(true);
      else {
        const t = setTimeout(() => resolve(false), 0);
        child.once('exit', () => {
          clearTimeout(t);
          resolve(true);
        });
        setTimeout(() => resolve(false), 400);
      }
    });
    if (exited) {
      try {
        const s = await stat(pdfFile);
        if (s.size > 1000) return;
      } catch {
        // fall through
      }
      throw new Error(`Chrome exited without writing PDF.\n${stderr.slice(-2000)}`);
    }
    await sleep(400);
  }

  child.kill('SIGKILL');
  try {
    const s = await stat(pdfFile);
    if (s.size > 1000) return;
  } catch {
    // ignore
  }
  throw new Error(`Timed out generating ${pdfFile}\n${stderr.slice(-2000)}`);
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const chrome = await findChrome();
  console.log(`Using Chrome: ${chrome}`);

  const files = (await readdir(htmlDir)).filter((f) => f.endsWith('.html')).sort();
  if (files.length === 0) throw new Error(`No HTML charts found in ${htmlDir}`);

  for (const file of files) {
    const htmlFile = path.join(htmlDir, file);
    const pdfName = file.replace(/\.html$/, '.pdf');
    const pdfFile = path.join(outDir, pdfName);
    try {
      await access(pdfFile);
      const { unlink } = await import('node:fs/promises');
      await unlink(pdfFile);
    } catch {
      // ok
    }
    process.stdout.write(`Printing ${file} → ${pdfName} ... `);
    await printPdf(chrome, htmlFile, pdfFile);
    const s = await stat(pdfFile);
    console.log(`done (${(s.size / 1024).toFixed(1)} KB)`);
  }

  console.log(`\nGenerated ${files.length} PDFs in ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
