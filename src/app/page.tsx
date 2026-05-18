import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { getContent } from "@/lib/content";

export default async function Home() {
  const { home } = await getContent();
  const { hero, armA, armB, capabilities, featuredProjects, cta } = home;
  const showVideo = hero.backgroundType === "video" && !!hero.backgroundVideo;
  const showImage = hero.backgroundType === "image" && !!hero.backgroundImage;
  const hasMedia = showVideo || showImage;

  return (
    <>
      {/* Hero */}
      <section
        id="hero"
        className={`relative min-h-screen overflow-hidden scroll-mt-16 ${
          hasMedia ? "" : "hero-gradient"
        }`}
        style={
          showImage
            ? {
                backgroundImage: `url(${hero.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        {showVideo && (
          <video
            key={hero.backgroundVideo}
            src={hero.backgroundVideo}
            poster={hero.backgroundImage || undefined}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-x-0 bottom-0 z-10 px-6 sm:px-10 lg:px-[50px] pb-16 sm:pb-20">
          <ScrollReveal>
            <h1
              className="hero-tagline text-left text-white font-medium leading-[1.1] tracking-[-0.05em] mb-3 max-w-4xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
              style={{ fontSize: "clamp(28px, 5vw, 80px)" }}
            >
              {hero.description}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <Link
              href="#arms"
              className="relative overflow-hidden group backdrop-blur-md inline-flex items-center"
              style={{
                padding: "clamp(8px, 1.2vw, 12px) clamp(16px, 2.5vw, 24px)",
                gap: "clamp(4px, 0.8vw, 8px)",
              }}
            >
              <span className="absolute inset-0 bg-white/20 transition-transform duration-300 ease-out scale-y-0 group-hover:scale-y-100 [transform-origin:top] group-hover:[transform-origin:bottom]" />
              <span
                className="relative z-10 text-white font-light flex items-center"
                style={{ fontSize: "clamp(12px, 1.2vw, 14px)", gap: "clamp(4px, 0.8vw, 8px)" }}
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{
                    width: "clamp(12px, 1.2vw, 14px)",
                    height: "clamp(12px, 1.2vw, 14px)",
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                See more
              </span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Two Arms */}
      <section id="arms" className="py-24 lg:py-32 bg-white scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {[armA, armB].map((arm, idx) => (
              <div key={idx} id={idx === 0 ? "services-arm" : "equity-arm"} className="scroll-mt-16">
                <SectionHeading label={arm.label} title={arm.title} description={arm.description} />
                <ScrollReveal delay={0.1}>
                  <ul className="mt-8 space-y-4 text-gray-600 leading-relaxed">
                    {arm.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-900" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="py-24 lg:py-32 bg-gray-50 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label={capabilities.label}
            title={capabilities.title}
            description={capabilities.description}
          />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.items.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.05}>
                <div className="group p-8 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                  <div className="w-10 h-10 mb-6 rounded bg-gray-100 flex items-center justify-center group-hover:bg-gray-900 transition-colors duration-300">
                    <div className="w-2 h-2 rounded-full bg-gray-400 group-hover:bg-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="featured" className="py-24 lg:py-32 bg-white scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-16">
            <SectionHeading label="Pipeline" title="Current Projects" />
            <ScrollReveal>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-gray-900 hover:text-gray-600 transition-colors group"
              >
                View All
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </ScrollReveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, i) => (
              <ScrollReveal key={project.name} delay={i * 0.1}>
                <div className="group cursor-pointer">
                  <div className="aspect-[3/4] rounded-lg overflow-hidden relative mb-6 border border-gray-200 bg-gradient-to-br from-gray-700 to-gray-900">
                    {project.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={project.image} alt={project.name} className="absolute inset-0 w-full h-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 text-[10px] font-semibold uppercase tracking-widest bg-white/90 text-gray-900 rounded-full">
                        {project.status}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                      <p className="text-white text-xs uppercase tracking-widest mb-1">{project.type}</p>
                      <p className="text-white/70 text-xs">{project.units}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
                    {project.name}
                  </h3>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="home-cta" className="py-24 lg:py-32 bg-gray-950 scroll-mt-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 mb-6">{cta.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight mb-8">
              {cta.title}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">{cta.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/invest"
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium uppercase tracking-widest text-gray-900 bg-white rounded hover:bg-gray-100 transition-colors"
              >
                {cta.primaryCta}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium uppercase tracking-widest text-white border border-gray-700 rounded hover:border-gray-500 transition-colors"
              >
                {cta.secondaryCta}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
