import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const body = await req.json();
  const { pauseStartDate, pauseEndDate } = body;

  try {
    const subscription = await prisma.subscription.update({
      where: { id },
      data: {
        status: 'PAUSED',
        pauseStartDate: new Date(pauseStartDate),
        pauseEndDate: new Date(pauseEndDate),
      },
    });

    return NextResponse.json(subscription);
  } catch (error) {
    console.error('Pause Error:', error);
    return NextResponse.json({ error: 'Failed to pause' }, { status: 500 });
  }
}
