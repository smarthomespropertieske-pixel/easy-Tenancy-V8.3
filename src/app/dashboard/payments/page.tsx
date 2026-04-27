"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Plus, Trash2, X } from "lucide-react";

interface Payment {
  id: string;
  tenantId: string;
  amount: number;
  method: string;
  reference: string | null;
  status: string;
  paymentDate: string;
  description: string | null;
  tenant: { firstName: string; lastName: string; property: { name: string } };
}
interface TenantItem { id: string; firstName: string; lastName: string; }

const emptyForm = { tenantId: "", amount: "", method: "mpesa", reference: "", status: "completed", paymentDate: "", description: "" };

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [tenants, setTenants] = useState<TenantItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    loadPayments();
    fetch("/api/tenants").then((r) => r.json()).then(setTenants);
  }, []);

  async function loadPayments() {
    const res = await fetch("/api/payments");
    setPayments(await res.json());
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm(emptyForm);
    setShowForm(false);
    loadPayments();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this payment record?")) return;
    await fetch("/api/payments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadPayments();
  }

  const total = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track rent payments &middot; Total collected: <span className="font-semibold text-emerald-600">{formatCurrency(total)}</span>
          </p>
        </div>
        <Button onClick={() => { setForm(emptyForm); setShowForm(true); }}>
          <Plus className="h-4 w-4 mr-1" /> Record Payment
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Record Payment</CardTitle>
            <button onClick={() => setShowForm(false)}>
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tenant</label>
                <Select required value={form.tenantId} onChange={(e) => setForm({ ...form, tenantId: e.target.value })}>
                  <option value="">Select tenant</option>
                  {tenants.map((t) => <option key={t.id} value={t.id}>{t.firstName} {t.lastName}</option>)}
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (KES)</label>
                <Input type="number" required min={1} value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="e.g. 25000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Method</label>
                <Select value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })}>
                  <option value="mpesa">M-Pesa</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="cash">Cash</option>
                  <option value="cheque">Cheque</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reference</label>
                <Input value={form.reference} onChange={(e) => setForm({ ...form, reference: e.target.value })} placeholder="M-Pesa code / receipt no." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                <Input type="date" value={form.paymentDate} onChange={(e) => setForm({ ...form, paymentDate: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="e.g. April 2026 rent" />
              </div>
              <div className="sm:col-span-2 lg:col-span-3 flex gap-2">
                <Button type="submit">Record Payment</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Tenant</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  No payments recorded yet.
                </TableCell>
              </TableRow>
            ) : (
              payments.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{formatDate(p.paymentDate)}</TableCell>
                  <TableCell className="font-medium">{p.tenant.firstName} {p.tenant.lastName}</TableCell>
                  <TableCell>{p.tenant.property.name}</TableCell>
                  <TableCell className="font-semibold">{formatCurrency(p.amount)}</TableCell>
                  <TableCell className="capitalize">{p.method.replace("_", " ")}</TableCell>
                  <TableCell className="text-xs">{p.reference || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={p.status === "completed" ? "success" : p.status === "pending" ? "warning" : "danger"}>
                      {p.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded hover:bg-red-50">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
