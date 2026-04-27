"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface MaintenanceReq {
  id: string;
  propertyId: string;
  tenantId: string | null;
  title: string;
  description: string;
  priority: string;
  status: string;
  createdAt: string;
  property: { name: string };
  tenant: { firstName: string; lastName: string } | null;
}
interface SelectItem { id: string; name?: string; firstName?: string; lastName?: string; }

const emptyForm = { propertyId: "", tenantId: "", title: "", description: "", priority: "medium", status: "open" };

export default function MaintenancePage() {
  const [requests, setRequests] = useState<MaintenanceReq[]>([]);
  const [properties, setProperties] = useState<SelectItem[]>([]);
  const [tenants, setTenants] = useState<SelectItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    loadRequests();
    fetch("/api/properties").then((r) => r.json()).then(setProperties);
    fetch("/api/tenants").then((r) => r.json()).then(setTenants);
  }, []);

  async function loadRequests() {
    const res = await fetch("/api/maintenance");
    setRequests(await res.json());
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const body = editId ? { id: editId, ...form } : form;
    await fetch("/api/maintenance", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setForm(emptyForm);
    setShowForm(false);
    setEditId(null);
    loadRequests();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this maintenance request?")) return;
    await fetch("/api/maintenance", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadRequests();
  }

  function handleEdit(m: MaintenanceReq) {
    setForm({
      propertyId: m.propertyId, tenantId: m.tenantId || "",
      title: m.title, description: m.description,
      priority: m.priority, status: m.status,
    });
    setEditId(m.id);
    setShowForm(true);
  }

  async function handleStatusChange(id: string, status: string) {
    await fetch("/api/maintenance", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    loadRequests();
  }

  const priorityVariant = (p: string) => {
    if (p === "high") return "danger" as const;
    if (p === "medium") return "warning" as const;
    return "info" as const;
  };


  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maintenance</h1>
          <p className="text-sm text-gray-500 mt-1">Track and manage maintenance requests</p>
        </div>
        <Button onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true); }}>
          <Plus className="h-4 w-4 mr-1" /> New Request
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{editId ? "Edit Request" : "New Maintenance Request"}</CardTitle>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Reported By (Tenant)</label>
                <Select value={form.tenantId} onChange={(e) => setForm({ ...form, tenantId: e.target.value })}>
                  <option value="">None / Manager</option>
                  {tenants.map((t) => <option key={t.id} value={t.id}>{t.firstName} {t.lastName}</option>)}
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <Select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
              </div>
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Broken water pipe in kitchen" />
              </div>
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <Input required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the issue in detail" />
              </div>
              {editId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </Select>
                </div>
              )}
              <div className="sm:col-span-2 lg:col-span-3 flex gap-2">
                <Button type="submit">{editId ? "Update" : "Submit"} Request</Button>
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
              <TableHead>Date</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Reporter</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No maintenance requests yet.
                </TableCell>
              </TableRow>
            ) : (
              requests.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="text-xs">{formatDate(m.createdAt)}</TableCell>
                  <TableCell className="font-medium">{m.title}</TableCell>
                  <TableCell>{m.property.name}</TableCell>
                  <TableCell>{m.tenant ? `${m.tenant.firstName} ${m.tenant.lastName}` : "Manager"}</TableCell>
                  <TableCell>
                    <Badge variant={priorityVariant(m.priority)}>{m.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={m.status}
                      onChange={(e) => handleStatusChange(m.id, e.target.value)}
                      className="text-xs py-1 px-2 w-auto"
                    >
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(m)} className="p-1.5 rounded hover:bg-gray-100">
                        <Pencil className="h-4 w-4 text-gray-500" />
                      </button>
                      <button onClick={() => handleDelete(m.id)} className="p-1.5 rounded hover:bg-red-50">
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
