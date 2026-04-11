"use client";

import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import PortfolioMap from "@/components/PortfolioMap";
import type { PortfolioContent } from "@/lib/content";

interface Props {
  content: PortfolioContent;
}

const filters = ["All", "Coming Soon", "Under Construction", "Completed"];

const gradients = [
  "from-gray-700 to-gray-800",
  "from-gray-600 to-gray-800",
  "from-gray-800 to-gray-950",
  "from-gray-700 to-gray-900",
  "from-gray-600 to-gray-700",
  "from-gray-500 to-gray-700",
];

export default function PortfolioClient({ content }: Props) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = content.projects.filter((p) => {
    const matchFilter = activeFilter === "All" || p.status === activeFilter;
    const matchSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <>
      <section className="relative pt-28 pb-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 leading-[1.1] mb-8">
              {content.title}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {filters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-5 py-2 text-xs font-medium tracking-wide uppercase rounded-full border transition-colors duration-200 ${
                      activeFilter === f
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-transparent text-gray-600 border-gray-300 hover:border-gray-900 hover:text-gray-900"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 text-sm bg-white border border-gray-300 rounded text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 transition-colors w-full sm:w-48"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal delay={0.15}>
            <PortfolioMap projects={content.projects} />
          </ScrollReveal>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => {
              const gradient = gradients[i % gradients.length];
              return (
                <ScrollReveal key={project.slug || project.name || i} delay={i * 0.05}>
                  <Link href={`/portfolio/${project.slug}`} className="group block">
                    <div className={`aspect-[4/3] bg-gradient-to-br ${gradient} rounded-lg overflow-hidden relative border border-gray-200`}>
                      {project.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={project.image} alt={project.name} className="absolute inset-0 w-full h-full object-cover" />
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute top-3 left-3">
                        <span
                          className={`px-3 py-1 text-[10px] font-semibold uppercase tracking-widest rounded-full ${
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
                      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-lg font-serif text-white mb-1">{project.name}</h3>
                        <p className="text-white/60 text-xs">{project.location}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                      <span>{project.type}</span>
                      <span>&middot;</span>
                      <span>{project.scope}</span>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No projects match your search.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal className="max-w-3xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4 text-gray-500">
              {content.pipeline.label}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight text-gray-900">
              {content.pipeline.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">{content.pipeline.description}</p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
