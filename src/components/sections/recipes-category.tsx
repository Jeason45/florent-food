"use client";

import { useState } from "react";

interface Recipe {
  id: number;
  name: string;
  image: string;
  badge?: string;
  time?: string;
  servings?: number;
  difficulty?: string;
}

interface RecipesCategoryProps {
  title: string;
  subtitle?: string;
  recipes: Recipe[];
  bgColor?: string;
  isFirst?: boolean;
}

export function RecipesCategorySection({
  title,
  subtitle,
  recipes,
  bgColor = "from-[#FFFBF7] via-[#FFF8F0] to-[#FFF5EB]",
  isFirst = false
}: RecipesCategoryProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      className={`relative pb-20 sm:pb-24 md:pb-32 lg:pb-40 bg-gradient-to-br ${bgColor} overflow-hidden`}
      style={{ paddingTop: isFirst ? '20px' : '40px' }}
    >
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-[#C77A4E]/5 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-[#D4AF37]/5 blur-3xl"></div>

      <div className="relative max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl px-5 sm:px-8 lg:px-12" style={{ margin: '0 auto' }}>
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-14 md:mb-16 lg:mb-20">
          {/* Ligne décorative au-dessus */}
          <div className="flex items-center justify-center mb-6 sm:mb-8 md:mb-10">
            <div className="h-[1px] w-16 sm:w-24 md:w-32" style={{ background: 'linear-gradient(to right, transparent, #D4AF37, #C77A4E)' }}></div>
            <div className="mx-4 sm:mx-6 md:mx-8">
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full" style={{ background: 'linear-gradient(to right, #D4AF37, #C77A4E)' }}></div>
            </div>
            <div className="h-[1px] w-16 sm:w-24 md:w-32" style={{ background: 'linear-gradient(to left, transparent, #C77A4E, #D4AF37)' }}></div>
          </div>

          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light mb-4 sm:mb-5 md:mb-6 lg:mb-8 leading-[0.95] tracking-[-0.03em]">
            <span className="bg-gradient-to-r from-[#C77A4E] to-[#D4AF37] bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[var(--gris-taupe)] max-w-5xl leading-relaxed font-light" style={{ textAlign: 'center', margin: '0 auto', marginTop: '0.75rem' }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Recipes Grid */}
        <div
          className={`${
            recipes.length === 1
              ? 'grid grid-cols-1 place-items-center gap-5 sm:gap-6 md:gap-8 lg:gap-10'
              : recipes.length === 2
              ? 'flex justify-center items-center'
              : recipes.length === 3
              ? 'grid grid-cols-2 md:flex md:justify-center md:items-center place-items-center'
              : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 lg:gap-10'
          }`}
          style={{
            marginTop: '3rem',
            gap: recipes.length === 2 ? '32px' : recipes.length === 3 ? '16px' : undefined
          }}
        >
          {recipes.map((recipe, index) => (
            <div
              key={recipe.id}
              className={`group relative cursor-pointer ${
                recipes.length === 1
                  ? 'w-full max-w-xs'
                  : recipes.length === 2
                  ? 'w-full max-w-xs'
                  : recipes.length === 3
                  ? index === 2
                    ? 'col-span-2 md:col-span-1'
                    : ''
                  : ''
              }`}
              style={{
                width: recipes.length === 3 ? 'min(320px, 45vw)' : undefined
              }}
              onMouseEnter={() => setHoveredId(recipe.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-md group-hover:shadow-xl transition-all duration-500">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay - Renforcé haut et bas */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 transition-all duration-500"></div>

                {/* Badge (si présent) */}
                {recipe.badge && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-medium text-white px-3 py-1.5 rounded-full shadow-lg" style={{ background: 'linear-gradient(to right, #D4AF37, #C77A4E)' }}>
                      {recipe.badge}
                    </span>
                  </div>
                )}

                {/* Recipe Title - EN HAUT, très petit et blanc */}
                <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 flex justify-center">
                  <div style={{
                    display: 'inline-block',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(8px)',
                    padding: '4px 10px',
                    borderRadius: '6px'
                  }}>
                    <h3 style={{
                      fontSize: '11px',
                      fontWeight: '400',
                      color: '#ffffff',
                      lineHeight: '1.4',
                      margin: 0,
                      fontFamily: 'var(--font-inter), -apple-system, sans-serif',
                      letterSpacing: '0.02em'
                    }}>
                      {recipe.name}
                    </h3>
                  </div>
                </div>

                {/* Metadata - EN BAS de la card, minimaliste */}
                {(recipe.time || recipe.servings || recipe.difficulty) && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <div className="flex items-center justify-center gap-3 sm:gap-4 text-white/95 text-[9px] sm:text-[10px]">
                      {recipe.time && (
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-light">{recipe.time}</span>
                        </div>
                      )}
                      {recipe.servings && (
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span className="font-light">{recipe.servings} pers.</span>
                        </div>
                      )}
                      {recipe.difficulty && (
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <span className="font-light">{recipe.difficulty}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
