import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const search = searchParams.get('search');

    const where: any = {};

    // Filter by status
    if (status && status !== 'all') {
      where.status = status;
    }

    // Filter by subscription type
    if (type && type !== 'all') {
      where.subscriptionType = type;
    }

    // Search by email or first name
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } }
      ];
    }

    const subscribers = await prisma.newsletterSubscriber.findMany({
      where,
      orderBy: {
        subscribedAt: 'desc'
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        status: true,
        subscriptionType: true,
        subscribedAt: true,
        confirmedAt: true,
        totalOpens: true,
        totalClicks: true,
        lastOpenedAt: true
      }
    });

    return NextResponse.json(subscribers);
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Subscriber ID is required' },
        { status: 400 }
      );
    }

    await prisma.newsletterSubscriber.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting subscriber:', error);
    return NextResponse.json(
      { error: 'Failed to delete subscriber' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, subscriptionType } = await request.json();

    if (!id || !subscriptionType) {
      return NextResponse.json(
        { error: 'ID and subscription type are required' },
        { status: 400 }
      );
    }

    const updated = await prisma.newsletterSubscriber.update({
      where: { id },
      data: { subscriptionType }
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating subscriber:', error);
    return NextResponse.json(
      { error: 'Failed to update subscriber' },
      { status: 500 }
    );
  }
}
