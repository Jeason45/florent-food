import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

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

    // Upload vers Cloudinary
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

    const formDataCloudinary = new FormData();
    formDataCloudinary.append('file', new Blob([buffer]));
    formDataCloudinary.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'florent_food');
    formDataCloudinary.append('folder', 'florent-food/recipes');

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

    return NextResponse.json({
      success: true,
      url: data.secure_url,
      publicId: data.public_id,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'upload de l\'image' },
      { status: 500 }
    );
  }
}
