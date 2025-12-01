"use client";

import Image from "next/image";

const heroImages = [
  { id: 5, src: "/noel5.avif", name: "Noël 5" },
  { id: 6, src: "/noel6.jpg", name: "Noël 6" },
  { id: 7, src: "/noel7.jpg", name: "Noël 7" },
  { id: 8, src: "/noel8.jpg", name: "Noël 8" },
];

export default function TestHeroPage() {
  return (
    <div style={{ background: '#1a1a1a', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#fff', fontSize: '24px' }}>
        Test - Images Hero
      </h1>
      <p style={{ textAlign: 'center', color: '#999', marginBottom: '40px' }}>
        Choisis l image que tu préfères pour la section Hero
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', maxWidth: '1200px', margin: '0 auto' }}>
        {heroImages.map((img) => (
          <div key={img.id} style={{ marginBottom: '20px' }}>
            <h2 style={{
              padding: '15px 20px',
              background: '#D4AF37',
              color: '#000',
              fontSize: '18px',
              fontWeight: 600,
              borderRadius: '12px 12px 0 0',
              marginBottom: 0
            }}>
              {img.name}
            </h2>

            {/* Simulation Hero Section */}
            <div style={{
              position: 'relative',
              height: '500px',
              borderRadius: '0 0 12px 12px',
              overflow: 'hidden'
            }}>
              <Image
                src={img.src}
                alt={img.name}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.3)'
              }} />

              {/* Card simulation */}
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '90%',
                maxWidth: '620px',
                background: 'rgba(107, 93, 82, 0.5)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '20px 24px',
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div style={{
                  display: 'inline-flex',
                  background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                  padding: '6px 16px',
                  borderRadius: '50px',
                  marginBottom: '10px'
                }}>
                  <span style={{ color: '#000', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em' }}>
                    100% GRATUIT
                  </span>
                </div>
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: 600,
                  color: '#fff',
                  fontFamily: 'Georgia, serif',
                  marginBottom: '8px'
                }}>
                  Envie de nouvelles idées recettes ?
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '15px' }}>
                  Rejoins les <span style={{ color: '#D4AF37', fontWeight: 600 }}>130K+ gourmands</span> et reçois <strong>5 recettes exclusives</strong> chaque semaine.
                </p>
                <div style={{
                  display: 'flex',
                  background: 'rgba(0,0,0,0.35)',
                  borderRadius: '50px',
                  padding: '4px',
                  border: '1px solid rgba(212, 175, 55, 0.3)'
                }}>
                  <input
                    type="email"
                    placeholder="Ton adresse email"
                    disabled
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      color: '#fff',
                      padding: '10px 18px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                  <button style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                    color: '#fff',
                    padding: '10px 22px',
                    borderRadius: '50px',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '12px',
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase'
                  }}>
                    Je m inscris
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
