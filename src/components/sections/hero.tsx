"use client";

import { useState } from "react";
import Image from "next/image";

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
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=75&fm=webp&auto=format"
          alt="Cuisine gastronomique"
          fill
          priority
          quality={75}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Card en bas - Style Mix B3 */}
      <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-[550px]">
        <div
          className="backdrop-blur-xl rounded-3xl border border-white/10 text-center"
          style={{
            background: 'rgba(107, 93, 82, 0.5)',
            padding: 'clamp(24px, 5vw, 36px)'
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
              <h2
                className="mb-3"
                style={{
                  fontSize: 'clamp(24px, 5vw, 32px)',
                  fontWeight: 600,
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  lineHeight: 1.2,
                  color: '#fff'
                }}
              >
                Envie de nouvelles idées recettes ?
              </h2>

              <p
                className="text-white/80 mb-6"
                style={{
                  fontSize: 'clamp(14px, 3vw, 16px)',
                  lineHeight: 1.5
                }}
              >
                Rejoins les <span className="text-[#D4AF37] font-semibold">130K+ gourmands</span> et reçois
                <br /><strong>5 recettes exclusives</strong> chaque semaine.
              </p>

              <form onSubmit={handleSubmit}>
                {/* Pill form */}
                <div
                  className="flex items-center rounded-full border border-white/20"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    padding: '6px'
                  }}
                >
                  <input
                    type="email"
                    placeholder="Ton email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === "loading"}
                    className="flex-1 bg-transparent border-none text-white placeholder-white/50 focus:outline-none disabled:opacity-50"
                    style={{
                      padding: '12px 20px',
                      fontSize: '15px',
                      minWidth: 0
                    }}
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="rounded-full text-white font-semibold whitespace-nowrap transition-opacity disabled:opacity-70"
                    style={{
                      padding: '12px 24px',
                      background: 'linear-gradient(to right, #D4AF37, #C77A4E)',
                      fontSize: '14px',
                      cursor: status === "loading" ? 'wait' : 'pointer'
                    }}
                  >
                    {status === "loading" ? "..." : "Je m'inscris"}
                  </button>
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-sm mt-3">{errorMessage}</p>
                )}

                <p className="text-white/50 text-xs mt-4">
                  ✓ Gratuit · ✓ Sans engagement · ✓ Désinscription 1 clic
                </p>

                <p className="text-white/40 text-xs mt-3">
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
