import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { planName, mealTypes, deliveryDays, totalPrice, allergies } = body;

    // Validate required fields
    if (!planName || !mealTypes?.length || !deliveryDays?.length || totalPrice === undefined) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }

    // Verify that the userId matches the session user
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

    // Create the subscription
    const subscription = await prisma.subscription.create({
        data: {
          planName,
          // untuk array gunakan { set: ... } agar aman di semua DB yg support list
          mealTypes: { set: mealTypes },
          deliveryDays: { set: deliveryDays },
          totalPrice,
          allergies,
          userId: user.id,
          status: 'ACTIVE',
        },
      });

    return NextResponse.json(subscription, { status: 201 });

  } catch (error) {
    console.error('Error creating subscription:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user by email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get user's subscriptions
    const subscriptions = await prisma.subscription.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(subscriptions);

  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}