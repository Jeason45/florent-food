"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChefHat } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Accueil", href: "#accueil" },
    { name: "Aperçu Newsletter", href: "#newsletter-preview" },
    { name: "Aperçu Recette", href: "#recipe-preview" },
    { name: "À propos", href: "#a-propos" },
    { name: "Témoignages", href: "#temoignages" },
    { name: "Réseaux sociaux", href: "#reseaux-sociaux" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Navbar background with transparency */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md border-b border-white/5"></div>

      <nav className="relative w-full px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Empty left space for balance */}
          <div className="w-14"></div>

          {/* Logo Center */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 z-10">
            <h1
              className="text-lg sm:text-xl md:text-2xl font-light tracking-tight drop-shadow-lg"
              style={{ color: '#FAFAF9', fontFamily: "'Playfair Display', serif" }}
            >
              Florent <span className="italic">Food</span>
            </h1>
          </Link>

          {/* Hamburger Menu - Right with margin */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="transition-colors"
            style={{ color: 'white', marginRight: '1rem' }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        </div>

        {/* Full Screen Menu */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-[var(--noir-luxe)] z-40 flex items-center justify-center animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {/* Close button - positioned above content */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-8 right-8 transition-colors z-50"
              style={{ color: 'white' }}
              aria-label="Close menu"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            <div className="text-center space-y-8 sm:space-y-10" onClick={(e) => e.stopPropagation()}>
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white hover:text-[#D4AF37] transition-colors tracking-tight"
                  onClick={(e) => handleNavClick(e, item.href)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-8 border-t border-white/10 mt-12">
                <Link
                  href="#newsletter"
                  className="text-sm tracking-[0.2em] uppercase font-light text-white/70 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Newsletter
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
