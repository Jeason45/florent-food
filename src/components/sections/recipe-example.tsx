"use client";

import { useState, useEffect } from "react";

interface Recipe {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  category: string[];
  difficulty: string;
  prepTime: number;
  cookTime: number;
  restTime?: number | null;
  totalTime: number;
  servings: number;
  ingredients: any[];
  steps: any[];
  chefTips?: string | null;
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

      if (data.success && data.newsletters && data.newsletters.length > 0) {
        // Prendre la première recette de la DERNIÈRE newsletter
        const latestNewsletter = data.newsletters[0];
        if (latestNewsletter.recipes && latestNewsletter.recipes.length > 0) {
          setRecipe(latestNewsletter.recipes[0]);
        }
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
        background: 'transparent',
        padding: '20px 0'
      }}>
        <div className="text-center">
          <p className="text-[var(--gris-taupe)]">Chargement de la recette...</p>
        </div>
      </section>
    );
  }

  if (!recipe) {
    return null; // Ne rien afficher s'il n'y a pas de recette
  }

  const getDifficultyStars = (difficulty: string) => {
    const filledCount = difficulty === 'DEBUTANT' ? 1 : difficulty === 'INTERMEDIAIRE' ? 2 : 3;
    return (
      <>
        <span style={{ color: '#D4AF37' }}>{'★'.repeat(filledCount)}</span>
        <span style={{ color: '#ddd' }}>{'★'.repeat(3 - filledCount)}</span>
      </>
    );
  };

  return (
    <section className="recipe-preview-section relative overflow-hidden" style={{
      background: 'transparent',
      paddingTop: '0',
      paddingBottom: '0'
    }}>
      <style>{`
        @media (max-width: 768px) {
          .recipe-preview-hero-overlay {
            padding: 20px 20px !important;
          }
          .recipe-preview-hero-overlay h1 {
            font-size: 24px !important;
            letter-spacing: -1px !important;
          }
          .recipe-preview-hero-overlay p {
            display: none !important;
          }
          .recipe-preview-content {
            padding: 30px 20px !important;
          }
          .recipe-preview-meta {
            display: flex !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 15px 20px !important;
            padding: 20px 0 !important;
          }
          .recipe-preview-meta > div {
            min-width: 55px !important;
          }
          .recipe-preview-meta-value {
            font-size: 22px !important;
          }
          .recipe-preview-meta-label {
            font-size: 8px !important;
            letter-spacing: 1px !important;
          }
          .recipe-preview-step {
            flex-direction: row !important;
            gap: 12px !important;
            padding: 20px 16px !important;
            margin-bottom: 15px !important;
          }
          .recipe-preview-step-number {
            font-size: 24px !important;
            min-width: 35px !important;
          }
          .recipe-preview-step h3 {
            font-size: 16px !important;
          }
          .recipe-preview-step p {
            font-size: 14px !important;
          }
          .recipe-preview-chef-tips {
            padding: 30px 20px !important;
            margin-bottom: 30px !important;
          }
          .recipe-preview-chef-tips > div:first-child {
            font-size: 9px !important;
            padding: 6px 14px !important;
          }
          .recipe-preview-chef-tips p {
            font-size: 13px !important;
          }
          .recipe-preview-footer {
            padding: 30px 0 15px !important;
          }
          .recipe-preview-footer-title {
            font-size: 20px !important;
          }
          .recipe-preview-ingredients-grid {
            grid-template-columns: 1fr !important;
            gap: 25px !important;
          }
        }
      `}</style>
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

              {/* Overlay avec titre */}
              <div className="recipe-preview-hero-overlay" style={{
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
            <div className="recipe-preview-content" style={{
              padding: '60px 40px',
              background: '#fff'
            }}>
              {/* Meta Info - Identique à la vraie page recette */}
              <div className="recipe-preview-meta" style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '40px',
                padding: '40px 0',
                borderBottom: '1px solid #e8e8e8',
                marginBottom: '50px',
                flexWrap: 'wrap'
              }}>
                <div style={{ textAlign: 'center', minWidth: '70px' }}>
                  <div className="recipe-preview-meta-value" style={{
                    fontSize: '36px',
                    fontWeight: 900,
                    color: '#D4AF37',
                    lineHeight: 1,
                    marginBottom: '12px'
                  }}>
                    {recipe.prepTime}'
                  </div>
                  <div className="recipe-preview-meta-label" style={{
                    fontSize: '11px',
                    color: '#999',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontWeight: 600
                  }}>
                    Préparation
                  </div>
                </div>
                <div style={{ textAlign: 'center', minWidth: '70px' }}>
                  <div className="recipe-preview-meta-value" style={{
                    fontSize: '36px',
                    fontWeight: 900,
                    color: '#D4AF37',
                    lineHeight: 1,
                    marginBottom: '12px'
                  }}>
                    {recipe.cookTime}'
                  </div>
                  <div className="recipe-preview-meta-label" style={{
                    fontSize: '11px',
                    color: '#999',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontWeight: 600
                  }}>
                    Cuisson
                  </div>
                </div>
                {recipe.restTime && recipe.restTime > 0 && (
                  <div style={{ textAlign: 'center', minWidth: '70px' }}>
                    <div className="recipe-preview-meta-value" style={{
                      fontSize: '36px',
                      fontWeight: 900,
                      color: '#D4AF37',
                      lineHeight: 1,
                      marginBottom: '12px'
                    }}>
                      {recipe.restTime}'
                    </div>
                    <div className="recipe-preview-meta-label" style={{
                      fontSize: '11px',
                      color: '#999',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      fontWeight: 600
                    }}>
                      Repos
                    </div>
                  </div>
                )}
                <div style={{ textAlign: 'center', minWidth: '70px' }}>
                  <div className="recipe-preview-meta-value" style={{
                    fontSize: '36px',
                    fontWeight: 900,
                    color: '#D4AF37',
                    lineHeight: 1,
                    marginBottom: '12px'
                  }}>
                    {recipe.servings}
                  </div>
                  <div className="recipe-preview-meta-label" style={{
                    fontSize: '11px',
                    color: '#999',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontWeight: 600
                  }}>
                    Personnes
                  </div>
                </div>
                <div style={{ textAlign: 'center', minWidth: '70px' }}>
                  <div className="recipe-preview-meta-value" style={{
                    fontSize: '28px',
                    fontWeight: 900,
                    lineHeight: 1,
                    marginBottom: '12px',
                    letterSpacing: '2px'
                  }}>
                    {getDifficultyStars(recipe.difficulty)}
                  </div>
                  <div className="recipe-preview-meta-label" style={{
                    fontSize: '11px',
                    color: '#999',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontWeight: 600
                  }}>
                    Difficulté
                  </div>
                </div>
              </div>

              {/* Ingredients - Comme sur la vraie page recette */}
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

                {/* Vérifier si c'est le nouveau format avec groupes */}
                {recipe.ingredients.length > 0 && recipe.ingredients[0] !== null && typeof recipe.ingredients[0] === 'object' && 'groupName' in recipe.ingredients[0] ? (
                  // Format avec groupes - affichés côte à côte
                  <div className="recipe-preview-ingredients-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${Math.min(recipe.ingredients.length, 3)}, 1fr)`,
                    gap: '30px'
                  }}>
                    {(recipe.ingredients as { groupName: string; ingredients: string[] }[]).map((group, groupIndex) => (
                      <div key={groupIndex}>
                        {group.groupName && (
                          <h3 style={{
                            fontSize: '15px',
                            fontWeight: 700,
                            color: '#1a1a1a',
                            marginBottom: '16px',
                            paddingBottom: '10px',
                            borderBottom: '2px solid #D4AF37'
                          }}>
                            {group.groupName}
                          </h3>
                        )}
                        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                          {group.ingredients.map((ingredient: string, ingredientIndex: number) => (
                            <li
                              key={ingredientIndex}
                              style={{
                                padding: '10px 0 10px 20px',
                                fontSize: '14px',
                                color: '#333',
                                position: 'relative',
                                lineHeight: 1.5
                              }}
                            >
                              <span style={{
                                position: 'absolute',
                                left: 0,
                                top: '16px',
                                width: '6px',
                                height: '6px',
                                background: '#D4AF37',
                                borderRadius: '50%',
                                display: 'block'
                              }}></span>
                              {ingredient}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Format simple: tableau de strings
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {recipe.ingredients.map((ingredient: any, index: number) => (
                      <li
                        key={index}
                        style={{
                          padding: '12px 0 12px 24px',
                          fontSize: '15px',
                          color: '#333',
                          position: 'relative',
                          lineHeight: 1.6
                        }}
                      >
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          top: '18px',
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
                )}
              </div>

              {/* Steps - Comme sur la vraie page recette */}
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

                {recipe.steps.map((step: any, index: number) => (
                  <div
                    key={index}
                    className="recipe-preview-step"
                    style={{
                      display: 'flex',
                      gap: '40px',
                      marginBottom: '40px',
                      alignItems: 'flex-start',
                      padding: '40px',
                      background: '#fafaf8',
                      borderRadius: '16px'
                    }}
                  >
                    <div className="recipe-preview-step-number" style={{
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
                        fontWeight: 400,
                        whiteSpace: 'pre-line'
                      }}>
                        {typeof step === 'string' ? step : step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Astuces du Chef - comme sur la vraie page */}
              {recipe.chefTips && (
                <div className="recipe-preview-chef-tips" style={{
                  background: 'linear-gradient(135deg, #faf8f5 0%, #f5f0e8 100%)',
                  padding: '40px',
                  borderRadius: '16px',
                  marginBottom: '50px',
                  border: '2px solid #D4AF37',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '30px',
                    background: '#D4AF37',
                    color: '#000',
                    padding: '8px 20px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                  }}>
                    Astuces du Chef
                  </div>
                  <p style={{
                    fontSize: '15px',
                    lineHeight: 1.8,
                    color: '#333',
                    fontStyle: 'italic',
                    marginTop: '8px'
                  }}>
                    {recipe.chefTips.length > 200 ? recipe.chefTips.substring(0, 200) + '...' : recipe.chefTips}
                  </p>
                </div>
              )}

              {/* Footer */}
              <div className="recipe-preview-footer" style={{
                textAlign: 'center',
                padding: '50px 0 20px',
                borderTop: '1px solid #e8e8e8'
              }}>
                <div className="recipe-preview-footer-title" style={{
                  fontSize: '24px',
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
