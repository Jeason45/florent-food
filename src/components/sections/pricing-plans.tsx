"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Essentiel",
    price: "Gratuit",
    period: "",
    description: "Pour découvrir et s'inspirer",
    features: [
      "1 recette par semaine",
      "Accès à 25 recettes exclusives",
      "Newsletter hebdomadaire",
      "Conseils et astuces",
    ],
    cta: "Commencer gratuitement",
    featured: false,
    color: "#C9A961",
  },
  {
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
    featured: true,
    color: "#E07A5F",
  },
];

export function PricingPlansSection() {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-[#FFFBF7] via-[#FFF8F0] to-[#FFF5EB] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-[#E07A5F]/5 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-[#C9A961]/5 blur-3xl"></div>

      <div className="relative w-full max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium text-[#E07A5F] mb-4 sm:mb-5 block">
            Newsletter
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[var(--noir-luxe)] mb-3 sm:mb-4 leading-[1.05] tracking-[-0.02em] px-2">
            Choisis ton
            <span className="block mt-2 font-normal italic text-[#E07A5F]">accompagnement</span>
          </h2>
          <p className="text-sm sm:text-base text-[var(--gris-taupe)] max-w-xl mx-auto px-4 leading-relaxed font-light mt-3">
            Deux formules pensées pour t'accompagner dans ton parcours culinaire
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 max-w-3xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl overflow-hidden transition-all duration-500 ${
                plan.featured
                  ? 'shadow-2xl lg:scale-105 border-2 border-[#E07A5F]/20'
                  : 'shadow-lg hover:shadow-xl'
              }`}
            >
              {/* Badge pour le plan featured */}
              {plan.featured && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-[#E07A5F] to-[#D96A50] text-white text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-medium px-4 sm:px-5 py-2 sm:py-2.5 rounded-bl-2xl">
                  Recommandé
                </div>
              )}

              <div className="p-4 sm:p-6 md:p-7 lg:p-8 flex flex-col h-full text-center">
                {/* Header */}
                <div style={{ marginBottom: '22px' }}>
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-light text-[var(--noir-luxe)] mb-2 sm:mb-3 tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs md:text-sm text-[var(--gris-taupe)] font-light leading-relaxed" style={{ marginBottom: '14px' }}>
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 justify-center">
                    <span
                      className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight"
                      style={{ color: plan.color }}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-xs sm:text-sm md:text-base text-[var(--gris-taupe)] font-light">
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2.5 sm:space-y-3 md:space-y-4 mb-5 sm:mb-6 md:mb-7 flex-grow flex flex-col items-center">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 sm:gap-2.5 w-full max-w-[200px]">
                      <div
                        className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: `${plan.color}15` }}
                      >
                        <Check
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                          style={{ color: plan.color }}
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-[10px] sm:text-xs md:text-sm text-[var(--noir-luxe)] font-light leading-relaxed text-left">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  variant="default"
                  size="lg"
                  className={`w-full h-9 sm:h-10 md:h-11 text-[10px] sm:text-xs tracking-[0.12em] uppercase font-medium rounded-full transition-all duration-300 ${
                    plan.featured
                      ? 'bg-[#E07A5F] hover:bg-[#D96A50] text-white shadow-lg hover:shadow-xl hover:scale-105'
                      : 'bg-white hover:bg-[var(--blanc-casse)] text-[#C9A961] border-2 border-[#C9A961]/30 hover:border-[#C9A961]/50'
                  }`}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-10 sm:mt-12 md:mt-14">
          <p className="text-xs sm:text-sm text-[var(--gris-taupe)] font-light leading-relaxed">
            ✓ Annulation possible à tout moment · ✓ Paiement sécurisé · ✓ Désinscription en 1 clic
          </p>
        </div>
      </div>
    </section>
  );
}
