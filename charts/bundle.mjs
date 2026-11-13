#!/usr/bin/env node
/**
 * Merge cover + charts into one sellable complete pack PDF.
 */
import { spawn } from 'node:child_process';
import { readdir, writeFile, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pdfDir = path.join(__dirname, 'output', 'pdf');

async function main() {
  // Prefer PyMuPDF via python for reliable merge without extra deps in node
  const files = (await readdir(pdfDir))
    .filter((f) => f.endsWith('.pdf') && !f.includes('Complete'))
    .sort();

  if (files.length === 0) throw new Error('No PDFs to bundle. Run generate.mjs first.');

  const out = path.join(pdfDir, 'DaySteady-Essential-Diabetes-Charts-Complete.pdf');
  const listPath = path.join(pdfDir, '_bundle-list.txt');
  await writeFile(listPath, files.map((f) => path.join(pdfDir, f)).join('\n'));

  const py = `
import pathlib
import pymupdf
paths = pathlib.Path(${JSON.stringify(listPath)}).read_text().strip().splitlines()
out = pymupdf.open()
for p in paths:
    src = pymupdf.open(p)
    out.insert_pdf(src)
    src.close()
out.save(${JSON.stringify(out)})
out.close()
print('Wrote', ${JSON.stringify(out)}, 'pages=', len(paths))
`;
  try {
    await new Promise((resolve, reject) => {
      const child = spawn('python3', ['-c', py], { stdio: 'inherit' });
      child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`bundle exit ${code}`))));
    });
  } finally {
    await unlink(listPath).catch(() => {});
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
