"use client";

import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Hinde",
    text: "Les recettes de Florent sont incroyables ! J'ai réussi mon premier Paris-Brest grâce à ses explications claires et détaillées. Mes invités étaient bluffés !",
  },
  {
    id: 2,
    name: "Houda",
    text: "Même en tant que débutante, j'ai pu suivre facilement. Les vidéos sont top et les astuces font vraiment la différence. Je recommande à 100% !",
  },
  {
    id: 3,
    name: "Rudy",
    text: "Wouaf Wouaf ! J'ai beaucoup de chance de pouvoir goûter aux restes des créations de mon chef ! Le Paris-Brest ? Même les miettes sont divines !",
  },
  {
    id: 4,
    name: "Jeason",
    text: "Des recettes accessibles avec un rendu professionnel ! Florent a su me redonner confiance en cuisine. Ses conseils sont précis et toujours justes.",
  },
];

const socials = [
  { name: "TikTok", count: "467K", icon: "https://cdn.simpleicons.org/tiktok/ffffff", bgColor: "#000000", link: "https://www.tiktok.com/@florent_cmt" },
  { name: "Instagram", count: "130K", icon: "https://cdn.simpleicons.org/instagram/ffffff", bgColor: "#E4405F", link: "https://www.instagram.com/florentfood/" },
  { name: "Snapchat", count: "126K", icon: "https://cdn.simpleicons.org/snapchat/ffffff", bgColor: "#FFFC00", link: "https://www.snapchat.com/add/florent_cmt", darkIcon: true },
  { name: "YouTube", count: "105K", icon: "https://cdn.simpleicons.org/youtube/ffffff", bgColor: "#FF0000", link: "https://www.youtube.com/@FlorentYtb" },
  { name: "Facebook", count: "20K", icon: "https://cdn.simpleicons.org/facebook/ffffff", bgColor: "#1877F2", link: "https://www.facebook.com/share/1AGZdmHNqt/?mibextid=wwXIfr" },
];

const brands = [
  { name: "Audi", icon: "https://cdn.simpleicons.org/audi/ffffff", bgColor: "#000000" },
  { name: "McDonald's", icon: "https://cdn.simpleicons.org/mcdonalds/ffffff", bgColor: "#FFC72C" },
  { name: "Uber Eats", icon: "https://cdn.simpleicons.org/ubereats/ffffff", bgColor: "#06C167" },
  { name: "Paramount+", icon: "https://cdn.simpleicons.org/paramountplus/ffffff", bgColor: "#0064FF" },
];

export function CommunitySection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="community-section" style={{ background: '#FFFBF7', padding: '10px 20px 30px' }}>
      <style>{`
        .community-grid-row3 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 15px;
        }
        .social-links-title {
          font-size: 13px;
        }
        .social-pill {
          padding: 4px 10px 4px 4px;
        }
        .social-pill span {
          font-size: 12px;
        }
        .social-pill-icon {
          width: 28px;
          height: 28px;
        }
        .social-pill-icon img {
          width: 14px;
          height: 14px;
        }
        .collab-icon {
          width: 44px;
          height: 44px;
          padding: 10px;
        }
        .collab-label {
          font-size: 12px;
        }
        .about-label {
          font-size: 11px;
        }
        /* Animation Glow */
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 5px rgba(212, 175, 55, 0.3); }
          50% { text-shadow: 0 0 20px rgba(212, 175, 55, 0.6), 0 0 30px rgba(212, 175, 55, 0.4); }
        }
        .anim-glow {
          animation: glow 2s ease-in-out infinite;
        }
        /* Animation Underline */
        .anim-underline {
          position: relative;
          display: inline-block;
        }
        .anim-underline::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #D4AF37, transparent);
          animation: slideUnderline 2s ease-in-out infinite;
        }
        @keyframes slideUnderline {
          0%, 100% { transform: scaleX(0.3); opacity: 0.5; }
          50% { transform: scaleX(1); opacity: 1; }
        }
        @media (min-width: 768px) {
          .community-grid-row3 {
            grid-template-columns: 1fr 1fr;
          }
          .social-links-title {
            font-size: 18px;
          }
          .social-pill {
            padding: 8px 24px 8px 8px;
          }
          .social-pill span {
            font-size: 20px;
          }
          .social-pill-icon {
            width: 36px;
            height: 36px;
          }
          .social-pill-icon img {
            width: 18px;
            height: 18px;
          }
          .collab-icon {
            width: 56px;
            height: 56px;
            padding: 12px;
          }
          .collab-label {
            font-size: 16px;
          }
          .about-label {
            font-size: 13px;
          }
        }
      `}</style>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Social Links - Fond sombre */}
        <div style={{
          background: '#1a1a1a',
          borderRadius: '20px',
          padding: '30px 20px',
          marginBottom: '15px',
          textAlign: 'center'
        }}>
          <p className="social-links-title anim-glow anim-underline" style={{ color: '#D4AF37', letterSpacing: '3px', marginBottom: '25px', marginTop: 0 }}>REJOINS +848K ABONNÉS</p>
          <div className="social-pills-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.name} - ${s.count} abonnés`}
                className="social-pill"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}
              >
                <div className="social-pill-icon" style={{
                  borderRadius: '50%',
                  background: s.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: '1px solid rgba(255,255,255,0.15)'
                }}>
                  <img
                    src={s.darkIcon ? s.icon.replace('/ffffff', '/000000') : s.icon}
                    alt={s.name}
                  />
                </div>
                <span style={{ color: '#fff', fontWeight: 600 }}>{s.count}</span>
              </a>
            ))}
          </div>
          {/* Séparation dorée */}
          <div style={{
            width: '80px',
            height: '1px',
            background: 'rgba(212,175,55,0.3)',
            margin: '30px auto'
          }} />

          <span className="collab-label" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', display: 'block', marginBottom: '15px' }}>COLLABORATIONS</span>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {brands.map((b, i) => (
              <div key={i} style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: b.bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '12px'
              }}>
                <img src={b.icon} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        </div>

        {/* ROW 3: À propos + Témoignages (50/50) - Fond clair */}
        <div className="community-grid-row3">
          {/* À propos */}
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}>
            <p className="about-label" style={{ color: '#D4AF37', letterSpacing: '3px', marginBottom: '20px', marginTop: 0 }}>À PROPOS</p>
            <p style={{ color: '#444', fontSize: '15px', lineHeight: 1.9, marginBottom: '15px', marginTop: 0 }}>
              J'ai eu la chance d'être sollicité par <strong style={{ color: '#D4AF37' }}>Audi</strong> pour participer à un défi culinaire destiné à des sportifs de haut niveau. Une expérience enrichissante face à un jury d'exception : <strong style={{ color: '#1a1a1a' }}>Thierry Marx</strong> et <strong style={{ color: '#1a1a1a' }}>Jessica Préalpato</strong>. Challenge que j'ai eu l'honneur de remporter.
            </p>
            <p style={{ color: '#333', fontSize: '15px', lineHeight: 1.9, margin: 0 }}>
              Aujourd'hui, je continue de partager ma passion avec vous, en rendant la cuisine accessible à tous.
            </p>
          </div>

          {/* Témoignages - Fond clair */}
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <Quote size={26} style={{ color: '#D4AF37', opacity: 0.5 }} />
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={prevSlide} aria-label="Témoignage précédent" style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#f5f5f5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ChevronLeft size={18} color="#1a1a1a" />
                </button>
                <button onClick={nextSlide} aria-label="Témoignage suivant" style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#D4AF37', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ChevronRight size={18} color="#000" />
                </button>
              </div>
            </div>
            <p style={{ color: '#444', fontSize: '15px', lineHeight: 1.9, marginBottom: '20px', marginTop: 0, fontStyle: 'italic', flex: 1 }}>
              "{testimonials[activeSlide].text}"
            </p>
            <div style={{ borderTop: '1px solid #eee', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ color: '#1a1a1a', fontSize: '15px', fontWeight: 600, margin: 0 }}>{testimonials[activeSlide].name}</p>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#D4AF37" color="#D4AF37" />)}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '15px', justifyContent: 'center' }}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Voir témoignage ${index + 1}`}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '8px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0
                  }}
                >
                  <span style={{
                    width: index === activeSlide ? '20px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: index === activeSlide ? '#D4AF37' : '#ddd',
                    transition: 'all 0.3s',
                    display: 'block'
                  }} />
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
