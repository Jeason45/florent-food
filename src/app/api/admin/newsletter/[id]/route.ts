import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { NewsletterStatus } from '@prisma/client';

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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const {
      subject,
      introMessage,
      recipeIds,
      tipOfWeek,
      sendTo,
      startDate,
      endDate,
      weekNumber,
      status
    } = await request.json();

    // Vérifier que la newsletter existe
    const existingNewsletter = await prisma.newsletter.findUnique({
      where: { id }
    });

    if (!existingNewsletter) {
      return NextResponse.json(
        { success: false, error: 'Newsletter introuvable' },
        { status: 404 }
      );
    }

    // Validation
    if (!subject || !introMessage) {
      return NextResponse.json(
        { success: false, error: 'Le sujet et le message d\'introduction sont obligatoires' },
        { status: 400 }
      );
    }

    if (!recipeIds || recipeIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Au moins une recette doit être sélectionnée' },
        { status: 400 }
      );
    }

    // Vérifier que les recettes existent
    const recipes = await prisma.recipe.findMany({
      where: { id: { in: recipeIds } }
    });

    if (recipes.length !== recipeIds.length) {
      return NextResponse.json(
        { success: false, error: 'Certaines recettes sont introuvables' },
        { status: 404 }
      );
    }

    // Mettre à jour la newsletter
    const updatedNewsletter = await prisma.newsletter.update({
      where: { id },
      data: {
        subject,
        content: {
          introMessage,
          recipeIds,
          tipOfWeek,
          sendTo
        },
        startDate: startDate ? new Date(startDate) : existingNewsletter.startDate,
        endDate: endDate ? new Date(endDate) : existingNewsletter.endDate,
        weekNumber: weekNumber || existingNewsletter.weekNumber,
        status: status === 'DRAFT' ? NewsletterStatus.DRAFT :
                status === 'SCHEDULED' ? NewsletterStatus.SCHEDULED :
                status === 'ACTIVE' ? NewsletterStatus.ACTIVE : existingNewsletter.status,
      }
    });

    // Supprimer les anciennes relations et créer les nouvelles
    await prisma.newsletterRecipe.deleteMany({
      where: { newsletterId: id }
    });

    const newsletterRecipes = recipeIds.map((recipeId: string, index: number) => ({
      newsletterId: id,
      recipeId,
      position: index + 1
    }));

    await prisma.newsletterRecipe.createMany({
      data: newsletterRecipes
    });

    console.log(`✅ Newsletter mise à jour: ${id}`);

    return NextResponse.json({
      success: true,
      newsletter: updatedNewsletter
    });
  } catch (error) {
    console.error('❌ Error updating newsletter:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour' },
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
