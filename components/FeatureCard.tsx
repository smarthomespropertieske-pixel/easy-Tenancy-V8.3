import type { LucideIcon } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface FeatureCardProps {
  feature: Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <article className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-brand-50 text-brand-700">
        {Icon ? <Icon className="h-6 w-6" /> : <span className="h-6 w-6 rounded-full bg-slate-200" />}
      </div>
      <h3 className="mt-6 text-xl font-semibold text-slate-950">{feature.title}</h3>
      <p className="mt-4 text-slate-600">{feature.description}</p>
    </article>
  );
}
