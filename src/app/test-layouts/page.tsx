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

export default function TestLayoutsPage() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div>
      {/* Header */}
      <div style={{ background: '#0a0a0a', padding: '40px 20px', textAlign: 'center' }}>
        <p style={{ color: '#D4AF37', fontSize: '11px', letterSpacing: '4px', marginBottom: '10px' }}>PREVIEW</p>
        <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 300 }}>
          Layout Final
        </h1>
      </div>

      {/* ============================================ */}
      {/* VARIATIONS MERCI */}
      {/* ============================================ */}
      <div style={{ background: '#D4AF37', padding: '10px', textAlign: 'center' }}>
        <span style={{ color: '#000', fontSize: '11px', fontWeight: 600, letterSpacing: '2px' }}>VARIATIONS — CARD MERCI</span>
      </div>

      <section style={{ background: '#FFFBF7', padding: '50px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Variation 1 - Minimaliste */}
          <div>
            <p style={{ fontSize: '10px', color: '#999', marginBottom: '8px', letterSpacing: '1px' }}>VARIATION 1 — MINIMALISTE</p>
            <div style={{
              background: '#1a1a1a',
              borderRadius: '24px',
              padding: '35px 45px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', fontWeight: 300, letterSpacing: '0.5px' }}>Merci pour votre confiance</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <span style={{ fontSize: '42px', fontWeight: 700, color: '#D4AF37' }}>700K+</span>
              </div>
            </div>
          </div>

          {/* Variation 2 - Centré élégant */}
          <div>
            <p style={{ fontSize: '10px', color: '#999', marginBottom: '8px', letterSpacing: '1px' }}>VARIATION 2 — CENTRÉ ÉLÉGANT</p>
            <div style={{
              background: '#1a1a1a',
              borderRadius: '24px',
              padding: '40px',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '13px', color: '#D4AF37', letterSpacing: '3px', marginBottom: '12px' }}>MERCI</p>
              <p style={{ fontSize: '48px', fontWeight: 200, color: '#fff', lineHeight: 1 }}>700 000<span style={{ color: '#D4AF37' }}>+</span></p>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginTop: '12px', fontWeight: 300 }}>passionnés nous font confiance</p>
            </div>
          </div>

          {/* Variation 3 - Statement bold */}
          <div>
            <p style={{ fontSize: '10px', color: '#999', marginBottom: '8px', letterSpacing: '1px' }}>VARIATION 3 — STATEMENT</p>
            <div style={{
              background: '#1a1a1a',
              borderRadius: '24px',
              padding: '35px 45px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <p style={{ fontSize: '28px', color: '#fff', fontWeight: 300, lineHeight: 1.3 }}>Une communauté</p>
                <p style={{ fontSize: '28px', color: '#fff', fontWeight: 300, lineHeight: 1.3 }}>de <span style={{ color: '#D4AF37', fontWeight: 600 }}>passionnés</span></p>
              </div>
              <p style={{ fontSize: '56px', fontWeight: 700, color: '#D4AF37', lineHeight: 1 }}>+700K</p>
            </div>
          </div>

          {/* Variation 4 - Ligne dorée */}
          <div>
            <p style={{ fontSize: '10px', color: '#999', marginBottom: '8px', letterSpacing: '1px' }}>VARIATION 4 — LIGNE DORÉE</p>
            <div style={{
              background: '#1a1a1a',
              borderRadius: '24px',
              padding: '30px 45px',
              display: 'flex',
              alignItems: 'center',
              gap: '30px'
            }}>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>Merci de votre confiance</p>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(212,175,55,0.5), transparent)' }}></div>
              <p style={{ fontSize: '32px', fontWeight: 600, color: '#D4AF37' }}>+700K</p>
            </div>
          </div>

          {/* Variation 5 - Typographie mixte */}
          <div>
            <p style={{ fontSize: '10px', color: '#999', marginBottom: '8px', letterSpacing: '1px' }}>VARIATION 5 — TYPO MIXTE</p>
            <div style={{
              background: '#1a1a1a',
              borderRadius: '24px',
              padding: '35px 45px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <p style={{ fontSize: '20px', color: '#fff', fontWeight: 300 }}>
                <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.6)' }}>Merci</span> pour votre confiance
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>COMMUNAUTÉ</span>
                <span style={{ fontSize: '38px', fontWeight: 700, color: '#D4AF37' }}>+700K</span>
              </div>
            </div>
          </div>

          {/* Variation 6 - Ultra minimal */}
          <div>
            <p style={{ fontSize: '10px', color: '#999', marginBottom: '8px', letterSpacing: '1px' }}>VARIATION 6 — ULTRA MINIMAL</p>
            <div style={{
              background: '#1a1a1a',
              borderRadius: '24px',
              padding: '25px 45px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '40px'
            }}>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}>Merci</p>
              <p style={{ fontSize: '36px', fontWeight: 700, color: '#D4AF37' }}>+700K</p>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}>abonnés</p>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================ */}
      {/* VARIATIONS TÉMOIGNAGES - Bas de card */}
      {/* ============================================ */}
      <div style={{ background: '#D4AF37', padding: '10px', textAlign: 'center' }}>
        <span style={{ color: '#000', fontSize: '11px', fontWeight: 600, letterSpacing: '2px' }}>VARIATIONS — BAS TÉMOIGNAGE</span>
      </div>

      <section style={{ background: '#FFFBF7', padding: '50px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

          {/* Variation A - Tiret simple */}
          <div style={{ background: '#1a1a1a', borderRadius: '20px', padding: '30px' }}>
            <p style={{ fontSize: '10px', color: '#D4AF37', marginBottom: '15px', letterSpacing: '1px' }}>VARIATION A</p>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '20px' }}>
              "Les recettes de Florent sont incroyables ! J'ai réussi mon premier Paris-Brest."
            </p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>
              — <span style={{ color: '#D4AF37' }}>Hinde</span>, passionnée de pâtisserie
            </p>
          </div>

          {/* Variation B - Séparateur + étoiles */}
          <div style={{ background: '#1a1a1a', borderRadius: '20px', padding: '30px' }}>
            <p style={{ fontSize: '10px', color: '#D4AF37', marginBottom: '15px', letterSpacing: '1px' }}>VARIATION B</p>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '20px' }}>
              "Les recettes de Florent sont incroyables ! J'ai réussi mon premier Paris-Brest."
            </p>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>Hinde</p>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="#D4AF37" color="#D4AF37" />)}
              </div>
            </div>
          </div>

          {/* Variation C - Initiale stylisée */}
          <div style={{ background: '#1a1a1a', borderRadius: '20px', padding: '30px' }}>
            <p style={{ fontSize: '10px', color: '#D4AF37', marginBottom: '15px', letterSpacing: '1px' }}>VARIATION C</p>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '20px' }}>
              "Les recettes de Florent sont incroyables ! J'ai réussi mon premier Paris-Brest."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px', fontWeight: 700, color: '#D4AF37' }}>H</span>
              <div style={{ width: '1px', height: '25px', background: 'rgba(255,255,255,0.2)' }}></div>
              <div>
                <p style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>Hinde</p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>Pâtisserie</p>
              </div>
            </div>
          </div>

          {/* Variation D - Tag simple */}
          <div style={{ background: '#1a1a1a', borderRadius: '20px', padding: '30px' }}>
            <p style={{ fontSize: '10px', color: '#D4AF37', marginBottom: '15px', letterSpacing: '1px' }}>VARIATION D</p>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '20px' }}>
              "Les recettes de Florent sont incroyables ! J'ai réussi mon premier Paris-Brest."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ background: '#D4AF37', color: '#000', fontSize: '11px', fontWeight: 600, padding: '5px 12px', borderRadius: '20px' }}>Hinde</span>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>Passionnée de pâtisserie</span>
            </div>
          </div>

          {/* Variation E - Ligne à gauche */}
          <div style={{ background: '#1a1a1a', borderRadius: '20px', padding: '30px' }}>
            <p style={{ fontSize: '10px', color: '#D4AF37', marginBottom: '15px', letterSpacing: '1px' }}>VARIATION E</p>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '20px' }}>
              "Les recettes de Florent sont incroyables ! J'ai réussi mon premier Paris-Brest."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '3px', height: '30px', background: '#D4AF37', borderRadius: '2px' }}></div>
              <div>
                <p style={{ color: '#D4AF37', fontSize: '14px', fontWeight: 600 }}>Hinde</p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>Passionnée de pâtisserie</p>
              </div>
            </div>
          </div>

          {/* Variation F - Guillemets signature */}
          <div style={{ background: '#1a1a1a', borderRadius: '20px', padding: '30px' }}>
            <p style={{ fontSize: '10px', color: '#D4AF37', marginBottom: '15px', letterSpacing: '1px' }}>VARIATION F</p>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '20px' }}>
              "Les recettes de Florent sont incroyables ! J'ai réussi mon premier Paris-Brest."
            </p>
            <p style={{ color: '#fff', fontSize: '13px', textAlign: 'right' }}>
              <span style={{ color: '#D4AF37', fontSize: '18px' }}>"</span> Hinde
            </p>
          </div>

        </div>
      </section>

      {/* ============================================ */}
      {/* LAYOUT FINAL AVEC CHOIX */}
      {/* ============================================ */}
      <div style={{ background: '#D4AF37', padding: '10px', textAlign: 'center' }}>
        <span style={{ color: '#000', fontSize: '11px', fontWeight: 600, letterSpacing: '2px' }}>LAYOUT COMPLET — VERSION A</span>
      </div>

      <section style={{ background: '#FFFBF7', padding: '50px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* ROW 1: Merci Full Width - Ligne Dorée */}
          <div style={{
            background: '#1a1a1a',
            borderRadius: '24px',
            padding: '30px 45px',
            display: 'flex',
            alignItems: 'center',
            gap: '30px',
            marginBottom: '15px'
          }}>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>Merci de votre confiance</p>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(212,175,55,0.5), transparent)' }}></div>
            <p style={{ fontSize: '32px', fontWeight: 600, color: '#D4AF37' }}>+700K</p>
          </div>

          {/* ROW 2: 4 Cards (3 réseaux + Collabs) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '15px' }}>
            {/* TikTok */}
            <div style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '25px',
              boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" alt="TikTok" style={{ width: '38px', height: '38px' }} />
              <div>
                <p style={{ fontSize: '28px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1 }}>467K</p>
                <p style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>TikTok</p>
              </div>
            </div>

            {/* Instagram */}
            <div style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '25px',
              boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" style={{ width: '38px', height: '38px' }} />
              <div>
                <p style={{ fontSize: '28px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1 }}>130K</p>
                <p style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>Instagram</p>
              </div>
            </div>

            {/* YouTube */}
            <div style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '25px',
              boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <img src="https://cdn-icons-png.flaticon.com/512/174/174883.png" alt="YouTube" style={{ width: '38px', height: '38px' }} />
              <div>
                <p style={{ fontSize: '28px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1 }}>105K</p>
                <p style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>YouTube</p>
              </div>
            </div>

            {/* Collaborations */}
            <div style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '25px',
              boxShadow: '0 2px 20px rgba(0,0,0,0.04)'
            }}>
              <p style={{ color: '#D4AF37', fontSize: '10px', letterSpacing: '2px', marginBottom: '15px', textAlign: 'center' }}>COLLABORATIONS</p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                {brands.map((brand, i) => (
                  <div key={i} style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f8f8f8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px' }}>
                    <img src={brand.icon} alt={brand.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ROW 3: À propos + Témoignages (50/50) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            {/* À propos */}
            <div style={{
              background: '#1a1a1a',
              borderRadius: '24px',
              padding: '35px'
            }}>
              <p style={{ color: '#D4AF37', fontSize: '10px', letterSpacing: '3px', marginBottom: '20px' }}>À PROPOS</p>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', lineHeight: 1.9, marginBottom: '15px' }}>
                J'ai eu la chance d'être sollicité par <strong style={{ color: '#D4AF37' }}>Audi</strong> pour participer à un défi culinaire destiné à des sportifs de haut niveau. Une expérience enrichissante face à un jury d'exception : <strong style={{ color: '#fff' }}>Thierry Marx</strong> et <strong style={{ color: '#fff' }}>Jessica Préalpato</strong>. Challenge que j'ai eu l'honneur de remporter.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.9 }}>
                Aujourd'hui, je continue de partager ma passion avec vous, en rendant la cuisine accessible à tous.
              </p>
            </div>

            {/* Témoignages - Fond sombre */}
            <div style={{
              background: '#1a1a1a',
              borderRadius: '24px',
              padding: '35px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Quote size={28} style={{ color: '#D4AF37', opacity: 0.5 }} />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={prevSlide} style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronLeft size={16} color="#fff" />
                  </button>
                  <button onClick={nextSlide} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#D4AF37', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronRight size={16} color="#000" />
                  </button>
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', lineHeight: 1.9, marginBottom: '20px', fontStyle: 'italic', flex: 1 }}>
                "{testimonials[activeSlide].text}"
              </p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}>{testimonials[activeSlide].name}</p>
                <div style={{ display: 'flex', gap: '3px' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#D4AF37" color="#D4AF37" />)}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '5px', marginTop: '20px', justifyContent: 'center' }}>
                {testimonials.map((_, index) => (
                  <button key={index} onClick={() => setActiveSlide(index)} style={{ width: index === activeSlide ? '18px' : '6px', height: '6px', borderRadius: '3px', background: index === activeSlide ? '#D4AF37' : 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* VERSION B - Fond Sombre */}
      {/* ============================================ */}
      <div style={{ background: '#D4AF37', padding: '10px', textAlign: 'center' }}>
        <span style={{ color: '#000', fontSize: '11px', fontWeight: 600, letterSpacing: '2px' }}>VERSION B — FOND SOMBRE</span>
      </div>

      <section style={{ background: '#0a0a0a', padding: '50px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* ROW 1: Merci Full Width */}
          <div style={{
            background: 'linear-gradient(135deg, #D4AF37 0%, #B8962E 100%)',
            borderRadius: '24px',
            padding: '30px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '15px'
          }}>
            <p style={{ fontSize: '18px', color: 'rgba(0,0,0,0.7)', fontWeight: 400 }}>Merci de votre confiance</p>
            <p style={{ fontSize: '36px', fontWeight: 700, color: '#000', lineHeight: 1 }}>+700K</p>
          </div>

          {/* ROW 2: 4 Cards (3 réseaux + Collabs) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '15px' }}>
            {/* TikTok */}
            <div style={{
              background: '#141414',
              borderRadius: '20px',
              padding: '25px',
              border: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" alt="TikTok" style={{ width: '38px', height: '38px' }} />
              <div>
                <p style={{ fontSize: '28px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>467K</p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>TikTok</p>
              </div>
            </div>

            {/* Instagram */}
            <div style={{
              background: '#141414',
              borderRadius: '20px',
              padding: '25px',
              border: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" style={{ width: '38px', height: '38px' }} />
              <div>
                <p style={{ fontSize: '28px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>130K</p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>Instagram</p>
              </div>
            </div>

            {/* YouTube */}
            <div style={{
              background: '#141414',
              borderRadius: '20px',
              padding: '25px',
              border: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <img src="https://cdn-icons-png.flaticon.com/512/174/174883.png" alt="YouTube" style={{ width: '38px', height: '38px' }} />
              <div>
                <p style={{ fontSize: '28px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>105K</p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>YouTube</p>
              </div>
            </div>

            {/* Collaborations */}
            <div style={{
              background: '#141414',
              borderRadius: '20px',
              padding: '25px',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <p style={{ color: '#D4AF37', fontSize: '10px', letterSpacing: '2px', marginBottom: '15px', textAlign: 'center' }}>COLLABORATIONS</p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                {brands.map((brand, i) => (
                  <div key={i} style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px' }}>
                    <img src={brand.icon} alt={brand.name} style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ROW 3: À propos + Témoignages (50/50) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            {/* À propos */}
            <div style={{
              background: 'linear-gradient(145deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.02) 100%)',
              borderRadius: '24px',
              padding: '35px',
              border: '1px solid rgba(212,175,55,0.1)'
            }}>
              <p style={{ color: '#D4AF37', fontSize: '10px', letterSpacing: '3px', marginBottom: '20px' }}>À PROPOS</p>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', lineHeight: 1.9, marginBottom: '15px' }}>
                J'ai eu la chance d'être sollicité par <strong style={{ color: '#D4AF37' }}>Audi</strong> pour participer à un défi culinaire destiné à des sportifs de haut niveau. Une expérience enrichissante face à un jury d'exception : <strong style={{ color: '#fff' }}>Thierry Marx</strong> et <strong style={{ color: '#fff' }}>Jessica Préalpato</strong>. Challenge que j'ai eu l'honneur de remporter.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.9 }}>
                Aujourd'hui, je continue de partager ma passion avec vous, en rendant la cuisine accessible à tous.
              </p>
            </div>

            {/* Témoignages */}
            <div style={{
              background: '#141414',
              borderRadius: '24px',
              padding: '35px',
              border: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Quote size={28} style={{ color: '#D4AF37', opacity: 0.5 }} />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={prevSlide} style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronLeft size={16} color="#fff" />
                  </button>
                  <button onClick={nextSlide} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#D4AF37', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronRight size={16} color="#000" />
                  </button>
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.9, marginBottom: '25px', fontStyle: 'italic', flex: 1 }}>
                "{testimonials[activeSlide].text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'linear-gradient(135deg, #D4AF37, #C77A4E)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 700 }}>
                  {testimonials[activeSlide].initial}
                </div>
                <div>
                  <p style={{ color: '#fff', fontWeight: 600, fontSize: '14px' }}>{testimonials[activeSlide].name}</p>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>{testimonials[activeSlide].role}</p>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '3px' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#D4AF37" color="#D4AF37" />)}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '5px', marginTop: '20px', justifyContent: 'center' }}>
                {testimonials.map((_, index) => (
                  <button key={index} onClick={() => setActiveSlide(index)} style={{ width: index === activeSlide ? '18px' : '6px', height: '6px', borderRadius: '3px', background: index === activeSlide ? '#D4AF37' : 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* VERSION C - Mix Élégant */}
      {/* ============================================ */}
      <div style={{ background: '#D4AF37', padding: '10px', textAlign: 'center' }}>
        <span style={{ color: '#000', fontSize: '11px', fontWeight: 600, letterSpacing: '2px' }}>VERSION C — MIX ÉLÉGANT</span>
      </div>

      <section style={{ background: '#f8f6f3', padding: '50px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* ROW 1: Merci Full Width - Style doré subtil */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 100%)',
            borderRadius: '24px',
            padding: '30px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '15px',
            border: '1px solid rgba(212,175,55,0.2)'
          }}>
            <p style={{ fontSize: '18px', color: '#333', fontWeight: 300 }}>Merci de votre confiance</p>
            <p style={{ fontSize: '36px', fontWeight: 700, color: '#D4AF37', lineHeight: 1 }}>+700K</p>
          </div>

          {/* ROW 2: 4 Cards (3 réseaux + Collabs) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '15px' }}>
            {/* TikTok */}
            <div style={{
              background: '#1a1a1a',
              borderRadius: '20px',
              padding: '25px',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" alt="TikTok" style={{ width: '38px', height: '38px' }} />
              <div>
                <p style={{ fontSize: '28px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>467K</p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>TikTok</p>
              </div>
            </div>

            {/* Instagram */}
            <div style={{
              background: '#1a1a1a',
              borderRadius: '20px',
              padding: '25px',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" style={{ width: '38px', height: '38px' }} />
              <div>
                <p style={{ fontSize: '28px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>130K</p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>Instagram</p>
              </div>
            </div>

            {/* YouTube */}
            <div style={{
              background: '#1a1a1a',
              borderRadius: '20px',
              padding: '25px',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <img src="https://cdn-icons-png.flaticon.com/512/174/174883.png" alt="YouTube" style={{ width: '38px', height: '38px' }} />
              <div>
                <p style={{ fontSize: '28px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>105K</p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>YouTube</p>
              </div>
            </div>

            {/* Collaborations */}
            <div style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '25px',
              boxShadow: '0 2px 15px rgba(0,0,0,0.04)'
            }}>
              <p style={{ color: '#D4AF37', fontSize: '10px', letterSpacing: '2px', marginBottom: '15px', textAlign: 'center' }}>COLLABORATIONS</p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                {brands.map((brand, i) => (
                  <div key={i} style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f8f8f8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px' }}>
                    <img src={brand.icon} alt={brand.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ROW 3: À propos + Témoignages (50/50) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            {/* À propos - Fond sombre */}
            <div style={{
              background: '#1a1a1a',
              borderRadius: '24px',
              padding: '35px'
            }}>
              <p style={{ color: '#D4AF37', fontSize: '10px', letterSpacing: '3px', marginBottom: '20px' }}>À PROPOS</p>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', lineHeight: 1.9, marginBottom: '15px' }}>
                J'ai eu la chance d'être sollicité par <strong style={{ color: '#D4AF37' }}>Audi</strong> pour participer à un défi culinaire destiné à des sportifs de haut niveau. Une expérience enrichissante face à un jury d'exception : <strong style={{ color: '#fff' }}>Thierry Marx</strong> et <strong style={{ color: '#fff' }}>Jessica Préalpato</strong>. Challenge que j'ai eu l'honneur de remporter.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.9 }}>
                Aujourd'hui, je continue de partager ma passion avec vous, en rendant la cuisine accessible à tous.
              </p>
            </div>

            {/* Témoignages - Fond clair */}
            <div style={{
              background: '#fff',
              borderRadius: '24px',
              padding: '35px',
              boxShadow: '0 4px 25px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Quote size={28} style={{ color: '#D4AF37', opacity: 0.5 }} />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={prevSlide} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f5f5f5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronLeft size={16} color="#333" />
                  </button>
                  <button onClick={nextSlide} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#D4AF37', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronRight size={16} color="#000" />
                  </button>
                </div>
              </div>
              <p style={{ color: '#333', fontSize: '15px', lineHeight: 1.9, marginBottom: '25px', fontStyle: 'italic', flex: 1 }}>
                "{testimonials[activeSlide].text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'linear-gradient(135deg, #D4AF37, #C77A4E)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 700 }}>
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
              <div style={{ display: 'flex', gap: '5px', marginTop: '20px', justifyContent: 'center' }}>
                {testimonials.map((_, index) => (
                  <button key={index} onClick={() => setActiveSlide(index)} style={{ width: index === activeSlide ? '18px' : '6px', height: '6px', borderRadius: '3px', background: index === activeSlide ? '#D4AF37' : '#ddd', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div style={{ background: '#0a0a0a', padding: '50px 20px', textAlign: 'center' }}>
        <p style={{ color: '#D4AF37', fontSize: '14px', marginBottom: '10px' }}>
          Quelle version ?
        </p>
        <p style={{ color: '#666', fontSize: '12px' }}>
          <strong style={{ color: '#888' }}>A</strong> Fond Clair ·
          <strong style={{ color: '#888' }}> B</strong> Fond Sombre ·
          <strong style={{ color: '#888' }}> C</strong> Mix Élégant
        </p>
      </div>
    </div>
  );
}
