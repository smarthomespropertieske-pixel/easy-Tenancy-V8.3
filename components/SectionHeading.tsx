interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle: string;
}

export function SectionHeading({ number, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="grid gap-4 md:grid-cols-[auto_1fr] md:items-end md:gap-8">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-brand-700">Section {number}</p>
      </div>
      <div>
        <h2 className="text-3xl font-semibold text-slate-950 sm:text-4xl">{title}</h2>
        <p className="mt-4 max-w-3xl text-slate-600">{subtitle}</p>
      </div>
    </div>
  );
}
