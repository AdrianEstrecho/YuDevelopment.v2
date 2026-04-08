import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "People",
};

export default async function PeoplePage() {
  const { people } = await getContent();
  const { hero, members, culture } = people;

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
          <SectionHeading label="Leadership" title="The People Behind the Platform" />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((person, i) => (
              <ScrollReveal key={person.name} delay={i * 0.05}>
                <div className="group">
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden relative mb-6">
                    {person.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={person.image} alt={person.name} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
                          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{person.name}</h3>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">{person.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{person.bio}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading label={culture.label} title={culture.title} description={culture.description} />
              <ScrollReveal delay={0.1}>
                <div className="mt-8 space-y-4">
                  {culture.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-900" />
                      <p className="text-gray-600">{item}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={0.1}>
              <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 border-2 border-gray-400 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2 22h20M6 18V8l6-4 6 4v10M9 22v-4h6v4M9 14h.01M15 14h.01" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">YuDevelopment</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
