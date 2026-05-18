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
              <div className="grid grid-cols-2 gap-6">
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    tabIndex={0}
                    className="group relative overflow-hidden p-8 bg-gray-50 rounded-lg border border-gray-200 cursor-default transition-all duration-300 ease-out hover:bg-white hover:-translate-y-1 hover:border-gray-900 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.25)] focus:outline-none focus-visible:border-gray-900 focus-visible:ring-2 focus-visible:ring-gray-900/15"
                  >
                    {/* sweep accent */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-900 to-transparent scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 origin-left transition-transform duration-500 ease-out"
                    />
                    <p className="text-4xl font-serif text-gray-900 mb-2 transition-transform duration-300 ease-out group-hover:scale-[1.06] group-hover:-translate-y-0.5 group-focus-visible:scale-[1.06] origin-left">
                      {s.value}
                    </p>
                    <p className="text-xs uppercase tracking-widest text-gray-500 transition-colors duration-300 group-hover:text-gray-900 group-focus-visible:text-gray-900">
                      {s.label}
                    </p>
                    <p className="text-sm text-gray-400 mt-2 transition-colors duration-300 group-hover:text-gray-600 group-focus-visible:text-gray-600">
                      {s.sublabel}
                    </p>
                    {/* corner index */}
                    <span
                      aria-hidden
                      className="absolute top-3 right-3 inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-900 text-white text-[9px] font-semibold opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 transition-all duration-300 ease-out"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
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
                <div
                  tabIndex={0}
                  className="group relative overflow-hidden flex gap-6 p-8 bg-white rounded-lg border border-gray-200 cursor-default transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gray-900 hover:shadow-[0_22px_50px_-24px_rgba(0,0,0,0.25)] focus:outline-none focus-visible:border-gray-900 focus-visible:ring-2 focus-visible:ring-gray-900/15"
                >
                  {/* sweep accent */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-900 to-transparent scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 origin-left transition-transform duration-500 ease-out"
                  />
                  <div className="shrink-0 w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-white text-sm font-semibold transition-transform duration-500 ease-out group-hover:rotate-[360deg] group-focus-visible:rotate-[360deg]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 inline-flex items-center gap-2">
                      <span className="relative">
                        {value.title}
                        <span
                          aria-hidden
                          className="absolute left-0 -bottom-0.5 h-px w-full bg-gray-900 scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 origin-left transition-transform duration-400 ease-out"
                        />
                      </span>
                      <svg
                        aria-hidden
                        className="w-4 h-4 text-gray-900 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 transition-all duration-300 ease-out"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 12h14m-7-7l7 7-7 7" />
                      </svg>
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-700 group-focus-visible:text-gray-700">
                      {value.description}
                    </p>
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
