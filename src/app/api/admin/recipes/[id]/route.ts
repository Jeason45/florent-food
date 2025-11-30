import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const recipe = await prisma.recipe.findUnique({
      where: { id },
    });

    if (!recipe) {
      return NextResponse.json(
        { success: false, error: 'Recette introuvable' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      recipe,
    });
  } catch (error) {
    console.error('Error fetching recipe:', error);
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
    const body = await request.json();

    const {
      title,
      description,
      imageUrl,
      category,
      difficulty,
      prepTime,
      cookTime,
      restTime,
      servings,
      ingredients,
      steps,
      chefTips,
      visibility,
      status,
    } = body;

    // Calcul du temps total (prep + cuisson + repos)
    const totalTime = parseInt(prepTime) + parseInt(cookTime) + (restTime ? parseInt(restTime) : 0);

    const recipe = await prisma.recipe.update({
      where: { id },
      data: {
        title,
        description,
        imageUrl,
        category: Array.isArray(category) ? category : [category],
        difficulty,
        prepTime: parseInt(prepTime),
        cookTime: parseInt(cookTime),
        restTime: restTime ? parseInt(restTime) : null,
        totalTime,
        servings: parseInt(servings),
        ingredients,
        steps,
        chefTips: chefTips || null,
        visibility,
        status,
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
      },
    });

    return NextResponse.json({
      success: true,
      recipe,
    });
  } catch (error) {
    console.error('Error updating recipe:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    );
  }
}
