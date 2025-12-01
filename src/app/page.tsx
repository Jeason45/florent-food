'use client';

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { NewsletterPreviewSection } from "@/components/sections/newsletter-preview";
import { RecipeExampleSection } from "@/components/sections/recipe-example";
import { CommunitySection } from "@/components/sections/community-section";
import { SocialLinksSection } from "@/components/sections/social-links";
import { AuthModal } from "@/components/AuthModal";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Composant séparé pour gérer l'ouverture automatique du modal d'auth
function AuthRequired() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const authParam = searchParams.get('auth');
    if (authParam === 'required' || authParam === 'expired') {
      setShowAuthModal(true);
      // Nettoyer l'URL
      window.history.replaceState({}, '', '/');
    }
  }, [searchParams]);

  return (
    <AuthModal
      isOpen={showAuthModal}
      onClose={() => setShowAuthModal(false)}
    />
  );
}

// Composant séparé pour gérer le toast de confirmation (nécessite Suspense)
function ConfirmationToast() {
  const [showToast, setShowToast] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('confirmed') === 'true') {
      setShowToast(true);
      window.history.replaceState({}, '', '/');
      setTimeout(() => setShowToast(false), 8000);
    }
  }, [searchParams]);

  if (!showToast) return null;

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          background: 'linear-gradient(135deg, #D4AF37 0%, #C77A4E 100%)',
          color: '#000',
          padding: '16px 32px',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          animation: 'slideDown 0.5s ease-out'
        }}
      >
        <span style={{ fontSize: '24px' }}>🎉</span>
        <div>
          <p style={{ fontWeight: 700, fontSize: '16px', margin: 0 }}>Inscription confirmée !</p>
          <p style={{ fontSize: '14px', margin: '4px 0 0 0', opacity: 0.9 }}>Bienvenue dans la famille Florent Food</p>
        </div>
        <button
          onClick={() => setShowToast(false)}
          style={{
            background: 'rgba(0,0,0,0.2)',
            border: 'none',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '8px',
            fontSize: '16px'
          }}
        >
          ×
        </button>
      </div>
      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </>
  );
}

export default function Home() {
  return (
    <>
      {/* Modal d'auth automatique si redirection depuis recette protégée */}
      <Suspense fallback={null}>
        <AuthRequired />
      </Suspense>

      {/* Toast de confirmation d'inscription (wrappé dans Suspense pour useSearchParams) */}
      <Suspense fallback={null}>
        <ConfirmationToast />
      </Suspense>

      <Header />
      <main>
        <HeroSection id="accueil" />

        {/* Section Newsletter + Recette côte à côte sur desktop */}
        <section className="preview-grid-section" style={{
          background: 'linear-gradient(to bottom, #FFF8F0, #FFFBF7)',
          padding: '40px 20px 80px'
        }}>
          <style>{`
            .preview-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 40px;
              max-width: 1200px;
              margin: 0 auto;
            }
            @media (min-width: 1024px) {
              .preview-grid {
                grid-template-columns: 1fr 1fr;
                gap: 30px;
              }
              .preview-grid > div {
                height: 800px;
                overflow-y: auto;
                overflow-x: hidden;
                border-radius: 16px;
                scrollbar-width: thin;
                scrollbar-color: #D4AF37 transparent;
              }
              .preview-grid > div::-webkit-scrollbar {
                width: 6px;
              }
              .preview-grid > div::-webkit-scrollbar-track {
                background: transparent;
              }
              .preview-grid > div::-webkit-scrollbar-thumb {
                background: #D4AF37;
                border-radius: 3px;
              }
            }
          `}</style>
          <div className="preview-grid">
            <div id="newsletter-preview">
              <NewsletterPreviewSection />
            </div>
            <div id="recipe-preview">
              <RecipeExampleSection />
            </div>
          </div>
        </section>

        <div id="communaute">
          <CommunitySection />
        </div>
        <SocialLinksSection />
      </main>
      <Footer />
    </>
  );
}
