import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get("start");
  const endDate = searchParams.get("end");

  if (!startDate || !endDate) {
    return NextResponse.json({ error: "Missing date range" }, { status: 400 });
  }

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const subscriptions = await prisma.subscription.findMany({
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
      },
    });

    const newSubscriptions = subscriptions.length;

    const mrr = subscriptions.reduce((sum, sub) => sum + sub.totalPrice, 0);

    const reactivations = await prisma.subscription.count({
      where: {
        reactivatedAt: {
          gte: start,
          lte: end,
        },
      },
    });

    const totalActive = await prisma.subscription.count({
      where: {
        status: "ACTIVE",
      },
    });

    return NextResponse.json({
      newSubscriptions,
      mrr,
      reactivations,
      totalActive,
    });
  } catch (error) {
    console.error("Error in /api/admin/subscription-metrics:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
