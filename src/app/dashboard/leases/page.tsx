"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface Lease {
  id: string;
  propertyId: string;
  tenantId: string;
  startDate: string;
  endDate: string;
  rentAmount: number;
  deposit: number;
  status: string;
  property: { name: string };
  tenant: { firstName: string; lastName: string };
}
interface SelectItem { id: string; name?: string; firstName?: string; lastName?: string; }

const emptyForm = { propertyId: "", tenantId: "", startDate: "", endDate: "", rentAmount: "", deposit: "", status: "active", terms: "" };

export default function LeasesPage() {
  const [leases, setLeases] = useState<Lease[]>([]);
  const [properties, setProperties] = useState<SelectItem[]>([]);
  const [tenants, setTenants] = useState<SelectItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    loadLeases();
    fetch("/api/properties").then((r) => r.json()).then(setProperties);
    fetch("/api/tenants").then((r) => r.json()).then(setTenants);
  }, []);

  async function loadLeases() {
    const res = await fetch("/api/leases");
    setLeases(await res.json());
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const body = editId ? { id: editId, ...form } : form;
    await fetch("/api/leases", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setForm(emptyForm);
    setShowForm(false);
    setEditId(null);
    loadLeases();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this lease?")) return;
    await fetch("/api/leases", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadLeases();
  }

  function handleEdit(l: Lease) {
    setForm({
      propertyId: l.propertyId, tenantId: l.tenantId,
      startDate: l.startDate.split("T")[0], endDate: l.endDate.split("T")[0],
      rentAmount: String(l.rentAmount), deposit: String(l.deposit),
      status: l.status, terms: "",
    });
    setEditId(l.id);
    setShowForm(true);
  }

  const statusVariant = (s: string) => {
    if (s === "active") return "success" as const;
    if (s === "expired") return "warning" as const;
    if (s === "terminated") return "danger" as const;
    return "default" as const;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leases</h1>
          <p className="text-sm text-gray-500 mt-1">Manage lease agreements</p>
        </div>
        <Button onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true); }}>
          <Plus className="h-4 w-4 mr-1" /> New Lease
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{editId ? "Edit Lease" : "New Lease"}</CardTitle>
            <button onClick={() => { setShowForm(false); setEditId(null); }}>
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property</label>
                <Select required value={form.propertyId} onChange={(e) => setForm({ ...form, propertyId: e.target.value })}>
                  <option value="">Select property</option>
                  {properties.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tenant</label>
                <Select required value={form.tenantId} onChange={(e) => setForm({ ...form, tenantId: e.target.value })}>
                  <option value="">Select tenant</option>
                  {tenants.map((t) => <option key={t.id} value={t.id}>{t.firstName} {t.lastName}</option>)}
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <Input type="date" required value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <Input type="date" required value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rent (KES)</label>
                <Input type="number" required min={0} value={form.rentAmount} onChange={(e) => setForm({ ...form, rentAmount: e.target.value })} placeholder="e.g. 25000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deposit (KES)</label>
                <Input type="number" min={0} value={form.deposit} onChange={(e) => setForm({ ...form, deposit: e.target.value })} placeholder="e.g. 25000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="terminated">Terminated</option>
                </Select>
              </div>
              <div className="sm:col-span-2 lg:col-span-3 flex gap-2">
                <Button type="submit">{editId ? "Update" : "Create"} Lease</Button>
                <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditId(null); }}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Tenant</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Rent</TableHead>
              <TableHead>Deposit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leases.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No leases yet. Add properties and tenants first.
                </TableCell>
              </TableRow>
            ) : (
              leases.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="font-medium">{l.property.name}</TableCell>
                  <TableCell>{l.tenant.firstName} {l.tenant.lastName}</TableCell>
                  <TableCell className="text-xs">
                    {formatDate(l.startDate)} — {formatDate(l.endDate)}
                  </TableCell>
                  <TableCell>{formatCurrency(l.rentAmount)}</TableCell>
                  <TableCell>{formatCurrency(l.deposit)}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(l.status)}>{l.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(l)} className="p-1.5 rounded hover:bg-gray-100">
                        <Pencil className="h-4 w-4 text-gray-500" />
                      </button>
                      <button onClick={() => handleDelete(l.id)} className="p-1.5 rounded hover:bg-red-50">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
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
