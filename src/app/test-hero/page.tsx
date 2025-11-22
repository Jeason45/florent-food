"use client";

import { useState } from "react";

export default function TestHeroPage() {
  const [email, setEmail] = useState("");
  const [prenom, setPrenom] = useState("");

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl text-white font-light text-center mb-12">
          Propositions Hero Section - Inscription Gratuite
        </h1>

        {/* VARIATION 1 : Minimaliste - Email uniquement */}
        <section className="mb-20 bg-white/5 rounded-2xl p-8">
          <h2 className="text-xl text-white/60 font-light mb-8">Version 1 : Minimaliste - Email uniquement</h2>

          <div className="relative min-h-[100vh] overflow-hidden bg-black rounded-xl">
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

            {/* Content */}
            <div className="relative z-20 min-h-[100vh] flex flex-col justify-center items-center text-center px-5 sm:px-8 lg:px-12 pb-32">
            </div>

            {/* Bottom Form */}
            <div className="absolute bottom-0 left-0 right-0 z-30">
              <div className="relative py-12 sm:py-16 md:py-20">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8">
                  {/* Card */}
                  <div className="bg-[#6B5D52]/40 backdrop-blur-3xl rounded-[1.5rem] shadow-2xl border border-white/5 p-8 sm:p-12">

                    {/* Features List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {["1 recette par semaine", "Accès à 25 recettes exclusives", "Newsletter hebdomadaire", "Conseils et astuces"].map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to right, #D4AF37, #C77A4E)' }}></div>
                          <span className="text-sm md:text-base text-white font-light tracking-wide">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Prénom + Email Form */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Prénom"
                          value={prenom}
                          onChange={(e) => setPrenom(e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all"
                        />
                        <input
                          type="email"
                          placeholder="Votre email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all"
                        />
                      </div>
                      <button
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          background: 'linear-gradient(to right, #D4AF37, #C77A4E)',
                          color: 'white',
                          borderRadius: '0.75rem',
                          fontSize: '0.75rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.2em',
                          fontWeight: '600',
                          transition: 'all 300ms',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        S'inscrire gratuitement
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VARIATION 2 : Avec Prénom + Email */}
        <section className="mb-20 bg-white/5 rounded-2xl p-8">
          <h2 className="text-xl text-white/60 font-light mb-8">Version 2 : Prénom + Email</h2>

          <div className="relative min-h-[100vh] overflow-hidden bg-black rounded-xl">
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

            {/* Content */}
            <div className="relative z-20 min-h-[100vh] flex flex-col justify-center items-center text-center px-5 sm:px-8 lg:px-12 pb-32">
            </div>

            {/* Bottom Form */}
            <div className="absolute bottom-0 left-0 right-0 z-30">
              <div className="relative py-12 sm:py-16 md:py-20">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8">
                  {/* Card */}
                  <div className="bg-[#6B5D52]/40 backdrop-blur-3xl rounded-[1.5rem] shadow-2xl border border-white/5 p-8 sm:p-12">

                    {/* Features List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {["1 recette par semaine", "Accès à 25 recettes exclusives", "Newsletter hebdomadaire", "Conseils et astuces"].map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to right, #D4AF37, #C77A4E)' }}></div>
                          <span className="text-sm md:text-base text-white font-light tracking-wide">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Form with Prénom + Email */}
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Prénom"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all"
                      />
                      <input
                        type="email"
                        placeholder="Votre email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all"
                      />
                      <button
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          background: 'linear-gradient(to right, #D4AF37, #C77A4E)',
                          color: 'white',
                          borderRadius: '0.75rem',
                          fontSize: '0.75rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.2em',
                          fontWeight: '600',
                          transition: 'all 300ms',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        Recevoir les recettes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VARIATION 3 : Formulaire horizontal (desktop) */}
        <section className="mb-20 bg-white/5 rounded-2xl p-8">
          <h2 className="text-xl text-white/60 font-light mb-8">Version 3 : Formulaire Horizontal (style inline)</h2>

          <div className="relative min-h-[100vh] overflow-hidden bg-black rounded-xl">
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

            {/* Content */}
            <div className="relative z-20 min-h-[100vh] flex flex-col justify-center items-center text-center px-5 sm:px-8 lg:px-12 pb-32">
            </div>

            {/* Bottom Form */}
            <div className="absolute bottom-0 left-0 right-0 z-30">
              <div className="relative py-12 sm:py-16 md:py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
                  {/* Card */}
                  <div className="bg-[#6B5D52]/40 backdrop-blur-3xl rounded-[1.5rem] shadow-2xl border border-white/5 p-8 sm:p-12">

                    {/* Features List */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      {["1 recette par semaine", "25 recettes exclusives", "Newsletter hebdo", "Conseils & astuces"].map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to right, #D4AF37, #C77A4E)' }}></div>
                          <span className="text-xs md:text-sm text-white font-light">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Horizontal Form */}
                    <div className="flex flex-col md:flex-row gap-3">
                      <input
                        type="text"
                        placeholder="Prénom"
                        className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all"
                      />
                      <button
                        style={{
                          padding: '0.75rem 2rem',
                          background: 'linear-gradient(to right, #D4AF37, #C77A4E)',
                          color: 'white',
                          borderRadius: '0.75rem',
                          fontSize: '0.7rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.2em',
                          fontWeight: '600',
                          transition: 'all 300ms',
                          border: 'none',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        M'inscrire
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VARIATION 4 : Magazine Luxe - Email seul, très épuré */}
        <section className="mb-20 bg-white/5 rounded-2xl p-8">
          <h2 className="text-xl text-white/60 font-light mb-8">Version 4 : Magazine Luxe - Ultra épuré</h2>

          <div className="relative min-h-[100vh] overflow-hidden bg-black rounded-xl">
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
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Content */}
            <div className="relative z-20 min-h-[100vh] flex flex-col justify-center items-center text-center px-5 sm:px-8 lg:px-12 pb-32">
            </div>

            {/* Bottom Form - Plus compact */}
            <div className="absolute bottom-0 left-0 right-0 z-30">
              <div className="relative py-12 sm:py-16">
                <div className="max-w-xl mx-auto px-4 sm:px-6 md:px-8">

                  {/* Titre avant formulaire */}
                  <h3 className="text-white text-lg sm:text-xl font-light text-center mb-6" style={{ letterSpacing: '0.1em' }}>
                    RECETTES EXCLUSIVES CHAQUE SEMAINE
                  </h3>

                  {/* Form très simple */}
                  <div className="flex gap-3 bg-white/10 backdrop-blur-md p-2 rounded-full">
                    <input
                      type="email"
                      placeholder="Votre email"
                      className="flex-1 px-6 py-3 bg-transparent text-white placeholder-white/60 focus:outline-none text-sm"
                    />
                    <button
                      style={{
                        padding: '0.75rem 2.5rem',
                        background: 'linear-gradient(to right, #D4AF37, #C77A4E)',
                        color: 'white',
                        borderRadius: '9999px',
                        fontSize: '0.65rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.25em',
                        fontWeight: '600',
                        transition: 'all 300ms',
                        border: 'none',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Rejoindre
                    </button>
                  </div>

                  {/* Small features under */}
                  <div className="flex justify-center gap-6 mt-6">
                    {["Gratuit", "Sans engagement", "Désinscription 1 clic"].map((item, i) => (
                      <span key={i} className="text-xs text-white/50 font-light">
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
