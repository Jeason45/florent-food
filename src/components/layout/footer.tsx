import Link from "next/link";
import { Instagram, Music, Youtube, Mail, ChefHat } from "lucide-react";
import { NewsletterForm } from "@/components/forms/newsletter-form";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[var(--noir-luxe)] to-[#0A0A0A] text-white">
      {/* Newsletter Section */}
      <div className="border-b border-[#E07A5F]/20">
        <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32">
          <div className="max-w-xl mx-auto text-center">
            <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium text-[#E07A5F] mb-8 sm:mb-10 lg:mb-12 block">
              Newsletter
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 sm:mb-8 lg:mb-10 leading-tight tracking-tight px-2 text-white">
              Restez informés
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-white/70 mb-8 sm:mb-10 lg:mb-12 leading-relaxed font-light px-2">
              Recevez chaque semaine nos dernières créations
            </p>
            <NewsletterForm variant="footer" source="footer" />
          </div>
        </div>
      </div>

      {/* Main Footer Content - Ultra minimal */}
      <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-10 sm:gap-12 lg:gap-16 xl:gap-20">
          {/* Left: Brand */}
          <div className="lg:max-w-sm">
            <Link href="/" className="inline-block mb-5 sm:mb-6">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-white tracking-tight">Florent Food</h2>
            </Link>
            <p className="text-sm sm:text-base text-white/60 mb-6 sm:mb-8 leading-relaxed font-light">
              Créateur de contenu culinaire<br />
              Montpellier – Paris
            </p>
          </div>

          {/* Middle: Links */}
          <div className="grid grid-cols-2 gap-10 sm:gap-12 lg:gap-14 xl:gap-16">
            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase font-medium text-[#E07A5F] mb-5 sm:mb-6">Navigation</h4>
              <ul className="space-y-3 sm:space-y-4">
                <li>
                  <Link href="/" className="text-sm text-white/70 hover:text-white transition-colors font-light">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link href="/recettes" className="text-sm text-white/70 hover:text-white transition-colors font-light">
                    Recettes
                  </Link>
                </li>
                <li>
                  <Link href="/a-propos" className="text-sm text-white/70 hover:text-white transition-colors font-light">
                    À propos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase font-medium text-[#E07A5F] mb-5 sm:mb-6">Légal</h4>
              <ul className="space-y-3 sm:space-y-4">
                <li>
                  <Link href="/mentions-legales" className="text-sm text-white/70 hover:text-white transition-colors font-light">
                    Mentions légales
                  </Link>
                </li>
                <li>
                  <Link href="/confidentialite" className="text-sm text-white/70 hover:text-white transition-colors font-light">
                    Confidentialité
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Social avec vrais logos */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase font-medium text-[#E07A5F] mb-5 sm:mb-6">Suivez-nous</h4>
            <div className="flex items-center gap-5 sm:gap-6">
              {/* Instagram */}
              <a
                href="https://instagram.com/florentfood"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#E07A5F' }}>
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
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#E07A5F' }}>
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
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#E07A5F' }}>
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#E07A5F]/20">
        <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-white/50 font-light">
            <p>
              © {currentYear} Florent Food
            </p>
            <p>
              Conçu par{" "}
              <a
                href="https://jldigitalstudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E07A5F] hover:text-white transition-colors"
              >
                JLDS
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
