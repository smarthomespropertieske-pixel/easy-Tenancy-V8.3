"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  type: string;
  units: number;
  description: string | null;
  status: string;
  _count: { tenants: number; leases: number; maintenance: number };
}

const emptyForm = { name: "", address: "", city: "Nairobi", type: "residential", units: 1, description: "", status: "active" };

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => { loadProperties(); }, []);

  async function loadProperties() {
    const res = await fetch("/api/properties");
    setProperties(await res.json());
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const body = editId ? { id: editId, ...form } : form;
    await fetch("/api/properties", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setForm(emptyForm);
    setShowForm(false);
    setEditId(null);
    loadProperties();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this property? All related data will be removed.")) return;
    await fetch("/api/properties", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadProperties();
  }

  function handleEdit(p: Property) {
    setForm({ name: p.name, address: p.address, city: p.city, type: p.type, units: p.units, description: p.description || "", status: p.status });
    setEditId(p.id);
    setShowForm(true);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your property portfolio</p>
        </div>
        <Button onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true); }}>
          <Plus className="h-4 w-4 mr-1" /> Add Property
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{editId ? "Edit Property" : "New Property"}</CardTitle>
            <button onClick={() => { setShowForm(false); setEditId(null); }}>
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Kilimani Heights" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <Input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Street address" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <Input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="e.g. Nairobi" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="mixed">Mixed Use</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Units</label>
                <Input type="number" min={1} required value={form.units} onChange={(e) => setForm({ ...form, units: parseInt(e.target.value) || 1 })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Select>
              </div>
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Optional description" />
              </div>
              <div className="sm:col-span-2 lg:col-span-3 flex gap-2">
                <Button type="submit">{editId ? "Update" : "Create"} Property</Button>
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
              <TableHead>Address</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Units</TableHead>
              <TableHead>Tenants</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  No properties yet. Click &quot;Add Property&quot; to get started.
                </TableCell>
              </TableRow>
            ) : (
              properties.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{p.address}</TableCell>
                  <TableCell>{p.city}</TableCell>
                  <TableCell className="capitalize">{p.type}</TableCell>
                  <TableCell>{p.units}</TableCell>
                  <TableCell>{p._count.tenants}</TableCell>
                  <TableCell>
                    <Badge variant={p.status === "active" ? "success" : "default"}>
                      {p.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(p)} className="p-1.5 rounded hover:bg-gray-100">
                        <Pencil className="h-4 w-4 text-gray-500" />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded hover:bg-red-50">
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
