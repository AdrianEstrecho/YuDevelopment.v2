"use client";

import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import type { PortfolioProject } from "@/lib/content";

interface Props {
  project: PortfolioProject;
}

export default function ProjectDetailClient({ project }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const hasGallery = project.gallery && project.gallery.length > 0;
  const hasTimeline = project.timeline && project.timeline.length > 0;

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-950" />
        )}
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center px-6">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full mb-5">
              {project.type}
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-3">
              {project.name}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-white/70 text-lg">{project.location}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
            <div className="py-6 px-4 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-1">Type</p>
              <p className="text-sm font-medium text-gray-900">{project.type}</p>
            </div>
            <div className="py-6 px-4 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-1">Scope</p>
              <p className="text-sm font-medium text-gray-900">{project.scope}</p>
            </div>
            <div className="py-6 px-4 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-1">Status</p>
              <p className="text-sm font-medium text-gray-900">{project.status}</p>
            </div>
            <div className="py-6 px-4 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-1">Category</p>
              <p className="text-sm font-medium text-gray-900 capitalize">{project.projectType}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Back Link + Content */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-10"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Portfolio
            </Link>
          </ScrollReveal>

          {/* Description */}
          {project.description && (
            <ScrollReveal delay={0.05}>
              <div className="max-w-3xl mb-12">
                <h2 className="text-2xl font-serif text-gray-900 mb-4">About This Project</h2>
                <p className="text-gray-600 leading-relaxed text-lg">{project.description}</p>
              </div>
            </ScrollReveal>
          )}

          {/* Timeline */}
          {hasTimeline && (
            <ScrollReveal delay={0.1}>
              <div className="mb-12">
                <h2 className="text-2xl font-serif text-gray-900 mb-6">Timeline</h2>
                <div className="relative">
                  {/* Line */}
                  <div className="absolute top-4 left-0 right-0 h-px bg-gray-200" />
                  <div className="grid grid-cols-3 md:grid-cols-none md:grid-flow-col md:auto-cols-fr gap-4 relative">
                    {project.timeline.map((entry, i) => (
                      <div key={i} className="text-center pt-8 relative">
                        {/* Dot */}
                        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-900 border-2 border-white ring-2 ring-gray-200" />
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">{entry.label}</p>
                        <p className="text-sm font-medium text-gray-900">{entry.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Gallery */}
      {hasGallery && (
        <section className="py-12 lg:py-16 bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="text-2xl font-serif text-gray-900 mb-8">Project Gallery</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.gallery.map((src, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <button
                    onClick={() => setLightboxIndex(i)}
                    className="block w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-200 group cursor-pointer"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${project.name} — Photo ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </button>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty Gallery Placeholder */}
      {!hasGallery && (
        <section className="py-12 lg:py-16 bg-gray-50 border-t border-gray-200">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-gray-400 text-sm">Project photos coming soon.</p>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && hasGallery && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white text-2xl z-10"
          >
            &times;
          </button>

          {/* Prev */}
          {lightboxIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(lightboxIndex - 1);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          )}

          {/* Next */}
          {lightboxIndex < project.gallery.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(lightboxIndex + 1);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.gallery[lightboxIndex]}
            alt={`${project.name} — Photo ${lightboxIndex + 1}`}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
