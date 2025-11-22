import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { NewsletterStatus } from '@prisma/client';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Récupérer la newsletter
    const newsletter = await prisma.newsletter.findUnique({
      where: { id }
    });

    if (!newsletter) {
      return NextResponse.json(
        { success: false, error: 'Newsletter introuvable' },
        { status: 404 }
      );
    }

    // Basculer entre ACTIVE (visible sur le site) et SENT (masqué)
    const newStatus = newsletter.status === NewsletterStatus.ACTIVE
      ? NewsletterStatus.SENT
      : NewsletterStatus.ACTIVE;

    const actionMessage = newStatus === NewsletterStatus.ACTIVE
      ? 'Les recettes de cette newsletter sont maintenant visibles sur le site'
      : 'Les recettes de cette newsletter ont été retirées du site';

    // Mettre à jour le statut
    await prisma.newsletter.update({
      where: { id },
      data: { status: newStatus }
    });

    console.log(`✅ Newsletter ${id} statut changé: ${newsletter.status} → ${newStatus}`);

    return NextResponse.json({
      success: true,
      message: actionMessage,
      newStatus
    });
  } catch (error) {
    console.error('❌ Error toggling newsletter visibility:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors du changement de visibilité' },
      { status: 500 }
    );
  }
}
