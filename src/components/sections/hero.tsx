"use client";

import { useState, useEffect } from "react";
import type confetti from "canvas-confetti";

interface HeroSectionProps {
  id?: string;
}

export function HeroSection({ id }: HeroSectionProps = {}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Fonction pour déclencher le feu d'artifice de confettis
  const triggerConfetti = async () => {
    // Charger confetti dynamiquement côté client
    const confettiModule = await import("canvas-confetti");
    const confetti = confettiModule.default;
    const duration = 3000; // 3 secondes
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

      // Depuis la gauche
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });

      // Depuis la droite
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

      // Déclencher le feu d'artifice de confettis
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
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Hero Text Content - Empty for cleaner look */}
      <div className="relative z-20 min-h-[100svh] flex flex-col justify-center items-center text-center px-5 sm:px-8 lg:px-12 pb-32">
      </div>

      {/* Bottom Form Section - Lowered positioning */}
      <div className="absolute left-0 right-0 z-30 bottom-0 lg:bottom-4">
        <div className="relative">
          <div className="max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12" style={{ margin: '0 auto' }}>
            {/* Card */}
            <div className="bg-[#6B5D52]/40 backdrop-blur-3xl rounded-[1.5rem] shadow-2xl border border-white/5">
              <div className="px-10 sm:px-12 md:px-16 lg:px-20 pb-6 sm:pb-8 md:pb-10">
                {/* Espace en haut */}
                <div className="h-3 sm:h-4 md:h-5"></div>

                {/* Features List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-8 md:gap-x-10 gap-y-3 sm:gap-y-4 md:gap-y-5 mb-8 sm:mb-10 md:mb-12">
                {["5 recettes par semaine", "Newsletter hebdomadaire", "Conseils et astuces", "Contenu exclusif"].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to right, #D4AF37, #C77A4E)' }}></div>
                    <span className="text-sm md:text-base text-white font-light tracking-wide">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

                {/* Email Form */}
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    {status === "success" ? (
                      <div className="text-center py-4">
                        <p className="text-green-400 font-medium text-lg">Email envoyé !</p>
                        <p className="text-white/80 text-sm mt-2">Vérifie ta boîte mail et clique sur le lien de confirmation.</p>
                        <p className="text-white/60 text-xs mt-2 italic">Pense à vérifier tes spams, c'est notre premier échange !</p>
                      </div>
                    ) : (
                      <>
                        <input
                          type="email"
                          placeholder="Votre email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={status === "loading"}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all disabled:opacity-50"
                        />
                        {status === "error" && (
                          <p className="text-red-400 text-sm">{errorMessage}</p>
                        )}
                      </>
                    )}
                  </div>

                  {status !== "success" && (
                    <>
                      <div className="md:pt-4 lg:pt-6" style={{
                        paddingLeft: '0',
                        paddingRight: '0',
                        paddingTop: '1rem',
                        paddingBottom: '0'
                      }}>
                        <button
                          type="submit"
                          disabled={status === "loading"}
                          style={{
                            width: '100%',
                            padding: '0.6rem 1rem',
                            background: 'linear-gradient(to right, #D4AF37, #C77A4E)',
                            color: 'white',
                            borderRadius: '0 0 1.5rem 1.5rem',
                            fontSize: '0.6rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.25em',
                            fontWeight: '600',
                            transition: 'all 300ms',
                            border: 'none',
                            cursor: status === "loading" ? 'wait' : 'pointer',
                            opacity: status === "loading" ? 0.7 : 1
                          }}
                        >
                          {status === "loading" ? "Inscription..." : "S'inscrire gratuitement"}
                        </button>
                      </div>

                      {/* Clause RGPD */}
                      <p style={{
                        fontSize: '11px',
                        color: 'rgba(255,255,255,0.6)',
                        textAlign: 'center',
                        lineHeight: '1.6',
                        marginTop: '12px',
                        paddingLeft: '8px',
                        paddingRight: '8px'
                      }}>
                        En t'inscrivant, tu acceptes de recevoir notre newsletter et que tes données soient traitées conformément à notre{' '}
                        <a
                          href="/politique-confidentialite"
                          style={{
                            color: '#D4AF37',
                            textDecoration: 'underline',
                            transition: 'color 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#C77A4E'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#D4AF37'}
                        >
                          politique de confidentialité
                        </a>
                        . Désinscription possible à tout moment.
                      </p>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
