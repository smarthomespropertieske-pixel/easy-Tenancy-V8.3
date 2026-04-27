import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const payments = await prisma.payment.findMany({
      orderBy: { createdAt: "desc" },
      include: { tenant: { include: { property: true } } },
    });
    return NextResponse.json(payments);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    data.amount = parseFloat(data.amount);
    if (data.paymentDate) data.paymentDate = new Date(data.paymentDate);
    const payment = await prisma.payment.create({
      data,
      include: { tenant: { include: { property: true } } },
    });
    return NextResponse.json(payment, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to record payment" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.payment.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete payment" }, { status: 500 });
  }
}
