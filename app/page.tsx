'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { FeatureCard } from '../components/FeatureCard';
import { SectionHeading } from '../components/SectionHeading';
import { features, testimonials } from '../lib/data';

export default function HomePage() {
  return (
    <main className="container py-12 lg:py-16">
      <section className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-soft backdrop-blur-xl sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
              <Sparkles className="h-4 w-4" />
              Built for modern property leaders
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="mt-8 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl"
            >
              The next-generation Tenant Operations platform for 2026.
            </motion.h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Easy Tenancy transforms leasing, rent collection, maintenance, and portfolio growth into a unified SaaS experience with native previews, high-conversion site content, and intelligent dashboards.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href="/preview" className="btn-primary inline-flex items-center justify-center gap-2">
                Explore App Preview
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/dashboard" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                See Live Dashboard
              </a>
            </div>
          </div>

          <div className="space-y-6 rounded-[1.75rem] border border-slate-200/70 bg-slate-50 p-6 shadow-lg">
            <div className="rounded-3xl bg-brand-600/10 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-brand-700">Growth acceleration</p>
              <p className="mt-4 text-3xl font-semibold text-slate-950">10x faster onboarding</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Convert more managers with instant onboarding, property previews, and intelligent tenant engagement workflows.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">Managed units</p>
                <p className="mt-3 text-2xl font-semibold text-slate-950">1,280+</p>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">Payments processed</p>
                <p className="mt-3 text-2xl font-semibold text-slate-950">$7.4M</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading number="01" title="Built for property teams and leasing operations" subtitle="A premium SaaS platform with the speed, trust, and automation required to scale smarter." />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-soft backdrop-blur-xl sm:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-brand-700">Why Easy Tenancy</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950 sm:text-4xl">
              Empower leasing, reduce risk, and delight every tenant.
            </h2>
          </div>
          <div className="space-y-4 text-slate-600">
            <p>Launch your next lease faster with automation, localized payment tracking, and built-in tenant engagement.</p>
            <p>Present the right offer, close more deals, and keep portfolios running with frictionless workflows.</p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading number="02" title="Trusted by modern property operators" subtitle="Performance, insights, and customer success built into every workflow." />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.company} className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
              <p className="text-slate-700">“{testimonial.quote}”</p>
              <p className="mt-5 text-sm font-semibold text-slate-950">{testimonial.name}</p>
              <p className="text-sm text-slate-500">{testimonial.company}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
