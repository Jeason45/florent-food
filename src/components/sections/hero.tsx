"use client";

import { useState } from "react";
import { NewsletterForm } from "@/components/forms/newsletter-form";

export function HeroSection() {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"free" | "premium">("free");

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-black">
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

      {/* Bottom Pricing Section */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="relative py-12 sm:py-16 md:py-20">
          <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            {/* Pills Tabs avec fond commun - VERSION RADICALE */}
            <div className="flex justify-center mb-24 sm:mb-28 md:mb-32 lg:mb-40 px-4">
              <div className="inline-flex gap-3 md:gap-4 bg-white/10 backdrop-blur-md p-3 md:p-4 rounded-full">
                <button
                  onClick={() => setSelectedPlan("free")}
                  style={{
                    padding: '0.7rem 2.6rem',
                    fontSize: '0.65rem',
                    backgroundColor: selectedPlan === "free" ? '#D98066' : 'transparent',
                    color: selectedPlan === "free" ? 'white' : 'rgba(255,255,255,0.6)',
                    borderRadius: '9999px',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    transition: 'all 300ms',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Gratuit
                </button>
                <button
                  onClick={() => setSelectedPlan("premium")}
                  style={{
                    padding: '0.7rem 2.6rem',
                    fontSize: '0.65rem',
                    backgroundColor: selectedPlan === "premium" ? '#D98066' : 'transparent',
                    color: selectedPlan === "premium" ? 'white' : 'rgba(255,255,255,0.6)',
                    borderRadius: '9999px',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    transition: 'all 300ms',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Premium 2,99€
                </button>
              </div>
            </div>

            {/* Details Card - UPDATED */}
            <div className="bg-[#6B5D52]/40 backdrop-blur-3xl rounded-[1.5rem] shadow-2xl border border-white/5">
              <div className="px-12 sm:px-16 md:px-20 lg:px-24 pb-8 sm:pb-10 md:pb-12 lg:pb-14">
                {/* Grand espace en haut - VISIBLE */}
                <div className="h-4 sm:h-5 md:h-6 lg:h-8"></div>

                {/* Features List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-10 md:gap-x-12 gap-y-4 sm:gap-y-5 md:gap-y-6 mb-12 sm:mb-14 md:mb-16 lg:mb-20">
                  {(selectedPlan === "free"
                    ? ["1 recette par semaine", "Accès à 25 recettes exclusives", "Newsletter hebdomadaire", "Conseils et astuces"]
                    : ["7 recettes par semaine", "Accès à +150 recettes exclusives", "Liste de courses automatique", "Vidéos pas-à-pas détaillées", "Newsletter hebdomadaire", "Conseils et astuces"]
                  ).map((feature, i) => (
                    <div key={i} className="flex items-center gap-2.5 sm:gap-3 md:gap-4">
                      <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#D98066] flex-shrink-0"></div>
                      <span className="text-sm sm:text-[15px] md:text-base lg:text-lg text-white font-light tracking-wide">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button - Intégré au bas de la carte */}
              <div className="md:pt-4 lg:pt-6" style={{
                paddingLeft: '0',
                paddingRight: '0',
                paddingTop: '1rem',
                paddingBottom: '0'
              }}>
                <button
                  onClick={() => setIsNewsletterOpen(true)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 1rem',
                    backgroundColor: '#D98066',
                    color: 'white',
                    borderRadius: '0 0 1.5rem 1.5rem',
                    fontSize: '0.6rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.25em',
                    fontWeight: '600',
                    transition: 'all 300ms',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {selectedPlan === "free" ? "S'inscrire gratuitement" : "Devenir Premium"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Modal */}
      {isNewsletterOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-xl z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fade-in"
          onClick={() => setIsNewsletterOpen(false)}
        >
          <div
            className="bg-[#FFF8F0] rounded-lg p-8 sm:p-10 md:p-12 lg:p-14 xl:p-16 max-w-xl w-full animate-scale-in shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-8 sm:mb-10">
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-5 sm:mb-6 text-[#1a1410] tracking-tight leading-tight">
                Rejoignez-nous
              </h3>
              <p className="text-[#6B5D52] mb-0 text-xs sm:text-sm md:text-base leading-relaxed tracking-wide px-2">
                Recevez chaque semaine une nouvelle recette détaillée et des astuces exclusives
              </p>
            </div>
            <NewsletterForm
              variant="modal"
              source="hero_modal"
              onSuccess={() => setTimeout(() => setIsNewsletterOpen(false), 3000)}
            />
          </div>
        </div>
      )}
    </section>
  );
}
