'use client';

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { RecipesCategorySection } from "@/components/sections/recipes-category";
import { NewsletterPreviewSection } from "@/components/sections/newsletter-preview";
import { RecipeExampleSection } from "@/components/sections/recipe-example";
import { WhySubscribeSection } from "@/components/sections/why-subscribe";
import { AboutStorySection } from "@/components/sections/about-story";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { SocialLinksSection } from "@/components/sections/social-links";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Composant séparé pour gérer le toast de confirmation (nécessite Suspense)
function ConfirmationToast() {
  const [showToast, setShowToast] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('confirmed') === 'true') {
      setShowToast(true);
      window.history.replaceState({}, '', '/');
      setTimeout(() => setShowToast(false), 8000);
    }
  }, [searchParams]);

  if (!showToast) return null;

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          background: 'linear-gradient(135deg, #D4AF37 0%, #C77A4E 100%)',
          color: '#000',
          padding: '16px 32px',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          animation: 'slideDown 0.5s ease-out'
        }}
      >
        <span style={{ fontSize: '24px' }}>🎉</span>
        <div>
          <p style={{ fontWeight: 700, fontSize: '16px', margin: 0 }}>Inscription confirmée !</p>
          <p style={{ fontSize: '14px', margin: '4px 0 0 0', opacity: 0.9 }}>Bienvenue dans la famille Florent Food</p>
        </div>
        <button
          onClick={() => setShowToast(false)}
          style={{
            background: 'rgba(0,0,0,0.2)',
            border: 'none',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '8px',
            fontSize: '16px'
          }}
        >
          ×
        </button>
      </div>
      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </>
  );
}

interface Recipe {
  id: string;
  title: string;
  slug: string;
  imageUrl: string | null;
  category: string[];
  difficulty: string;
  prepTime: number;
  cookTime: number;
  totalTime: number;
  servings: number;
  visibility: string;
}

interface DisplayRecipe {
  id: number;
  name: string;
  slug: string;
  image: string;
  badge?: string;
  time: string;
  servings: number;
  difficulty: string;
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [weekInfo, setWeekInfo] = useState<{ weekNumber: number; startDate: string; endDate: string } | null>(null);

  useEffect(() => {
    fetchActiveNewsletter();
  }, []);

  const fetchActiveNewsletter = async () => {
    try {
      const response = await fetch('/api/newsletter/active');
      const data = await response.json();

      if (data.success && data.recipes) {
        setRecipes(data.recipes);
        // Afficher les infos de la newsletter la plus récente (première dans le tableau)
        if (data.newsletters && data.newsletters.length > 0) {
          const latestNewsletter = data.newsletters[0];
          setWeekInfo({
            weekNumber: latestNewsletter.weekNumber,
            startDate: latestNewsletter.startDate,
            endDate: latestNewsletter.endDate
          });
        }
      }
    } catch (error) {
      console.error('Error fetching active newsletter:', error);
    } finally {
      setLoading(false);
    }
  };

  // Transformer les recettes de la DB en format d'affichage
  const transformRecipe = (recipe: Recipe): DisplayRecipe => ({
    id: parseInt(recipe.id.substring(0, 8), 16),
    name: recipe.title,
    slug: recipe.slug,
    image: recipe.imageUrl || 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=800&q=80',
    badge: recipe.visibility === 'PREMIUM' ? 'Premium' : undefined,
    time: `${recipe.totalTime}min`,
    servings: recipe.servings,
    difficulty: recipe.difficulty === 'DEBUTANT' ? 'Facile' : recipe.difficulty === 'INTERMEDIAIRE' ? 'Moyen' : 'Avancé'
  });

  // Grouper les recettes par catégorie
  const patisserieRecipes = recipes
    .filter(r => r.category.some(c => c.toLowerCase().includes('pâtisserie') || c.toLowerCase().includes('patisserie') || c.toLowerCase().includes('dessert')))
    .map(transformRecipe);

  const platsRecipes = recipes
    .filter(r => r.category.some(c => c.toLowerCase().includes('plat') || c.toLowerCase().includes('cuisine')))
    .map(transformRecipe);

  const aperoRecipes = recipes
    .filter(r => r.category.some(c => c.toLowerCase().includes('apéro') || c.toLowerCase().includes('apero') || c.toLowerCase().includes('entrée') || c.toLowerCase().includes('entree')))
    .map(transformRecipe);

  return (
    <>
      {/* Toast de confirmation d'inscription (wrappé dans Suspense pour useSearchParams) */}
      <Suspense fallback={null}>
        <ConfirmationToast />
      </Suspense>

      <Header />
      <main>
        <HeroSection id="accueil" />

        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            background: 'linear-gradient(to bottom, #FFFBF7, #FFF8F0)'
          }}>
            <div style={{ fontSize: '14px', color: '#6B5D52', fontWeight: 500 }}>
              ⏳ Chargement des recettes de la semaine...
            </div>
          </div>
        ) : recipes.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '100px 20px',
            background: 'linear-gradient(to bottom, #FFFBF7, #FFF8F0)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>📧</div>
            <h2 style={{ fontSize: '24px', color: '#2D2D2D', marginBottom: '12px', fontWeight: 600 }}>
              Aucune recette cette semaine
            </h2>
            <p style={{ fontSize: '16px', color: '#6B5D52', lineHeight: 1.6 }}>
              Abonnez-vous à la newsletter pour recevoir les nouvelles recettes chaque semaine !
            </p>
          </div>
        ) : (
          <>
            {weekInfo && (
              <div style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #C77A4E 100%)',
                padding: '16px 20px',
                textAlign: 'center',
                color: '#000'
              }}>
                <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.8 }}>
                  Semaine {weekInfo.weekNumber}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 500, marginTop: '4px' }}>
                  {new Date(weekInfo.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                  {' → '}
                  {new Date(weekInfo.endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
            )}

            <div id="recettes">
              {aperoRecipes.length > 0 && (
                <RecipesCategorySection
                  title="Entrée & Apéro"
                  subtitle="Commencez vos repas avec élégance et gourmandise"
                  recipes={aperoRecipes}
                  bgColor="from-[#FFFBF7] via-[#FFF8F0] to-[#FFF5EB]"
                  isFirst={true}
                />
              )}

              {platsRecipes.length > 0 && (
                <RecipesCategorySection
                  title="Plats & Cuisine"
                  subtitle="Des recettes savoureuses pour tous les jours et les grandes occasions"
                  recipes={platsRecipes}
                  bgColor="from-[#FFF8F0] via-[#FFFBF7] to-[#FFF5EB]"
                />
              )}

              {patisserieRecipes.length > 0 && (
                <RecipesCategorySection
                  title="Pâtisserie & Desserts"
                  subtitle="Des créations sucrées raffinées pour régaler vos proches"
                  recipes={patisserieRecipes}
                  bgColor="from-[#FFF5EB] via-[#FFFBF7] to-[#FFF8F0]"
                />
              )}
            </div>
          </>
        )}

        <div id="newsletter-preview">
          <NewsletterPreviewSection />
        </div>
        <div id="recipe-preview">
          <RecipeExampleSection />
        </div>
        <div id="pourquoi-sabonner">
          <WhySubscribeSection />
        </div>
        <div id="a-propos">
          <AboutStorySection />
        </div>
        <div id="temoignages">
          <TestimonialsSection />
        </div>
        <div id="reseaux-sociaux">
          <SocialLinksSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
