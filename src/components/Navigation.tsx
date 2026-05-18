"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import type { NavLink } from "@/lib/content";

interface NavigationProps {
  namePart1: string;
  namePart2: string;
  logo: string;
  links: NavLink[];
}

export default function Navigation({ namePart1, namePart2, logo, links }: NavigationProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const overHero = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome ? "nav-blur bg-white/95 shadow-sm border-b border-gray-200" : "bg-transparent"
      }`}
    >
      <div className="w-full px-[50px]">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            aria-label={`${namePart1}${namePart2} home`}
            className={`flex items-center transition-colors duration-500 whitespace-nowrap ${
              overHero ? "text-white" : "text-gray-900"
            }`}
          >
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo}
                alt={`${namePart1}${namePart2}`}
                className="h-10 w-auto"
              />
            ) : (
              <span className="font-orbitron text-lg leading-7 font-extrabold uppercase tracking-[0.3em]">
                {namePart1}
                {namePart2}
              </span>
            )}
          </Link>

          <nav className="hidden md:flex items-center gap-12">
            {links.slice(0, -1).map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-normal transition-colors duration-200 ${
                    active
                      ? overHero
                        ? "text-white"
                        : "text-gray-900"
                      : overHero
                        ? "text-gray-200 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            {links.length > 0 && (
              <Link
                href={links[links.length - 1].href}
                className={`ml-2 inline-flex items-center justify-center rounded-full px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors duration-200 ${
                  overHero
                    ? "bg-white text-gray-900 hover:bg-gray-200"
                    : "bg-gray-900 text-white hover:bg-black"
                }`}
              >
                {links[links.length - 1].label}
              </Link>
            )}
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 ${overHero ? "text-white" : "text-gray-900"}`}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden nav-blur bg-white/98 border-t border-gray-200">
          <nav className="w-full px-[50px] py-4 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 text-sm font-medium tracking-wide uppercase rounded transition-colors ${
                  pathname === link.href
                    ? "text-gray-900 bg-gray-100"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
