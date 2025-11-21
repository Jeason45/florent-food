import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { PricingPlansSection } from "@/components/sections/pricing-plans";
import { RecipesCategorySection } from "@/components/sections/recipes-category";
import { AboutStorySection } from "@/components/sections/about-story";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { SocialLinksSection } from "@/components/sections/social-links";

// Données des recettes par catégorie
const patisserieRecipes = [
  {
    id: 1,
    name: "Tarte Citron Meringuée",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80",
    badge: "Signature",
    time: "2h30",
    servings: 8,
    difficulty: "Moyen"
  },
  {
    id: 2,
    name: "Paris-Brest",
    image: "https://images.unsplash.com/photo-1612203985729-70726954388c?w=800&q=80",
    time: "3h",
    servings: 6,
    difficulty: "Avancé"
  },
  {
    id: 3,
    name: "Éclair Café-Vanille",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
    badge: "Nouveau",
    time: "2h",
    servings: 12,
    difficulty: "Avancé"
  },
  {
    id: 4,
    name: "Millefeuille Vanille",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80",
    time: "1h45",
    servings: 6,
    difficulty: "Moyen"
  },
];

const platsRecipes = [
  {
    id: 1,
    name: "Risotto aux Champignons",
    image: "https://images.unsplash.com/photo-1637806930600-37fa8892069d?w=800&q=80",
    badge: "Végétarien",
    time: "45min",
    servings: 4,
    difficulty: "Facile"
  },
  {
    id: 2,
    name: "Saumon Mi-Cuit",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
    time: "25min",
    servings: 4,
    difficulty: "Moyen"
  },
  {
    id: 3,
    name: "Bœuf Bourguignon",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
    badge: "Classique",
    time: "3h",
    servings: 6,
    difficulty: "Moyen"
  },
  {
    id: 4,
    name: "Poulet Rôti Citron",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80",
    time: "1h15",
    servings: 4,
    difficulty: "Facile"
  },
];

const aperoRecipes = [
  {
    id: 1,
    name: "Mini Quiches Lorraine",
    image: "https://images.unsplash.com/photo-1619895092538-128341789043?w=800&q=80",
    time: "35min",
    servings: 12,
    difficulty: "Facile"
  },
  {
    id: 2,
    name: "Verrines Saumon Avocat",
    image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&q=80",
    badge: "Frais",
    time: "15min",
    servings: 8,
    difficulty: "Facile"
  },
  {
    id: 3,
    name: "Feuilletés Chèvre Miel",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80",
    time: "30min",
    servings: 10,
    difficulty: "Facile"
  },
  {
    id: 4,
    name: "Tartines Burrata",
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800&q=80",
    badge: "Gourmand",
    time: "10min",
    servings: 6,
    difficulty: "Facile"
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PricingPlansSection />
        <RecipesCategorySection
          title="Pâtisserie & Desserts"
          subtitle="Des créations sucrées raffinées pour régaler vos proches"
          recipes={patisserieRecipes}
          bgColor="from-[#FFFBF7] via-[#FFF8F0] to-[#FFF5EB]"
          isFirst={true}
        />
        <RecipesCategorySection
          title="Plats & Cuisine"
          subtitle="Des recettes savoureuses pour tous les jours et les grandes occasions"
          recipes={platsRecipes}
          bgColor="from-[#FFF8F0] via-[#FFFBF7] to-[#FFF5EB]"
        />
        <RecipesCategorySection
          title="Apéritifs & Entrées"
          subtitle="Commencez vos repas avec élégance et gourmandise"
          recipes={aperoRecipes}
          bgColor="from-[#FFF5EB] via-[#FFFBF7] to-[#FFF8F0]"
        />
        <AboutStorySection />
        <TestimonialsSection />
        <SocialLinksSection />
      </main>
      <Footer />
    </>
  );
}
