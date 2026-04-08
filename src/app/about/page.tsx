import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
};

export default async function AboutPage() {
  const { about } = await getContent();
  const { hero, model, stats, values, milestones } = about;

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
            <div>
              <SectionHeading label={model.label} title={model.title} />
              <ScrollReveal delay={0.1}>
                <div className="mt-8 space-y-6 text-gray-600 leading-relaxed">
                  {model.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={0.15}>
              <div className="grid grid-cols-2 gap-8">
                {stats.map((s) => (
                  <div key={s.label} className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-4xl font-serif text-gray-900 mb-2">{s.value}</p>
                    <p className="text-xs uppercase tracking-widest text-gray-500">{s.label}</p>
                    <p className="text-sm text-gray-400 mt-2">{s.sublabel}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading label="Our Principles" title="How We Operate" />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.05}>
                <div className="flex gap-6 p-8 bg-white rounded-lg border border-gray-200">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-white text-sm font-semibold">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <SectionHeading label="Our Journey" title="Key Milestones" />
          <div className="mt-16 space-y-0">
            {milestones.map((item, i) => (
              <ScrollReveal key={item.year} delay={i * 0.05}>
                <div className="flex gap-8 items-start py-8 border-b border-gray-100 last:border-0">
                  <span className="shrink-0 text-3xl font-serif text-gray-300 w-20">{item.year}</span>
                  <p className="text-gray-700 pt-2">{item.event}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
