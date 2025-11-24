import Link from "next/link";
import { Instagram, Music, Youtube, Mail, ChefHat } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[var(--noir-luxe)] to-[#0A0A0A] text-white">
      {/* Footer Content - Tout centré */}
      <div className="max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl px-5 sm:px-8 lg:px-12 py-12 sm:py-16 md:py-20" style={{ margin: '0 auto' }}>
        <div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-12">

          {/* Liens légaux - centrés et descendus */}
          <div className="flex flex-row items-center gap-6 sm:gap-10 text-sm" style={{ paddingTop: '2rem' }}>
            <Link href="/mentions-legales" className="text-white/50 hover:text-white/80 transition-colors font-light tracking-wide">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="text-white/50 hover:text-white/80 transition-colors font-light tracking-wide">
              Confidentialité
            </Link>
            <Link href="/cookies" className="text-white/50 hover:text-white/80 transition-colors font-light tracking-wide">
              Cookies
            </Link>
          </div>

          {/* Copyright - centré */}
          <div className="flex flex-col items-center gap-3 text-sm text-white/50 font-light">
            <div className="flex flex-row items-center gap-6 sm:gap-8">
              <p>© {currentYear} Florent Food</p>
              <span className="hidden sm:block">•</span>
              <p>SIRET : 927 497 875 00017</p>
            </div>
            <p>
              Conçu par{" "}
              <a
                href="https://jldigitalstudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4AF37] hover:text-white transition-colors"
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
