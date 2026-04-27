import { Building, CreditCard, ShieldCheck, Sparkles, CalendarDays, Home, Wallet, Globe2 } from 'lucide-react';

export const features = [
  {
    title: 'Intelligent lease workflows',
    description: 'Automate tenant onboarding, renewals, agreements, and digital signatures with transparent audit trails.',
    icon: Building,
  },
  {
    title: 'Revenue and payment orchestration',
    description: 'Consolidate rent, deposits, fees, and invoices with flexible billing rules and tenant self-service.',
    icon: CreditCard,
  },
  {
    title: 'Tenant engagement cockpit',
    description: 'Deliver messages, maintenance updates, and performance alerts from a mobile-ready customer portal.',
    icon: Sparkles,
  },
  {
    title: 'Smart portfolio insights',
    description: 'Track occupancy, cash flow, maintenance velocity, and retention in one intelligent control panel.',
    icon: ShieldCheck,
  },
  {
    title: 'Localized global operations',
    description: 'Support multi-market units, region-specific currency rules, and privacy-first compliance settings.',
    icon: Globe2,
  },
  {
    title: 'Enterprise-grade security',
    description: 'Role-based access, audit logs, and permission controls for operators, accountants, and support teams.',
    icon: ShieldCheck,
  },
];

export const testimonials = [
  {
    quote: 'Easy Tenancy gave our team the speed and trust we needed to grow to 450 units without adding headcount.',
    name: 'Nia Mburu',
    company: 'Atlas Living',
  },
  {
    quote: 'The preview experience helped our leadership buy in quickly and made onboarding feel like a premium product.',
    name: 'Ethan K.',
    company: 'Nova Property Group',
  },
  {
    quote: 'We love how easy it is to monitor maintenance, collections and lease renewals from one elegant dashboard.',
    name: 'Lilian Otieno',
    company: 'Keystone Asset Management',
  },
];

export const dashboardMetrics = [
  { label: 'Occupancy rate', value: '94%', change: '+3.8% MoM', icon: Home },
  { label: 'ARPU', value: '$2,480', change: '+8.5% YoY', icon: CreditCard },
  { label: 'Maintenance lead time', value: '14h', change: '-12% SLA', icon: CalendarDays },
  { label: 'Renewal pipeline', value: '312', change: '+22%', icon: Sparkles },
];

export const propertyList = [
  {
    name: 'Marina Heights Suite 11',
    type: 'Urban apartment',
    description: 'A premium waterfront unit with executive amenities, ready for lease conversion.',
    status: 'active',
    rent: '2,850',
    tenants: 3,
    dueDate: 'Apr 18',
  },
  {
    name: 'Brookfield House',
    type: 'Mixed-use block',
    description: 'Multi-unit property with commercial and residential wings, optimized for cash flow.',
    status: 'vacant',
    rent: '12,480',
    tenants: 0,
    dueDate: 'N/A',
  },
  {
    name: 'Green Lane Flats',
    type: 'Residential complex',
    description: 'High-demand portfolio segment with digital rent collection and tenant communication.',
    status: 'active',
    rent: '7,600',
    tenants: 12,
    dueDate: 'Apr 22',
  },
  {
    name: 'Riverside Terrace',
    type: 'City residence',
    description: 'Elevated tenant experience with fast maintenance workflows and recurring payments.',
    status: 'vacant',
    rent: '4,900',
    tenants: 0,
    dueDate: 'N/A',
  },
];

export const previewCards = [
  {
    category: 'Leasing',
    title: 'Leasing funnel snapshots',
    description: 'Highlight staged offers, tenant tags, and conversion analytics for faster decision-making.',
    points: ['Offer pipeline view', 'Tenant scorecards', 'Smart follow-up triggers'],
    icon: CalendarDays,
  },
  {
    category: 'Payments',
    title: 'Tenant billing preview',
    description: 'See how modern rent payment flows, reminders, and reconciliation look from the tenant portal.',
    points: ['Auto-pay reminders', 'Instant receipts', 'Ledger transparency'],
    icon: Wallet,
  },
  {
    category: 'Operations',
    title: 'Maintenance and tasks',
    description: 'Showcase service requests, approvals, and team assignment with intuitive mobile-friendly workflows.',
    points: ['Workflow automation', 'Service SLAs', 'Task escalation'],
    icon: Home,
  },
];
