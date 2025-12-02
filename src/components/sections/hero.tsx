"use client";

import { useState } from "react";

// Styles pour l'animation shine
const shineStyles = `
  @keyframes shine {
    0% { left: -100%; }
    100% { left: 100%; }
  }
`;

interface HeroSectionProps {
  id?: string;
}

export function HeroSection({ id }: HeroSectionProps = {}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Fonction pour déclencher le feu d'artifice de confettis
  const triggerConfetti = async () => {
    const confettiModule = await import("canvas-confetti");
    const confetti = confettiModule.default;
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 9999,
      colors: ['#D4AF37', '#C77A4E', '#FFD700', '#FFA500', '#FF6347']
    };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, source: "hero" }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Une erreur est survenue");
      }

      setStatus("success");
      setEmail("");
      triggerConfetti();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Impossible de s'inscrire. Réessaye plus tard."
      );
    }
  };

  return (
    <section id={id} className="relative min-h-[100svh] overflow-hidden bg-black">
      {/* Animation CSS */}
      <style dangerouslySetInnerHTML={{ __html: shineStyles }} />

      {/* Background Image - Responsive avec images optimisées */}
      <div className="absolute inset-0 z-0">
        {/* Image mobile (< 768px) */}
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet="/hero-mobile.jpg"
          />
          <source
            media="(min-width: 768px)"
            srcSet="/hero-optimized.jpg"
          />
          <img
            src="/hero-optimized.jpg"
            alt="Hero background"
            fetchPriority="high"
            decoding="async"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </picture>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Card en bas - Style Mix B3 */}
      <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-10 w-[95%] max-w-[620px]">
        <div
          className="backdrop-blur-xl rounded-3xl border border-white/10 flex flex-col items-center justify-center text-center"
          style={{
            background: 'rgba(107, 93, 82, 0.5)',
            paddingLeft: 'clamp(18px, 4vw, 24px)',
            paddingRight: 'clamp(18px, 4vw, 24px)',
            paddingTop: 'clamp(14px, 3vw, 18px)',
            paddingBottom: 'clamp(12px, 2vw, 14px)'
          }}
        >
          {status === "success" ? (
            <div className="py-4">
              <p className="text-green-400 font-medium text-lg">Email envoyé !</p>
              <p className="text-white/80 text-sm mt-2">Vérifie ta boîte mail et clique sur le lien de confirmation.</p>
              <p className="text-white/60 text-xs mt-2 italic">Pense à vérifier tes spams, c'est notre premier échange !</p>
            </div>
          ) : (
            <>
              {/* Badge 100% Gratuit avec effet Shine - Compact */}
              <div
                className="inline-flex items-center rounded-full relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                  padding: 'clamp(5px, 1.5vw, 6px) clamp(12px, 3vw, 16px)',
                  boxShadow: '0 2px 10px rgba(212, 175, 55, 0.35)',
                  marginBottom: 'clamp(8px, 2vw, 10px)'
                }}
              >
                {/* Shine overlay */}
                <div
                  className="absolute top-0 w-full h-full pointer-events-none"
                  style={{
                    left: '-100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    animation: 'shine 2.5s infinite'
                  }}
                />
                <span
                  className="relative z-10"
                  style={{
                    color: '#000',
                    fontSize: 'clamp(9px, 2.5vw, 10px)',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}
                >
                  100% Gratuit
                </span>
              </div>

              <h2
                style={{
                  fontSize: 'clamp(22px, 5vw, 32px)',
                  fontWeight: 600,
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  lineHeight: 1.2,
                  color: '#fff',
                  marginBottom: 'clamp(2px, 1vw, 4px)'
                }}
              >
                Envie de nouvelles idées recettes ?
              </h2>

              <p className="text-white/80 mb-2 sm:mb-3 text-sm sm:text-[15px] leading-relaxed sm:whitespace-nowrap">
                Rejoins les <span className="text-[#D4AF37] font-semibold">848K+ gourmands</span> et reçois <strong>5 recettes exclusives</strong> chaque semaine.
              </p>

              <form onSubmit={handleSubmit} className="w-full">
                {/* Desktop: Pill form compact */}
                <div
                  className="hidden sm:flex items-center rounded-full w-full overflow-hidden"
                  style={{
                    background: 'rgba(0, 0, 0, 0.35)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2), 0 0 20px rgba(212, 175, 55, 0.1)',
                    padding: '4px'
                  }}
                >
                  <input
                    type="email"
                    placeholder="Ton adresse email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === "loading"}
                    className="flex-1 bg-transparent border-none text-white placeholder-white/40 focus:outline-none disabled:opacity-50 focus:placeholder-white/60 transition-all"
                    style={{
                      padding: '8px 18px',
                      fontSize: '14px',
                      minWidth: 0,
                      letterSpacing: '0.02em'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="rounded-full text-white font-semibold whitespace-nowrap transition-all duration-300 disabled:opacity-70 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                    style={{
                      padding: '8px 22px',
                      background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 50%, #D4AF37 100%)',
                      backgroundSize: '200% 200%',
                      fontSize: '12px',
                      cursor: status === "loading" ? 'wait' : 'pointer',
                      boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)',
                      letterSpacing: '0.03em',
                      textTransform: 'uppercase'
                    }}
                  >
                    {status === "loading" ? "..." : "Je m'inscris"}
                  </button>
                </div>

                {/* Mobile: Pill form compact */}
                <div
                  className="flex sm:hidden items-center rounded-full w-full overflow-hidden"
                  style={{
                    background: 'rgba(0, 0, 0, 0.35)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2), 0 0 20px rgba(212, 175, 55, 0.1)',
                    padding: '4px'
                  }}
                >
                  <input
                    type="email"
                    placeholder="Ton email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === "loading"}
                    className="flex-1 bg-transparent border-none text-white placeholder-white/40 focus:outline-none disabled:opacity-50 transition-all"
                    style={{
                      padding: '10px 12px',
                      fontSize: '13px',
                      minWidth: 0
                    }}
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="rounded-full text-white font-semibold whitespace-nowrap transition-all disabled:opacity-70 active:scale-[0.98]"
                    style={{
                      padding: '10px 14px',
                      background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 50%, #D4AF37 100%)',
                      fontSize: '11px',
                      cursor: status === "loading" ? 'wait' : 'pointer',
                      boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)',
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase'
                    }}
                  >
                    {status === "loading" ? "..." : "Je m'inscris"}
                  </button>
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-sm mt-3">{errorMessage}</p>
                )}

                <p className="text-white/40 text-[10px] mt-2 mb-0 leading-tight">
                  Gratuit · Sans engagement · Désinscription 1 clic<br />
                  En t'inscrivant, tu acceptes notre{' '}
                  <a
                    href="/politique-confidentialite"
                    className="text-[#D4AF37] underline hover:text-[#C77A4E] transition-colors"
                  >
                    politique de confidentialité
                  </a>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
