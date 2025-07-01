import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const subscription = await prisma.subscription.update({
    where: { id: params.id },
    data: {
      status: 'CANCELLED',
    },
  });

  return NextResponse.json(subscription);
}
