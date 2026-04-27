'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Home, CalendarCheck2 } from 'lucide-react';
import { dashboardMetrics, propertyList } from '../../lib/data';

export default function DashboardPage() {
  const [status, setStatus] = useState<'all' | 'active' | 'vacant'>('all');

  const filteredProperties = useMemo(() => {
    if (status === 'all') return propertyList;
    return propertyList.filter((item) => item.status === status);
  }, [status]);

  return (
    <main className="container py-12 lg:py-16">
      <section className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-soft backdrop-blur-xl sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-brand-700">Live SaaS dashboard</p>
            <h1 className="mt-4 text-3xl font-semibold text-slate-950 sm:text-4xl">Monitor portfolio health, rent efficiency, and pipeline demand.</h1>
            <p className="mt-4 max-w-2xl text-slate-600">A modern operations dashboard with real-time previews, tenant pulse, and leasing funnels to drive action from a single pane of glass.</p>
          </div>
          <div className="inline-flex items-center gap-3 rounded-full bg-brand-50 px-5 py-3 text-sm font-semibold text-brand-700 shadow-sm">
            <Sparkles className="h-4 w-4" />
            High adoption-ready experience
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {dashboardMetrics.map((metric) => (
            <motion.div key={metric.label} whileHover={{ y: -4 }} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{metric.label}</p>
              <p className="mt-4 text-3xl font-semibold text-slate-950">{metric.value}</p>
              <p className="mt-2 text-sm text-slate-600">{metric.change}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">Property status</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">Active portfolio overview</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {(['all', 'active', 'vacant'] as const).map((value) => (
                <button
                  key={value}
                  onClick={() => setStatus(value)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    status === value ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20' : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {value === 'all' ? 'All units' : value === 'active' ? 'Occupied' : 'Vacant'}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {filteredProperties.map((property) => (
              <motion.article
                key={property.name}
                whileHover={{ scale: 1.01 }}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-brand-700 uppercase tracking-[0.24em]">{property.type}</p>
                    <h3 className="mt-3 text-xl font-semibold text-slate-950">{property.name}</h3>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${property.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>{property.status}</span>
                </div>
                <p className="mt-4 text-slate-600">{property.description}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Rent</p>
                    <p className="mt-2 text-lg font-semibold text-slate-950">${property.rent} / mo</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Tenants</p>
                    <p className="mt-2 text-lg font-semibold text-slate-950">{property.tenants}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Due</p>
                    <p className="mt-2 text-lg font-semibold text-slate-950">{property.dueDate}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
