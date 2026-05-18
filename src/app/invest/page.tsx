import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Invest",
};

type RiskStyle = {
  /** Text color for the risk pill and "Learn More" on hover. */
  text: string;
  /** Solid bg for the dot. */
  dot: string;
  /** Mid-stop of the top sweep gradient. */
  via: string;
  /** Hover/focus border + bg tint on the card. */
  cardHover: string;
  /** Focus ring color. */
  focusRing: string;
  /** Hover/focus color shift on the "Learn More" anchor. */
  learnMoreHover: string;
};

const RISK_STYLES: Record<string, RiskStyle> = {
  "Lower Risk": {
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    via: "via-emerald-500",
    cardHover:
      "group-hover:border-emerald-500/70 group-focus-visible:border-emerald-500/70 group-hover:bg-emerald-50/40 group-focus-visible:bg-emerald-50/40",
    focusRing: "focus-visible:ring-emerald-500/30",
    learnMoreHover:
      "group-hover:text-emerald-700 group-focus-visible:text-emerald-700",
  },
  "Moderate Risk": {
    text: "text-amber-700",
    dot: "bg-amber-500",
    via: "via-amber-500",
    cardHover:
      "group-hover:border-amber-500/70 group-focus-visible:border-amber-500/70 group-hover:bg-amber-50/40 group-focus-visible:bg-amber-50/40",
    focusRing: "focus-visible:ring-amber-500/30",
    learnMoreHover:
      "group-hover:text-amber-700 group-focus-visible:text-amber-700",
  },
  "Higher Risk": {
    text: "text-rose-700",
    dot: "bg-rose-500",
    via: "via-rose-500",
    cardHover:
      "group-hover:border-rose-500/70 group-focus-visible:border-rose-500/70 group-hover:bg-rose-50/40 group-focus-visible:bg-rose-50/40",
    focusRing: "focus-visible:ring-rose-500/30",
    learnMoreHover:
      "group-hover:text-rose-700 group-focus-visible:text-rose-700",
  },
};

const NEUTRAL_RISK: RiskStyle = {
  text: "text-gray-500",
  dot: "bg-gray-400",
  via: "via-gray-900",
  cardHover:
    "group-hover:border-gray-900 group-focus-visible:border-gray-900",
  focusRing: "focus-visible:ring-gray-900/20",
  learnMoreHover: "",
};

export default async function InvestPage() {
  const { invest } = await getContent();
  const { hero, advantages, strategies, machineSteps } = invest;

  return (
    <>
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 hero-gradient">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400 mb-6">{hero.eyebrow}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.1] mb-8">
              {hero.titleLine1}
              <br />
              <span className="text-gray-400">{hero.titleLine2}</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">{hero.description}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <SectionHeading
              label="Investment Thesis"
              title="Why Invest With YGCCC"
              description="A self-funding development platform where services revenue covers overhead and investor capital goes straight into equity."
            />
            <div className="space-y-6">
              {advantages.map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 0.05}>
                  <div className="flex gap-5">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="Investment Strategies"
            title="Ways to Partner"
            description="Multiple entry points designed for different return profiles and time horizons."
          />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {strategies.map((strategy, i) => {
              const style = RISK_STYLES[strategy.risk] ?? NEUTRAL_RISK;
              return (
                <ScrollReveal key={strategy.name} delay={i * 0.1}>
                  <Link
                    href="/contact"
                    className={`group relative overflow-hidden p-8 bg-white rounded-lg border border-gray-200 h-full flex flex-col transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_22px_50px_-24px_rgba(0,0,0,0.25)] focus:outline-none focus-visible:ring-2 ${style.cardHover} ${style.focusRing}`}
                  >
                    {/* top sweep accent — colored by risk */}
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${style.via} scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 origin-left transition-transform duration-500 ease-out`}
                    />
                    {/* risk pill */}
                    <span className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] mb-6 ${style.text}`}>
                      <span
                        aria-hidden
                        className={`relative inline-flex w-2 h-2 rounded-full ${style.dot}`}
                      >
                        <span
                          aria-hidden
                          className={`absolute inset-0 rounded-full ${style.dot} opacity-0 group-hover:opacity-70 group-hover:animate-ping group-focus-visible:opacity-70 group-focus-visible:animate-ping`}
                        />
                      </span>
                      {strategy.risk}
                    </span>
                    <h3 className="text-2xl font-serif text-gray-900 mb-2">{strategy.name}</h3>
                    <p className="text-lg font-semibold text-gray-700 mb-4 transition-colors duration-300 group-hover:text-gray-900 group-focus-visible:text-gray-900">
                      {strategy.target}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed flex-1">{strategy.description}</p>
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <span className={`inline-flex items-center gap-2 text-sm font-medium text-gray-900 transition-colors duration-300 ${style.learnMoreHover}`}>
                        Learn More
                        <svg
                          aria-hidden
                          className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 12h14m-7-7l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading label="The Golden Goose" title="How the Machine Works" light />
          <ScrollReveal delay={0.1}>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {machineSteps.map((step) => (
                <div
                  key={step.n}
                  tabIndex={0}
                  className="group relative overflow-hidden text-center p-8 border border-gray-800 rounded-lg cursor-default transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white hover:bg-white/[0.03] focus:outline-none focus-visible:border-white focus-visible:ring-2 focus-visible:ring-white/20"
                >
                  {/* sweep accent */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white to-transparent scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 origin-left transition-transform duration-500 ease-out"
                  />
                  <p className="text-3xl md:text-4xl font-serif text-white mb-2 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-0.5 group-focus-visible:scale-110 origin-center">
                    {step.n}
                  </p>
                  <p className="text-sm uppercase tracking-widest text-gray-400 mb-4 transition-colors duration-300 group-hover:text-white group-focus-visible:text-white">
                    {step.label}
                  </p>
                  <p className="text-sm text-gray-500 transition-colors duration-300 group-hover:text-gray-300 group-focus-visible:text-gray-300">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-12 text-xs text-gray-600 text-center max-w-2xl mx-auto">
              All investments involve risk, including potential loss of principal. This is not an offer to sell securities. Contact us for full disclosure documents.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6">Interested in Partnering?</h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              We welcome conversations with investors who share our long-term mindset. Reach out to learn more about current and upcoming opportunities with YGCCC.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium uppercase tracking-widest text-white bg-gray-900 rounded hover:bg-gray-800 transition-colors"
            >
              Start a Conversation
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
