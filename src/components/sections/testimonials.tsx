"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Marie L.",
    role: "Passionnée de pâtisserie",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    text: "Les recettes de Florent sont incroyables ! J'ai réussi mon premier Paris-Brest grâce à ses explications claires et détaillées. Mes invités étaient bluffés !",
    recipe: "Paris-Brest",
  },
  {
    id: 2,
    name: "Thomas K.",
    role: "Débutant en cuisine",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    text: "Même en tant que débutant, j'ai pu suivre facilement. Les vidéos sont top et les astuces font vraiment la différence. Je recommande à 100% !",
    recipe: "Risotto aux champignons",
  },
  {
    id: 3,
    name: "Sophie M.",
    role: "Abonnée depuis 2 ans",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    text: "La newsletter est une pépite ! Chaque semaine, je découvre de nouvelles recettes et techniques. C'est devenu mon rendez-vous gourmand incontournable.",
    recipe: "Tarte citron meringuée",
  },
  {
    id: 4,
    name: "Lucas B.",
    role: "Chef amateur",
    avatar: "https://i.pravatar.cc/150?img=8",
    rating: 5,
    text: "Des recettes accessibles avec un rendu professionnel ! Florent a su me redonner confiance en cuisine. Ses conseils sont précis et toujours justes.",
    recipe: "Millefeuille vanille",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative pb-16 sm:pb-20 md:pb-32 lg:pb-40 bg-gradient-to-br from-[#FFF5EB] via-[#FFFBF7] to-[#FFF8F0]" style={{ paddingTop: '40px' }}>
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-48 h-48 rounded-full bg-[#C9A961]/10 blur-3xl"></div>
      <div className="absolute bottom-40 right-10 w-40 h-40 rounded-full bg-[#E07A5F]/10 blur-3xl"></div>

      <div className="relative max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl px-5 sm:px-8 lg:px-12" style={{ margin: '0 auto' }}>
        {/* Header avec le même style que les sections recettes */}
        <div className="text-center mb-12 sm:mb-14 md:mb-16 lg:mb-20">
          {/* Ligne décorative au-dessus */}
          <div className="flex items-center justify-center mb-6 sm:mb-8 md:mb-10">
            <div className="h-[1px] w-16 sm:w-24 md:w-32 bg-gradient-to-r from-transparent to-[#E07A5F]"></div>
            <div className="mx-4 sm:mx-6 md:mx-8">
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#E07A5F]"></div>
            </div>
            <div className="h-[1px] w-16 sm:w-24 md:w-32 bg-gradient-to-l from-transparent to-[#E07A5F]"></div>
          </div>

          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light mb-4 sm:mb-5 md:mb-6 lg:mb-8 leading-[0.95] tracking-[-0.03em]">
            <span className="bg-gradient-to-r from-[#E07A5F] to-[#C9A961] bg-clip-text text-transparent">
              Témoignages
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[var(--gris-taupe)] max-w-5xl leading-relaxed font-light" style={{ textAlign: 'center', margin: '0 auto', marginTop: '0.75rem' }}>
            Ce qu'ils pensent de mes recettes
          </p>
        </div>

        {/* Testimonials Grid - 2 colonnes pour plus de visibilité */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10 mb-14 sm:mb-16 lg:mb-20" style={{ marginTop: '3rem' }}>
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="relative group bg-white rounded-xl p-6 sm:p-7 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              {/* Quote icon coloré */}
              <div className="mb-4 sm:mb-5">
                <Quote className="w-8 h-8 sm:w-9 sm:h-9 text-[#E07A5F]/40 group-hover:text-[#E07A5F]/60 transition-colors duration-500" />
              </div>

              {/* Text */}
              <p className="text-xs sm:text-sm text-[var(--noir-luxe)] mb-6 sm:mb-7 leading-relaxed font-light italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="border-t border-[var(--gris-perle)]/30 pt-4">
                <div className="text-xs sm:text-sm text-[var(--noir-luxe)] font-medium mb-1 tracking-wide">
                  {testimonial.name}
                </div>
                <div className="text-[10px] sm:text-xs text-[var(--gris-taupe)] uppercase tracking-[0.2em] font-light">
                  {testimonial.role}
                </div>
              </div>

              {/* Decorative accent */}
              <div className="absolute top-0 left-0 w-1 h-12 bg-gradient-to-b from-[#E07A5F] to-transparent rounded-tl-xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
