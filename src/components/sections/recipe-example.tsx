"use client";

import { useState, useEffect } from "react";

interface Recipe {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  category: string[];
  difficulty: string;
  totalTime: number;
  servings: number;
  ingredients: any[];
  steps: any[];
}

export function RecipeExampleSection() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveRecipe();
  }, []);

  const fetchActiveRecipe = async () => {
    try {
      const response = await fetch('/api/newsletter/active');
      const data = await response.json();

      if (data.success && data.recipes && data.recipes.length > 0) {
        // Prendre la première recette
        setRecipe(data.recipes[0]);
      }
    } catch (error) {
      console.error('Error fetching recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="relative overflow-hidden" style={{
        background: 'linear-gradient(to bottom, #FFF8F0, #FFFBF7)',
        paddingTop: '40px',
        paddingBottom: '80px'
      }}>
        <div className="relative max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl px-5 sm:px-8 lg:px-12" style={{ margin: '0 auto' }}>
          <div className="text-center">
            <p className="text-[var(--gris-taupe)]">Chargement de la recette...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!recipe) {
    return null; // Ne rien afficher s'il n'y a pas de recette
  }

  const getDifficultyLabel = (difficulty: string) => {
    if (difficulty === 'DEBUTANT') return 'Débutant';
    if (difficulty === 'INTERMEDIAIRE') return 'Intermédiaire';
    return 'Expert';
  };

  const getDifficultyStars = (difficulty: string) => {
    if (difficulty === 'DEBUTANT') return '★';
    if (difficulty === 'INTERMEDIAIRE') return '★★';
    return '★★★';
  };

  return (
    <section className="relative overflow-hidden" style={{
      background: 'linear-gradient(to bottom, #FFF8F0, #FFFBF7)',
      paddingTop: '40px',
      paddingBottom: '80px'
    }}>
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#D4AF37]/5 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-[#C77A4E]/5 blur-3xl"></div>

      <div className="relative max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl px-5 sm:px-8 lg:px-12" style={{ margin: '0 auto' }}>
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full" style={{
            background: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid rgba(212, 175, 55, 0.2)'
          }}>
            <span style={{
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#C77A4E'
            }}>
              Aperçu Recette
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light mb-6 leading-tight tracking-tight text-[var(--noir-luxe)]">
            Comment se présente
            <span className="block mt-2 font-normal italic" style={{
              background: 'linear-gradient(to right, #D4AF37, #C77A4E)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              chaque recette
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[var(--gris-taupe)] max-w-2xl leading-relaxed" style={{ textAlign: 'center', margin: '0 auto' }}>
            Un design épuré et professionnel pour chaque recette que tu reçois
          </p>
        </div>

        {/* Recipe Preview - EXACTEMENT comme le template recette */}
        <div className="max-w-3xl" style={{ margin: '0 auto' }}>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ background: '#fff' }}>

            {/* Hero SOMBRE - Format 16:9 */}
            <div style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              maxHeight: '600px',
              overflow: 'hidden',
              background: '#000'
            }}>
              <img
                src={recipe.imageUrl || 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=1200&q=80'}
                alt={recipe.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />

              {/* Badge PREMIUM */}
              <div style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: '#D4AF37',
                color: '#000',
                padding: '10px 24px',
                borderRadius: '30px',
                fontSize: '11px',
                fontWeight: 900,
                letterSpacing: '2px',
                textTransform: 'uppercase'
              }}>
                ⭐ PREMIUM
              </div>

              {/* Overlay avec titre */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '40px 50px',
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
                  {recipe.category.join(' · ').toUpperCase()}
                </div>
                <h1 style={{
                  fontSize: '48px',
                  fontWeight: 900,
                  letterSpacing: '-2px',
                  lineHeight: 1.1,
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                  color: '#fff'
                }}>
                  {recipe.title.toUpperCase()}
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
              padding: '60px 40px',
              background: '#fff'
            }}>
              {/* Meta Info */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '50px',
                padding: '40px 0',
                borderBottom: '1px solid #e8e8e8',
                marginBottom: '50px'
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
                    {getDifficultyStars(recipe.difficulty)}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#999',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontWeight: 600
                  }}>
                    {getDifficultyLabel(recipe.difficulty)}
                  </div>
                </div>
              </div>

              {/* Ingredients */}
              <div style={{ marginBottom: '60px' }}>
                <h2 style={{
                  fontSize: '14px',
                  letterSpacing: '4px',
                  color: '#D4AF37',
                  textTransform: 'uppercase',
                  marginBottom: '30px',
                  fontWeight: 700
                }}>
                  Ingrédients
                </h2>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {recipe.ingredients.slice(0, 6).map((ingredient: any, index: number) => (
                    <li
                      key={index}
                      style={{
                        padding: '14px 0 14px 28px',
                        fontSize: '16px',
                        color: '#333',
                        position: 'relative',
                        lineHeight: 1.6
                      }}
                    >
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        top: '20px',
                        width: '8px',
                        height: '8px',
                        background: '#D4AF37',
                        borderRadius: '50%',
                        display: 'block'
                      }}></span>
                      {typeof ingredient === 'string' ? ingredient : ingredient.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Steps */}
              <div style={{ marginBottom: '60px' }}>
                <h2 style={{
                  fontSize: '14px',
                  letterSpacing: '4px',
                  color: '#D4AF37',
                  textTransform: 'uppercase',
                  marginBottom: '30px',
                  fontWeight: 700
                }}>
                  Préparation
                </h2>

                {recipe.steps.slice(0, 3).map((step: any, index: number) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      gap: '30px',
                      marginBottom: '40px',
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
                      minWidth: '80px'
                    }}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div style={{ flex: 1 }}>
                      {step.title && (
                        <h3 style={{
                          fontSize: '20px',
                          fontWeight: 700,
                          marginBottom: '12px',
                          color: '#1a1a1a'
                        }}>
                          {step.title}
                        </h3>
                      )}
                      <p style={{
                        fontSize: '15px',
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
                padding: '50px 0 20px',
                borderTop: '1px solid #e8e8e8'
              }}>
                <div style={{
                  fontSize: '32px',
                  fontWeight: 900,
                  color: '#D4AF37',
                  letterSpacing: '3px',
                  marginBottom: '16px'
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
        </div>
      </div>
    </section>
  );
}
