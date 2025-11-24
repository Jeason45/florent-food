"use client";

import { useState } from "react";
import { Mail, ChefHat, BookOpen, Calendar, Star } from "lucide-react";
import { AuthModal } from "@/components/AuthModal";
import { useAuth } from "@/contexts/AuthContext";

export function WhySubscribeSection() {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const benefits = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "5 recettes par semaine",
      description: "Reçois chaque semaine une sélection de recettes exclusives directement dans ta boîte mail"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Recettes testées et approuvées",
      description: "Toutes mes recettes sont testées plusieurs fois pour garantir un résultat parfait"
    },
    {
      icon: <ChefHat className="w-6 h-6" />,
      title: "Astuces de chef",
      description: "Bénéficie de conseils professionnels et d'astuces pour sublimer tes plats"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Contenu exclusif",
      description: "Accède à du contenu premium réservé uniquement aux membres de la newsletter"
    }
  ];

  return (
    <>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />

      <section className="relative py-20 sm:py-24 md:py-32 lg:py-40 overflow-hidden" style={{
        background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1f2e 50%, #0f1521 100%)'
      }}>
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{
          background: 'linear-gradient(135deg, #D4AF37, #C77A4E)'
        }}></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full opacity-20 blur-3xl" style={{
          background: 'linear-gradient(135deg, #C77A4E, #D4AF37)'
        }}></div>

        <div className="relative max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl px-5 sm:px-8 lg:px-12" style={{ margin: '0 auto' }}>
          {/* Header */}
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full" style={{
              background: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid rgba(212, 175, 55, 0.2)'
            }}>
              <Mail className="w-4 h-4" style={{ color: '#D4AF37' }} />
              <span style={{
                fontSize: '11px',
                fontWeight: '600',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#D4AF37'
              }}>
                Newsletter Exclusive
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight tracking-tight" style={{
              background: 'linear-gradient(to right, #fff, #e5e5e5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Pourquoi t'abonner à
              <span className="block mt-2 font-normal italic" style={{
                background: 'linear-gradient(to right, #D4AF37, #C77A4E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                la newsletter ?
              </span>
            </h2>

            <p className="text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed font-light" style={{ textAlign: 'center', margin: '0 auto' }}>
              Rejoins plus de <strong className="font-semibold text-white">10 000 passionnés</strong> qui reçoivent chaque semaine du contenu exclusif
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300" style={{
                    background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(199, 122, 78, 0.15))',
                    color: '#D4AF37'
                  }}>
                    {benefit.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2" style={{
                      background: 'linear-gradient(to right, #D4AF37, #C77A4E)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={() => !isAuthenticated && setShowAuthModal(true)}
              disabled={isAuthenticated}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: isAuthenticated ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(to right, #D4AF37, #C77A4E)',
                color: isAuthenticated ? '#fff' : '#000',
                letterSpacing: '0.5px'
              }}
            >
              {isAuthenticated ? (
                <>
                  <Star className="w-5 h-5" />
                  Déjà membre
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5" />
                  Je m'inscris gratuitement
                </>
              )}
            </button>
            <p className="text-xs text-white/50 mt-4 font-light">
              ✓ Gratuit · ✓ Sans engagement · ✓ Désinscription en 1 clic
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
