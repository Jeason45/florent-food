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

    // Si on veut activer la visibilité de cette newsletter
    if (!newsletter.isVisibleOnSite) {
      // D'abord désactiver toutes les autres newsletters visibles
      await prisma.newsletter.updateMany({
        where: {
          isVisibleOnSite: true,
          id: { not: id }
        },
        data: {
          isVisibleOnSite: false
        }
      });

      // Activer celle-ci
      await prisma.newsletter.update({
        where: { id },
        data: {
          isVisibleOnSite: true
        }
      });

      console.log(`✅ Newsletter ${id} activée pour le site (autres désactivées)`);

      return NextResponse.json({
        success: true,
        message: 'Cette newsletter est maintenant visible sur le site (les autres ont été masquées)',
        isVisibleOnSite: true
      });
    } else {
      // Désactiver cette newsletter
      await prisma.newsletter.update({
        where: { id },
        data: {
          isVisibleOnSite: false
        }
      });

      console.log(`✅ Newsletter ${id} masquée du site`);

      return NextResponse.json({
        success: true,
        message: 'Cette newsletter a été masquée du site',
        isVisibleOnSite: false
      });
    }
  } catch (error) {
    console.error('❌ Error toggling newsletter visibility:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors du changement de visibilité' },
      { status: 500 }
    );
  }
}
