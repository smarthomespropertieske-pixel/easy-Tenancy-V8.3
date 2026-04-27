'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Globe2, Sparkles, Wallet } from 'lucide-react';
import { previewCards } from '../../lib/data';

export default function PreviewPage() {
  return (
    <main className="container py-12 lg:py-16">
      <section className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-soft backdrop-blur-xl sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-brand-700">App preview</p>
            <h1 className="mt-4 text-3xl font-semibold text-slate-950 sm:text-4xl">See the product experience before you sign up.</h1>
            <p className="mt-5 text-slate-600 sm:text-lg">Live SaaS previews let buyers experience the leasing funnel, portfolio view, and automated tenant journeys with premium motion and intuitive product design.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/dashboard" className="btn-primary inline-flex items-center gap-2">
                Open dashboard preview
                <ArrowRight className="h-4 w-4" />
              </a>
              <div className="inline-flex items-center rounded-full bg-slate-50 px-4 py-2 text-sm text-slate-600 ring-1 ring-slate-200">
                <Globe2 className="mr-2 h-4 w-4" />
                Global property operations demo
              </div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="rounded-[1.75rem] bg-brand-50 p-6 shadow-lg">
            <p className="text-sm uppercase tracking-[0.24em] text-brand-700">Preview kit</p>
            <div className="mt-4 rounded-[1.5rem] bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">Active Lease Conversion</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-950">92%</p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-brand-600/10 px-4 py-2 text-sm font-semibold text-brand-700">
                  <Sparkles className="h-4 w-4" />
                  2026-ready UX
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Next lease start</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950">Marina Heights — 12 Apr</p>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Upcoming maintenance</p>
                    <p className="mt-2 text-lg font-semibold text-slate-950">13 requests</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Recurring revenue</p>
                    <p className="mt-2 text-lg font-semibold text-slate-950">$65.4k</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mt-16">
        <div className="grid gap-6 md:grid-cols-3">
          {previewCards.map((card) => {
            const Icon = card.icon || Globe2;
            return (
              <motion.article
                key={card.title}
                whileHover={{ y: -6 }}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 text-brand-700">
                  <Icon className="h-5 w-5" />
                  <p className="text-sm uppercase tracking-[0.24em] font-semibold">{card.category}</p>
                </div>
                <h2 className="mt-5 text-xl font-semibold text-slate-950">{card.title}</h2>
                <p className="mt-4 text-slate-600">{card.description}</p>
                <ul className="mt-6 space-y-3 text-sm text-slate-600">
                  {card.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-600"></span>
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="mt-16 rounded-[2rem] border border-slate-200/80 bg-slate-50 p-8 shadow-soft sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold text-slate-950 sm:text-4xl">Design your future tenant experience with immersive screens.</h2>
            <p className="mt-4 text-slate-600">Tour the preview experience for leasing, maintenance, payment plans, and analytics that buyers really want to see in a SaaS platform.</p>
          </div>
          <div className="space-y-4 rounded-[1.75rem] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4 rounded-3xl bg-brand-600/10 p-4">
              <p className="text-sm font-semibold text-brand-700">Preview calls-to-action</p>
              <Wallet className="h-5 w-5 text-brand-700" />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-950">Faster deals</p>
                <p className="mt-2">Automated followups and tenant self-service.</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-950">Smart actions</p>
                <p className="mt-2">Preview highlight rules and conversion triggers.</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-950">Unified data</p>
                <p className="mt-2">One experience across leasing, tenant care, and finance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
