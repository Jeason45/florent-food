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

const brands = [
  { name: "Audi", icon: "https://cdn.simpleicons.org/audi/000000" },
  { name: "McDonald's", icon: "https://cdn.simpleicons.org/mcdonalds/FFC72C" },
  { name: "Uber Eats", icon: "https://cdn.simpleicons.org/ubereats/06C167" },
  { name: "Paramount+", icon: "https://cdn.simpleicons.org/paramountplus/0064FF" },
];

export function CommunitySection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="community-section" style={{ background: '#FFFBF7', padding: '50px 20px' }}>
      <style>{`
        .community-grid-row1 {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          text-align: center;
        }
        .community-grid-row1 .line {
          display: none;
        }
        .community-grid-row2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .community-grid-row3 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 15px;
        }
        @media (min-width: 768px) {
          .community-grid-row1 {
            flex-direction: row;
            text-align: left;
          }
          .community-grid-row1 .line {
            display: block;
          }
          .community-grid-row2 {
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
          }
          .community-grid-row3 {
            grid-template-columns: 1fr 1fr;
          }
          .collab-icons {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 10px !important;
          }
          .collab-icons > div {
            width: 36px !important;
            height: 36px !important;
          }
        }
      `}</style>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* ROW 1: Merci Full Width - Ligne Dorée */}
        <div className="community-grid-row1" style={{
          background: '#1a1a1a',
          borderRadius: '24px',
          padding: '25px 30px',
          marginBottom: '15px'
        }}>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', fontWeight: 300, margin: 0 }}>Merci de votre confiance</p>
          <div className="line" style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(212,175,55,0.5), transparent)' }}></div>
          <p style={{ fontSize: '28px', fontWeight: 600, color: '#D4AF37', margin: 0 }}>+700K</p>
        </div>

        {/* ROW 2: 4 Cards (3 réseaux + Collabs) */}
        <div className="community-grid-row2" style={{ marginBottom: '15px' }}>
          {/* TikTok */}
          <div className="social-card" style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '18px',
            boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" alt="TikTok" className="social-icon" style={{ width: '32px', height: '32px' }} />
            <div>
              <p className="social-number" style={{ fontSize: '22px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1, margin: 0 }}>467K</p>
              <p style={{ fontSize: '10px', color: '#999', marginTop: '3px', marginBottom: 0 }}>TikTok</p>
            </div>
          </div>

          {/* Instagram */}
          <div className="social-card" style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '18px',
            boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" className="social-icon" style={{ width: '32px', height: '32px' }} />
            <div>
              <p className="social-number" style={{ fontSize: '22px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1, margin: 0 }}>130K</p>
              <p style={{ fontSize: '10px', color: '#999', marginTop: '3px', marginBottom: 0 }}>Instagram</p>
            </div>
          </div>

          {/* YouTube */}
          <div className="social-card" style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '18px',
            boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <img src="https://cdn-icons-png.flaticon.com/512/174/174883.png" alt="YouTube" className="social-icon" style={{ width: '32px', height: '32px' }} />
            <div>
              <p className="social-number" style={{ fontSize: '22px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1, margin: 0 }}>105K</p>
              <p style={{ fontSize: '10px', color: '#999', marginTop: '3px', marginBottom: 0 }}>YouTube</p>
            </div>
          </div>

          {/* Collaborations */}
          <div className="collab-card" style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '18px',
            boxShadow: '0 2px 20px rgba(0,0,0,0.04)'
          }}>
            <p style={{ color: '#D4AF37', fontSize: '9px', letterSpacing: '2px', marginBottom: '12px', marginTop: 0, textAlign: 'center' }}>COLLABORATIONS</p>
            <div className="collab-icons" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', justifyItems: 'center' }}>
              {brands.map((brand, i) => (
                <div key={i} style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#f8f8f8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px' }}>
                  <img src={brand.icon} alt={brand.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 3: À propos + Témoignages (50/50) */}
        <div className="community-grid-row3">
          {/* À propos */}
          <div style={{
            background: '#1a1a1a',
            borderRadius: '20px',
            padding: '25px'
          }}>
            <p style={{ color: '#D4AF37', fontSize: '9px', letterSpacing: '3px', marginBottom: '15px', marginTop: 0 }}>À PROPOS</p>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', lineHeight: 1.8, marginBottom: '12px', marginTop: 0 }}>
              J'ai eu la chance d'être sollicité par <strong style={{ color: '#D4AF37' }}>Audi</strong> pour participer à un défi culinaire destiné à des sportifs de haut niveau. Une expérience enrichissante face à un jury d'exception : <strong style={{ color: '#fff' }}>Thierry Marx</strong> et <strong style={{ color: '#fff' }}>Jessica Préalpato</strong>. Challenge que j'ai eu l'honneur de remporter.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', lineHeight: 1.8, margin: 0 }}>
              Aujourd'hui, je continue de partager ma passion avec vous, en rendant la cuisine accessible à tous.
            </p>
          </div>

          {/* Témoignages - Fond sombre */}
          <div style={{
            background: '#1a1a1a',
            borderRadius: '20px',
            padding: '25px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <Quote size={22} style={{ color: '#D4AF37', opacity: 0.5 }} />
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={prevSlide} style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ChevronLeft size={14} color="#fff" />
                </button>
                <button onClick={nextSlide} style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#D4AF37', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ChevronRight size={14} color="#000" />
                </button>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', lineHeight: 1.8, marginBottom: '15px', marginTop: 0, fontStyle: 'italic', flex: 1 }}>
              "{testimonials[activeSlide].text}"
            </p>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ color: '#fff', fontSize: '13px', fontWeight: 500, margin: 0 }}>{testimonials[activeSlide].name}</p>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="#D4AF37" color="#D4AF37" />)}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '4px', marginTop: '15px', justifyContent: 'center' }}>
              {testimonials.map((_, index) => (
                <button key={index} onClick={() => setActiveSlide(index)} style={{ width: index === activeSlide ? '16px' : '5px', height: '5px', borderRadius: '3px', background: index === activeSlide ? '#D4AF37' : 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
