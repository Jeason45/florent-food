import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

// Fonte serif premium pour les titres
const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
});

// Fonte sans-serif premium pour le corps de texte
const inter = Inter({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Florent Food - Créateur de Contenu Gourmand",
  description: "🎬 Créateur de contenu gourmand du sud ☀️ 130K+ followers. Des recettes simples et gourmandes de cuisine et pâtisserie pour régaler tous les jours. 📍 Montpellier - Paris",
  keywords: ["florent food", "recettes faciles", "cuisine", "pâtisserie", "montpellier", "créateur contenu", "recettes gourmandes", "instagram food"],
  authors: [{ name: "Florent Food" }],
  openGraph: {
    title: "Florent Food - Créateur de Contenu Gourmand",
    description: "🎬 Des recettes simples et gourmandes pour régaler tous les jours ☀️",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Florent Food - Créateur de Contenu Gourmand",
    description: "🎬 Des recettes simples et gourmandes pour régaler tous les jours ☀️",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.variable} ${cormorant.variable} antialiased`}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
