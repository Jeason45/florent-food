"use client";

import { useState } from "react";

const plans = {
  free: {
    name: "Essentiel",
    price: "Gratuit",
    period: "",
    description: "Pour découvrir et s'inspirer avec des recettes exclusives",
    features: [
      "1 recette par semaine",
      "Accès à 25 recettes exclusives",
      "Newsletter hebdomadaire",
      "Conseils et astuces",
    ],
    cta: "Commencer gratuitement",
  },
  premium: {
    name: "Premium",
    price: "2,99€",
    period: "/mois",
    description: "Pour les passionnés qui veulent aller plus loin",
    features: [
      "7 recettes par semaine",
      "Accès à +150 recettes exclusives",
      "Liste de courses automatique",
      "Vidéos pas-à-pas détaillées",
      "Techniques de chef exclusives",
      "Groupe privé communauté",
      "Support prioritaire",
      "Accès anticipé nouveautés",
    ],
    cta: "Devenir Premium",
  },
};

export function PricingPlansSection() {
  const [selectedPlan, setSelectedPlan] = useState<"free" | "premium">("free");
  const plan = plans[selectedPlan];

  return (
    <section className="relative py-20 sm:py-24 md:py-32 bg-black overflow-hidden">
      <div className="relative w-full max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-4">
            Choisis ton <span className="italic" style={{ background: 'linear-gradient(to right, #D4AF37, #C77A4E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>plan</span>
          </h2>
          <p className="text-base sm:text-lg text-white/60 max-w-xl mx-auto leading-relaxed font-light">
            Recettes exclusives chaque semaine
          </p>
        </div>

        {/* Pills Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex gap-3 bg-white/5 p-2 rounded-full backdrop-blur-sm">
            <button
              onClick={() => setSelectedPlan("free")}
              className={`px-10 sm:px-12 py-4 rounded-full text-sm sm:text-base uppercase tracking-wider font-medium transition-all duration-300 ${
                selectedPlan === "free"
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#C77A4E] text-black shadow-lg'
                  : 'text-white/50 hover:text-white/70'
              }`}
            >
              Essentiel
            </button>
            <button
              onClick={() => setSelectedPlan("premium")}
              className={`px-10 sm:px-12 py-4 rounded-full text-sm sm:text-base uppercase tracking-wider font-medium transition-all duration-300 ${
                selectedPlan === "premium"
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#C77A4E] text-black shadow-lg'
                  : 'text-white/50 hover:text-white/70'
              }`}
            >
              Premium 2,99€
            </button>
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-white/5 border border-[#D4AF37]/20 rounded-3xl p-10 sm:p-12 md:p-16">

          {/* Price Display */}
          <div className="text-center mb-12">
            <div className="text-6xl sm:text-7xl md:text-8xl font-light mb-3" style={{ background: 'linear-gradient(to right, #D4AF37, #C77A4E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {plan.price}
            </div>
            {plan.period && (
              <div className="text-lg sm:text-xl text-white/50 font-light">{plan.period}</div>
            )}
            <div className="text-base sm:text-lg text-white/60 mt-6 font-light leading-relaxed max-w-2xl mx-auto">
              {plan.description}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-12">
            {plan.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'linear-gradient(to right, #D4AF37, #C77A4E)', opacity: 0.1 }}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="url(#gradient-checkmark)" strokeWidth="3" viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="gradient-checkmark" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#D4AF37" />
                        <stop offset="100%" stopColor="#C77A4E" />
                      </linearGradient>
                    </defs>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-full py-5 sm:py-6 bg-gradient-to-r from-[#D4AF37] to-[#C77A4E] text-black rounded-2xl text-sm sm:text-base uppercase tracking-wider font-semibold hover:shadow-2xl hover:shadow-[#D4AF37]/40 transition-all duration-300 hover:-translate-y-1"
          >
            {plan.cta}
          </button>
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-14 sm:mt-16">
          <p className="text-sm sm:text-base text-white/40 font-light leading-relaxed">
            ✓ Annulation possible à tout moment · ✓ Paiement sécurisé · ✓ Désinscription en 1 clic
          </p>
        </div>
      </div>
    </section>
  );
}
