import { SharkMark, Wordmark } from "@/components/Logo";
import { BlurFade } from "@/components/ui/BlurFade";
import { FlickeringGrid } from "@/components/ui/FlickeringGrid";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Marquee } from "@/components/ui/Marquee";

const EMAIL = "theaishark@theaishark.com";
const MAILTO = `mailto:${EMAIL}?subject=AI%20consulting%20inquiry`;

const CAPABILITIES = [
  {
    title: "AI Strategy",
    body: "We map where AI compounds your margin — not where it’s trendy.",
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

const INDUSTRIES = [
  "Insurance Inspections",
  "Specialty Manufacturing",
  "Logistics & Routing",
  "Field Services",
  "Property Management",
  "Legal Operations",
  "Healthcare Admin",
  "Industrial Maintenance",
  "Financial Compliance",
  "Energy & Utilities",
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Flickering canvas grid behind everything */}
      <div className="pointer-events-none absolute inset-0">
        <FlickeringGrid
          squareSize={3}
          gridGap={8}
          flickerChance={0.18}
          color="rgb(34, 224, 255)"
          maxOpacity={0.18}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 40%, transparent 35%, rgba(2,6,15,0.85) 80%)",
          }}
        />
      </div>

      {/* Top nav */}
      <BlurFade
        delay={0}
        className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 md:py-8"
      >
        <Wordmark />
        <a
          href={MAILTO}
          className="hidden font-mono text-xs tracking-wide text-steel transition hover:text-cyan-edge md:inline"
        >
          {EMAIL}
        </a>
      </BlurFade>

      {/* Hero */}
      <section className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pb-24 pt-8 text-center md:pb-32 md:pt-12">
        {/* App-icon hero mark */}
        <BlurFade delay={0.08} className="relative my-2 md:my-4">
          <div
            className="glass relative grid place-items-center"
            style={{ width: 132, height: 132, borderRadius: 30 }}
          >
            <SharkMark size={92} />
          </div>
          <div
            className="pointer-events-none absolute left-1/2 top-full h-12 w-40 -translate-x-1/2 rounded-[50%] blur-2xl"
            style={{ background: "radial-gradient(ellipse, rgba(34,224,255,0.35), transparent 70%)" }}
          />
        </BlurFade>

        {/* Eyebrow */}
        <BlurFade delay={0.18}>
          <div className="glass mt-10 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-edge">
            <span className="relative h-1.5 w-1.5 rounded-full bg-cyan-glow">
              <span className="absolute inset-0 animate-ping rounded-full bg-cyan-glow opacity-70" />
            </span>
            AI Consulting · Built for Niche Industries
          </div>
        </BlurFade>

        {/* Headline */}
        <BlurFade delay={0.28} offset={14}>
          <h1 className="mt-8 max-w-4xl text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.022em] sm:text-5xl md:text-7xl">
            <span className="text-gradient">Hunt the future</span>
            <br />
            <span className="text-white">before it hunts you.</span>
          </h1>
        </BlurFade>

        {/* Sub */}
        <BlurFade delay={0.42}>
          <p className="mt-7 max-w-2xl text-balance text-base leading-relaxed text-steel md:text-lg">
            AI Shark is an AI consulting firm that builds the custom automations
            and intelligent systems your competitors haven&rsquo;t thought of
            yet. We come in, map your operation, and deploy AI that compounds
            ROI — so the next generation of upstarts can&rsquo;t outrun you.
          </p>
        </BlurFade>

        {/* CTA */}
        <BlurFade delay={0.54}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href={MAILTO}
              className="glass-cta rounded-full px-8 py-4 font-mono text-xs font-medium uppercase tracking-[0.22em] text-white"
            >
              Start a Conversation
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="font-mono text-xs text-steel transition hover:text-cyan-edge md:hidden"
            >
              {EMAIL}
            </a>
          </div>
        </BlurFade>

        {/* Capability cards with cursor-tracking cyan spotlight */}
        <BlurFade delay={0.7} className="mt-24 w-full max-w-4xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {CAPABILITIES.map((item) => (
              <SpotlightCard key={item.title} className="glass glass-interactive rounded-2xl p-6 text-left">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-edge">
                  {item.title}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-steel">
                  {item.body}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </BlurFade>

        {/* Industries marquee */}
        <BlurFade delay={0.85} className="mt-20 w-full">
          <div className="mb-5 text-center font-mono text-[10px] uppercase tracking-[0.32em] text-steel/60">
            Industries we hunt in
          </div>
          <div className="relative">
            <Marquee pauseOnHover className="[--duration:48s]">
              {INDUSTRIES.map((industry) => (
                <span
                  key={industry}
                  className="font-mono text-xs uppercase tracking-[0.18em] text-steel/70 transition-colors hover:text-cyan-edge"
                >
                  {industry}
                </span>
              ))}
            </Marquee>
            {/* Fade-out edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-abyss to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-abyss to-transparent" />
          </div>
        </BlurFade>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 px-6 py-8 md:px-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 font-mono text-[11px] text-steel/70 md:flex-row">
          <div>© {new Date().getFullYear()} The AI Shark LLC. All rights reserved.</div>
          <a href={MAILTO} className="transition hover:text-cyan-edge">
            {EMAIL}
          </a>
        </div>
      </footer>
    </main>
  );
}
