"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/AuthModal";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

interface Recipe {
  id: string;
  slug: string;
  title: string;
  imageUrl: string | null;
  category: string[];
}

interface Newsletter {
  id: string;
  subject: string;
  startDate: string;
  endDate: string;
  weekNumber: number;
  introMessage?: string | null;
  tipOfWeek?: string | null;
  recipes: Recipe[]; // Recettes de CETTE newsletter
}

export function NewsletterPreviewSection() {
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleRecipeClick = (slug: string) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      router.push(`/recettes/${slug}`);
    }
  };

  useEffect(() => {
    fetchActiveNewsletter();
  }, []);

  const fetchActiveRecipes = async () => {
    try {
      const response = await fetch('/api/newsletter/active');
      const data = await response.json();

      if (data.success && data.newsletters && data.newsletters.length > 0) {
        // Prendre la dernière newsletter (la plus récente)
        const latestNewsletter = data.newsletters[0];
        setNewsletter(latestNewsletter);
        // Utiliser UNIQUEMENT les recettes de CETTE newsletter
        setRecipes(latestNewsletter.recipes || []);
      }
    } catch (error) {
      console.error('Error fetching newsletter:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveNewsletter = fetchActiveRecipes;

  if (loading) {
    return (
      <section className="relative overflow-hidden" style={{
        background: 'transparent',
        padding: '20px 0'
      }}>
        <div className="text-center">
          <p className="text-[var(--gris-taupe)]">Chargement de la newsletter...</p>
        </div>
      </section>
    );
  }

  if (!newsletter || recipes.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Séparer featured et secondary (comme dans l'email)
  const featuredRecipe = recipes[0];
  const secondaryRecipes = recipes.slice(1);
  const isLastAlone = secondaryRecipes.length % 2 === 1;

  return (
    <>
    <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    <section className="newsletter-preview-section relative overflow-hidden" style={{
      background: 'transparent',
      paddingTop: '0',
      paddingBottom: '0'
    }}>
      <style>{`
        /* Mobile - même layout que desktop, tailles adaptées */
        @media (max-width: 600px) {
          .newsletter-preview-hero {
            height: 280px !important;
            padding: 30px 20px !important;
          }
          .newsletter-preview-hero h1 {
            font-size: 28px !important;
          }
          .newsletter-preview-intro {
            padding: 30px 20px !important;
          }
          .newsletter-preview-intro p {
            font-size: 15px !important;
          }
          .newsletter-preview-featured {
            height: 250px !important;
          }
          .newsletter-preview-featured-overlay {
            padding: 20px 15px !important;
          }
          .newsletter-preview-featured-number {
            font-size: 40px !important;
            margin-bottom: 5px !important;
          }
          .newsletter-preview-featured-title {
            font-size: 20px !important;
            margin-bottom: 8px !important;
          }
          .newsletter-preview-featured-overlay p {
            font-size: 12px !important;
            margin-bottom: 12px !important;
          }
          .newsletter-preview-featured-overlay > div:last-child {
            padding: 10px 20px !important;
            font-size: 9px !important;
          }
          .newsletter-preview-grid-item {
            height: 180px !important;
          }
          .newsletter-preview-grid-item-full {
            height: 180px !important;
          }
          .newsletter-preview-grid-item h3,
          .newsletter-preview-grid-item-full h3 {
            font-size: 14px !important;
          }
          .newsletter-preview-grid-item > div,
          .newsletter-preview-grid-item-full > div:last-child {
            padding: 15px !important;
          }
          .newsletter-preview-grid-item span,
          .newsletter-preview-grid-item-full span {
            font-size: 10px !important;
          }
          .newsletter-preview-quote {
            padding: 40px 20px !important;
          }
          .newsletter-preview-quote-icon {
            font-size: 36px !important;
            margin-bottom: 15px !important;
          }
          .newsletter-preview-quote p {
            font-size: 16px !important;
            margin-bottom: 15px !important;
          }
          .newsletter-preview-footer {
            padding: 30px 20px !important;
          }
          .newsletter-preview-footer-title {
            font-size: 18px !important;
          }
        }
      `}</style>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-[#D4AF37]/5 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-[#C77A4E]/5 blur-3xl"></div>

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
              Aperçu Newsletter
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light mb-6 leading-tight tracking-tight text-[var(--noir-luxe)]">
            Ce que tu reçois
            <span className="block mt-2 font-normal italic" style={{
              background: 'linear-gradient(to right, #D4AF37, #C77A4E)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              chaque semaine
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[var(--gris-taupe)] max-w-2xl leading-relaxed" style={{ textAlign: 'center', margin: '0 auto' }}>
            Un email complet style magazine de luxe avec toutes les recettes
          </p>
        </div>

        {/* Newsletter Email Mockup - EXACTEMENT comme le template Magazine Luxe */}
        <div className="max-w-3xl" style={{ margin: '0 auto' }}>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ background: '#000' }}>

            {/* HERO - Gradient Gold (identique à l'email) */}
            <div className="newsletter-preview-hero" style={{
              position: 'relative',
              height: '380px',
              background: 'linear-gradient(135deg, #D4AF37 0%, #C77A4E 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '40px 40px'
            }}>
              <div>
                <div style={{
                  fontSize: '11px',
                  letterSpacing: '3px',
                  color: 'rgba(0,0,0,0.6)',
                  marginBottom: '15px',
                  textTransform: 'uppercase'
                }}>
                  Édition du {formatDate(newsletter.startDate)}
                </div>
                <h1 style={{
                  fontSize: '52px',
                  color: '#000',
                  fontWeight: '900',
                  letterSpacing: '-1px',
                  lineHeight: '1.1',
                  marginBottom: '15px',
                  textTransform: 'uppercase'
                }}>
                  Saveurs<br/>d'Exception
                </h1>
                <div style={{
                  fontSize: '16px',
                  color: 'rgba(0,0,0,0.7)',
                  letterSpacing: '1px'
                }}>
                  {recipes.length} Recettes Exclusives
                </div>
              </div>
            </div>

            {/* INTRO - Fond blanc avec bordure gold */}
            <div className="newsletter-preview-intro" style={{
              background: '#fff',
              padding: '60px 50px',
              borderLeft: '4px solid #D4AF37'
            }}>
              <p style={{
                fontSize: '20px',
                lineHeight: '1.7',
                color: '#1a1a1a',
                fontWeight: '300',
                margin: 0
              }}>
                {newsletter.introMessage || `Bonjour ! Cette semaine, je vous partage ${recipes.length} créations d'exception qui vont sublimer vos tables. Des saveurs intenses, des textures parfaites, et cette touche d'élégance qui fait toute la différence.`}
              </p>
              <div style={{
                marginTop: '30px',
                fontSize: '14px',
                color: '#D4AF37',
                fontStyle: 'italic'
              }}>
                — Florent
              </div>
            </div>

            {/* RECETTE VEDETTE - Grand format avec overlay (identique à l'email) */}
            {featuredRecipe && (
              <div
                className="newsletter-preview-featured"
                onClick={() => handleRecipeClick(featuredRecipe.slug)}
                style={{ position: 'relative', height: '450px', cursor: 'pointer' }}
              >
                <img
                  src={optimizeCloudinaryUrl(featuredRecipe.imageUrl, { width: 800, height: 450 }) || 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=800&q=80'}
                  alt={featuredRecipe.title}
                  loading="lazy"
                  width="800"
                  height="450"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div className="newsletter-preview-featured-overlay" style={{
                  padding: '50px',
                  background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0
                }}>
                  <div className="newsletter-preview-featured-number" style={{
                    fontSize: '80px',
                    fontWeight: '900',
                    color: '#D4AF37',
                    lineHeight: '1',
                    marginBottom: '10px',
                    opacity: '0.3'
                  }}>
                    01
                  </div>
                  <h2 className="newsletter-preview-featured-title" style={{
                    fontSize: '38px',
                    color: '#fff',
                    fontWeight: '700',
                    marginBottom: '16px',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.5px'
                  }}>
                    {featuredRecipe.title}
                  </h2>
                  <p style={{
                    fontSize: '16px',
                    color: 'rgba(255,255,255,0.9)',
                    lineHeight: '1.6',
                    marginBottom: '24px'
                  }}>
                    {featuredRecipe.category.join(' · ')}
                  </p>
                  <button
                    onClick={() => handleRecipeClick(featuredRecipe.slug)}
                    style={{
                      display: 'inline-block',
                      background: '#D4AF37',
                      color: '#000',
                      padding: '14px 32px',
                      fontSize: '11px',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      fontWeight: '700',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    Voir la Recette
                  </button>
                </div>
              </div>
            )}

            {/* GRID RECETTES - Par paires comme dans l'email */}
            <div style={{ background: '#000' }}>
              {(() => {
                const rows = [];
                for (let i = 0; i < secondaryRecipes.length; i += 2) {
                  const recipe1 = secondaryRecipes[i];
                  const recipe2 = secondaryRecipes[i + 1];
                  const isLastRow = i + 2 >= secondaryRecipes.length;
                  const isFullWidth = isLastRow && isLastAlone;

                  if (isFullWidth) {
                    // Dernière recette seule - pleine largeur
                    rows.push(
                      <div
                        key={i}
                        className="newsletter-preview-grid-item-full"
                        onClick={() => handleRecipeClick(recipe1.slug)}
                        style={{
                          position: 'relative',
                          height: '300px',
                          overflow: 'hidden',
                          cursor: 'pointer'
                        }}
                      >
                        <img
                          src={optimizeCloudinaryUrl(recipe1.imageUrl, { width: 600, height: 400 }) || 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=600&q=80'}
                          alt={recipe1.title}
                          loading="lazy"
                          width="600"
                          height="400"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            transition: 'transform 0.3s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          padding: '30px',
                          background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 100%)'
                        }}>
                          <h3 style={{
                            fontSize: '24px',
                            color: '#fff',
                            fontWeight: '700',
                            marginBottom: '8px'
                          }}>
                            {recipe1.title}
                          </h3>
                          <span style={{
                            color: '#D4AF37',
                            fontSize: '12px',
                            letterSpacing: '1px',
                            textTransform: 'uppercase'
                          }}>
                            Découvrir →
                          </span>
                        </div>
                      </div>
                    );
                  } else {
                    // Paire de recettes
                    rows.push(
                      <div key={i} className="newsletter-preview-grid-row" style={{
                        display: 'flex',
                        gap: '2px'
                      }}>
                        <div
                          className="newsletter-preview-grid-item"
                          onClick={() => handleRecipeClick(recipe1.slug)}
                          style={{
                            position: 'relative',
                            width: '50%',
                            height: '280px',
                            overflow: 'hidden',
                            cursor: 'pointer'
                          }}
                        >
                          <img
                            src={optimizeCloudinaryUrl(recipe1.imageUrl, { width: 400, height: 280 }) || 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=400&q=80'}
                            alt={recipe1.title}
                            loading="lazy"
                            width="400"
                            height="280"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              display: 'block',
                              transition: 'transform 0.3s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                          />
                          <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: '25px',
                            background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 100%)'
                          }}>
                            <h3 style={{
                              fontSize: '20px',
                              color: '#fff',
                              fontWeight: '700',
                              marginBottom: '8px'
                            }}>
                              {recipe1.title}
                            </h3>
                            <span style={{
                              color: '#D4AF37',
                              fontSize: '12px',
                              letterSpacing: '1px',
                              textTransform: 'uppercase'
                            }}>
                              Découvrir →
                            </span>
                          </div>
                        </div>
                        {recipe2 && (
                          <div
                            className="newsletter-preview-grid-item"
                            onClick={() => handleRecipeClick(recipe2.slug)}
                            style={{
                              position: 'relative',
                              width: '50%',
                              height: '280px',
                              overflow: 'hidden',
                              cursor: 'pointer'
                            }}
                          >
                            <img
                              src={optimizeCloudinaryUrl(recipe2.imageUrl, { width: 400, height: 280 }) || 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=400&q=80'}
                              alt={recipe2.title}
                              loading="lazy"
                              width="400"
                              height="280"
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                                transition: 'transform 0.3s'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            />
                            <div style={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              padding: '25px',
                              background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 100%)'
                            }}>
                              <h3 style={{
                                fontSize: '20px',
                                color: '#fff',
                                fontWeight: '700',
                                marginBottom: '8px'
                              }}>
                                {recipe2.title}
                              </h3>
                              <span style={{
                                color: '#D4AF37',
                                fontSize: '12px',
                                letterSpacing: '1px',
                                textTransform: 'uppercase'
                              }}>
                                Découvrir →
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }
                }
                return rows;
              })()}
            </div>

            {/* CITATION / CONSEIL - Fond noir */}
            <div className="newsletter-preview-quote" style={{
              background: '#1a1a1a',
              padding: '80px 60px',
              textAlign: 'center'
            }}>
              <div className="newsletter-preview-quote-icon" style={{
                fontSize: '60px',
                color: '#D4AF37',
                marginBottom: '30px',
                opacity: '0.5'
              }}>"</div>
              <p style={{
                fontSize: '28px',
                color: '#fff',
                lineHeight: '1.5',
                fontWeight: '300',
                fontStyle: 'italic',
                marginBottom: '30px'
              }}>
                {newsletter.tipOfWeek || "Pour une meringue parfaite, le secret réside dans la température. Un sirop à 121°C exactement."}
              </p>
              <div style={{
                fontSize: '14px',
                color: '#D4AF37',
                letterSpacing: '2px',
                textTransform: 'uppercase'
              }}>
                Conseil de Florent
              </div>
            </div>

            {/* FOOTER - Noir */}
            <div className="newsletter-preview-footer" style={{
              background: '#000',
              padding: '50px',
              textAlign: 'center',
              borderTop: '1px solid #333'
            }}>
              <div className="newsletter-preview-footer-title" style={{
                fontSize: '24px',
                color: '#D4AF37',
                fontWeight: '900',
                marginBottom: '20px',
                letterSpacing: '2px'
              }}>
                FLORENT FOOD
              </div>
              <p style={{
                fontSize: '11px',
                color: '#666',
                lineHeight: '2',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                margin: 0
              }}>
                <span style={{ color: '#D4AF37' }}>Se Désinscrire</span> · <span style={{ color: '#D4AF37' }}>Préférences</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
