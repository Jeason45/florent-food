import { NextRequest, NextResponse } from 'next/server';

// Fonction pour ajouter les transformations Cloudinary à l'URL
function getOptimizedUrl(originalUrl: string, type?: string): string {
  // Transformations selon le type d'image
  const transformations: Record<string, string> = {
    hero: 'q_auto:good,f_auto,w_1920,c_limit', // Hero: max 1920px, qualité auto, format auto
    recipe: 'q_auto:good,f_auto,w_1200,c_limit', // Recette: max 1200px
    default: 'q_auto:good,f_auto', // Par défaut: juste compression qualité et format auto
  };

  const transform = transformations[type || 'default'] || transformations.default;

  // Insérer les transformations dans l'URL Cloudinary
  // URL format: https://res.cloudinary.com/xxx/image/upload/v123/folder/image.jpg
  // Devient:   https://res.cloudinary.com/xxx/image/upload/q_auto,f_auto/v123/folder/image.jpg
  return originalUrl.replace('/image/upload/', `/image/upload/${transform}/`);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string | null; // 'hero', 'recipe', etc.
    const folder = formData.get('folder') as string | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }

    // Vérifier que c'est une image
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'Le fichier doit être une image' },
        { status: 400 }
      );
    }

    // Convertir en buffer pour Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Déterminer le dossier de destination
    const uploadFolder = folder || (type === 'hero' ? 'florent-food/site' : 'florent-food/recipes');

    // Upload vers Cloudinary
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

    const formDataCloudinary = new FormData();
    formDataCloudinary.append('file', new Blob([buffer]));
    formDataCloudinary.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'florent_food');
    formDataCloudinary.append('folder', uploadFolder);

    const response = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: formDataCloudinary,
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Cloudinary error:', error);
      return NextResponse.json(
        { success: false, error: 'Erreur lors de l\'upload sur Cloudinary' },
        { status: 500 }
      );
    }

    const data = await response.json();

    // Appliquer les optimisations à l'URL
    const optimizedUrl = getOptimizedUrl(data.secure_url, type || undefined);

    return NextResponse.json({
      success: true,
      url: optimizedUrl,
      originalUrl: data.secure_url,
      publicId: data.public_id,
      // Infos sur l'optimisation
      originalSize: file.size,
      optimized: true,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'upload de l\'image' },
      { status: 500 }
    );
  }
}
