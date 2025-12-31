import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Récupérer tous les paramètres ou un paramètre spécifique
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (key) {
      const setting = await prisma.siteSetting.findUnique({
        where: { key }
      });
      return NextResponse.json(setting);
    }

    const settings = await prisma.siteSetting.findMany({
      orderBy: { key: 'asc' }
    });

    // Convertir en objet clé/valeur pour faciliter l'utilisation
    const settingsMap = settings.reduce((acc, setting) => {
      acc[setting.key] = {
        value: setting.value,
        type: setting.type,
        label: setting.label
      };
      return acc;
    }, {} as Record<string, { value: string; type: string; label: string | null }>);

    return NextResponse.json(settingsMap);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des paramètres' },
      { status: 500 }
    );
  }
}

// POST: Créer ou mettre à jour un paramètre
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, value, type = 'string', label } = body;

    if (!key || value === undefined) {
      return NextResponse.json(
        { error: 'La clé et la valeur sont requises' },
        { status: 400 }
      );
    }

    const setting = await prisma.siteSetting.upsert({
      where: { key },
      update: {
        value,
        type,
        label: label || null
      },
      create: {
        key,
        value,
        type,
        label: label || null
      }
    });

    return NextResponse.json({
      success: true,
      setting
    });
  } catch (error) {
    console.error('Error saving setting:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la sauvegarde du paramètre' },
      { status: 500 }
    );
  }
}
