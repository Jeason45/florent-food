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

    // Si on veut activer cette newsletter pour les nouveaux inscrits
    if (!newsletter.isActiveForNewSubscribers) {
      // D'abord désactiver toutes les autres newsletters
      await prisma.newsletter.updateMany({
        where: {
          isActiveForNewSubscribers: true,
          id: { not: id }
        },
        data: {
          isActiveForNewSubscribers: false
        }
      });

      // Activer celle-ci
      await prisma.newsletter.update({
        where: { id },
        data: {
          isActiveForNewSubscribers: true
        }
      });

      console.log(`✅ Newsletter ${id} activée pour les nouveaux inscrits`);

      return NextResponse.json({
        success: true,
        message: 'Cette newsletter sera maintenant envoyée aux nouveaux inscrits',
        isActiveForNewSubscribers: true
      });
    } else {
      // Désactiver cette newsletter
      await prisma.newsletter.update({
        where: { id },
        data: {
          isActiveForNewSubscribers: false
        }
      });

      console.log(`✅ Newsletter ${id} désactivée pour les nouveaux inscrits`);

      return NextResponse.json({
        success: true,
        message: 'Cette newsletter ne sera plus envoyée aux nouveaux inscrits',
        isActiveForNewSubscribers: false
      });
    }
  } catch (error) {
    console.error('❌ Error toggling newsletter for new subscribers:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors du changement' },
      { status: 500 }
    );
  }
}
