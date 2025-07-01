import { NextResponse } from 'next/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();
// Skema validasi untuk data yang masuk
const testimonialSchema = z.object({
  customerName: z.string().min(3, 'Nama harus diisi'),
  reviewMessage: z.string().min(10, 'Review minimal 10 karakter'),
  rating: z.number().min(1).max(5),
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    
    // Validasi data
    const validation = testimonialSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const { customerName, reviewMessage, rating } = validation.data;

    // Buat testimoni baru di database
    const newTestimonial = await prisma.testimonial.create({
      data: {
        customerName,
        reviewMessage,
        rating,
        // Hubungkan dengan user jika sedang login
        userId: session?.user?.id, 
      },
    });

    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ error: 'Gagal membuat testimoni' }, { status: 500 });
  }
}
