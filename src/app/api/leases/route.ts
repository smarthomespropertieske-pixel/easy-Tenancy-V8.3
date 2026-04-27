import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const leases = await prisma.lease.findMany({
      orderBy: { createdAt: "desc" },
      include: { property: true, tenant: true },
    });
    return NextResponse.json(leases);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    data.startDate = new Date(data.startDate);
    data.endDate = new Date(data.endDate);
    data.rentAmount = parseFloat(data.rentAmount);
    data.deposit = parseFloat(data.deposit || "0");
    const lease = await prisma.lease.create({ data, include: { property: true, tenant: true } });
    return NextResponse.json(lease, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create lease" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json();
    if (data.startDate) data.startDate = new Date(data.startDate);
    if (data.endDate) data.endDate = new Date(data.endDate);
    if (data.rentAmount) data.rentAmount = parseFloat(data.rentAmount);
    if (data.deposit) data.deposit = parseFloat(data.deposit);
    const lease = await prisma.lease.update({ where: { id }, data, include: { property: true, tenant: true } });
    return NextResponse.json(lease);
  } catch {
    return NextResponse.json({ error: "Failed to update lease" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.lease.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete lease" }, { status: 500 });
  }
}
