import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const newsletter = await prisma.newsletter.findUnique({
      where: { id }
    });

    if (!newsletter) {
      return NextResponse.json(
        { success: false, error: 'Newsletter introuvable' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      newsletter
    });
  } catch (error) {
    console.error('❌ Error fetching newsletter:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
