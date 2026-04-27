import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const requests = await prisma.maintenanceRequest.findMany({
      orderBy: { createdAt: "desc" },
      include: { property: true, tenant: true },
    });
    return NextResponse.json(requests);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!data.tenantId) delete data.tenantId;
    const req = await prisma.maintenanceRequest.create({
      data,
      include: { property: true, tenant: true },
    });
    return NextResponse.json(req, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create request" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json();
    if (data.tenantId === "") delete data.tenantId;
    const req = await prisma.maintenanceRequest.update({
      where: { id },
      data,
      include: { property: true, tenant: true },
    });
    return NextResponse.json(req);
  } catch {
    return NextResponse.json({ error: "Failed to update request" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.maintenanceRequest.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete request" }, { status: 500 });
  }
}
