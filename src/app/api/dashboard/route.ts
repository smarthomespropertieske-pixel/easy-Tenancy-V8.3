import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const [properties, tenants, leases, payments, maintenance] = await Promise.all([
      prisma.property.count(),
      prisma.tenant.count({ where: { status: "active" } }),
      prisma.lease.count({ where: { status: "active" } }),
      prisma.payment.aggregate({ _sum: { amount: true } }),
      prisma.maintenanceRequest.count({ where: { status: { in: ["open", "in_progress"] } } }),
    ]);

    const recentPayments = await prisma.payment.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { tenant: true },
    });

    const recentMaintenance = await prisma.maintenanceRequest.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { property: true },
    });

    return NextResponse.json({
      stats: {
        totalProperties: properties,
        activeTenants: tenants,
        activeLeases: leases,
        totalRevenue: payments._sum.amount || 0,
        openMaintenance: maintenance,
      },
      recentPayments,
      recentMaintenance,
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
