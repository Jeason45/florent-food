"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Users, ChefHat, ArrowRight } from "lucide-react";
import Link from "next/link";

const featuredRecipes = [
  {
    id: 1,
    title: "Tarte Citron Meringuée",
    category: "Pâtisserie",
    description: "La recette signature parfaite pour impressionner. Crémeux, acidulé et léger.",
    difficulty: "Intermédiaire",
    time: "2h30",
    servings: 8,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=1200&q=80",
    tags: ["Classique", "Signature"],
  },
  {
    id: 2,
    title: "Risotto aux Champignons",
    category: "Plat",
    description: "Un classique italien revisité avec des champignons de saison. Crémeux à souhait.",
    difficulty: "Facile",
    time: "45min",
    servings: 4,
    image: "https://images.unsplash.com/photo-1476124369491-c7addf7f7441?w=1200&q=80",
    tags: ["Réconfortant", "Végétarien"],
  },
  {
    id: 3,
    title: "Éclair Café-Vanille",
    category: "Pâtisserie",
    description: "L'alliance parfaite entre le café corsé et la douceur de la vanille bourbon.",
    difficulty: "Avancé",
    time: "3h",
    servings: 12,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80",
    tags: ["Gourmand", "Technique"],
  },
  {
    id: 4,
    title: "Saumon Mi-Cuit",
    category: "Plat",
    description: "Un saumon cuit à la perfection, fondant et savoureux avec une croûte dorée.",
    difficulty: "Intermédiaire",
    time: "35min",
    servings: 4,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80",
    tags: ["Raffiné", "Poisson"],
  },
];

export function FeaturedRecipesSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-[#FFF8F0] via-[#FFFBF7] to-[#FFF5EB] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-[#D4AF37]/5 blur-3xl"></div>
      <div className="absolute bottom-40 left-10 w-40 h-40 rounded-full bg-[#C77A4E]/5 blur-3xl"></div>

      <div className="relative w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium mb-4 sm:mb-6 block" style={{ background: 'linear-gradient(to right, #D4AF37, #C77A4E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Aperçu
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[var(--noir-luxe)] mb-4 sm:mb-5 leading-[1.05] tracking-[-0.02em] px-2">
            Quelques créations
            <span className="block mt-2 font-normal italic" style={{ background: 'linear-gradient(to right, #D4AF37, #C77A4E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>qui t'attendent</span>
          </h2>
          <p className="text-sm sm:text-base text-[var(--gris-taupe)] max-w-2xl mx-auto px-4 leading-relaxed font-light mt-4">
            Inscris-toi pour recevoir chaque semaine une recette complète avec photos pas-à-pas
          </p>
        </div>

        {/* Recipes Grid - Compact et moderne */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-16 sm:mb-20 md:mb-24">
          {featuredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="group relative"
              onMouseEnter={() => setHoveredId(recipe.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image container - Format plus compact */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg mb-5">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                {/* Category badge flottant */}
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-white px-4 py-2 rounded-full shadow-lg backdrop-blur-sm" style={{ background: 'linear-gradient(to right, #D4AF37, #C77A4E)' }}>
                    {recipe.category}
                  </span>
                </div>
              </div>

              {/* Content - Plus compact */}
              <div className="space-y-3">
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[var(--noir-luxe)] tracking-tight leading-tight group-hover:text-[#D4AF37] transition-colors duration-300">
                  {recipe.title}
                </h3>

                <p className="text-sm sm:text-base text-[var(--gris-taupe)] leading-relaxed font-light">
                  {recipe.description}
                </p>

                {/* Meta info - Compact */}
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                    <span className="text-xs sm:text-sm text-[var(--noir-luxe)] font-light">{recipe.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#C77A4E]/10 flex items-center justify-center">
                      <Users className="w-4 h-4 text-[#C77A4E]" />
                    </div>
                    <span className="text-xs sm:text-sm text-[var(--noir-luxe)] font-light">{recipe.servings} pers.</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Newsletter - Compact */}
        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#D4AF37] to-[#C77A4E] rounded-2xl shadow-xl p-8 sm:p-10 md:p-12">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative text-center space-y-6 sm:space-y-7">
              {/* Hook Principal */}
              <div className="space-y-3">
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-white leading-tight tracking-tight">
                  Ne rate plus
                  <span className="block mt-2 font-normal italic text-white/95">aucune recette</span>
                </h3>
                <p className="text-sm sm:text-base text-white/90 max-w-lg mx-auto leading-relaxed font-light">
                  Rejoins <strong className="font-semibold text-white">10 000+ passionnés</strong> qui reçoivent chaque semaine :
                </p>
              </div>

              {/* Bénéfices Clairs */}
              <div className="space-y-3 max-w-md mx-auto text-left">
                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <p className="text-xs sm:text-sm text-white font-light leading-relaxed">
                    <strong className="font-semibold text-white">1 recette détaillée</strong> avec photos pas-à-pas
                  </p>
                </div>
                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <p className="text-xs sm:text-sm text-white font-light leading-relaxed">
                    <strong className="font-semibold text-white">Astuces de chef</strong> pour réussir à tous les coups
                  </p>
                </div>
                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <p className="text-xs sm:text-sm text-white font-light leading-relaxed">
                    <strong className="font-semibold text-white">Accès anticipé</strong> aux nouvelles créations
                  </p>
                </div>
              </div>

              {/* CTA Principal */}
              <div className="pt-4">
                <Button
                  variant="default"
                  size="lg"
                  className="px-10 sm:px-12 h-12 sm:h-14 text-sm sm:text-base tracking-[0.15em] uppercase font-medium bg-white hover:bg-white/95 border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  style={{ background: 'white', color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', backgroundImage: 'linear-gradient(to right, #D4AF37, #C77A4E)' }}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setTimeout(() => {
                      const heroButton = document.querySelector('button[onclick*="setIsNewsletterOpen"]') as HTMLButtonElement;
                      if (heroButton) heroButton.click();
                    }, 500);
                  }}
                >
                  <span style={{ background: 'linear-gradient(to right, #D4AF37, #C77A4E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Je m'inscris</span>
                </Button>
                <p className="text-xs text-white/90 mt-4 font-light">
                  ✓ Désinscription en 1 clic · ✓ Zéro spam
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
