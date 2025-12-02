"use client";

import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "@yourglamoureuse",
    source: "YouTube",
    text: "Ça a l'air délicieux 😍 je m'abonne direct ❤️",
  },
  {
    id: 2,
    name: "@martinemartincluzel9990",
    source: "YouTube",
    text: "Florent, faut arrêter de nous régaler comme ça. On peut pas s'empêcher de le refaire. N'empêche merci pour la recette mon grand 😘❤️👍",
  },
  {
    id: 3,
    name: "@giovanni_ttm",
    source: "Instagram",
    text: "Incroyable recette de gaufres, j'adore 😍",
  },
  {
    id: 4,
    name: "@dudu22973",
    source: "Instagram",
    text: "Très bonne recette monsieur qui me donne trop envie d'y goûter 😋😋😋😋",
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
  { name: "Andros Be Nut's", icon: "/benuts.png", bgColor: "transparent", noPadding: true },
];

export function CommunitySection() {
  return (
    <section className="community-section" style={{ background: '#FFFBF7', padding: '10px 20px 30px' }}>
      <style>{`
        .community-grid-row3 {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .about-testimonials-row {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .testimonials-stack {
          display: flex;
          flex-direction: column;
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
          width: 28px;
          height: 28px;
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
        .testimonials-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 15px;
        }
        @media (min-width: 768px) {
          .about-testimonials-row {
            flex-direction: row;
            align-items: stretch;
          }
          .about-testimonials-row > .about-card {
            flex: 1;
          }
          .about-testimonials-row > .testimonials-section {
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          .testimonials-stack {
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          .testimonials-stack > div {
            flex: 1;
          }
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
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
            width: 48px;
            height: 48px;
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
              <div key={i} className="collab-icon" style={{
                borderRadius: '50%',
                background: b.bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: b.noPadding ? 'none' : '1px solid rgba(255,255,255,0.15)',
                padding: b.noPadding ? '0' : '6px',
                overflow: 'hidden'
              }}>
                <img src={b.icon} alt={b.name} style={{ width: '100%', height: '100%', objectFit: b.noPadding ? 'cover' : 'contain' }} />
              </div>
            ))}
          </div>
        </div>

        {/* ROW 3: À propos + Témoignages */}
        <div className="community-grid-row3">
          {/* À propos */}
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            border: '2px solid #D4AF37'
          }}>
            <p style={{ color: '#D4AF37', letterSpacing: '3px', marginBottom: '20px', marginTop: 0, fontSize: '16px', fontWeight: 600 }}>À PROPOS</p>
            <p style={{ color: '#444', fontSize: '15px', lineHeight: 1.9, marginBottom: '15px', marginTop: 0 }}>
              Vous m'avez peut-être déjà croisé sur vos écrans, avec mon accent chantant du Sud de la France et mon enthousiasme communicatif : je m'appelle <strong style={{ color: '#1a1a1a' }}>Florent</strong>, j'ai 26 ans et je suis créateur de contenu culinaire de <strong style={{ color: '#1a1a1a' }}>Montpellier</strong>.
            </p>
            <p style={{ color: '#444', fontSize: '15px', lineHeight: 1.9, marginBottom: '15px', marginTop: 0 }}>
              Au fil de cette aventure, j'ai eu la chance de vivre des expériences incroyables. Parmi elles, être sollicité par <strong style={{ color: '#D4AF37' }}>Audi</strong> pour participer à un défi culinaire destiné à des sportifs de haut niveau. Une expérience enrichissante face à un jury d'exception : <strong style={{ color: '#1a1a1a' }}>Thierry Marx</strong> et <strong style={{ color: '#1a1a1a' }}>Jessica Préalpato</strong>. Challenge que j'ai eu l'honneur de remporter.
            </p>
            <p style={{ color: '#444', fontSize: '15px', lineHeight: 1.9, marginBottom: '15px', marginTop: 0 }}>
              Cette passion m'a également poussé à aller plus loin. J'ai eu l'opportunité de concrétiser mon amour pour la cuisine en publiant mon premier livre de recettes. Chaque recette est accompagnée d'un QR code permettant d'accéder directement à la vidéo explicative, pour une expérience culinaire encore plus vivante et immersive. Vous trouverez le lien pour vous le procurer en bas de cette page.
            </p>
            <p style={{ color: '#333', fontSize: '15px', lineHeight: 1.9, margin: 0 }}>
              Mais au fond, tout ça part d'une seule chose : depuis toujours, je suis un gourmand assumé, amoureux de la bonne cuisine, du partage et des moments conviviaux ! Aujourd'hui, je continue de partager ma passion avec vous, en rendant la cuisine accessible à tous.
            </p>
          </div>

          {/* Témoignages */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
              <Quote size={26} style={{ color: '#D4AF37', opacity: 0.5 }} />
              <p style={{ color: '#D4AF37', letterSpacing: '3px', margin: 0, fontSize: '16px', fontWeight: 600 }}>TÉMOIGNAGES</p>
            </div>
            <div className="testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <div key={index} style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  border: '2px solid #D4AF37'
                }}>
                  <p style={{ color: '#444', fontSize: '15px', lineHeight: 1.9, marginBottom: '20px', marginTop: 0, flex: 1 }}>
                    "{testimonial.text}"
                  </p>
                  <div style={{ borderTop: '1px solid #eee', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ color: '#1a1a1a', fontSize: '14px', fontWeight: 600, margin: 0 }}>{testimonial.name}</p>
                      <p style={{ color: '#D4AF37', fontSize: '11px', margin: '4px 0 0 0', letterSpacing: '1px' }}>{testimonial.source}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="#D4AF37" color="#D4AF37" />)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
