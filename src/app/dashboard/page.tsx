"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Building2,
  Users,
  FileText,
  CreditCard,
  Wrench,
} from "lucide-react";

interface DashboardData {
  stats: {
    totalProperties: number;
    activeTenants: number;
    activeLeases: number;
    totalRevenue: number;
    openMaintenance: number;
  };
  recentPayments: Array<{
    id: string;
    amount: number;
    method: string;
    status: string;
    paymentDate: string;
    tenant: { firstName: string; lastName: string };
  }>;
  recentMaintenance: Array<{
    id: string;
    title: string;
    priority: string;
    status: string;
    createdAt: string;
    property: { name: string };
  }>;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  const statCards = [
    { label: "Properties", value: data.stats.totalProperties, icon: Building2, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Tenants", value: data.stats.activeTenants, icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Active Leases", value: data.stats.activeLeases, icon: FileText, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Total Revenue", value: formatCurrency(data.stats.totalRevenue), icon: CreditCard, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Open Maintenance", value: data.stats.openMaintenance, icon: Wrench, color: "text-red-600", bg: "bg-red-50" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back. Here&apos;s an overview of your properties.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4">
              <div className={`h-12 w-12 rounded-lg ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Recent Payments</h2>
          </div>
          <CardContent>
            {data.recentPayments.length === 0 ? (
              <p className="text-sm text-gray-500 py-4">No payments recorded yet.</p>
            ) : (
              <div className="space-y-3">
                {data.recentPayments.map((p) => (
                  <div key={p.id} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {p.tenant.firstName} {p.tenant.lastName}
                      </p>
                      <p className="text-xs text-gray-500">{formatDate(p.paymentDate)} via {p.method}</p>
                    </div>
                    <span className="text-sm font-semibold text-emerald-600">
                      {formatCurrency(p.amount)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Open Maintenance</h2>
          </div>
          <CardContent>
            {data.recentMaintenance.length === 0 ? (
              <p className="text-sm text-gray-500 py-4">No open maintenance requests.</p>
            ) : (
              <div className="space-y-3">
                {data.recentMaintenance.map((m) => (
                  <div key={m.id} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{m.title}</p>
                      <p className="text-xs text-gray-500">{m.property.name}</p>
                    </div>
                    <Badge
                      variant={
                        m.priority === "high" ? "danger" :
                        m.priority === "medium" ? "warning" : "info"
                      }
                    >
                      {m.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
