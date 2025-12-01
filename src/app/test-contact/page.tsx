"use client";

import { useState } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TestContactPage() {
  const [activeDesign, setActiveDesign] = useState<1 | 2 | 3>(1);

  return (
    <div className="min-h-screen bg-[#1a1a1a] py-8 px-4">
      {/* Sélecteur de design */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-white/10 backdrop-blur-md p-2 rounded-full">
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => setActiveDesign(num as 1 | 2 | 3)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeDesign === num
                ? 'bg-white text-black'
                : 'text-white hover:bg-white/20'
            }`}
          >
            Design {num}
          </button>
        ))}
      </div>

      <div className="max-w-[600px] mx-auto pt-20">
        {/* DESIGN 1 - Glassmorphism élégant */}
        {activeDesign === 1 && (
          <div className="rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)' }}>
            {/* Header avec gradient */}
            <div className="relative px-8 pt-12 pb-8" style={{ background: 'linear-gradient(180deg, rgba(212,175,55,0.15) 0%, transparent 100%)' }}>
              <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors">
                <ArrowLeft size={16} />
                Retour
              </Link>
              <p className="text-[#D4AF37] text-xs font-medium tracking-[0.3em] uppercase mb-3">Contact</p>
              <h1 className="font-serif text-4xl md:text-5xl text-white font-light">
                Écris-moi
              </h1>
            </div>

            {/* Formulaire */}
            <div className="px-8 pb-10 space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Nom</label>
                  <input
                    type="text"
                    placeholder="Ton nom"
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white/10 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="ton@email.com"
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white/10 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Objet</label>
                <input
                  type="text"
                  placeholder="L'objet de ton message"
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Message</label>
                <textarea
                  rows={5}
                  placeholder="Ton message..."
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white/10 transition-all resize-none"
                />
              </div>
              <button className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#C77A4E] text-black font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all">
                Envoyer
                <Send size={18} />
              </button>
            </div>
          </div>
        )}

        {/* DESIGN 2 - Minimaliste crème avec accents dorés */}
        {activeDesign === 2 && (
          <div className="rounded-3xl overflow-hidden bg-[#FFFBF7]">
            {/* Header */}
            <div className="px-8 pt-10 pb-6 border-b border-[#E8E3D5]">
              <Link href="/" className="inline-flex items-center gap-2 text-[#8B7355] hover:text-[#C77A4E] text-sm transition-colors">
                <ArrowLeft size={16} />
                Retour
              </Link>
            </div>

            {/* Titre centré */}
            <div className="px-8 py-12 text-center">
              <div className="inline-block px-4 py-1.5 bg-[#C77A4E]/10 rounded-full mb-4">
                <span className="text-[#C77A4E] text-xs font-medium tracking-wider uppercase">Contact</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] font-light mb-3">
                Une question ?
              </h1>
              <p className="text-[#8B7355] font-light">Je te réponds sous 48h</p>
            </div>

            {/* Formulaire dans une carte */}
            <div className="px-6 pb-10">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#E8E3D5] space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#8B7355] text-xs font-medium uppercase tracking-wider mb-2">Nom</label>
                    <input
                      type="text"
                      placeholder="Ton nom"
                      className="w-full px-4 py-3.5 bg-[#FAFAF8] border border-[#E8E3D5] rounded-lg text-[#1a1a1a] placeholder-[#aaa] focus:outline-none focus:border-[#C77A4E] focus:ring-2 focus:ring-[#C77A4E]/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[#8B7355] text-xs font-medium uppercase tracking-wider mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="ton@email.com"
                      className="w-full px-4 py-3.5 bg-[#FAFAF8] border border-[#E8E3D5] rounded-lg text-[#1a1a1a] placeholder-[#aaa] focus:outline-none focus:border-[#C77A4E] focus:ring-2 focus:ring-[#C77A4E]/10 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#8B7355] text-xs font-medium uppercase tracking-wider mb-2">Objet</label>
                  <input
                    type="text"
                    placeholder="L'objet de ton message"
                    className="w-full px-4 py-3.5 bg-[#FAFAF8] border border-[#E8E3D5] rounded-lg text-[#1a1a1a] placeholder-[#aaa] focus:outline-none focus:border-[#C77A4E] focus:ring-2 focus:ring-[#C77A4E]/10 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[#8B7355] text-xs font-medium uppercase tracking-wider mb-2">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Ton message..."
                    className="w-full px-4 py-3.5 bg-[#FAFAF8] border border-[#E8E3D5] rounded-lg text-[#1a1a1a] placeholder-[#aaa] focus:outline-none focus:border-[#C77A4E] focus:ring-2 focus:ring-[#C77A4E]/10 transition-all resize-none"
                  />
                </div>
                <button className="w-full py-4 bg-[#1a1a1a] text-white font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-[#333] transition-all">
                  Envoyer le message
                  <Send size={16} />
                </button>
                <p className="text-center text-xs text-[#8B7355]">Tous les champs sont obligatoires</p>
              </div>
            </div>
          </div>
        )}

        {/* DESIGN 3 - Style premium avec bordure dorée */}
        {activeDesign === 3 && (
          <div className="relative rounded-3xl overflow-hidden bg-[#FFFBF7]">
            {/* Bordure dorée en haut */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C77A4E] via-[#D4AF37] to-[#C77A4E]" />

            {/* Header */}
            <div className="px-8 pt-10">
              <Link href="/" className="inline-flex items-center gap-2 text-[#8B7355] hover:text-[#C77A4E] text-sm transition-colors">
                <ArrowLeft size={16} />
                Retour
              </Link>
            </div>

            {/* Contenu */}
            <div className="px-8 py-10">
              {/* Titre */}
              <div className="text-center mb-10">
                <p className="text-[#C77A4E] text-xs font-semibold tracking-[0.25em] uppercase mb-4">• Contact •</p>
                <h1 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] font-light leading-tight">
                  Restons en<br/><span className="italic text-[#C77A4E]">contact</span>
                </h1>
              </div>

              {/* Formulaire */}
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ton nom"
                      className="w-full px-5 py-4 bg-white border-2 border-[#E8E3D5] rounded-2xl text-[#1a1a1a] placeholder-[#999] focus:outline-none focus:border-[#D4AF37] transition-all"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Ton email"
                      className="w-full px-5 py-4 bg-white border-2 border-[#E8E3D5] rounded-2xl text-[#1a1a1a] placeholder-[#999] focus:outline-none focus:border-[#D4AF37] transition-all"
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Objet du message"
                    className="w-full px-5 py-4 bg-white border-2 border-[#E8E3D5] rounded-2xl text-[#1a1a1a] placeholder-[#999] focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>
                <div>
                  <textarea
                    rows={5}
                    placeholder="Écris ton message ici..."
                    className="w-full px-5 py-4 bg-white border-2 border-[#E8E3D5] rounded-2xl text-[#1a1a1a] placeholder-[#999] focus:outline-none focus:border-[#D4AF37] transition-all resize-none"
                  />
                </div>
                <button className="group w-full py-5 bg-gradient-to-r from-[#C77A4E] to-[#D4AF37] text-white font-bold tracking-wide uppercase rounded-2xl flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-[#D4AF37]/25 transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Envoyer
                  <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Footer */}
              <p className="text-center text-xs text-[#8B7355] mt-6 flex items-center justify-center gap-2">
                <span className="w-6 h-[1px] bg-[#D4AF37]/30"></span>
                Réponse sous 48h
                <span className="w-6 h-[1px] bg-[#D4AF37]/30"></span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Info en bas */}
      <p className="text-center text-white/30 text-sm mt-8">
        Clique sur les boutons en haut pour voir les différents designs
      </p>
    </div>
  );
}
