import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const tenants = await prisma.tenant.findMany({
      orderBy: { createdAt: "desc" },
      include: { property: true },
    });
    return NextResponse.json(tenants);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (data.moveInDate) data.moveInDate = new Date(data.moveInDate);
    const tenant = await prisma.tenant.create({ data, include: { property: true } });
    return NextResponse.json(tenant, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create tenant" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json();
    if (data.moveInDate) data.moveInDate = new Date(data.moveInDate);
    const tenant = await prisma.tenant.update({ where: { id }, data, include: { property: true } });
    return NextResponse.json(tenant);
  } catch {
    return NextResponse.json({ error: "Failed to update tenant" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.tenant.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete tenant" }, { status: 500 });
  }
}
