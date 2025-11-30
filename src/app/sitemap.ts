import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://florentfood.fr'

  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politique-confidentialite`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Pages de recettes dynamiques (seulement les recettes visibles)
  let recipePages: MetadataRoute.Sitemap = []

  try {
    const recipes = await prisma.recipe.findMany({
      where: {
        visibility: {
          in: ['FREE', 'PREMIUM']
        }
      },
      select: {
        slug: true,
        updatedAt: true,
      }
    })

    recipePages = recipes.map((recipe) => ({
      url: `${baseUrl}/recettes/${recipe.slug}`,
      lastModified: recipe.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  } catch (error) {
    console.error('Error fetching recipes for sitemap:', error)
  }

  return [...staticPages, ...recipePages]
}
