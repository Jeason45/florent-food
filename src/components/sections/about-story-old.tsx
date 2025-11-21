"use client";

import { Button } from "@/components/ui/button";
import { Instagram, Play, Award } from "lucide-react";
import Link from "next/link";

export function AboutStorySection() {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-[#FFFBF7] via-[#FFF8F0] to-[#FFF5EB] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-40 left-20 w-40 h-40 rounded-full bg-[#C9A961]/10 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-[#E07A5F]/10 blur-3xl"></div>

      <div className="relative w-full max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-14 lg:gap-16 xl:gap-20 items-center">
          {/* Left: Image */}
          <div className="relative order-2 lg:order-1">
            {/* Main Image - Ultra minimal avec overlay subtil */}
            <div className="relative aspect-[3/4] overflow-hidden shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
                alt="Florent"
                className="w-full h-full object-cover grayscale-[15%] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Stats - Colorés */}
            <div className="mt-5 sm:mt-6 grid grid-cols-3 gap-3 sm:gap-4 text-center bg-white/60 backdrop-blur-sm rounded-xl shadow-lg p-5 sm:p-6">
              <div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-light font-serif text-[#E07A5F] mb-1 tracking-tight">
                  130K
                </div>
                <div className="text-[9px] sm:text-[10px] text-[var(--gris-taupe)] uppercase tracking-[0.2em] font-medium">
                  Followers
                </div>
              </div>
              <div className="border-l border-r border-[var(--gris-perle)]/50">
                <div className="text-xl sm:text-2xl lg:text-3xl font-light font-serif text-[#C9A961] mb-1 tracking-tight">
                  50+
                </div>
                <div className="text-[9px] sm:text-[10px] text-[var(--gris-taupe)] uppercase tracking-[0.2em] font-medium">
                  Recettes
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-light font-serif text-[#E07A5F] mb-1 tracking-tight">
                  5 ans
                </div>
                <div className="text-[9px] sm:text-[10px] text-[var(--gris-taupe)] uppercase tracking-[0.2em] font-medium">
                  Expérience
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium text-[#E07A5F] mb-6 sm:mb-8 block">
              À propos
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[var(--noir-luxe)] mb-6 sm:mb-7 lg:mb-8 leading-[1.05] tracking-[-0.02em]">
              Florent
            </h2>

            <div className="space-y-4 sm:space-y-5 text-sm sm:text-base text-[var(--gris-taupe)] mb-8 sm:mb-10 lg:mb-12 leading-relaxed font-light max-w-lg">
              <p>
                Créateur de contenu culinaire basé entre Montpellier et Paris, je partage ma passion avec une communauté de plus de 130 000 personnes.
              </p>

              <p>
                Mon approche : rendre la gastronomie accessible sans compromis sur la qualité. Chaque recette est pensée pour être réalisable chez soi, avec des techniques éprouvées et des explications détaillées.
              </p>

              <p>
                De la pâtisserie classique aux créations contemporaines, je vous accompagne dans votre parcours culinaire.
              </p>
            </div>

            {/* CTA Newsletter Coloré */}
            <div className="bg-gradient-to-br from-[#FFE5DC] to-[#FFF0E8] border-2 border-[#E07A5F]/20 rounded-xl p-6 sm:p-7 shadow-lg">
              <p className="text-xs sm:text-sm text-[var(--noir-luxe)] mb-4 sm:mb-5 font-light leading-relaxed">
                "Rejoins ma newsletter et reçois chaque semaine les techniques et recettes que j'utilise au quotidien"
              </p>
              <Button
                variant="default"
                size="default"
                className="w-full sm:w-auto px-8 sm:px-10 h-10 sm:h-11 text-xs sm:text-sm tracking-[0.12em] uppercase font-medium bg-[#E07A5F] hover:bg-[#D96A50] text-white shadow-lg hover:shadow-xl rounded-full transition-all duration-300"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Je m'inscris
              </Button>
            </div>

            {/* Social - Secondaire */}
            <div className="flex items-center gap-6 pt-6 border-t border-[var(--gris-perle)]/30 mt-8">
              <span className="text-xs text-[var(--gris-taupe)] uppercase tracking-wider font-light">Suis-moi</span>
              <a
                href="https://instagram.com/florentfood"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 opacity-60 hover:opacity-100 transition-opacity"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#E07A5F' }}>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
