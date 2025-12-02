import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieConsent from "@/components/CookieConsent";
import { AuthProvider } from "@/contexts/AuthContext";

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
  metadataBase: new URL('https://florentfood.fr'),
  title: {
    default: "Florent Food - Recettes Gourmandes & Newsletter Cuisine",
    template: "%s | Florent Food"
  },
  description: "Florent Food : recettes de cuisine et pâtisserie simples et gourmandes. Rejoins 130K+ followers et reçois 5 recettes gratuites par semaine dans ta newsletter !",
  keywords: ["florent food", "recettes faciles", "cuisine", "pâtisserie", "newsletter recettes", "montpellier", "créateur contenu", "recettes gourmandes", "instagram food"],
  authors: [{ name: "Florent Food" }],
  creator: "Florent Food",
  publisher: "Florent Food",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Florent Food - Recettes Gourmandes & Newsletter Cuisine",
    description: "Rejoins 130K+ followers ! 5 recettes gratuites par semaine dans ta newsletter cuisine.",
    type: "website",
    locale: "fr_FR",
    siteName: "Florent Food",
    url: "https://florentfood.fr",
  },
  twitter: {
    card: "summary_large_image",
    title: "Florent Food - Recettes Gourmandes & Newsletter Cuisine",
    description: "Rejoins 130K+ followers ! 5 recettes gratuites par semaine dans ta newsletter cuisine.",
  },
  alternates: {
    canonical: "https://florentfood.fr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        {/* Préchargement image hero pour améliorer LCP */}
        <link
          rel="preload"
          as="image"
          href="/hero-mobile.jpg"
          media="(max-width: 767px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/hero-optimized.jpg"
          media="(min-width: 768px)"
          fetchPriority="high"
        />
      </head>
      <body className={`${inter.variable} ${cormorant.variable} antialiased`}>
        <GoogleAnalytics />
        <AuthProvider>
          {children}
        </AuthProvider>
        <CookieConsent />
      </body>
    </html>
  );
}
