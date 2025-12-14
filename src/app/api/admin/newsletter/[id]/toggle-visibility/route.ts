import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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

    // Basculer isVisibleOnSite (indépendant du statut)
    const newVisibility = !newsletter.isVisibleOnSite;

    // Mettre à jour
    await prisma.newsletter.update({
      where: { id },
      data: {
        isVisibleOnSite: newVisibility
      }
    });

    const actionMessage = newVisibility
      ? 'Les recettes de cette newsletter sont maintenant visibles sur le site'
      : 'Les recettes de cette newsletter ont été retirées du site';

    console.log(`✅ Newsletter ${id} visibilité changée: ${newsletter.isVisibleOnSite} → ${newVisibility}`);

    return NextResponse.json({
      success: true,
      message: actionMessage,
      isVisibleOnSite: newVisibility
    });
  } catch (error) {
    console.error('❌ Error toggling newsletter visibility:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors du changement de visibilité' },
      { status: 500 }
    );
  }
}
