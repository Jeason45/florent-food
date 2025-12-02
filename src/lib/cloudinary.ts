/**
 * Optimise une URL Cloudinary avec des transformations automatiques
 * @param url - URL Cloudinary originale
 * @param options - Options de transformation
 * @returns URL optimisée
 */
export function optimizeCloudinaryUrl(
  url: string | null | undefined,
  options: {
    width?: number;
    height?: number;
    quality?: number | 'auto';
    format?: 'auto' | 'webp' | 'avif';
  } = {}
): string {
  if (!url) return '';

  // Vérifier si c'est une URL Cloudinary
  if (!url.includes('res.cloudinary.com')) {
    return url;
  }

  const { width, height, quality = 'auto', format = 'auto' } = options;

  // Construire les transformations
  const transforms: string[] = [];

  // Format automatique (WebP/AVIF selon le navigateur)
  transforms.push(`f_${format}`);

  // Qualité
  transforms.push(`q_${quality}`);

  // Dimensions
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);

  // Crop mode si dimensions spécifiées
  if (width || height) {
    transforms.push('c_fill');
    transforms.push('g_auto'); // Point focal automatique
  }

  const transformString = transforms.join(',');

  // Insérer les transformations dans l'URL
  // Format: https://res.cloudinary.com/cloud_name/image/upload/TRANSFORMS/path
  const parts = url.split('/upload/');
  if (parts.length === 2) {
    return `${parts[0]}/upload/${transformString}/${parts[1]}`;
  }

  return url;
}

/**
 * Presets de tailles courantes pour les images
 */
export const imagePresets = {
  thumbnail: { width: 200, height: 200 },
  card: { width: 400, height: 300 },
  cardMobile: { width: 200, height: 150 },
  hero: { width: 1200, height: 675 },
  heroMobile: { width: 600, height: 400 },
  full: { width: 1600 },
} as const;
