"use client";

import Image from "next/image";

export default function TestHeroPage() {
  return (
    <div>
      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(212, 175, 55, 0.5), 0 0 10px rgba(212, 175, 55, 0.3); }
          50% { box-shadow: 0 0 15px rgba(212, 175, 55, 0.8), 0 0 30px rgba(212, 175, 55, 0.5), 0 0 45px rgba(212, 175, 55, 0.3); }
        }

        @keyframes border-rotate {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes neon-flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            text-shadow: 0 0 5px #D4AF37, 0 0 10px #D4AF37, 0 0 20px #D4AF37, 0 0 40px #B8860B;
          }
          20%, 24%, 55% {
            text-shadow: none;
          }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>

      {/* Navigation */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: '#000',
        padding: '12px 20px',
        display: 'flex',
        gap: '10px',
        overflowX: 'auto',
        borderBottom: '2px solid #D4AF37',
        flexWrap: 'wrap'
      }}>
        <span style={{ color: '#D4AF37', fontWeight: 600, marginRight: '10px', whiteSpace: 'nowrap' }}>BADGES MODERNES 2025 :</span>
        {['1', '2', '3', '4', '5', '6', '7', '8'].map(n => (
          <a
            key={n}
            href={`#badge${n}`}
            style={{
              background: 'linear-gradient(to right, #D4AF37, #C77A4E)',
              color: '#000',
              padding: '6px 14px',
              borderRadius: '20px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '13px',
              whiteSpace: 'nowrap'
            }}
          >
            {n}
          </a>
        ))}
      </div>

      {/* BADGE 1 - Shine Effect (Brillance qui traverse) */}
      <section id="badge1" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=75" alt="Cuisine" fill style={{ objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
        </div>

        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, width: '90%', maxWidth: '620px' }}>
          <div style={{ background: 'rgba(107, 93, 82, 0.5)', backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '36px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>

            {/* BADGE - Shine Effect */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
              borderRadius: '50px',
              padding: '10px 24px',
              marginBottom: '20px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)'
            }}>
              {/* Shine overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                animation: 'shine 2s infinite'
              }} />
              <span style={{ color: '#000', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>
                100% Gratuit
              </span>
            </div>

            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#fff', marginBottom: '12px', fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
              Envie de nouvelles idées recettes ?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', marginBottom: '24px' }}>
              Rejoins les <span style={{ color: '#D4AF37', fontWeight: 600 }}>130K+ gourmands</span> et reçois <strong>5 recettes exclusives</strong> chaque semaine.
            </p>
            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.35)', borderRadius: '50px', padding: '5px', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
              <input type="email" placeholder="Ton adresse email" style={{ flex: 1, padding: '12px 24px', background: 'transparent', border: 'none', color: '#fff', fontSize: '15px', outline: 'none' }} />
              <button style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)', border: 'none', borderRadius: '50px', color: '#fff', fontWeight: 600, fontSize: '14px', cursor: 'pointer', textTransform: 'uppercase' }}>Je m'inscris</button>
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', top: '80px', left: '20px', zIndex: 10, background: 'rgba(0,0,0,0.7)', padding: '10px 16px', borderRadius: '8px' }}>
          <span style={{ color: '#D4AF37', fontWeight: 700 }}>BADGE 1</span>
          <span style={{ color: '#fff', marginLeft: '8px' }}>Shine Effect (brillance animée)</span>
        </div>
      </section>

      {/* BADGE 2 - Pulse Glow (Lueur pulsante) */}
      <section id="badge2" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=75" alt="Cuisine" fill style={{ objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
        </div>

        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, width: '90%', maxWidth: '620px' }}>
          <div style={{ background: 'rgba(107, 93, 82, 0.5)', backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '36px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>

            {/* BADGE - Pulse Glow */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.1) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.6)',
              borderRadius: '50px',
              padding: '10px 24px',
              marginBottom: '20px',
              animation: 'pulse-glow 2s ease-in-out infinite'
            }}>
              <span style={{ color: '#D4AF37', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                100% Gratuit
              </span>
            </div>

            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#fff', marginBottom: '12px', fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
              Envie de nouvelles idées recettes ?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', marginBottom: '24px' }}>
              Rejoins les <span style={{ color: '#D4AF37', fontWeight: 600 }}>130K+ gourmands</span> et reçois <strong>5 recettes exclusives</strong> chaque semaine.
            </p>
            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.35)', borderRadius: '50px', padding: '5px', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
              <input type="email" placeholder="Ton adresse email" style={{ flex: 1, padding: '12px 24px', background: 'transparent', border: 'none', color: '#fff', fontSize: '15px', outline: 'none' }} />
              <button style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)', border: 'none', borderRadius: '50px', color: '#fff', fontWeight: 600, fontSize: '14px', cursor: 'pointer', textTransform: 'uppercase' }}>Je m'inscris</button>
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', top: '80px', left: '20px', zIndex: 10, background: 'rgba(0,0,0,0.7)', padding: '10px 16px', borderRadius: '8px' }}>
          <span style={{ color: '#D4AF37', fontWeight: 700 }}>BADGE 2</span>
          <span style={{ color: '#fff', marginLeft: '8px' }}>Pulse Glow (lueur pulsante)</span>
        </div>
      </section>

      {/* BADGE 3 - Glassmorphism Premium */}
      <section id="badge3" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=75" alt="Cuisine" fill style={{ objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
        </div>

        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, width: '90%', maxWidth: '620px' }}>
          <div style={{ background: 'rgba(107, 93, 82, 0.5)', backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '36px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>

            {/* BADGE - Glassmorphism */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50px',
              padding: '10px 24px',
              marginBottom: '20px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
            }}>
              <span style={{ color: '#D4AF37', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textShadow: '0 0 10px rgba(212, 175, 55, 0.5)' }}>
                ✦ 100% Gratuit ✦
              </span>
            </div>

            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#fff', marginBottom: '12px', fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
              Envie de nouvelles idées recettes ?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', marginBottom: '24px' }}>
              Rejoins les <span style={{ color: '#D4AF37', fontWeight: 600 }}>130K+ gourmands</span> et reçois <strong>5 recettes exclusives</strong> chaque semaine.
            </p>
            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.35)', borderRadius: '50px', padding: '5px', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
              <input type="email" placeholder="Ton adresse email" style={{ flex: 1, padding: '12px 24px', background: 'transparent', border: 'none', color: '#fff', fontSize: '15px', outline: 'none' }} />
              <button style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)', border: 'none', borderRadius: '50px', color: '#fff', fontWeight: 600, fontSize: '14px', cursor: 'pointer', textTransform: 'uppercase' }}>Je m'inscris</button>
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', top: '80px', left: '20px', zIndex: 10, background: 'rgba(0,0,0,0.7)', padding: '10px 16px', borderRadius: '8px' }}>
          <span style={{ color: '#D4AF37', fontWeight: 700 }}>BADGE 3</span>
          <span style={{ color: '#fff', marginLeft: '8px' }}>Glassmorphism (verre dépoli)</span>
        </div>
      </section>

      {/* BADGE 4 - Animated Border Gradient */}
      <section id="badge4" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=75" alt="Cuisine" fill style={{ objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
        </div>

        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, width: '90%', maxWidth: '620px' }}>
          <div style={{ background: 'rgba(107, 93, 82, 0.5)', backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '36px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>

            {/* BADGE - Animated Border */}
            <div style={{
              display: 'inline-block',
              padding: '2px',
              borderRadius: '50px',
              marginBottom: '20px',
              background: 'linear-gradient(90deg, #D4AF37, #F4D03F, #B8860B, #D4AF37, #F4D03F)',
              backgroundSize: '300% 100%',
              animation: 'gradient-shift 3s ease infinite'
            }}>
              <div style={{
                background: 'rgba(0, 0, 0, 0.8)',
                borderRadius: '50px',
                padding: '8px 22px'
              }}>
                <span style={{ color: '#D4AF37', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  100% Gratuit
                </span>
              </div>
            </div>

            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#fff', marginBottom: '12px', fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
              Envie de nouvelles idées recettes ?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', marginBottom: '24px' }}>
              Rejoins les <span style={{ color: '#D4AF37', fontWeight: 600 }}>130K+ gourmands</span> et reçois <strong>5 recettes exclusives</strong> chaque semaine.
            </p>
            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.35)', borderRadius: '50px', padding: '5px', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
              <input type="email" placeholder="Ton adresse email" style={{ flex: 1, padding: '12px 24px', background: 'transparent', border: 'none', color: '#fff', fontSize: '15px', outline: 'none' }} />
              <button style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)', border: 'none', borderRadius: '50px', color: '#fff', fontWeight: 600, fontSize: '14px', cursor: 'pointer', textTransform: 'uppercase' }}>Je m'inscris</button>
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', top: '80px', left: '20px', zIndex: 10, background: 'rgba(0,0,0,0.7)', padding: '10px 16px', borderRadius: '8px' }}>
          <span style={{ color: '#D4AF37', fontWeight: 700 }}>BADGE 4</span>
          <span style={{ color: '#fff', marginLeft: '8px' }}>Bordure gradient animée</span>
        </div>
      </section>

      {/* BADGE 5 - Floating avec sparkles */}
      <section id="badge5" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=75" alt="Cuisine" fill style={{ objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
        </div>

        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, width: '90%', maxWidth: '620px' }}>
          <div style={{ background: 'rgba(107, 93, 82, 0.5)', backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '36px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>

            {/* BADGE - Floating avec étoiles animées */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px',
              animation: 'float 3s ease-in-out infinite'
            }}>
              <span style={{ color: '#D4AF37', fontSize: '14px', animation: 'sparkle 1.5s ease-in-out infinite' }}>✦</span>
              <div style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                borderRadius: '50px',
                padding: '8px 20px',
                boxShadow: '0 4px 20px rgba(212, 175, 55, 0.4)'
              }}>
                <span style={{ color: '#000', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  100% Gratuit
                </span>
              </div>
              <span style={{ color: '#D4AF37', fontSize: '14px', animation: 'sparkle 1.5s ease-in-out infinite 0.5s' }}>✦</span>
            </div>

            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#fff', marginBottom: '12px', fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
              Envie de nouvelles idées recettes ?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', marginBottom: '24px' }}>
              Rejoins les <span style={{ color: '#D4AF37', fontWeight: 600 }}>130K+ gourmands</span> et reçois <strong>5 recettes exclusives</strong> chaque semaine.
            </p>
            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.35)', borderRadius: '50px', padding: '5px', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
              <input type="email" placeholder="Ton adresse email" style={{ flex: 1, padding: '12px 24px', background: 'transparent', border: 'none', color: '#fff', fontSize: '15px', outline: 'none' }} />
              <button style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)', border: 'none', borderRadius: '50px', color: '#fff', fontWeight: 600, fontSize: '14px', cursor: 'pointer', textTransform: 'uppercase' }}>Je m'inscris</button>
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', top: '80px', left: '20px', zIndex: 10, background: 'rgba(0,0,0,0.7)', padding: '10px 16px', borderRadius: '8px' }}>
          <span style={{ color: '#D4AF37', fontWeight: 700 }}>BADGE 5</span>
          <span style={{ color: '#fff', marginLeft: '8px' }}>Floating + Sparkles animés</span>
        </div>
      </section>

      {/* BADGE 6 - Shimmer Text (texte brillant) */}
      <section id="badge6" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=75" alt="Cuisine" fill style={{ objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
        </div>

        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, width: '90%', maxWidth: '620px' }}>
          <div style={{ background: 'rgba(107, 93, 82, 0.5)', backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '36px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>

            {/* BADGE - Shimmer Text */}
            <div style={{ marginBottom: '20px' }}>
              <span style={{
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                background: 'linear-gradient(90deg, #D4AF37 0%, #F4D03F 25%, #D4AF37 50%, #F4D03F 75%, #D4AF37 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shimmer 3s linear infinite'
              }}>
                ✦ 100% GRATUIT ✦
              </span>
            </div>

            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#fff', marginBottom: '12px', fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
              Envie de nouvelles idées recettes ?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', marginBottom: '24px' }}>
              Rejoins les <span style={{ color: '#D4AF37', fontWeight: 600 }}>130K+ gourmands</span> et reçois <strong>5 recettes exclusives</strong> chaque semaine.
            </p>
            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.35)', borderRadius: '50px', padding: '5px', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
              <input type="email" placeholder="Ton adresse email" style={{ flex: 1, padding: '12px 24px', background: 'transparent', border: 'none', color: '#fff', fontSize: '15px', outline: 'none' }} />
              <button style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)', border: 'none', borderRadius: '50px', color: '#fff', fontWeight: 600, fontSize: '14px', cursor: 'pointer', textTransform: 'uppercase' }}>Je m'inscris</button>
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', top: '80px', left: '20px', zIndex: 10, background: 'rgba(0,0,0,0.7)', padding: '10px 16px', borderRadius: '8px' }}>
          <span style={{ color: '#D4AF37', fontWeight: 700 }}>BADGE 6</span>
          <span style={{ color: '#fff', marginLeft: '8px' }}>Shimmer Text (texte brillant)</span>
        </div>
      </section>

      {/* BADGE 7 - Neon Glow */}
      <section id="badge7" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=75" alt="Cuisine" fill style={{ objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
        </div>

        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, width: '90%', maxWidth: '620px' }}>
          <div style={{ background: 'rgba(107, 93, 82, 0.5)', backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '36px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>

            {/* BADGE - Neon Glow */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'transparent',
              border: '2px solid #D4AF37',
              borderRadius: '50px',
              padding: '10px 24px',
              marginBottom: '20px',
              boxShadow: '0 0 5px #D4AF37, 0 0 10px #D4AF37, 0 0 20px rgba(212, 175, 55, 0.5), inset 0 0 10px rgba(212, 175, 55, 0.1)'
            }}>
              <span style={{
                color: '#D4AF37',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textShadow: '0 0 5px #D4AF37, 0 0 10px #D4AF37'
              }}>
                100% Gratuit
              </span>
            </div>

            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#fff', marginBottom: '12px', fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
              Envie de nouvelles idées recettes ?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', marginBottom: '24px' }}>
              Rejoins les <span style={{ color: '#D4AF37', fontWeight: 600 }}>130K+ gourmands</span> et reçois <strong>5 recettes exclusives</strong> chaque semaine.
            </p>
            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.35)', borderRadius: '50px', padding: '5px', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
              <input type="email" placeholder="Ton adresse email" style={{ flex: 1, padding: '12px 24px', background: 'transparent', border: 'none', color: '#fff', fontSize: '15px', outline: 'none' }} />
              <button style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)', border: 'none', borderRadius: '50px', color: '#fff', fontWeight: 600, fontSize: '14px', cursor: 'pointer', textTransform: 'uppercase' }}>Je m'inscris</button>
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', top: '80px', left: '20px', zIndex: 10, background: 'rgba(0,0,0,0.7)', padding: '10px 16px', borderRadius: '8px' }}>
          <span style={{ color: '#D4AF37', fontWeight: 700 }}>BADGE 7</span>
          <span style={{ color: '#fff', marginLeft: '8px' }}>Neon Glow (effet néon)</span>
        </div>
      </section>

      {/* BADGE 8 - Combo: Glassmorphism + Shine + Glow */}
      <section id="badge8" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=75" alt="Cuisine" fill style={{ objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
        </div>

        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, width: '90%', maxWidth: '620px' }}>
          <div style={{ background: 'rgba(107, 93, 82, 0.5)', backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '36px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>

            {/* BADGE - COMBO Ultimate */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(184, 134, 11, 0.2) 100%)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(212, 175, 55, 0.5)',
              borderRadius: '50px',
              padding: '10px 24px',
              marginBottom: '20px',
              position: 'relative',
              overflow: 'hidden',
              animation: 'pulse-glow 3s ease-in-out infinite',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)'
            }}>
              {/* Shine overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                animation: 'shine 3s infinite'
              }} />
              <span style={{
                color: '#D4AF37',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                position: 'relative',
                zIndex: 1,
                textShadow: '0 0 10px rgba(212, 175, 55, 0.5)'
              }}>
                ✦ 100% Gratuit ✦
              </span>
            </div>

            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#fff', marginBottom: '12px', fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
              Envie de nouvelles idées recettes ?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', marginBottom: '24px' }}>
              Rejoins les <span style={{ color: '#D4AF37', fontWeight: 600 }}>130K+ gourmands</span> et reçois <strong>5 recettes exclusives</strong> chaque semaine.
            </p>
            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.35)', borderRadius: '50px', padding: '5px', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
              <input type="email" placeholder="Ton adresse email" style={{ flex: 1, padding: '12px 24px', background: 'transparent', border: 'none', color: '#fff', fontSize: '15px', outline: 'none' }} />
              <button style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)', border: 'none', borderRadius: '50px', color: '#fff', fontWeight: 600, fontSize: '14px', cursor: 'pointer', textTransform: 'uppercase' }}>Je m'inscris</button>
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', top: '80px', left: '20px', zIndex: 10, background: 'rgba(0,0,0,0.7)', padding: '10px 16px', borderRadius: '8px' }}>
          <span style={{ color: '#D4AF37', fontWeight: 700 }}>BADGE 8</span>
          <span style={{ color: '#fff', marginLeft: '8px' }}>COMBO (Glass + Shine + Glow)</span>
        </div>
      </section>
    </div>
  );
}
