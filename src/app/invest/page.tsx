import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Invest",
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
            {strategies.map((strategy, i) => (
              <ScrollReveal key={strategy.name} delay={i * 0.1}>
                <div className="p-8 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <span className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-6">{strategy.risk}</span>
                  <h3 className="text-2xl font-serif text-gray-900 mb-2">{strategy.name}</h3>
                  <p className="text-lg font-semibold text-gray-700 mb-4">{strategy.target}</p>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">{strategy.description}</p>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <Link href="/contact" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
                      Learn More &rarr;
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading label="The Golden Goose" title="How the Machine Works" light />
          <ScrollReveal delay={0.1}>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {machineSteps.map((step) => (
                <div key={step.n} className="text-center p-8 border border-gray-800 rounded-lg">
                  <p className="text-3xl md:text-4xl font-serif text-white mb-2">{step.n}</p>
                  <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">{step.label}</p>
                  <p className="text-sm text-gray-500">{step.description}</p>
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
