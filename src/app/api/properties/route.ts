import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { tenants: true, leases: true, maintenance: true } } },
    });
    return NextResponse.json(properties);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const property = await prisma.property.create({ data });
    return NextResponse.json(property, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create property" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json();
    const property = await prisma.property.update({ where: { id }, data });
    return NextResponse.json(property);
  } catch {
    return NextResponse.json({ error: "Failed to update property" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.property.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete property" }, { status: 500 });
  }
}
