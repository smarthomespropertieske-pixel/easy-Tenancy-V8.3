"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface Property { id: string; name: string; }
interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  idNumber: string | null;
  propertyId: string;
  unit: string | null;
  status: string;
  moveInDate: string | null;
  property: Property;
}

const emptyForm = { firstName: "", lastName: "", email: "", phone: "", idNumber: "", propertyId: "", unit: "", status: "active", moveInDate: "" };

export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    loadTenants();
    fetch("/api/properties").then((r) => r.json()).then((data) => setProperties(data));
  }, []);

  async function loadTenants() {
    const res = await fetch("/api/tenants");
    setTenants(await res.json());
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const body = editId ? { id: editId, ...form } : form;
    await fetch("/api/tenants", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setForm(emptyForm);
    setShowForm(false);
    setEditId(null);
    loadTenants();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this tenant?")) return;
    await fetch("/api/tenants", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadTenants();
  }

  function handleEdit(t: Tenant) {
    setForm({
      firstName: t.firstName, lastName: t.lastName, email: t.email, phone: t.phone,
      idNumber: t.idNumber || "", propertyId: t.propertyId, unit: t.unit || "",
      status: t.status, moveInDate: t.moveInDate ? t.moveInDate.split("T")[0] : "",
    });
    setEditId(t.id);
    setShowForm(true);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tenants</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your tenants</p>
        </div>
        <Button onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true); }}>
          <Plus className="h-4 w-4 mr-1" /> Add Tenant
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{editId ? "Edit Tenant" : "New Tenant"}</CardTitle>
            <button onClick={() => { setShowForm(false); setEditId(null); }}>
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <Input required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <Input required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <Input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+254..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
                <Input value={form.idNumber} onChange={(e) => setForm({ ...form, idNumber: e.target.value })} placeholder="National ID" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property</label>
                <Select required value={form.propertyId} onChange={(e) => setForm({ ...form, propertyId: e.target.value })}>
                  <option value="">Select property</option>
                  {properties.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                <Input value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} placeholder="e.g. A1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Move-in Date</label>
                <Input type="date" value={form.moveInDate} onChange={(e) => setForm({ ...form, moveInDate: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Select>
              </div>
              <div className="sm:col-span-2 lg:col-span-3 flex gap-2">
                <Button type="submit">{editId ? "Update" : "Add"} Tenant</Button>
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
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenants.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No tenants yet. Add a property first, then add tenants.
                </TableCell>
              </TableRow>
            ) : (
              tenants.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.firstName} {t.lastName}</TableCell>
                  <TableCell>{t.email}</TableCell>
                  <TableCell>{t.phone}</TableCell>
                  <TableCell>{t.property.name}</TableCell>
                  <TableCell>{t.unit || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={t.status === "active" ? "success" : "default"}>
                      {t.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(t)} className="p-1.5 rounded hover:bg-gray-100">
                        <Pencil className="h-4 w-4 text-gray-500" />
                      </button>
                      <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded hover:bg-red-50">
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
