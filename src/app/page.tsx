import Link from "next/link";
import {
  Building2,
  Shield,
  CreditCard,
  Wrench,
  BarChart3,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "Property Portfolio",
    description:
      "Manage all your properties in one place — from single units to multi-story apartment blocks across Nairobi, Eldoret and beyond.",
  },
  {
    icon: Users,
    title: "Tenant Management",
    description:
      "Track tenant details, lease terms, move-in dates and communication history. Know exactly who is in every unit.",
  },
  {
    icon: CreditCard,
    title: "Built for M-Pesa",
    description:
      "Designed for M-Pesa rent collection. Record payments, track arrears and generate receipts — the way Kenya pays.",
  },
  {
    icon: Wrench,
    title: "Maintenance Tracking",
    description:
      "Log maintenance requests, assign priorities and track resolution. Keep tenants happy and properties in top shape.",
  },
  {
    icon: BarChart3,
    title: "Financial Reports",
    description:
      "See rent collection rates, outstanding balances and revenue trends at a glance. Make data-driven decisions.",
  },
  {
    icon: Shield,
    title: "Lease Control",
    description:
      "Manage lease agreements, renewals and expirations. Never miss a renewal date with clear status tracking.",
  },
];

const stats = [
  { label: "Properties Managed", value: "500+" },
  { label: "Tenants Served", value: "2,000+" },
  { label: "Rent Collected", value: "KES 50M+" },
  { label: "Uptime", value: "99.9%" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-geist-sans)]">
      {/* Navigation */}
      <nav className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-emerald-600" />
              <span className="text-xl font-bold text-gray-900">Easy Tenancy</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
              >
                Get Started
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
              Pilot-ready for Kenya&apos;s rental market
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
              The operating system for{" "}
              <span className="text-emerald-600">modern rental management</span> in Kenya
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
              Take control of your rental portfolio. Track properties, manage tenants,
              collect rent via M-Pesa, and handle maintenance — all from one dashboard
              built for Kenyan landlords and property managers.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-emerald-600 text-white text-base font-medium hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
              >
                Start Free Pilot
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-300 text-gray-700 text-base font-medium hover:bg-gray-50 transition-colors"
              >
                Sign In to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            Stop managing rentals with spreadsheets
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Scattered WhatsApp messages, manual M-Pesa tracking, lost maintenance requests —
            Easy Tenancy replaces the chaos with one clear system.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl border border-gray-200 hover:border-emerald-200 hover:shadow-lg transition-all group"
            >
              <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition-colors">
                <feature.icon className="h-6 w-6 text-emerald-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Kenya-specific Credibility */}
      <section className="bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white">
              Built for Kenya. Built for you.
            </h2>
            <p className="mt-4 text-lg text-emerald-100">
              Easy Tenancy understands the Kenyan rental market — from Nairobi&apos;s
              apartment blocks to Eldoret&apos;s residential estates.
            </p>
            <div className="mt-10 grid sm:grid-cols-2 gap-6 text-left">
              {[
                "M-Pesa payment tracking built in",
                "KES currency throughout the platform",
                "Kenyan ID number support for tenants",
                "Designed for multi-unit residential properties",
                "Works on mobile browsers for on-site management",
                "Simple setup — no technical expertise needed",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-300 mt-0.5 shrink-0" />
                  <span className="text-white text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Ready to simplify your rental management?
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
          Join property managers across Kenya who are bringing order to their rental operations.
        </p>
        <div className="mt-8">
          <Link
            href="/register"
            className="inline-flex items-center px-8 py-4 rounded-lg bg-emerald-600 text-white text-lg font-medium hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
          >
            Get Started — It&apos;s Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-semibold text-gray-900">Easy Tenancy V8.3</span>
            </div>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Smarthomes Consulting Group Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
