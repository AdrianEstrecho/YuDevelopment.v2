import type { ReactNode } from "react";

interface LegalLayoutProps {
  title: string;
  effectiveDate: string;
  children: ReactNode;
}

/** Shared shell for static legal documents (Privacy Policy, Terms of Service) */
export default function LegalLayout({ title, effectiveDate, children }: LegalLayoutProps) {
  return (
    <>
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 hero-gradient">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400 mb-6">Legal</p>
          <h1 className="text-4xl md:text-5xl font-serif text-white leading-[1.1] mb-4">{title}</h1>
          <p className="text-sm text-gray-400">Effective Date: {effectiveDate}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="space-y-10 text-gray-600 leading-relaxed">{children}</div>
        </div>
      </section>
    </>
  );
}

interface LegalSectionProps {
  heading: string;
  children: ReactNode;
}

/** A numbered/headed sub-section within a legal document */
export function LegalSection({ heading, children }: LegalSectionProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-serif text-gray-900">{heading}</h2>
      {children}
    </div>
  );
}
