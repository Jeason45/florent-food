"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Play, Instagram, Video, Clapperboard, Film, Camera, Sparkles, Youtube } from "lucide-react";
import { useState } from "react";
import { NewsletterForm } from "@/components/forms/newsletter-form";

export function HeroSection() {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"free" | "premium">("free");

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-black">
        {/* Image de fond gastronomie luxe */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80)',
            backgroundSize: '140%',
            backgroundPosition: 'center 20%',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/85 z-10" />
      </div>

      {/* Content - Bottom */}
      <div className="relative z-20 w-full px-5 sm:px-8 lg:px-12" style={{ paddingTop: 'calc(100vh - 400px)', paddingBottom: '40px' }}>
        <div className="max-w-6xl mx-auto text-center">
          {/* Text */}
          <div className="mb-6 sm:mb-7 lg:mb-8">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 tracking-wide" style={{ fontFamily: 'cursive', fontWeight: '300' }}>
              Cuisine avec amour, partage avec passion
            </p>
          </div>

          {/* CTA + Social */}
          <div className="flex flex-col items-center justify-center gap-6 sm:gap-7 lg:gap-8">
            {/* Toggle Switch + Plan Details */}
            <div className="w-full flex flex-col items-center">
              {/* Toggle Switch */}
              <div className="flex items-center justify-center gap-2 p-2 bg-white/10 backdrop-blur-md rounded-full mb-5">
                <button
                  onClick={() => setSelectedPlan("free")}
                  className="transition-all duration-300"
                  style={{
                    padding: '10px 28px',
                    borderRadius: '40px',
                    cursor: 'pointer',
                    backgroundColor: selectedPlan === "free" ? '#E07A5F' : 'transparent',
                    color: 'white',
                    border: 'none',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.875rem',
                    fontWeight: selectedPlan === "free" ? '500' : '400',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  }}
                >
                  Gratuit
                </button>
                <button
                  onClick={() => setSelectedPlan("premium")}
                  className="transition-all duration-300"
                  style={{
                    padding: '10px 28px',
                    borderRadius: '40px',
                    cursor: 'pointer',
                    backgroundColor: selectedPlan === "premium" ? '#E07A5F' : 'transparent',
                    color: 'white',
                    border: 'none',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.875rem',
                    fontWeight: selectedPlan === "premium" ? '500' : '400',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  }}
                >
                  Premium 2,99€
                </button>
              </div>

              {/* Plan Details Card */}
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/20 w-full max-w-lg">
                {selectedPlan === "premium" && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[#E07A5F] text-white text-[10px] font-semibold uppercase px-3 py-1 rounded-full tracking-wider" style={{ fontFamily: 'var(--font-inter)' }}>
                      Recommandé
                    </span>
                  </div>
                )}

                <div className="text-center mb-5">
                  <h3 className="text-white text-xl sm:text-2xl font-light mb-2" style={{ fontFamily: 'var(--font-cormorant)' }}>
                    {selectedPlan === "free" ? "Plan Gratuit" : "Plan Premium"}
                  </h3>
                  <div className="text-white/90 text-sm sm:text-base font-light leading-relaxed">
                    {selectedPlan === "free" ? (
                      <>
                        <span className="font-medium">1 recette</span> par semaine • <span className="font-medium">25 recettes</span> exclusives
                      </>
                    ) : (
                      <>
                        <span className="font-medium">7 recettes</span> par semaine • <span className="font-medium">150+ recettes</span> exclusives
                      </>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setIsNewsletterOpen(true)}
                  className="w-full transition-all duration-300"
                  style={{
                    padding: '12px 28px',
                    backgroundColor: '#E07A5F',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    boxShadow: '0 8px 30px rgba(224, 122, 95, 0.4)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(224, 122, 95, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(224, 122, 95, 0.4)';
                  }}
                >
                  {selectedPlan === "free" ? "S'inscrire gratuitement" : "Commencer Premium"}
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-7 sm:gap-8 md:gap-9">
              {/* Instagram */}
              <a
                href="https://instagram.com/florentfood"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com/@florentfood"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-110"
                aria-label="TikTok"
              >
                <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/@florentfood"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-110"
                aria-label="YouTube"
              >
                <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Modal */}
      {isNewsletterOpen && (
        <div
          className="fixed inset-0 bg-[var(--noir-luxe)]/70 backdrop-blur-xl z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fade-in"
          onClick={() => setIsNewsletterOpen(false)}
        >
          <div
            className="bg-[var(--blanc-casse)] rounded-none sm:rounded-sm p-8 sm:p-10 md:p-12 lg:p-14 xl:p-16 max-w-xl w-full animate-scale-in shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-8 sm:mb-10">
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-5 sm:mb-6 text-[var(--noir-luxe)] tracking-tight leading-tight">
                Rejoignez-nous
              </h3>
              <p className="text-[var(--gris-taupe)] mb-0 text-xs sm:text-sm md:text-base leading-relaxed tracking-wide px-2">
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
