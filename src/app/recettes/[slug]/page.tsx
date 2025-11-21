import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

interface RecipePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = await prisma.recipe.findUnique({
    where: { slug },
  });

  if (!recipe) {
    return {
      title: 'Recette introuvable - Florent Food',
    };
  }

  return {
    title: `${recipe.title} - Florent Food`,
    description: recipe.description,
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = await prisma.recipe.findUnique({
    where: { slug },
  });

  if (!recipe || recipe.status !== 'PUBLISHED') {
    notFound();
  }

  const ingredients = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
    : [];

  const steps = Array.isArray(recipe.steps)
    ? recipe.steps
    : [];

  return (
    <div style={{ background: '#fff', color: '#1a1a1a' }}>
      {/* Hero SOMBRE - Format 16:9 */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 9',
        maxHeight: '600px',
        overflow: 'hidden',
        background: '#000'
      }}>
        {recipe.imageUrl && (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        )}

        {/* Badge FREE/PREMIUM */}
        <div style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          background: recipe.visibility === 'PREMIUM' ? '#D4AF37' : '#10b981',
          color: recipe.visibility === 'PREMIUM' ? '#000' : '#fff',
          padding: '10px 24px',
          borderRadius: '30px',
          fontSize: '11px',
          fontWeight: 900,
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}>
          {recipe.visibility === 'PREMIUM' ? '⭐ PREMIUM' : '✨ FREE'}
        </div>

        {/* Overlay avec titre */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '40px 60px',
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.95) 100%)'
        }}>
          <div style={{
            fontSize: '10px',
            letterSpacing: '3px',
            color: '#D4AF37',
            textTransform: 'uppercase',
            marginBottom: '12px',
            fontWeight: 700
          }}>
            {recipe.category.join(' · ')}
          </div>
          <h1 style={{
            fontSize: '56px',
            fontWeight: 900,
            letterSpacing: '-2px',
            lineHeight: 1.1,
            marginBottom: '16px',
            textTransform: 'uppercase',
            color: '#fff'
          }}>
            {recipe.title}
          </h1>
          {recipe.description && (
            <p style={{
              fontSize: '16px',
              color: 'rgba(255,255,255,0.9)',
              lineHeight: 1.6,
              maxWidth: '600px'
            }}>
              {recipe.description}
            </p>
          )}
        </div>
      </div>

      {/* Contenu BLANC */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 60px',
        background: '#fff'
      }}>
        {/* Meta Info */}
        <div style={{
          display: 'flex',
          gap: '60px',
          padding: '60px 0',
          borderBottom: '1px solid #e8e8e8',
          marginBottom: '80px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              fontWeight: 900,
              color: '#D4AF37',
              lineHeight: 1,
              marginBottom: '12px'
            }}>
              {recipe.totalTime}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 600
            }}>
              Minutes
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              fontWeight: 900,
              color: '#D4AF37',
              lineHeight: 1,
              marginBottom: '12px'
            }}>
              {recipe.servings}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 600
            }}>
              Personnes
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              fontWeight: 900,
              color: '#D4AF37',
              lineHeight: 1,
              marginBottom: '12px'
            }}>
              {recipe.difficulty === 'DEBUTANT' ? '★' : recipe.difficulty === 'INTERMEDIAIRE' ? '★★' : '★★★'}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 600
            }}>
              {recipe.difficulty === 'DEBUTANT' ? 'Débutant' : recipe.difficulty === 'INTERMEDIAIRE' ? 'Intermédiaire' : 'Expert'}
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div style={{ marginBottom: '100px' }}>
          <h2 style={{
            fontSize: '14px',
            letterSpacing: '4px',
            color: '#D4AF37',
            textTransform: 'uppercase',
            marginBottom: '40px',
            fontWeight: 700
          }}>
            Ingrédients
          </h2>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {ingredients.map((ingredient: any, index: number) => (
              <li
                key={index}
                style={{
                  padding: '16px 0 16px 32px',
                  fontSize: '16px',
                  color: '#333',
                  position: 'relative',
                  lineHeight: 1.6
                }}
              >
                <span style={{
                  position: 'absolute',
                  left: 0,
                  top: '22px',
                  width: '8px',
                  height: '8px',
                  background: '#D4AF37',
                  borderRadius: '50%',
                  content: '""',
                  display: 'block'
                }}></span>
                {typeof ingredient === 'string' ? ingredient : ingredient.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Steps */}
        <div style={{ marginBottom: '100px' }}>
          <h2 style={{
            fontSize: '14px',
            letterSpacing: '4px',
            color: '#D4AF37',
            textTransform: 'uppercase',
            marginBottom: '40px',
            fontWeight: 700
          }}>
            Préparation
          </h2>

          {steps.map((step: any, index: number) => (
            <div
              key={index}
              style={{
                display: 'flex',
                gap: '40px',
                marginBottom: '60px',
                alignItems: 'flex-start',
                padding: '40px',
                background: '#fafaf8',
                borderRadius: '16px'
              }}
            >
              <div style={{
                fontSize: '72px',
                fontWeight: 900,
                color: '#D4AF37',
                lineHeight: 1,
                opacity: 0.4,
                minWidth: '90px'
              }}>
                {String(index + 1).padStart(2, '0')}
              </div>
              <div style={{ flex: 1 }}>
                {step.title && (
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    marginBottom: '16px',
                    color: '#1a1a1a'
                  }}>
                    {step.title}
                  </h3>
                )}
                <p style={{
                  fontSize: '16px',
                  lineHeight: 1.8,
                  color: '#444',
                  fontWeight: 400
                }}>
                  {typeof step === 'string' ? step : step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          padding: '80px 0',
          borderTop: '1px solid #e8e8e8'
        }}>
          <div style={{
            fontSize: '32px',
            fontWeight: 900,
            color: '#D4AF37',
            letterSpacing: '3px',
            marginBottom: '20px'
          }}>
            FLORENT FOOD
          </div>
          <div style={{
            fontSize: '12px',
            color: '#999',
            letterSpacing: '1px'
          }}>
            Haute Cuisine · Paris
          </div>
        </div>
      </div>
    </div>
  );
}
