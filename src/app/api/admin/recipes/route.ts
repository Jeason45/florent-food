import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');

    const recipes = await prisma.recipe.findMany({
      where: status ? {
        status: status as any,
      } : undefined,
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        imageUrl: true,
        difficulty: true,
        prepTime: true,
        cookTime: true,
        totalTime: true,
        visibility: true,
        category: true,
        publishedAt: true,
        status: true,
        viewsCount: true,
        favoritesCount: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ success: true, recipes });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des recettes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
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
      tags,
    } = body;

    // Generate base slug from title
    const baseSlug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Check if slug already exists and make it unique if needed
    let slug = baseSlug;
    let counter = 1;
    while (await prisma.recipe.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Calcul du temps total (prep + cuisson + repos)
    const totalTime = parseInt(prepTime) + parseInt(cookTime) + (restTime ? parseInt(restTime) : 0);

    const recipe = await prisma.recipe.create({
      data: {
        title,
        slug,
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
        visibility: visibility || 'FREE',
        status: status || 'DRAFT',
        tags: tags || [],
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
      },
    });

    return NextResponse.json({ success: true, recipe });
  } catch (error) {
    console.error('Error creating recipe:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création de la recette' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID manquant' },
        { status: 400 }
      );
    }

    await prisma.recipe.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la suppression' },
      { status: 500 }
    );
  }
}
