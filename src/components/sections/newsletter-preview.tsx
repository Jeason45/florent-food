"use client";

import { useState, useEffect } from "react";

interface Newsletter {
  id: string;
  subject: string;
  startDate: string;
  endDate: string;
  weekNumber: number;
}

interface Recipe {
  id: string;
  title: string;
  imageUrl: string | null;
  category: string[];
}

export function NewsletterPreviewSection() {
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveNewsletter();
  }, []);

  const fetchActiveNewsletter = async () => {
    try {
      const response = await fetch('/api/newsletter/active');
      const data = await response.json();

      if (data.success && data.newsletters && data.newsletters.length > 0) {
        // Prendre la newsletter la plus récente (première du tableau)
        setNewsletter(data.newsletters[0]);
        setRecipes(data.recipes.slice(0, 3)); // Prendre les 3 premières recettes pour l'aperçu
      }
    } catch (error) {
      console.error('Error fetching newsletter:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="relative overflow-hidden" style={{
        background: 'linear-gradient(to bottom, #FFF5EB, #FFFBF7)',
        paddingTop: '80px',
        paddingBottom: '80px'
      }}>
        <div className="relative max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl px-5 sm:px-8 lg:px-12" style={{ margin: '0 auto' }}>
          <div className="text-center">
            <p className="text-[var(--gris-taupe)]">Chargement de la newsletter...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!newsletter || recipes.length === 0) {
    return null; // Ne rien afficher s'il n'y a pas de newsletter active
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <section className="relative overflow-hidden" style={{
      background: 'linear-gradient(to bottom, #FFF5EB, #FFFBF7)',
      paddingTop: '80px',
      paddingBottom: '80px'
    }}>
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

            {/* HERO - Gradient Gold */}
            <div style={{
              position: 'relative',
              height: '500px',
              background: 'linear-gradient(135deg, #D4AF37 0%, #C77A4E 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '60px 40px'
            }}>
              <div>
                <div style={{
                  fontSize: '11px',
                  letterSpacing: '3px',
                  color: 'rgba(0,0,0,0.6)',
                  marginBottom: '20px',
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
                  marginBottom: '20px',
                  textTransform: 'uppercase'
                }}>
                  {newsletter.subject || 'Saveurs d\'Exception'}
                </h1>
                <div style={{
                  fontSize: '16px',
                  color: 'rgba(0,0,0,0.7)',
                  letterSpacing: '1px'
                }}>
                  Semaine {newsletter.weekNumber}
                </div>
              </div>
            </div>

            {/* INTRO - Fond blanc avec bordure gold */}
            <div style={{
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
                Bonjour ! Cette semaine, je vous partage trois créations d'exception qui vont sublimer vos tables. Des saveurs intenses, des textures parfaites, et cette touche d'élégance qui fait toute la différence.
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

            {/* RECETTE VEDETTE - Grand format avec overlay */}
            {recipes[0] && (
              <div style={{ position: 'relative', height: '450px' }}>
                <img
                  src={recipes[0].imageUrl || 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=1200&q=80'}
                  alt={recipes[0].title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                <div style={{
                  padding: '50px',
                  background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0
                }}>
                  <div style={{
                    fontSize: '80px',
                    fontWeight: '900',
                    color: '#D4AF37',
                    lineHeight: '1',
                    marginBottom: '10px',
                    opacity: '0.3'
                  }}>
                    01
                  </div>
                  <h2 style={{
                    fontSize: '38px',
                    color: '#fff',
                    fontWeight: '700',
                    marginBottom: '16px',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.5px'
                  }}>
                    {recipes[0].title}
                  </h2>
                  <p style={{
                    fontSize: '16px',
                    color: 'rgba(255,255,255,0.9)',
                    lineHeight: '1.6',
                    marginBottom: '24px'
                  }}>
                    {recipes[0].category.join(' · ')}
                  </p>
                  <div style={{
                    display: 'inline-block',
                    background: '#D4AF37',
                    color: '#000',
                    padding: '14px 32px',
                    fontSize: '11px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    fontWeight: '700'
                  }}>
                    Voir la Recette
                  </div>
                </div>
              </div>
            )}

            {/* GRID RECETTES - 2 colonnes noires avec overlay */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', background: '#000' }}>
              {recipes.slice(1, 3).map((recipe, i) => (
                <div key={recipe.id} style={{ position: 'relative', height: '350px', overflow: 'hidden' }}>
                  <img
                    src={recipe.imageUrl || 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=600&q=80'}
                    alt={recipe.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
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
                      fontSize: '22px',
                      color: '#fff',
                      fontWeight: '700',
                      marginBottom: '8px'
                    }}>
                      {recipe.title}
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
              ))}
            </div>

            {/* CITATION / CONSEIL - Fond noir */}
            <div style={{
              background: '#1a1a1a',
              padding: '80px 60px',
              textAlign: 'center'
            }}>
              <div style={{
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
                Pour une meringue parfaite, le secret réside dans la température. Un sirop à 121°C exactement.
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
            <div style={{
              background: '#000',
              padding: '50px',
              textAlign: 'center',
              borderTop: '1px solid #333'
            }}>
              <div style={{
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
                Haute Cuisine · Paris<br/>
                <span style={{ color: '#D4AF37' }}>Se Désinscrire</span> · <span style={{ color: '#D4AF37' }}>Préférences</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
