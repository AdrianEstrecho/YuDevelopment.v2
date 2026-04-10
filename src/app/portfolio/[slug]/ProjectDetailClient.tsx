"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import type { PortfolioProject } from "@/lib/content";

interface Props {
  project: PortfolioProject;
}

const gradients = [
  "from-gray-700 to-gray-800",
  "from-gray-600 to-gray-800",
  "from-gray-800 to-gray-950",
];

export default function ProjectDetailClient({ project }: Props) {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-end">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-950">
          {project.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image}
              alt={project.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-8 pb-12">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight">
              {project.name}
            </h1>
            <p className="text-white/60 text-sm mt-2 tracking-wide">
              {project.location}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline */}
      {project.timeline.length > 0 && (
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            <ScrollReveal>
              <div className="relative flex items-start justify-between overflow-x-auto pb-2">
                {/* Timeline line */}
                <div className="absolute top-4 left-0 right-0 h-px bg-gray-300" />

                {project.timeline.map((entry, i) => {
                  const isFirst = i === 0;
                  const isLast = i === project.timeline.length - 1;
                  const isPast = i < project.timeline.length - 1;

                  return (
                    <div
                      key={i}
                      className="relative flex flex-col items-center flex-1 min-w-[120px]"
                    >
                      {/* Dot */}
                      <div
                        className={`w-3 h-3 rounded-full border-2 z-10 ${
                          isPast || project.status === "Completed"
                            ? "bg-gray-900 border-gray-900"
                            : "bg-white border-gray-400"
                        }`}
                      />

                      {/* Label */}
                      <p className="mt-3 text-xs font-semibold text-gray-900 text-center px-2">
                        {entry.label}
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {entry.date}
                      </p>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Back link + Info */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <ScrollReveal>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors group"
            >
              <svg
                className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Portfolio
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
                  Type
                </p>
                <p className="text-sm text-gray-900">{project.type}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
                  Scope
                </p>
                <p className="text-sm text-gray-900">{project.scope}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
                  Status
                </p>
                <span
                  className={`inline-block px-3 py-1 text-[10px] font-semibold uppercase tracking-widest rounded-full ${
                    project.status === "Completed"
                      ? "bg-green-600/90 text-white"
                      : project.status === "Under Construction"
                      ? "bg-orange-500/90 text-white"
                      : "bg-blue-500/90 text-white"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
                  Category
                </p>
                <p className="text-sm text-gray-900 capitalize">
                  {project.projectType}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {project.description && (
            <ScrollReveal delay={0.15}>
              <p className="mt-8 text-gray-600 leading-relaxed max-w-3xl">
                {project.description}
              </p>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Photo Gallery */}
      {project.gallery.length > 0 && (
        <section className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <ScrollReveal>
              <h2 className="text-2xl font-serif text-gray-900 mb-8">
                Project Gallery
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.gallery.map((img, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div
                    className={`aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br ${
                      gradients[i % gradients.length]
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`${project.name} — photo ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty gallery placeholder */}
      {project.gallery.length === 0 && (
        <section className="bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
            <ScrollReveal>
              <p className="text-gray-400 text-sm">
                Project photos coming soon.
              </p>
            </ScrollReveal>
          </div>
        </section>
      )}
    </>
  );
}
