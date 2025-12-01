"use client";

import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Hinde",
    role: "Passionnée de pâtisserie",
    text: "Les recettes de Florent sont incroyables ! J'ai réussi mon premier Paris-Brest grâce à ses explications claires et détaillées. Mes invités étaient bluffés !",
    initial: "H",
  },
  {
    id: 2,
    name: "Houda",
    role: "Cuisinière passionnée",
    text: "Même en tant que débutante, j'ai pu suivre facilement. Les vidéos sont top et les astuces font vraiment la différence. Je recommande à 100% !",
    initial: "H",
  },
  {
    id: 3,
    name: "Rudy",
    role: "Chien officiel de Florent",
    text: "Wouaf Wouaf ! 🐕 J'ai beaucoup de chance de pouvoir goûter aux restes des créations de mon chef ! Le Paris-Brest ? Même les miettes sont divines !",
    initial: "R",
  },
  {
    id: 4,
    name: "Jeason",
    role: "Développeur & gourmand",
    text: "Des recettes accessibles avec un rendu professionnel ! Florent a su me redonner confiance en cuisine. Ses conseils sont précis et toujours justes.",
    initial: "J",
  },
];

const brands = [
  { name: "Audi", icon: "https://cdn.simpleicons.org/audi/000000" },
  { name: "McDonald's", icon: "https://cdn.simpleicons.org/mcdonalds/FFC72C" },
  { name: "Uber Eats", icon: "https://cdn.simpleicons.org/ubereats/06C167" },
  { name: "Paramount+", icon: "https://cdn.simpleicons.org/paramountplus/0064FF" },
];

export default function TestDesignsPage() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div>
      {/* Header */}
      <div style={{ background: '#0a0a0a', padding: '60px 20px', textAlign: 'center' }}>
        <p style={{ color: '#D4AF37', fontSize: '11px', letterSpacing: '4px', marginBottom: '15px' }}>TENDANCES 2025</p>
        <h1 style={{ color: '#fff', fontSize: '36px', fontWeight: 300, marginBottom: '15px' }}>
          Designs About & Témoignages
        </h1>
        <p style={{ color: '#666', fontSize: '14px', maxWidth: '500px', margin: '0 auto' }}>
          Basé sur les dernières tendances : Bento grids, animations scroll, masonry, storytelling immersif
        </p>
      </div>

      {/* ============================================ */}
      {/* VERSION 1 - BENTO 2025 (Style Apple/Vercel) */}
      {/* ============================================ */}
      <div style={{ background: '#D4AF37', padding: '15px', textAlign: 'center' }}>
        <span style={{ color: '#000', fontSize: '13px', fontWeight: 600, letterSpacing: '2px' }}>VERSION 1 — BENTO 2025</span>
      </div>

      <section style={{ background: '#0a0a0a', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Bento Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: 'repeat(4, minmax(180px, auto))',
            gap: '16px'
          }}>
            {/* Hero About - Grande carte */}
            <div style={{
              gridColumn: 'span 8',
              gridRow: 'span 2',
              background: 'linear-gradient(145deg, #141414 0%, #1a1a1a 100%)',
              borderRadius: '32px',
              padding: '60px',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 60%)',
                pointerEvents: 'none'
              }}></div>
              <p style={{ color: '#D4AF37', fontSize: '12px', letterSpacing: '3px', marginBottom: '25px' }}>MON PARCOURS</p>
              <h2 style={{
                color: '#fff',
                fontSize: 'clamp(32px, 4vw, 56px)',
                fontWeight: 300,
                lineHeight: 1.1,
                marginBottom: '30px',
                maxWidth: '600px'
              }}>
                Transformer la passion en <span style={{
                  background: 'linear-gradient(90deg, #D4AF37, #C77A4E)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>art culinaire</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '17px', lineHeight: 1.8, maxWidth: '500px' }}>
                Du défi Audi face à Thierry Marx aux collaborations avec les plus grandes marques,
                ma mission reste la même : rendre la cuisine accessible à tous.
              </p>
            </div>

            {/* Stats */}
            <div style={{
              gridColumn: 'span 4',
              background: 'linear-gradient(145deg, #D4AF37 0%, #C77A4E 100%)',
              borderRadius: '32px',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <p style={{ fontSize: '72px', fontWeight: 700, color: '#000', lineHeight: 1 }}>140K+</p>
              <p style={{ fontSize: '14px', color: 'rgba(0,0,0,0.7)', letterSpacing: '1px', marginTop: '10px' }}>
                Abonnés Instagram
              </p>
            </div>

            <div style={{
              gridColumn: 'span 4',
              background: '#141414',
              borderRadius: '32px',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <p style={{ fontSize: '72px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>400K+</p>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px', marginTop: '10px' }}>
                Abonnés TikTok
              </p>
            </div>

            {/* Brands */}
            <div style={{
              gridColumn: 'span 4',
              gridRow: 'span 2',
              background: '#141414',
              borderRadius: '32px',
              padding: '40px',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <p style={{ color: '#D4AF37', fontSize: '11px', letterSpacing: '2px', marginBottom: '30px' }}>COLLABORATIONS</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {brands.map((brand, i) => (
                  <div key={i} style={{
                    padding: '15px 20px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '15px',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <img src={brand.icon} alt={brand.name} style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                    {brand.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials - 2 cards */}
            {testimonials.slice(0, 2).map((t) => (
              <div key={t.id} style={{
                gridColumn: 'span 4',
                background: '#141414',
                borderRadius: '32px',
                padding: '35px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}>
                <div>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#D4AF37" color="#D4AF37" />
                    ))}
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: 1.7 }}>
                    "{t.text}"
                  </p>
                </div>
                <div style={{ marginTop: '25px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #D4AF37, #C77A4E)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000',
                    fontWeight: 600
                  }}>
                    {t.initial}
                  </div>
                  <div>
                    <p style={{ color: '#fff', fontWeight: 500, fontSize: '14px' }}>{t.name}</p>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Large testimonial */}
            <div style={{
              gridColumn: 'span 8',
              background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(199,122,78,0.1) 100%)',
              borderRadius: '32px',
              padding: '50px',
              border: '1px solid rgba(212,175,55,0.2)'
            }}>
              <Quote size={40} style={{ color: '#D4AF37', opacity: 0.5, marginBottom: '20px' }} />
              <p style={{ color: '#fff', fontSize: '22px', lineHeight: 1.7, marginBottom: '30px', fontWeight: 300 }}>
                "{testimonials[2].text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #D4AF37, #C77A4E)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#000',
                  fontWeight: 600,
                  fontSize: '18px'
                }}>
                  {testimonials[2].initial}
                </div>
                <div>
                  <p style={{ color: '#fff', fontWeight: 500 }}>{testimonials[2].name}</p>
                  <p style={{ color: '#D4AF37', fontSize: '13px' }}>{testimonials[2].role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* VERSION 2 - BENTO MERCI (Structure demandée) */}
      {/* ============================================ */}
      <div style={{ background: '#D4AF37', padding: '15px', textAlign: 'center' }}>
        <span style={{ color: '#000', fontSize: '13px', fontWeight: 600, letterSpacing: '2px' }}>VERSION 2 — BENTO "MERCI"</span>
      </div>

      <section style={{ background: '#0a0a0a', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Section Merci - Full Width */}
          <div style={{
            background: 'linear-gradient(145deg, #141414 0%, #1a1a1a 100%)',
            borderRadius: '32px',
            padding: '60px',
            textAlign: 'center',
            marginBottom: '20px',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div style={{
              position: 'absolute',
              top: '-100px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '600px',
              height: '300px',
              background: 'radial-gradient(ellipse, rgba(212,175,55,0.15) 0%, transparent 60%)',
              pointerEvents: 'none'
            }}></div>
            <p style={{ color: '#D4AF37', fontSize: '11px', letterSpacing: '4px', marginBottom: '20px', position: 'relative' }}>
              UNE COMMUNAUTÉ INCROYABLE
            </p>
            <h2 style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 300,
              color: '#fff',
              marginBottom: '15px',
              position: 'relative'
            }}>
              Merci de votre confiance
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '16px',
              position: 'relative'
            }}>
              Plus de 500 000 passionnés de cuisine me suivent au quotidien
            </p>
          </div>

          {/* Grid: Stats + Collabs + À propos */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '20px',
            marginBottom: '20px'
          }}>
            {/* Stat Instagram */}
            <div style={{
              gridColumn: 'span 3',
              background: 'linear-gradient(145deg, #D4AF37 0%, #C77A4E 100%)',
              borderRadius: '28px',
              padding: '35px 30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
                alt="Instagram"
                style={{ width: '32px', height: '32px', marginBottom: '15px' }}
              />
              <p style={{ fontSize: '48px', fontWeight: 700, color: '#000', lineHeight: 1 }}>140K+</p>
              <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)', letterSpacing: '1px', marginTop: '8px' }}>
                Abonnés Instagram
              </p>
            </div>

            {/* Stat TikTok */}
            <div style={{
              gridColumn: 'span 3',
              background: '#141414',
              borderRadius: '28px',
              padding: '35px 30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png"
                alt="TikTok"
                style={{ width: '32px', height: '32px', marginBottom: '15px' }}
              />
              <p style={{ fontSize: '48px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>400K+</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', marginTop: '8px' }}>
                Abonnés TikTok
              </p>
            </div>

            {/* Collaborations */}
            <div style={{
              gridColumn: 'span 3',
              background: '#141414',
              borderRadius: '28px',
              padding: '30px',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <p style={{ color: '#D4AF37', fontSize: '10px', letterSpacing: '2px', marginBottom: '20px' }}>COLLABORATIONS</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {brands.map((brand, i) => (
                  <div key={i} style={{
                    padding: '10px 14px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '13px',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <img src={brand.icon} alt={brand.name} style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                    {brand.name}
                  </div>
                ))}
              </div>
            </div>

            {/* À propos - Sidebar */}
            <div style={{
              gridColumn: 'span 3',
              background: 'linear-gradient(145deg, rgba(212,175,55,0.1) 0%, rgba(199,122,78,0.05) 100%)',
              borderRadius: '28px',
              padding: '35px 30px',
              border: '1px solid rgba(212,175,55,0.15)'
            }}>
              <p style={{ color: '#D4AF37', fontSize: '10px', letterSpacing: '2px', marginBottom: '20px' }}>À PROPOS</p>
              <p style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '14px',
                lineHeight: 1.8,
                marginBottom: '20px'
              }}>
                Du défi Audi face à <strong style={{ color: '#D4AF37' }}>Thierry Marx</strong> aux collaborations avec les plus grandes marques.
              </p>
              <p style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '14px',
                lineHeight: 1.8
              }}>
                Ma mission : rendre la cuisine accessible à tous.
              </p>
            </div>
          </div>

          {/* Témoignages */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px'
          }}>
            {testimonials.map((t) => (
              <div key={t.id} style={{
                background: '#141414',
                borderRadius: '24px',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}>
                <div>
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '15px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="#D4AF37" color="#D4AF37" />
                    ))}
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', lineHeight: 1.7 }}>
                    "{t.text}"
                  </p>
                </div>
                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #D4AF37, #C77A4E)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000',
                    fontWeight: 600,
                    fontSize: '13px'
                  }}>
                    {t.initial}
                  </div>
                  <div>
                    <p style={{ color: '#fff', fontWeight: 500, fontSize: '13px' }}>{t.name}</p>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* VERSION 3 - BENTO ÉLÉGANT (Light mode) */}
      {/* ============================================ */}
      <div style={{ background: '#D4AF37', padding: '15px', textAlign: 'center' }}>
        <span style={{ color: '#000', fontSize: '13px', fontWeight: 600, letterSpacing: '2px' }}>VERSION 3 — BENTO ÉLÉGANT (LIGHT)</span>
      </div>

      <section style={{ background: '#FFFBF7', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Grid Principal - 2 colonnes */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px'
          }}>
            {/* Colonne gauche : Stats + Collabs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {/* Merci */}
              <div style={{
                background: '#1a1a1a',
                borderRadius: '24px',
                padding: '25px 30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <p style={{ fontSize: '15px', color: '#fff', fontWeight: 300 }}>Merci de votre confiance</p>
                <p style={{ fontSize: '28px', fontWeight: 700, color: '#D4AF37', lineHeight: 1 }}>+700K</p>
              </div>

              {/* Stats row */}
              <div style={{ display: 'flex', gap: '15px' }}>
                {/* TikTok */}
                <div style={{
                  flex: 1,
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '20px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" alt="TikTok" style={{ width: '32px', height: '32px' }} />
                  <div>
                    <p style={{ fontSize: '22px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1 }}>467K</p>
                    <p style={{ fontSize: '10px', color: '#999', marginTop: '3px' }}>TikTok</p>
                  </div>
                </div>

                {/* Instagram */}
                <div style={{
                  flex: 1,
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '20px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" style={{ width: '32px', height: '32px' }} />
                  <div>
                    <p style={{ fontSize: '22px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1 }}>130K</p>
                    <p style={{ fontSize: '10px', color: '#999', marginTop: '3px' }}>Instagram</p>
                  </div>
                </div>

                {/* YouTube */}
                <div style={{
                  flex: 1,
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '20px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <img src="https://cdn-icons-png.flaticon.com/512/174/174883.png" alt="YouTube" style={{ width: '32px', height: '32px' }} />
                  <div>
                    <p style={{ fontSize: '22px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1 }}>105K</p>
                    <p style={{ fontSize: '10px', color: '#999', marginTop: '3px' }}>YouTube</p>
                  </div>
                </div>
              </div>

              {/* Collaborations */}
              <div style={{
                background: '#fff',
                borderRadius: '28px',
                padding: '30px',
                boxShadow: '0 4px 30px rgba(0,0,0,0.04)',
                flex: 1
              }}>
                <p style={{ color: '#D4AF37', fontSize: '11px', letterSpacing: '2px', marginBottom: '20px', textAlign: 'center' }}>COLLABORATIONS</p>
                <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                  {brands.map((brand, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <div style={{
                        width: '55px',
                        height: '55px',
                        borderRadius: '16px',
                        background: '#f5f5f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '12px'
                      }}>
                        <img
                          src={brand.icon}
                          alt={brand.name}
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      </div>
                      <span style={{ fontSize: '11px', color: '#666', fontWeight: 500 }}>{brand.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Colonne droite : Témoignages - Fond clair */}
            <div style={{
              background: '#fff',
              borderRadius: '28px',
              padding: '35px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 30px rgba(0,0,0,0.04)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Glow effect subtil */}
              <div style={{
                position: 'absolute',
                top: '-30%',
                right: '-20%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 60%)',
                pointerEvents: 'none'
              }}></div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', position: 'relative' }}>
                <Quote size={32} style={{ color: '#D4AF37', opacity: 0.4 }} />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={prevSlide} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f5f5f5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronLeft size={16} color="#333" />
                  </button>
                  <button onClick={nextSlide} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#D4AF37', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronRight size={16} color="#000" />
                  </button>
                </div>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <p style={{ color: '#333', fontSize: '17px', lineHeight: 1.9, marginBottom: '30px', fontWeight: 300, fontStyle: 'italic' }}>
                  "{testimonials[activeSlide].text}"
                </p>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, #D4AF37, #C77A4E)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 700, fontSize: '18px' }}>
                    {testimonials[activeSlide].initial}
                  </div>
                  <div>
                    <p style={{ color: '#1a1a1a', fontWeight: 600, fontSize: '14px' }}>{testimonials[activeSlide].name}</p>
                    <p style={{ color: '#999', fontSize: '12px' }}>{testimonials[activeSlide].role}</p>
                  </div>
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: '3px' }}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#D4AF37" color="#D4AF37" />)}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px', marginTop: '25px', justifyContent: 'center' }}>
                {testimonials.map((_, index) => (
                  <button key={index} onClick={() => setActiveSlide(index)} style={{ width: activeSlide === index ? '20px' : '8px', height: '6px', borderRadius: '3px', background: activeSlide === index ? '#D4AF37' : '#ddd', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />
                ))}
              </div>
            </div>
          </div>

          {/* À propos - En bas */}
          <div style={{
            marginTop: '20px',
            background: 'linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 100%)',
            borderRadius: '32px',
            padding: '45px',
            color: '#fff'
          }}>
            <p style={{ color: '#D4AF37', fontSize: '11px', letterSpacing: '3px', marginBottom: '20px' }}>À PROPOS</p>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.9, maxWidth: '800px' }}>
              J'ai eu la chance d'être sollicité par <strong style={{ color: '#D4AF37' }}>Audi</strong> pour participer à un défi culinaire destiné à des sportifs de haut niveau. Une expérience enrichissante face à un jury d'exception : <strong style={{ color: '#fff' }}>Thierry Marx</strong> et <strong style={{ color: '#fff' }}>Jessica Préalpato</strong>. Challenge que j'ai eu l'honneur de remporter.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.9, maxWidth: '800px', marginTop: '15px' }}>
              Aujourd'hui, je continue de partager ma passion avec vous, en rendant la cuisine accessible à tous.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* VERSION 4 - BENTO ASYMÉTRIQUE */}
      {/* ============================================ */}
      <div style={{ background: '#D4AF37', padding: '15px', textAlign: 'center' }}>
        <span style={{ color: '#000', fontSize: '13px', fontWeight: 600, letterSpacing: '2px' }}>VERSION 4 — BENTO ASYMÉTRIQUE</span>
      </div>

      <section style={{ background: '#0f0f0f', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridAutoRows: 'minmax(100px, auto)',
            gap: '16px'
          }}>
            {/* Merci Hero */}
            <div style={{
              gridColumn: 'span 7',
              gridRow: 'span 2',
              background: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(199,122,78,0.08) 100%)',
              borderRadius: '32px',
              padding: '50px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              border: '1px solid rgba(212,175,55,0.2)'
            }}>
              <p style={{ color: '#D4AF37', fontSize: '12px', letterSpacing: '4px', marginBottom: '25px' }}>
                MERCI DE VOTRE CONFIANCE
              </p>
              <h2 style={{
                fontSize: 'clamp(40px, 5vw, 72px)',
                fontWeight: 200,
                color: '#fff',
                lineHeight: 1.1,
                marginBottom: '25px'
              }}>
                540K+
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px' }}>
                passionnés de cuisine me suivent chaque jour
              </p>
            </div>

            {/* À propos petit */}
            <div style={{
              gridColumn: 'span 5',
              background: '#171717',
              borderRadius: '28px',
              padding: '35px',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <p style={{ color: '#D4AF37', fontSize: '10px', letterSpacing: '2px', marginBottom: '20px' }}>À PROPOS</p>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.8 }}>
                Défi <strong style={{ color: '#D4AF37' }}>Audi</strong> face à Thierry Marx.
                Ma mission : rendre la cuisine accessible.
              </p>
            </div>

            {/* Stat Instagram */}
            <div style={{
              gridColumn: 'span 2',
              background: 'linear-gradient(145deg, #D4AF37 0%, #C77A4E 100%)',
              borderRadius: '24px',
              padding: '25px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
                alt="Instagram"
                style={{ width: '28px', height: '28px', marginBottom: '12px' }}
              />
              <p style={{ fontSize: '28px', fontWeight: 700, color: '#000' }}>140K</p>
            </div>

            {/* Stat TikTok */}
            <div style={{
              gridColumn: 'span 3',
              background: '#171717',
              borderRadius: '24px',
              padding: '25px',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png"
                alt="TikTok"
                style={{ width: '32px', height: '32px' }}
              />
              <div>
                <p style={{ fontSize: '28px', fontWeight: 700, color: '#fff' }}>400K</p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>TikTok</p>
              </div>
            </div>

            {/* Collabs compact */}
            <div style={{
              gridColumn: 'span 5',
              background: '#171717',
              borderRadius: '24px',
              padding: '25px 30px',
              border: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <p style={{ color: '#D4AF37', fontSize: '10px', letterSpacing: '1px', flexShrink: 0 }}>COLLABS</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {brands.map((brand, i) => (
                  <div key={i} style={{
                    padding: '8px 14px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <img src={brand.icon} alt={brand.name} style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
                    {brand.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Témoignages - 2 grandes */}
            {testimonials.slice(0, 2).map((t, index) => (
              <div key={t.id} style={{
                gridColumn: index === 0 ? 'span 7' : 'span 5',
                background: '#171717',
                borderRadius: '28px',
                padding: '35px',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '18px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#D4AF37" color="#D4AF37" />
                  ))}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.7, marginBottom: '25px' }}>
                  "{t.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #D4AF37, #C77A4E)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000',
                    fontWeight: 600
                  }}>
                    {t.initial}
                  </div>
                  <div>
                    <p style={{ color: '#fff', fontWeight: 500, fontSize: '14px' }}>{t.name}</p>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* 2 autres témoignages */}
            {testimonials.slice(2).map((t) => (
              <div key={t.id} style={{
                gridColumn: 'span 6',
                background: '#171717',
                borderRadius: '24px',
                padding: '30px',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '15px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="#D4AF37" color="#D4AF37" />
                  ))}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', lineHeight: 1.7, marginBottom: '20px' }}>
                  "{t.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #D4AF37, #C77A4E)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000',
                    fontWeight: 600,
                    fontSize: '13px'
                  }}>
                    {t.initial}
                  </div>
                  <div>
                    <p style={{ color: '#fff', fontWeight: 500, fontSize: '13px' }}>{t.name}</p>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* VERSION 5 - STORYTELLING IMMERSIF */}
      {/* ============================================ */}
      <div style={{ background: '#D4AF37', padding: '15px', textAlign: 'center' }}>
        <span style={{ color: '#000', fontSize: '13px', fontWeight: 600, letterSpacing: '2px' }}>VERSION 5 — STORYTELLING IMMERSIF</span>
      </div>

      <section style={{
        background: '#FFFBF7',
        padding: '120px 20px'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* About - Editorial style */}
          <div style={{ marginBottom: '150px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '60px' }}>
              <div style={{ width: '80px', height: '1px', background: '#D4AF37' }}></div>
              <p style={{ color: '#D4AF37', fontSize: '12px', letterSpacing: '4px', fontWeight: 500 }}>L'HISTOIRE</p>
            </div>

            <h2 style={{
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: 300,
              color: '#1a1a1a',
              lineHeight: 1.1,
              marginBottom: '60px',
              fontFamily: 'serif'
            }}>
              De la passion<br />
              à la <em style={{ fontStyle: 'italic' }}>transmission</em>
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '80px'
            }}>
              <div>
                <p style={{
                  fontSize: '20px',
                  lineHeight: 1.9,
                  color: '#333',
                  fontWeight: 300,
                  marginBottom: '30px'
                }}>
                  J'ai eu l'honneur de participer à un défi culinaire organisé par <strong style={{ color: '#D4AF37' }}>Audi</strong>,
                  face à <strong>Thierry Marx</strong> et <strong>Jessica Préalpato</strong>, élue meilleure pâtissière du monde.
                </p>
              </div>
              <div>
                <p style={{
                  fontSize: '20px',
                  lineHeight: 1.9,
                  color: '#333',
                  fontWeight: 300
                }}>
                  Mes collaborations avec <strong style={{ color: '#D4AF37' }}>McDonald's</strong>, <strong style={{ color: '#D4AF37' }}>Uber Eats</strong> et <strong style={{ color: '#D4AF37' }}>Paramount</strong> témoignent
                  d'une mission : rendre la cuisine accessible et transmettre ma passion.
                </p>
              </div>
            </div>
          </div>

          {/* Testimonials - Masonry Style */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '60px' }}>
              <div style={{ width: '80px', height: '1px', background: '#D4AF37' }}></div>
              <p style={{ color: '#D4AF37', fontSize: '12px', letterSpacing: '4px', fontWeight: 500 }}>TÉMOIGNAGES</p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '30px'
            }}>
              {testimonials.map((t, index) => (
                <div key={t.id} style={{
                  background: '#fff',
                  borderRadius: '24px',
                  padding: '45px',
                  boxShadow: '0 4px 40px rgba(0,0,0,0.06)',
                  transform: index % 2 === 1 ? 'translateY(40px)' : 'none'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #D4AF37, #C77A4E)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '18px',
                    marginBottom: '25px'
                  }}>
                    {t.initial}
                  </div>
                  <p style={{
                    fontSize: '17px',
                    lineHeight: 1.8,
                    color: '#333',
                    marginBottom: '30px',
                    fontWeight: 300
                  }}>
                    "{t.text}"
                  </p>
                  <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
                    <p style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px' }}>{t.name}</p>
                    <p style={{ color: '#999', fontSize: '13px' }}>{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div style={{ background: '#0a0a0a', padding: '80px 20px', textAlign: 'center' }}>
        <p style={{ color: '#D4AF37', fontSize: '16px', marginBottom: '15px', fontWeight: 500 }}>
          Quelle version préfères-tu ?
        </p>
        <p style={{ color: '#666', fontSize: '13px', maxWidth: '700px', margin: '0 auto', lineHeight: 2 }}>
          <strong style={{ color: '#999' }}>V1</strong> Bento Original ·
          <strong style={{ color: '#999' }}> V2</strong> Bento "Merci" ·
          <strong style={{ color: '#999' }}> V3</strong> Bento Élégant (Light) ·
          <strong style={{ color: '#999' }}> V4</strong> Bento Asymétrique ·
          <strong style={{ color: '#999' }}> V5</strong> Storytelling
        </p>
      </div>
    </div>
  );
}
