import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { NewsletterStatus } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    // Récupérer TOUTES les newsletters ACTIVE ET visibles sur le site
    const activeNewsletters = await prisma.newsletter.findMany({
      where: {
        status: NewsletterStatus.ACTIVE,
        isVisibleOnSite: true // Seulement celles visibles sur le site
      },
      include: {
        newsletterRecipes: {
          include: {
            recipe: true
          },
          orderBy: {
            position: 'asc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc' // Les plus récentes en premier
      }
    });

    if (!activeNewsletters || activeNewsletters.length === 0) {
      return NextResponse.json({
        success: true,
        newsletters: [],
        recipes: []
      });
    }

    // Fusionner toutes les recettes de toutes les newsletters actives
    const allRecipes: any[] = [];
    const seenRecipeIds = new Set<string>();

    // Parcourir toutes les newsletters actives
    for (const newsletter of activeNewsletters) {
      for (const nr of newsletter.newsletterRecipes) {
        // Ajouter seulement si pas déjà présente (éviter les doublons)
        if (!seenRecipeIds.has(nr.recipe.id)) {
          seenRecipeIds.add(nr.recipe.id);
          allRecipes.push(nr.recipe);
        }
      }
    }

    console.log(`✅ ${activeNewsletters.length} newsletter(s) active(s) trouvée(s), ${allRecipes.length} recettes uniques au total`);

    return NextResponse.json({
      success: true,
      // Chaque newsletter avec SES propres recettes (dans l'ordre de position)
      newsletters: activeNewsletters.map(n => {
        const content = n.content as { introMessage?: string; tipOfWeek?: string } | null;
        return {
          id: n.id,
          subject: n.subject,
          startDate: n.startDate,
          endDate: n.endDate,
          weekNumber: n.weekNumber,
          introMessage: content?.introMessage || null,
          tipOfWeek: content?.tipOfWeek || null,
          // Recettes de CETTE newsletter uniquement, dans l'ordre de position
          recipes: n.newsletterRecipes.map(nr => nr.recipe)
        };
      }),
      // Garde aussi la liste fusionnée pour la page d'accueil
      recipes: allRecipes
    });

  } catch (error) {
    console.error('❌ Error fetching active newsletters:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des newsletters actives' },
      { status: 500 }
    );
  }
}
