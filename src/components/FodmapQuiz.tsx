import { useState, useEffect } from 'react';
import { buildPlan, buildGrocery, type Diet, type DayPlan, DAYS } from '@/lib/meals';

type Stage = 'hero' | 'quiz' | 'loading' | 'results';

type Answers = {
  goal: string;
  symptoms: string[];
  stage: string;
  diet: Diet | '';
  email: string;
};

const GOALS = ['Reduce gut symptoms', 'Identify trigger foods', 'Maintain healthy weight', 'Boost energy & wellbeing'];
const SYMPTOMS = ['Bloating & gas', 'Excessive flatulence', 'Diarrhoea (IBS-D)', 'Constipation (IBS-C)', 'Stomach cramping', 'Nausea'];
const PHASES = ['Just starting out (elimination)', 'Reintroduction phase', 'Personalisation phase', "I'm not sure"];
const DIETS: Diet[] = ['Omnivore', 'Pescatarian', 'Vegetarian', 'Vegan'];

const LOADING_STEPS = [
  'Analysing your symptoms',
  'Selecting safe FODMAP foods',
  'Building 7-day meal schedule',
  'Writing recipes & grocery list',
  'Personalising to your goals',
];

export default function FodmapQuiz() {
  const [stage, setStage] = useState<Stage>('hero');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ goal: '', symptoms: [], stage: '', diet: '', email: '' });
  const [emailErr, setEmailErr] = useState('');

  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => Math.max(0, s - 1));

  const submit = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email)) { setEmailErr('Please enter a valid email.'); return; }
    setEmailErr('');
    setStage('loading');
    setTimeout(() => setStage('results'), 3500);
  };

  if (stage === 'hero') return <Hero onBegin={() => { setStage('quiz'); setStep(0); }} />;
  if (stage === 'loading') return <Loading />;
  if (stage === 'results') return <Results answers={answers} onRestart={() => { setStage('hero'); setStep(0); setAnswers({ goal: '', symptoms: [], stage: '', diet: '', email: '' }); }} />;

  return (
    <div className="min-h-screen px-4 py-10 md:py-16">
      <div className="max-w-2xl mx-auto">
        <ProgressBar step={step} total={5} />
        <div key={step} className="animate-fade-up mt-10">
          {step === 0 && (
            <Single title="What brings you here?" subtitle="Step 01 — Your goal" options={GOALS} value={answers.goal} onChange={v => setAnswers(a => ({ ...a, goal: v }))} onNext={next} onBack={null} />
          )}
          {step === 1 && (
            <Multi title="What are you experiencing?" subtitle="Step 02 — Symptoms · select all that apply" options={SYMPTOMS} values={answers.symptoms} onChange={v => setAnswers(a => ({ ...a, symptoms: v }))} onNext={next} onBack={back} />
          )}
          {step === 2 && (
            <Single title="Where are you in your FODMAP journey?" subtitle="Step 03 — Phase" options={PHASES} value={answers.stage} onChange={v => setAnswers(a => ({ ...a, stage: v }))} onNext={next} onBack={back} />
          )}
          {step === 3 && (
            <Single title="How do you like to eat?" subtitle="Step 04 — Diet preference" options={DIETS as unknown as string[]} value={answers.diet} onChange={v => setAnswers(a => ({ ...a, diet: v as Diet }))} onNext={next} onBack={back} />
          )}
          {step === 4 && (
            <EmailStep email={answers.email} setEmail={e => setAnswers(a => ({ ...a, email: e }))} error={emailErr} onSubmit={submit} onBack={back} />
          )}
        </div>
      </div>
    </div>
  );
}

function Hero({ onBegin }: { onBegin: () => void }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center animate-fade-up">
      <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-8">Lowfod · Personalised Plan</span>
      <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] max-w-4xl text-foreground">
        Your gut deserves a <em className="text-accent not-italic font-serif italic">personalised</em> plan.
      </h1>
      <p className="mt-8 max-w-xl text-sm md:text-base text-muted-foreground leading-relaxed">
        Answer five short questions and receive a free, tailored 7-day low-FODMAP meal plan — recipes, grocery list and gut-friendly tips, delivered instantly.
      </p>
      <div className="mt-12 grid grid-cols-3 gap-6 md:gap-12 max-w-xl w-full">
        {[['7', 'Day Plan'], ['21+', 'Recipes'], ['100%', 'Low FODMAP']].map(([n, l]) => (
          <div key={l} className="text-center">
            <div className="font-serif text-3xl md:text-5xl text-primary">{n}</div>
            <div className="font-mono text-[10px] md:text-xs uppercase tracking-widest mt-1 text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>
      <button onClick={onBegin} className="mt-14 group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full font-mono text-sm tracking-wide hover:bg-sage-deep transition-all hover:shadow-lg">
        Begin Your Journey <span className="group-hover:translate-x-1 transition-transform">→</span>
      </button>
      <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">No signup · 2 minutes · Free forever</p>
    </section>
  );
}

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs text-muted-foreground">{String(step + 1).padStart(2, '0')}</span>
      <div className="flex-1 h-[2px] bg-border rounded-full overflow-hidden">
        <div className="h-full bg-primary transition-all duration-500" style={{ width: `${((step + 1) / total) * 100}%` }} />
      </div>
      <span className="font-mono text-xs text-muted-foreground">{String(total).padStart(2, '0')}</span>
    </div>
  );
}

function StepHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-3">{subtitle}</p>
      <h2 className="font-serif text-3xl md:text-5xl text-foreground leading-tight">{title}</h2>
    </div>
  );
}

function OptionCard({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`w-full text-left flex items-center justify-between gap-4 px-5 py-4 rounded-lg border transition-all hover:-translate-y-0.5 hover:shadow-sm ${selected ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border hover:border-primary/40'}`}>
      <span className="font-mono text-sm">{label}</span>
      <span className={`flex items-center justify-center w-6 h-6 rounded-full border ${selected ? 'bg-accent border-accent text-accent-foreground' : 'border-border'}`}>
        {selected && <span className="text-xs">✓</span>}
      </span>
    </button>
  );
}

function NavButtons({ onBack, onNext, disabled, nextLabel = 'Continue →' }: { onBack: (() => void) | null; onNext: () => void; disabled: boolean; nextLabel?: string }) {
  return (
    <div className="mt-10 flex items-center justify-between">
      {onBack ? (
        <button onClick={onBack} className="font-mono text-sm text-muted-foreground hover:text-foreground transition">← Back</button>
      ) : <span />}
      <button onClick={onNext} disabled={disabled} className="bg-primary text-primary-foreground px-7 py-3 rounded-full font-mono text-sm hover:bg-sage-deep transition disabled:opacity-30 disabled:cursor-not-allowed">{nextLabel}</button>
    </div>
  );
}

function Single({ title, subtitle, options, value, onChange, onNext, onBack }: { title: string; subtitle: string; options: string[]; value: string; onChange: (v: string) => void; onNext: () => void; onBack: (() => void) | null; }) {
  return (
    <div>
      <StepHeader title={title} subtitle={subtitle} />
      <div className="grid gap-3">
        {options.map(o => <OptionCard key={o} label={o} selected={value === o} onClick={() => onChange(o)} />)}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} disabled={!value} />
    </div>
  );
}

function Multi({ title, subtitle, options, values, onChange, onNext, onBack }: { title: string; subtitle: string; options: string[]; values: string[]; onChange: (v: string[]) => void; onNext: () => void; onBack: () => void; }) {
  const toggle = (o: string) => onChange(values.includes(o) ? values.filter(v => v !== o) : [...values, o]);
  return (
    <div>
      <StepHeader title={title} subtitle={subtitle} />
      <div className="grid sm:grid-cols-2 gap-3">
        {options.map(o => <OptionCard key={o} label={o} selected={values.includes(o)} onClick={() => toggle(o)} />)}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} disabled={values.length === 0} />
    </div>
  );
}

function EmailStep({ email, setEmail, error, onSubmit, onBack }: { email: string; setEmail: (e: string) => void; error: string; onSubmit: () => void; onBack: () => void; }) {
  return (
    <div>
      <StepHeader title="Where shall we send your plan?" subtitle="Step 05 — Almost there" />
      <div className="bg-card border border-border rounded-lg p-6 md:p-8">
        <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Email address</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="mt-3 w-full bg-background border border-border rounded-md px-4 py-3 font-mono text-sm focus:outline-none focus:border-primary"
        />
        {error && <p className="mt-2 text-xs text-destructive font-mono">{error}</p>}
        <p className="mt-4 font-mono text-xs text-muted-foreground">No spam. Your plan is delivered instantly.</p>
        <button onClick={onSubmit} className="mt-6 w-full bg-primary text-primary-foreground py-4 rounded-full font-mono text-sm hover:bg-sage-deep transition flex items-center justify-center gap-2">
          🌿 Generate My Plan
        </button>
      </div>
      <div className="mt-6">
        <button onClick={onBack} className="font-mono text-sm text-muted-foreground hover:text-foreground">← Back</button>
      </div>
    </div>
  );
}

function Loading() {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setShown(s => Math.min(s + 1, LOADING_STEPS.length)), 600);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 animate-fade-in">
      <div className="w-16 h-16 rounded-full border-2 border-border border-t-primary animate-spin-ring mb-10" />
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6">Crafting your plan</p>
      <ul className="space-y-3 max-w-sm w-full">
        {LOADING_STEPS.slice(0, shown).map((s, i) => (
          <li key={i} className="flex items-center gap-3 font-mono text-sm text-foreground animate-fade-up">
            <span className="text-primary">✓</span> {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Results({ answers, onRestart }: { answers: Answers; onRestart: () => void }) {
  const diet = (answers.diet || 'Omnivore') as Diet;
  const plan = buildPlan(diet);
  const grocery = buildGrocery(diet);
  const name = answers.email.split('@')[0].replace(/[._-]/g, ' ');
  const [activeDay, setActiveDay] = useState(0);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const toggleItem = (i: string) => setChecked(c => { const n = new Set(c); n.has(i) ? n.delete(i) : n.add(i); return n; });

  const pills = [answers.goal, answers.stage, diet, ...answers.symptoms].filter(Boolean);

  return (
    <div className="min-h-screen px-4 py-10 md:py-16 animate-fade-up">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-4">Your personalised plan</p>
          <h1 className="font-serif text-4xl md:text-6xl text-foreground capitalize">Welcome, {name || 'friend'}.</h1>
          <p className="mt-4 max-w-xl mx-auto text-sm text-muted-foreground">Below is your tailored 7-day low-FODMAP plan, grocery list and gut-care tips.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {pills.map(p => (
              <span key={p} className="font-mono text-xs px-3 py-1.5 rounded-full bg-card border border-border text-foreground/80">{p}</span>
            ))}
          </div>
        </header>

        {/* Meal Plan */}
        <section className="mb-16">
          <SectionTitle eyebrow="01" title="Your 7-day meal plan" />
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
            {DAYS.map((d, i) => (
              <button key={d} onClick={() => setActiveDay(i)} className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition whitespace-nowrap ${activeDay === i ? 'bg-primary text-primary-foreground' : 'bg-card border border-border hover:border-primary/40'}`}>{d}</button>
            ))}
          </div>
          <div key={activeDay} className="grid md:grid-cols-3 gap-5 animate-fade-up">
            {plan[activeDay].meals.map((m, i) => <MealCard key={i} meal={m} />)}
          </div>
        </section>

        {/* Grocery */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <SectionTitle eyebrow="02" title="Weekly grocery list" />
            <button onClick={() => window.print()} className="font-mono text-xs px-4 py-2 rounded-full border border-border hover:border-primary transition">Print ⎙</button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(grocery).map(([cat, items]) => (
              <div key={cat} className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-serif text-2xl text-foreground mb-4">{cat}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map(i => (
                    <button key={i} onClick={() => toggleItem(i)} className={`font-mono text-xs px-3 py-1.5 rounded-full border transition ${checked.has(i) ? 'bg-primary/10 border-primary/30 text-muted-foreground line-through' : 'bg-background border-border hover:border-accent'}`}>{i}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="mb-16">
          <SectionTitle eyebrow="03" title="Gentle gut-care tips" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TIPS.map(t => (
              <article key={t.title} className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition">
                <span className="font-serif text-3xl text-accent">{t.num}</span>
                <h3 className="font-serif text-xl mt-2 mb-2 text-foreground">{t.title}</h3>
                <p className="font-mono text-xs leading-relaxed text-muted-foreground">{t.body}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="text-center pb-12">
          <button onClick={onRestart} className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition">↺ Start over</button>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-2">— {eyebrow}</p>
      <h2 className="font-serif text-3xl md:text-4xl text-foreground">{title}</h2>
    </div>
  );
}

function MealCard({ meal }: { meal: ReturnType<typeof buildPlan>[number]['meals'][number] }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="bg-card border border-border rounded-xl p-6 flex flex-col hover:-translate-y-1 hover:shadow-md transition-all">
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-3">{meal.type}</span>
      <h3 className="font-serif text-2xl text-foreground leading-snug mb-2">{meal.name}</h3>
      <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-4">{meal.desc}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {meal.tags.map(t => <span key={t} className="font-mono text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary">{t}</span>)}
      </div>
      <button onClick={() => setOpen(o => !o)} className="mt-auto font-mono text-xs uppercase tracking-widest text-primary hover:text-accent transition self-start">
        {open ? '× Hide recipe' : '+ View recipe'}
      </button>
      {open && (
        <div className="mt-4 pt-4 border-t border-border animate-fade-up">
          <h4 className="font-serif text-lg mb-2">Ingredients</h4>
          <ul className="font-mono text-xs space-y-1 mb-4 text-foreground/80">
            {meal.ingredients.map(i => <li key={i}>· {i}</li>)}
          </ul>
          <h4 className="font-serif text-lg mb-2">Method</h4>
          <ol className="font-mono text-xs space-y-2 text-foreground/80 list-decimal list-inside">
            {meal.steps.map(s => <li key={s}>{s}</li>)}
          </ol>
        </div>
      )}
    </article>
  );
}

const TIPS = [
  { num: '01', title: 'Use garlic-infused oil', body: 'Fructans are not oil-soluble — infused oil gives all the flavour without the FODMAPs.' },
  { num: '02', title: 'Choose spelt sourdough', body: 'Long fermentation breaks down fructans, making spelt sourdough far gentler than regular bread.' },
  { num: '03', title: 'Mind your portions', body: 'Many low-FODMAP foods become high-FODMAP in larger servings — stick to recommended sizes.' },
  { num: '04', title: 'Hydrate generously', body: 'Aim for 2L of water daily to help digestion and ease constipation during elimination.' },
  { num: '05', title: 'Keep a symptom diary', body: 'Track meals and symptoms for 2 weeks to spot patterns and confirm your trigger foods.' },
  { num: '06', title: 'Batch cook your bases', body: 'Prepare quinoa, rice and roasted veg in bulk to make weeknight meal assembly effortless.' },
];
