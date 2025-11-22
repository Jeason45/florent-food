import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { NewsletterStatus, NewsletterType } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    const {
      subject,
      introMessage,
      recipeIds,
      tipOfWeek,
      sendTo,
      startDate,
      endDate,
      weekNumber,
      status,
      scheduledAt
    } = await request.json();

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

    if (!startDate || !endDate) {
      return NextResponse.json(
        { success: false, error: 'Les dates de début et de fin sont obligatoires' },
        { status: 400 }
      );
    }

    // Récupérer les recettes pour validation
    const recipes = await prisma.recipe.findMany({
      where: {
        id: { in: recipeIds }
      }
    });

    if (recipes.length !== recipeIds.length) {
      return NextResponse.json(
        { success: false, error: 'Certaines recettes sont introuvables' },
        { status: 404 }
      );
    }

    // Vérifier s'il n'y a pas déjà une newsletter pour cette période
    const existingNewsletter = await prisma.newsletter.findFirst({
      where: {
        OR: [
          {
            startDate: new Date(startDate),
            endDate: new Date(endDate)
          },
          {
            weekNumber: weekNumber
          }
        ],
        status: {
          in: [NewsletterStatus.DRAFT, NewsletterStatus.SCHEDULED, NewsletterStatus.ACTIVE]
        }
      }
    });

    if (existingNewsletter) {
      return NextResponse.json(
        {
          success: false,
          error: `Une newsletter existe déjà pour cette période (semaine ${weekNumber}). Veuillez modifier la newsletter existante ou choisir une autre période.`
        },
        { status: 409 }
      );
    }

    // Créer la newsletter
    const newsletter = await prisma.newsletter.create({
      data: {
        subject,
        content: {
          introMessage,
          recipeIds,
          tipOfWeek,
          sendTo
        },
        type: NewsletterType.REGULAR,
        status: status === 'DRAFT' ? NewsletterStatus.DRAFT : NewsletterStatus.SCHEDULED,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        weekNumber,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
      }
    });

    // Créer les relations NewsletterRecipe
    const newsletterRecipes = recipeIds.map((recipeId: string, index: number) => ({
      newsletterId: newsletter.id,
      recipeId,
      position: index + 1 // La première recette (index 0) devient position 1 (featured)
    }));

    await prisma.newsletterRecipe.createMany({
      data: newsletterRecipes
    });

    console.log(`✅ Newsletter ${status === 'DRAFT' ? 'draft' : 'scheduled'} créée:`, newsletter.id);

    return NextResponse.json({
      success: true,
      newsletter: {
        id: newsletter.id,
        subject: newsletter.subject,
        status: newsletter.status,
        startDate: newsletter.startDate,
        endDate: newsletter.endDate,
        weekNumber: newsletter.weekNumber
      }
    });

  } catch (error: any) {
    console.error('❌ Error saving newsletter:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Erreur lors de l\'enregistrement' },
      { status: 500 }
    );
  }
}
