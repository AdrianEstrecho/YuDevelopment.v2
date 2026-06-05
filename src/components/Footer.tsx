import Link from "next/link";
import type { BrandContent, NavLink } from "@/lib/content";

interface FooterProps {
  brand: BrandContent;
  navigation: NavLink[];
}

const services = [
  "Architectural Coordination",
  "Development Consulting",
  "Entitlement Support",
  "Investor Relations",
  "Project Oversight",
];

export default function Footer({ brand, navigation }: FooterProps) {
  const navLinks = navigation.filter((l) => l.href !== "/");
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="text-xl font-bold tracking-tight text-white mb-4">
              <span className="font-sans font-extrabold tracking-wider">{brand.name}</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500">{brand.tagline}</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-300 mb-4">Navigation</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-300 mb-4">Services</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              {services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-300 mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-gray-500">
              <p>
                <a href={`mailto:${brand.email}`} className="hover:text-white transition-colors">
                  {brand.email}
                </a>
              </p>
            </div>
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-gray-500 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} {brand.copyright}. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-600">
            <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
