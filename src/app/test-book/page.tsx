"use client";

import { BookOpen, ExternalLink, ShoppingBag, ArrowRight, Star } from "lucide-react";

const bookLink = "https://www.dashbook.fr/project/les-recettes-de-florent";

export default function TestBookPage() {
  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#1a1a1a' }}>
        Test - Présentations du livre
      </h1>

      {/* VERSION 1 - Plein écran immersif */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ padding: '10px 20px', background: '#1a1a1a', color: '#fff', fontSize: '14px' }}>
          Version 1 - Plein écran immersif (fond sombre)
        </h2>
        <div style={{
          background: '#1a1a1a',
          padding: '80px 20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '80px',
          flexWrap: 'wrap'
        }}>
          <img
            src="/livre-florent.png"
            alt="Les Recettes de Florent"
            style={{
              width: '350px',
              height: 'auto',
              filter: 'drop-shadow(0 30px 60px rgba(212, 175, 55, 0.4))',
            }}
          />
          <div style={{ maxWidth: '450px', textAlign: 'left' }}>
            <p style={{ color: '#D4AF37', fontSize: '12px', letterSpacing: '3px', marginBottom: '20px' }}>
              MON PREMIER LIVRE
            </p>
            <h2 style={{ color: '#fff', fontSize: '42px', fontWeight: 700, marginBottom: '20px', lineHeight: 1.2 }}>
              Les Recettes de <span style={{ color: '#D4AF37' }}>Florent</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: 1.8, marginBottom: '30px' }}>
              Retrouve mes meilleures recettes dans un livre exclusif. Des plats gourmands, des astuces de chef et des créations originales à réaliser chez toi.
            </p>
            <a
              href={bookLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: '#D4AF37',
                color: '#000',
                padding: '18px 36px',
                borderRadius: '50px',
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              Commander le livre
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* VERSION 2 - Centré minimaliste */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ padding: '10px 20px', background: '#1a1a1a', color: '#fff', fontSize: '14px' }}>
          Version 2 - Centré minimaliste (fond clair)
        </h2>
        <div style={{
          background: 'linear-gradient(to bottom, #FFFBF7, #FFF5EB)',
          padding: '80px 20px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#D4AF37', fontSize: '11px', letterSpacing: '3px', marginBottom: '30px' }}>
            DISPONIBLE MAINTENANT
          </p>
          <img
            src="/livre-florent.png"
            alt="Les Recettes de Florent"
            style={{
              width: '320px',
              height: 'auto',
              filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.2))',
              marginBottom: '40px'
            }}
          />
          <h2 style={{ color: '#1a1a1a', fontSize: '36px', fontWeight: 700, marginBottom: '15px' }}>
            Les Recettes de <span style={{ color: '#D4AF37' }}>Florent</span>
          </h2>
          <p style={{ color: '#666', fontSize: '16px', maxWidth: '500px', margin: '0 auto 30px', lineHeight: 1.7 }}>
            +50 recettes exclusives pour régaler tes proches
          </p>
          <a
            href={bookLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: '#1a1a1a',
              color: '#fff',
              padding: '16px 32px',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            Découvrir le livre
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* VERSION 3 - Card flottante */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ padding: '10px 20px', background: '#1a1a1a', color: '#fff', fontSize: '14px' }}>
          Version 3 - Card flottante
        </h2>
        <div style={{
          background: '#FFFBF7',
          padding: '60px 20px'
        }}>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            background: '#fff',
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
            display: 'flex',
            overflow: 'hidden',
            flexWrap: 'wrap'
          }}>
            <div style={{
              flex: '1 1 300px',
              background: '#1a1a1a',
              padding: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src="/livre-florent.png"
                alt="Les Recettes de Florent"
                style={{
                  width: '280px',
                  height: 'auto',
                  filter: 'drop-shadow(0 20px 40px rgba(212, 175, 55, 0.3))',
                }}
              />
            </div>
            <div style={{
              flex: '1 1 300px',
              padding: '50px 40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '15px' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#D4AF37" color="#D4AF37" />)}
              </div>
              <h2 style={{ color: '#1a1a1a', fontSize: '32px', fontWeight: 700, marginBottom: '15px', lineHeight: 1.2 }}>
                Les Recettes de Florent
              </h2>
              <p style={{ color: '#666', fontSize: '15px', lineHeight: 1.7, marginBottom: '25px' }}>
                Mon premier livre de cuisine avec +50 recettes testées et approuvées par ma communauté. Du petit-déjeuner au dessert, régale-toi !
              </p>
              <a
                href={bookLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'linear-gradient(135deg, #D4AF37 0%, #B8960C 100%)',
                  color: '#000',
                  padding: '16px 28px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  alignSelf: 'flex-start'
                }}
              >
                <ShoppingBag size={18} />
                Commander
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* VERSION 4 - Bandeau simple */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ padding: '10px 20px', background: '#1a1a1a', color: '#fff', fontSize: '14px' }}>
          Version 4 - Bandeau compact
        </h2>
        <div style={{
          background: '#1a1a1a',
          padding: '30px 20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '40px',
          flexWrap: 'wrap'
        }}>
          <img
            src="/livre-florent.png"
            alt="Les Recettes de Florent"
            style={{
              width: '120px',
              height: 'auto',
              filter: 'drop-shadow(0 10px 30px rgba(212, 175, 55, 0.3))',
            }}
          />
          <div style={{ textAlign: 'left' }}>
            <p style={{ color: '#D4AF37', fontSize: '10px', letterSpacing: '2px', marginBottom: '8px' }}>
              NOUVEAU
            </p>
            <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: 600, marginBottom: '5px' }}>
              Les Recettes de Florent
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>
              +50 recettes exclusives
            </p>
          </div>
          <a
            href={bookLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#D4AF37',
              color: '#000',
              padding: '14px 24px',
              borderRadius: '50px',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            Découvrir
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* VERSION 5 - Full width avec image grande */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ padding: '10px 20px', background: '#1a1a1a', color: '#fff', fontSize: '14px' }}>
          Version 5 - Grande image à gauche
        </h2>
        <div style={{
          background: 'linear-gradient(135deg, #1a1a1a 50%, #D4AF37 50%)',
          padding: '60px 20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '60px',
          flexWrap: 'wrap',
          minHeight: '500px'
        }}>
          <img
            src="/livre-florent.png"
            alt="Les Recettes de Florent"
            style={{
              width: '380px',
              height: 'auto',
              filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.4))',
            }}
          />
          <div style={{ maxWidth: '400px', textAlign: 'left' }}>
            <h2 style={{ color: '#1a1a1a', fontSize: '38px', fontWeight: 700, marginBottom: '20px', lineHeight: 1.2 }}>
              Le livre qu'il te faut
            </h2>
            <p style={{ color: '#1a1a1a', fontSize: '16px', lineHeight: 1.7, marginBottom: '30px', opacity: 0.8 }}>
              Des recettes simples, gourmandes et accessibles. Parfait pour épater tes proches !
            </p>
            <a
              href={bookLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: '#1a1a1a',
                color: '#fff',
                padding: '18px 36px',
                borderRadius: '50px',
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              Je commande
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* VERSION 6 - Très sobre et élégant */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ padding: '10px 20px', background: '#1a1a1a', color: '#fff', fontSize: '14px' }}>
          Version 6 - Ultra sobre (style Cédric Grolet)
        </h2>
        <div style={{
          background: '#fff',
          padding: '100px 20px',
          textAlign: 'center',
          borderTop: '1px solid #eee',
          borderBottom: '1px solid #eee'
        }}>
          <img
            src="/livre-florent.png"
            alt="Les Recettes de Florent"
            style={{
              width: '300px',
              height: 'auto',
              marginBottom: '50px'
            }}
          />
          <p style={{ color: '#1a1a1a', fontSize: '14px', letterSpacing: '4px', marginBottom: '20px' }}>
            LES RECETTES DE FLORENT
          </p>
          <a
            href={bookLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#1a1a1a',
              fontSize: '13px',
              textDecoration: 'underline',
              textUnderlineOffset: '4px'
            }}
          >
            Commander le livre
          </a>
        </div>
      </section>

    </div>
  );
}
