"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import type { ContactContent } from "@/lib/content";

interface Props {
  content: ContactContent;
}

export default function ContactClient({ content }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const { hero, info } = content;

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
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            <div className="lg:col-span-3">
              <ScrollReveal>
                <h2 className="text-2xl font-serif text-gray-900 mb-2">Send a Message</h2>
                <p className="text-sm text-gray-500 mb-10">Fill out the form below and we&apos;ll get back to you within one business day.</p>

                {submitted ? (
                  <div className="p-8 bg-gray-50 rounded-lg border border-gray-200 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-900 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent</h3>
                    <p className="text-gray-600">Thank you for reaching out. We&apos;ll be in touch shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">First Name</label>
                        <input type="text" id="firstName" name="firstName" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-gray-900 text-sm focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors" />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
                        <input type="text" id="lastName" name="lastName" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-gray-900 text-sm focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                      <input type="email" id="email" name="email" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-gray-900 text-sm focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Message</label>
                      <textarea id="message" name="message" rows={5} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-gray-900 text-sm focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors resize-none" />
                    </div>
                    <button type="submit" className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium uppercase tracking-widest text-white bg-gray-900 rounded hover:bg-gray-800 transition-colors w-full sm:w-auto">
                      Send Message
                    </button>
                  </form>
                )}
              </ScrollReveal>
            </div>

            <div className="lg:col-span-2">
              <ScrollReveal delay={0.1}>
                <h2 className="text-2xl font-serif text-gray-900 mb-10">Get in Touch</h2>
                <div className="space-y-10">
                  <div className="pb-10 border-b border-gray-100">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">General Inquiries</p>
                    <p className="text-sm">
                      <a href={`mailto:${info.generalEmail}`} className="text-gray-600 hover:text-gray-900 transition-colors">
                        {info.generalEmail}
                      </a>
                    </p>
                  </div>
                  <div className="pb-10 border-b border-gray-100">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Development Services</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{info.servicesText}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Investment Inquiries</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{info.investmentText}</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
