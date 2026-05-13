import { SharkMark, Wordmark } from "@/components/Logo";

const EMAIL = "theaishark@theaishark.com";

const CAPABILITIES = [
  {
    title: "AI Strategy",
    body: "Identify where AI compounds your margin — not where it’s trendy.",
  },
  {
    title: "Custom Automations",
    body: "Bespoke agents and workflows wired into the tools you already run.",
  },
  {
    title: "Niche Solutions",
    body: "Built for industries the platforms forgot. Designed to win them.",
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Animated grid backdrop */}
      <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden="true" />

      {/* Top nav */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
        <Wordmark />
        <a
          href={`mailto:${EMAIL}`}
          className="hidden text-sm text-steel transition hover:text-cyan-edge md:inline"
        >
          {EMAIL}
        </a>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pb-24 pt-16 text-center md:pb-32 md:pt-24">
        {/* Eyebrow — glass pill */}
        <div className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-cyan-edge">
          <span className="relative h-1.5 w-1.5 rounded-full bg-cyan-glow">
            <span className="absolute inset-0 animate-ping rounded-full bg-cyan-glow opacity-75" />
          </span>
          AI Consulting · Built for Niche Industries
        </div>

        {/* Headline */}
        <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl">
          <span className="text-gradient">Hunt the future</span>
          <br />
          <span className="text-white">before it hunts you.</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-steel md:text-lg">
          The AI Shark is an AI consulting firm that builds the custom automations and
          intelligent systems your competitors haven&rsquo;t thought of yet. We come in,
          map your operation, and deploy AI that compounds ROI — so the next generation
          of upstarts can&rsquo;t outrun you.
        </p>

        {/* Floating shark mark */}
        <div className="my-12 animate-float">
          <SharkMark size={132} />
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <a
            href={`mailto:${EMAIL}?subject=AI%20consulting%20inquiry`}
            className="glass-cta rounded-full px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-white"
          >
            Start a conversation
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="text-sm text-steel transition hover:text-cyan-edge md:hidden"
          >
            {EMAIL}
          </a>
        </div>

        {/* Capability strip — liquid glass cards */}
        <div className="mt-24 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          {CAPABILITIES.map((item) => (
            <div
              key={item.title}
              className="glass glass-interactive rounded-2xl p-6 text-left"
            >
              <div className="relative z-10">
                <div className="text-xs uppercase tracking-[0.25em] text-cyan-edge">
                  {item.title}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-steel">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 px-6 py-8 md:px-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-steel/70 md:flex-row">
          <div>© {new Date().getFullYear()} The AI Shark LLC. All rights reserved.</div>
          <a
            href={`mailto:${EMAIL}`}
            className="transition hover:text-cyan-edge"
          >
            {EMAIL}
          </a>
        </div>
      </footer>
    </main>
  );
}
