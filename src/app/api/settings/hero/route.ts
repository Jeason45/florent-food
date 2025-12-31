import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Récupérer l'image hero (route publique)
export async function GET() {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: 'hero_image' }
    });

    // Retourne l'URL de l'image ou null si non définie
    return NextResponse.json({
      imageUrl: setting?.value || null
    });
  } catch (error) {
    console.error('Error fetching hero image:', error);
    // En cas d'erreur, retourne null (le front utilisera le fallback)
    return NextResponse.json({ imageUrl: null });
  }
}
