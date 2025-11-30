"use client";

import { useState } from "react";
import Image from "next/image";

export default function TestHeroPage() {
  const [email, setEmail] = useState("");

  return (
    <div>
      {/* Navigation entre les options */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: '#000',
        padding: '12px 20px',
        display: 'flex',
        gap: '12px',
        overflowX: 'auto',
        borderBottom: '2px solid #D4AF37'
      }}>
        <span style={{ color: '#fff', fontWeight: 600, marginRight: '20px', whiteSpace: 'nowrap' }}>Options :</span>
        {[1, 2, 3, 4, 5, 6, 7].map(n => (
          <a
            key={n}
            href={`#option${n}`}
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '20px',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '14px',
              whiteSpace: 'nowrap'
            }}
          >
            {n}
          </a>
        ))}
        <span style={{ color: '#D4AF37', fontWeight: 600, marginLeft: '12px', marginRight: '8px' }}>|</span>
        <span style={{ color: '#D4AF37', fontWeight: 600, marginRight: '12px', whiteSpace: 'nowrap' }}>MIX B :</span>
        {['B1', 'B2', 'B3', 'B4', 'B5'].map(n => (
          <a
            key={n}
            href={`#mix${n.toLowerCase()}`}
            style={{
              background: 'linear-gradient(to right, #D4AF37, #C77A4E)',
              color: '#000',
              padding: '8px 16px',
              borderRadius: '20px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '14px',
              whiteSpace: 'nowrap'
            }}
          >
            {n}
          </a>
        ))}
      </div>

      {/* OPTION 1 - Ultra minimaliste */}
      <section id="option1" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=75"
            alt="Cuisine"
            fill
            style={{ objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
        </div>

        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          width: '90%',
          maxWidth: '500px'
        }}>
          <div style={{
            background: 'rgba(107, 93, 82, 0.5)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '32px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '32px' }}>📧</span>
              <p style={{ color: '#fff', fontSize: '18px', fontWeight: 500, marginTop: '12px' }}>
                Rejoins <span style={{ color: '#D4AF37', fontWeight: 700 }}>10 000+</span> gourmands
              </p>
            </div>

            <input
              type="email"
              placeholder="Ton email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 18px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '16px',
                marginBottom: '12px'
              }}
            />

            <button style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(to right, #D4AF37, #C77A4E)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontWeight: 600,
              fontSize: '16px',
              cursor: 'pointer'
            }}>
              S'inscrire gratuitement
            </button>

            <p style={{
              textAlign: 'center',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '12px',
              marginTop: '16px'
            }}>
              ✓ 5 recettes/semaine · ✓ 100% gratuit · ✓ Désinscription 1 clic
            </p>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          top: '80px',
          left: '20px',
          zIndex: 10,
          background: 'rgba(0,0,0,0.5)',
          padding: '8px 16px',
          borderRadius: '8px'
        }}>
          <span style={{ color: '#D4AF37', fontWeight: 700 }}>OPTION 1</span>
          <span style={{ color: '#fff', marginLeft: '8px' }}>Ultra minimaliste</span>
        </div>
      </section>

      {/* OPTION 2 - Focus chiffres */}
      <section id="option2" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=75"
            alt="Cuisine"
            fill
            style={{ objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
        </div>

        <div style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }}>
          {/* Stats */}
          <div style={{
            display: 'flex',
            gap: '40px',
            marginBottom: '48px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', fontWeight: 700, color: '#D4AF37' }}>10K+</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>abonnés</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', fontWeight: 700, color: '#D4AF37' }}>200+</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>recettes</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', fontWeight: 700, color: '#D4AF37' }}>5</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>recettes/semaine</div>
            </div>
          </div>

          {/* Form */}
          <div style={{
            background: 'rgba(107, 93, 82, 0.5)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '32px',
            width: '90%',
            maxWidth: '450px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <input
              type="email"
              placeholder="Ton email"
              style={{
                width: '100%',
                padding: '14px 18px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '16px',
                marginBottom: '12px'
              }}
            />
            <button style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(to right, #D4AF37, #C77A4E)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontWeight: 600,
              fontSize: '16px',
              cursor: 'pointer'
            }}>
              Recevoir mes recettes gratuites
            </button>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          top: '80px',
          left: '20px',
          zIndex: 10,
          background: 'rgba(0,0,0,0.5)',
          padding: '8px 16px',
          borderRadius: '8px'
        }}>
          <span style={{ color: '#D4AF37', fontWeight: 700 }}>OPTION 2</span>
          <span style={{ color: '#fff', marginLeft: '8px' }}>Focus chiffres</span>
        </div>
      </section>

      {/* OPTION 3 - Accroche émotionnelle */}
      <section id="option3" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=75"
            alt="Cuisine"
            fill
            style={{ objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
        </div>

        <div style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: 'clamp(32px, 6vw, 56px)',
            fontWeight: 300,
            color: '#fff',
            marginBottom: '16px',
            lineHeight: 1.2,
            fontFamily: 'var(--font-cormorant), Georgia, serif'
          }}>
            Cuisine comme un chef,<br />
            <span style={{ fontWeight: 600 }}>sans prise de tête.</span>
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '18px',
            marginBottom: '40px',
            maxWidth: '500px'
          }}>
            Chaque semaine, reçois 5 recettes gourmandes<br />
            testées et approuvées par <span style={{ color: '#D4AF37', fontWeight: 600 }}>+10 000 passionnés</span>.
          </p>

          <div style={{
            display: 'flex',
            gap: '12px',
            width: '100%',
            maxWidth: '500px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <input
              type="email"
              placeholder="Ton email"
              style={{
                flex: 1,
                minWidth: '200px',
                padding: '16px 20px',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '16px'
              }}
            />
            <button style={{
              padding: '16px 32px',
              background: 'linear-gradient(to right, #D4AF37, #C77A4E)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontWeight: 600,
              fontSize: '16px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}>
              Je veux mes recettes
            </button>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          top: '80px',
          left: '20px',
          zIndex: 10,
          background: 'rgba(0,0,0,0.5)',
          padding: '8px 16px',
          borderRadius: '8px'
        }}>
          <span style={{ color: '#D4AF37', fontWeight: 700 }}>OPTION 3</span>
          <span style={{ color: '#fff', marginLeft: '8px' }}>Accroche émotionnelle</span>
        </div>
      </section>

      {/* OPTION 4 - FOMO */}
      <section id="option4" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=75"
            alt="Cuisine"
            fill
            style={{ objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.4))' }} />
        </div>

        <div style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{
            background: 'rgba(212, 175, 55, 0.2)',
            border: '1px solid #D4AF37',
            borderRadius: '50px',
            padding: '8px 20px',
            marginBottom: '24px'
          }}>
            <span style={{ color: '#D4AF37', fontSize: '14px', fontWeight: 600 }}>
              Contenu exclusif newsletter
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 600,
            color: '#fff',
            marginBottom: '16px',
            lineHeight: 1.3,
            fontFamily: 'var(--font-cormorant), Georgia, serif'
          }}>
            Tu rates des recettes<br />chaque semaine.
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '16px',
            marginBottom: '40px',
            maxWidth: '450px'
          }}>
            Rejoins les <span style={{ color: '#D4AF37', fontWeight: 600 }}>10 000+ abonnés</span> qui reçoivent
            du contenu que je ne publie <u>nulle part ailleurs</u>.
          </p>

          <div style={{
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '28px',
            width: '90%',
            maxWidth: '420px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <input
              type="email"
              placeholder="Entre ton email"
              style={{
                width: '100%',
                padding: '14px 18px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '16px',
                marginBottom: '12px'
              }}
            />
            <button style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(to right, #D4AF37, #C77A4E)',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontWeight: 600,
              fontSize: '15px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Accéder au contenu exclusif
            </button>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          top: '80px',
          left: '20px',
          zIndex: 10,
          background: 'rgba(0,0,0,0.5)',
          padding: '8px 16px',
          borderRadius: '8px'
        }}>
          <span style={{ color: '#D4AF37', fontWeight: 700 }}>OPTION 4</span>
          <span style={{ color: '#fff', marginLeft: '8px' }}>FOMO / Exclusivité</span>
        </div>
      </section>

      {/* OPTION 5 - Direct et pratique */}
      <section id="option5" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=75"
            alt="Cuisine"
            fill
            style={{ objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />
        </div>

        <div style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '20px 40px',
          maxWidth: '600px'
        }}>
          <h1 style={{
            fontSize: 'clamp(36px, 7vw, 64px)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '8px',
            lineHeight: 1.1,
            fontFamily: 'var(--font-cormorant), Georgia, serif'
          }}>
            5 recettes gratuites
          </h1>
          <p style={{
            fontSize: 'clamp(18px, 3vw, 24px)',
            color: 'rgba(255,255,255,0.8)',
            marginBottom: '32px'
          }}>
            dans ta boîte mail chaque semaine.
          </p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginBottom: '40px'
          }}>
            {['Entrées, plats, desserts', 'Testées plusieurs fois', 'Prêtes à cuisiner'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#D4AF37'
                }} />
                <span style={{ color: '#fff', fontSize: '18px' }}>{item}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input
              type="email"
              placeholder="Ton email"
              style={{
                flex: 1,
                minWidth: '200px',
                padding: '16px 20px',
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '16px'
              }}
            />
            <button style={{
              padding: '16px 40px',
              background: 'linear-gradient(to right, #D4AF37, #C77A4E)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontWeight: 700,
              fontSize: '18px',
              cursor: 'pointer'
            }}>
              C'est parti !
            </button>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          top: '80px',
          left: '20px',
          zIndex: 10,
          background: 'rgba(0,0,0,0.5)',
          padding: '8px 16px',
          borderRadius: '8px'
        }}>
          <span style={{ color: '#D4AF37', fontWeight: 700 }}>OPTION 5</span>
          <span style={{ color: '#fff', marginLeft: '8px' }}>Direct et pratique</span>
        </div>
      </section>

      {/* OPTION 6 - Storytelling */}
      <section id="option6" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=75"
            alt="Cuisine"
            fill
            style={{ objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
        </div>

        <div style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          textAlign: 'center'
        }}>
          {/* Avatar placeholder */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #D4AF37, #C77A4E)',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            border: '3px solid #fff'
          }}>
            👨‍🍳
          </div>

          <p style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '16px',
            marginBottom: '8px'
          }}>
            Je suis Florent, créateur culinaire.
          </p>

          <h1 style={{
            fontSize: 'clamp(24px, 4vw, 36px)',
            fontWeight: 400,
            color: '#fff',
            marginBottom: '32px',
            lineHeight: 1.5,
            maxWidth: '500px',
            fontFamily: 'var(--font-cormorant), Georgia, serif'
          }}>
            Chaque semaine, j'envoie à ma communauté<br />
            <span style={{ fontWeight: 600, color: '#D4AF37' }}>mes 5 meilleures recettes</span> du moment.
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '14px',
            marginBottom: '24px'
          }}>
            Rejoins <span style={{ color: '#D4AF37' }}>10 000+</span> gourmands.
          </p>

          <div style={{
            display: 'flex',
            gap: '12px',
            width: '100%',
            maxWidth: '450px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <input
              type="email"
              placeholder="Ton email"
              style={{
                flex: 1,
                minWidth: '200px',
                padding: '14px 20px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50px',
                color: '#fff',
                fontSize: '16px'
              }}
            />
            <button style={{
              padding: '14px 28px',
              background: 'linear-gradient(to right, #D4AF37, #C77A4E)',
              border: 'none',
              borderRadius: '50px',
              color: '#fff',
              fontWeight: 600,
              fontSize: '15px',
              cursor: 'pointer'
            }}>
              Rejoindre la newsletter
            </button>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          top: '80px',
          left: '20px',
          zIndex: 10,
          background: 'rgba(0,0,0,0.5)',
          padding: '8px 16px',
          borderRadius: '8px'
        }}>
          <span style={{ color: '#D4AF37', fontWeight: 700 }}>OPTION 6</span>
          <span style={{ color: '#fff', marginLeft: '8px' }}>Storytelling</span>
        </div>
      </section>

      {/* OPTION 7 - Question directe */}
      <section id="option7" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=75"
            alt="Cuisine"
            fill
            style={{ objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)' }} />
        </div>

        <div style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: 'clamp(32px, 6vw, 56px)',
            fontWeight: 600,
            color: '#fff',
            marginBottom: '24px',
            lineHeight: 1.2,
            fontFamily: 'var(--font-cormorant), Georgia, serif'
          }}>
            Envie de nouvelles<br />idées recettes ?
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '18px',
            marginBottom: '12px'
          }}>
            Reçois <span style={{ color: '#D4AF37', fontWeight: 600 }}>5 recettes exclusives</span> chaque semaine.
          </p>

          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '16px',
            marginBottom: '40px',
            fontStyle: 'italic'
          }}>
            Testées. Approuvées. Délicieuses.
          </p>

          <div style={{
            background: 'rgba(107, 93, 82, 0.4)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '28px',
            width: '90%',
            maxWidth: '400px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <input
              type="email"
              placeholder="Ton email"
              style={{
                width: '100%',
                padding: '14px 18px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '16px',
                marginBottom: '12px'
              }}
            />
            <button style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(to right, #D4AF37, #C77A4E)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontWeight: 600,
              fontSize: '18px',
              cursor: 'pointer'
            }}>
              Oui, je m'inscris
            </button>

            <p style={{
              textAlign: 'center',
              color: 'rgba(255,255,255,0.5)',
              fontSize: '11px',
              marginTop: '16px'
            }}>
              ✓ Gratuit · ✓ Sans engagement · ✓ Désinscription 1 clic
            </p>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          top: '80px',
          left: '20px',
          zIndex: 10,
          background: 'rgba(0,0,0,0.5)',
          padding: '8px 16px',
          borderRadius: '8px'
        }}>
          <span style={{ color: '#D4AF37', fontWeight: 700 }}>OPTION 7</span>
          <span style={{ color: '#fff', marginLeft: '8px' }}>Question directe</span>
        </div>
      </section>

      {/* ============================================ */}
      {/* MIX B VARIANTES - Question directe + 130K */}
      {/* ============================================ */}

      {/* MIX B1 - Centré avec carte */}
      <section id="mixb1" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=75"
            alt="Cuisine"
            fill
            style={{ objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%)' }} />
        </div>

        <div style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: 'clamp(32px, 6vw, 56px)',
            fontWeight: 600,
            color: '#fff',
            marginBottom: '20px',
            lineHeight: 1.2,
            fontFamily: 'var(--font-cormorant), Georgia, serif'
          }}>
            Envie de nouvelles<br />idées recettes ?
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '18px',
            marginBottom: '12px',
            maxWidth: '500px'
          }}>
            Rejoins les <span style={{ color: '#D4AF37', fontWeight: 700 }}>130K+ gourmands</span> qui me suivent
          </p>

          <p style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '16px',
            marginBottom: '40px'
          }}>
            et reçois <strong>5 recettes exclusives</strong> chaque semaine.
          </p>

          <div style={{
            background: 'rgba(107, 93, 82, 0.4)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '28px',
            width: '90%',
            maxWidth: '400px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <input
              type="email"
              placeholder="Ton email"
              style={{
                width: '100%',
                padding: '14px 18px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '16px',
                marginBottom: '12px'
              }}
            />
            <button style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(to right, #D4AF37, #C77A4E)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontWeight: 600,
              fontSize: '18px',
              cursor: 'pointer'
            }}>
              Oui, je m'inscris
            </button>

            <p style={{
              textAlign: 'center',
              color: 'rgba(255,255,255,0.5)',
              fontSize: '11px',
              marginTop: '16px'
            }}>
              ✓ Gratuit · ✓ Sans engagement · ✓ Désinscription 1 clic
            </p>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          top: '80px',
          left: '20px',
          zIndex: 10,
          background: 'rgba(0,0,0,0.5)',
          padding: '8px 16px',
          borderRadius: '8px'
        }}>
          <span style={{ color: '#D4AF37', fontWeight: 700 }}>MIX B1</span>
          <span style={{ color: '#fff', marginLeft: '8px' }}>Centré + Carte</span>
        </div>
      </section>

      {/* MIX B2 - Formulaire inline (sans carte) */}
      <section id="mixb2" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=75"
            alt="Cuisine"
            fill
            style={{ objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
        </div>

        <div style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: 'clamp(36px, 7vw, 64px)',
            fontWeight: 600,
            color: '#fff',
            marginBottom: '20px',
            lineHeight: 1.1,
            fontFamily: 'var(--font-cormorant), Georgia, serif'
          }}>
            Envie de nouvelles<br />idées recettes ?
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '20px',
            marginBottom: '40px',
            maxWidth: '550px',
            lineHeight: 1.6
          }}>
            Rejoins les <span style={{ color: '#D4AF37', fontWeight: 700 }}>130K+ gourmands</span> qui me suivent
            et reçois <strong>5 recettes exclusives</strong> chaque semaine.
          </p>

          <div style={{
            display: 'flex',
            gap: '12px',
            width: '100%',
            maxWidth: '500px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <input
              type="email"
              placeholder="Ton email"
              style={{
                flex: 1,
                minWidth: '220px',
                padding: '16px 20px',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '16px'
              }}
            />
            <button style={{
              padding: '16px 32px',
              background: 'linear-gradient(to right, #D4AF37, #C77A4E)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontWeight: 600,
              fontSize: '16px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}>
              Oui, je m'inscris
            </button>
          </div>

          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '12px',
            marginTop: '20px'
          }}>
            ✓ Gratuit · ✓ Sans engagement · ✓ Désinscription 1 clic
          </p>
        </div>

        <div style={{
          position: 'absolute',
          top: '80px',
          left: '20px',
          zIndex: 10,
          background: 'rgba(0,0,0,0.5)',
          padding: '8px 16px',
          borderRadius: '8px'
        }}>
          <span style={{ color: '#D4AF37', fontWeight: 700 }}>MIX B2</span>
          <span style={{ color: '#fff', marginLeft: '8px' }}>Inline sans carte</span>
        </div>
      </section>

      {/* MIX B3 - En bas de page avec pill form */}
      <section id="mixb3" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=75"
            alt="Cuisine"
            fill
            style={{ objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
        </div>

        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          width: '90%',
          maxWidth: '550px'
        }}>
          <div style={{
            background: 'rgba(107, 93, 82, 0.5)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '36px',
            border: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 600,
              color: '#fff',
              marginBottom: '12px',
              fontFamily: 'var(--font-cormorant), Georgia, serif'
            }}>
              Envie de nouvelles idées recettes ?
            </h2>

            <p style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '15px',
              marginBottom: '24px',
              lineHeight: 1.5
            }}>
              Rejoins les <span style={{ color: '#D4AF37', fontWeight: 600 }}>130K+ gourmands</span> et reçois
              <br /><strong>5 recettes exclusives</strong> chaque semaine.
            </p>

            {/* Pill form style B5 */}
            <div style={{
              display: 'flex',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '50px',
              padding: '6px',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <input
                type="email"
                placeholder="Ton email"
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: '15px',
                  outline: 'none'
                }}
              />
              <button style={{
                padding: '12px 28px',
                background: 'linear-gradient(to right, #D4AF37, #C77A4E)',
                border: 'none',
                borderRadius: '50px',
                color: '#fff',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}>
                Je m'inscris
              </button>
            </div>

            <p style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '11px',
              marginTop: '16px'
            }}>
              ✓ Gratuit · ✓ Sans engagement · ✓ Désinscription 1 clic
            </p>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          top: '80px',
          left: '20px',
          zIndex: 10,
          background: 'rgba(0,0,0,0.5)',
          padding: '8px 16px',
          borderRadius: '8px'
        }}>
          <span style={{ color: '#D4AF37', fontWeight: 700 }}>MIX B3</span>
          <span style={{ color: '#fff', marginLeft: '8px' }}>Carte + Pill</span>
        </div>
      </section>

      {/* MIX B4 - Split screen (texte à gauche) */}
      <section id="mixb4" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=75"
            alt="Cuisine"
            fill
            style={{ objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 100%)' }} />
        </div>

        <div style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '40px',
          maxWidth: '600px'
        }}>
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 600,
            color: '#fff',
            marginBottom: '20px',
            lineHeight: 1.2,
            fontFamily: 'var(--font-cormorant), Georgia, serif'
          }}>
            Envie de nouvelles<br />idées recettes ?
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '18px',
            marginBottom: '32px',
            lineHeight: 1.6
          }}>
            Rejoins les <span style={{ color: '#D4AF37', fontWeight: 700 }}>130K+ gourmands</span> qui me suivent
            et reçois <strong>5 recettes exclusives</strong> chaque semaine.
          </p>

          <div style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid rgba(255,255,255,0.15)'
          }}>
            <input
              type="email"
              placeholder="Ton email"
              style={{
                width: '100%',
                padding: '14px 18px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '16px',
                marginBottom: '12px'
              }}
            />

            <button style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(to right, #D4AF37, #C77A4E)',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontWeight: 600,
              fontSize: '16px',
              cursor: 'pointer'
            }}>
              Oui, je m'inscris
            </button>

            <p style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '11px',
              marginTop: '12px',
              textAlign: 'center'
            }}>
              ✓ Gratuit · ✓ Sans engagement · ✓ Désinscription 1 clic
            </p>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          top: '80px',
          left: '20px',
          zIndex: 10,
          background: 'rgba(0,0,0,0.5)',
          padding: '8px 16px',
          borderRadius: '8px'
        }}>
          <span style={{ color: '#D4AF37', fontWeight: 700 }}>MIX B4</span>
          <span style={{ color: '#fff', marginLeft: '8px' }}>Split gauche</span>
        </div>
      </section>

      {/* MIX B5 - Ultra épuré pill form */}
      <section id="mixb5" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=75"
            alt="Cuisine"
            fill
            style={{ objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />
        </div>

        <div style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: 'clamp(40px, 8vw, 72px)',
            fontWeight: 600,
            color: '#fff',
            marginBottom: '16px',
            lineHeight: 1.1,
            fontFamily: 'var(--font-cormorant), Georgia, serif'
          }}>
            Envie de nouvelles<br />idées recettes ?
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '18px',
            marginBottom: '48px'
          }}>
            Rejoins les <span style={{ color: '#D4AF37', fontWeight: 700 }}>130K+ gourmands</span> · 5 recettes/semaine
          </p>

          {/* Pill form */}
          <div style={{
            display: 'flex',
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '50px',
            padding: '6px',
            width: '100%',
            maxWidth: '480px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <input
              type="email"
              placeholder="Ton email"
              style={{
                flex: 1,
                padding: '14px 24px',
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '16px',
                outline: 'none'
              }}
            />
            <button style={{
              padding: '14px 32px',
              background: 'linear-gradient(to right, #D4AF37, #C77A4E)',
              border: 'none',
              borderRadius: '50px',
              color: '#fff',
              fontWeight: 600,
              fontSize: '15px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}>
              Je m'inscris
            </button>
          </div>

          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '12px',
            marginTop: '20px'
          }}>
            ✓ Gratuit · ✓ Sans engagement · ✓ Désinscription 1 clic
          </p>
        </div>

        <div style={{
          position: 'absolute',
          top: '80px',
          left: '20px',
          zIndex: 10,
          background: 'rgba(0,0,0,0.5)',
          padding: '8px 16px',
          borderRadius: '8px'
        }}>
          <span style={{ color: '#D4AF37', fontWeight: 700 }}>MIX B5</span>
          <span style={{ color: '#fff', marginLeft: '8px' }}>Pill épuré</span>
        </div>
      </section>
    </div>
  );
}
