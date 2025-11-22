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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Vérifier que la newsletter existe
    const newsletter = await prisma.newsletter.findUnique({
      where: { id }
    });

    if (!newsletter) {
      return NextResponse.json(
        { success: false, error: 'Newsletter introuvable' },
        { status: 404 }
      );
    }

    // Supprimer la newsletter (les relations NewsletterRecipe seront supprimées automatiquement grâce à onDelete: Cascade)
    await prisma.newsletter.delete({
      where: { id }
    });

    console.log(`✅ Newsletter supprimée: ${id}`);

    return NextResponse.json({
      success: true,
      message: 'Newsletter supprimée avec succès'
    });
  } catch (error) {
    console.error('❌ Error deleting newsletter:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la suppression' },
      { status: 500 }
    );
  }
}
