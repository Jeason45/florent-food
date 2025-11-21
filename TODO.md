# ✅ TODO - Florent Food

## 🔥 URGENT - À FAIRE AVANT DE CONTINUER LE CODE

### Configuration Services Externes

- [ ] **Créer projet Supabase**
  - [ ] Aller sur supabase.com et créer un compte
  - [ ] Créer un nouveau projet "florent-food"
  - [ ] Copier les clés API (URL + anon key + service role key)
  - [ ] Exécuter le fichier `supabase/schema.sql` dans le SQL Editor
  - [ ] Créer un compte utilisateur admin
  - [ ] Mettre le role à 'admin' dans la table profiles

- [ ] **Créer compte Resend**
  - [ ] Aller sur resend.com et créer un compte
  - [ ] Créer une API key
  - [ ] (Optionnel) Configurer un domaine personnalisé

- [ ] **Créer fichier `.env.local`**
  - [ ] Copier `.env.local.example` vers `.env.local`
  - [ ] Remplir toutes les variables avec les vraies valeurs

📖 **Voir le guide détaillé : `SETUP_GUIDE.md`**

---

## 📧 Système de Newsletter

### Formulaire d'inscription

- [ ] Créer composant `NewsletterForm` avec validation Zod
- [ ] Ajouter états de formulaire (loading, success, error)
- [ ] Intégrer dans modal Hero + Footer
- [ ] Gestion des erreurs (email déjà inscrit, etc.)

### API Routes

- [ ] **POST `/api/newsletter/subscribe`**
  - [ ] Valider email avec Zod
  - [ ] Vérifier si email existe déjà
  - [ ] Insérer dans table `newsletter_subscribers`
  - [ ] Déclencher email de confirmation (double opt-in)
  - [ ] Ajouter à la queue d'automation (séquence bienvenue)
  - [ ] Retourner succès/erreur

- [ ] **POST `/api/newsletter/unsubscribe`**
  - [ ] Mettre à jour statut à 'unsubscribed'
  - [ ] Annuler emails en attente dans automation_queue
  - [ ] Envoyer email de confirmation désinscription

- [ ] **GET `/api/newsletter/confirm/[token]`**
  - [ ] Vérifier token de confirmation
  - [ ] Activer l'abonnement
  - [ ] Rediriger vers page de bienvenue

### Templates Emails (React Email)

- [ ] **Welcome Email** (J+0)
  - [ ] Layout avec brand colors
  - [ ] Message de bienvenue chaleureux
  - [ ] Lien download E-book (10 recettes essentielles PDF)
  - [ ] CTA vers recettes gratuites

- [ ] **Beginner Recipes** (J+2)
  - [ ] 3 recettes pour débutants avec preview images
  - [ ] Tips pour réussir sa première pâtisserie

- [ ] **Technique Video** (J+7)
  - [ ] Lien vers vidéo exclusive
  - [ ] Explication technique détaillée

- [ ] **Membership Intro** (J+10)
  - [ ] Présentation du membership
  - [ ] Avantages + témoignages
  - [ ] CTA avec lien vers page membership

- [ ] **Special Offer** (J+15)
  - [ ] Code promo BIENVENUE50 (50% 1er mois)
  - [ ] Urgence (offre limitée)
  - [ ] CTA fort

### Automation Emails

- [ ] Créer job CRON (Vercel Cron ou Supabase Edge Function)
- [ ] Vérifier `automation_queue` toutes les heures
- [ ] Envoyer emails avec statut 'pending' dont `scheduled_for` <= maintenant
- [ ] Mettre à jour statut à 'sent' ou 'failed'
- [ ] Logger les erreurs

### Pages

- [ ] **Page confirmation** `/newsletter/confirm`
  - [ ] Message de succès
  - [ ] Redirection auto vers homepage après 5s

- [ ] **Page unsubscribe** `/newsletter/unsubscribe`
  - [ ] Formulaire de désinscription
  - [ ] Demande feedback (optionnel) : "Pourquoi te désabonnes-tu ?"
  - [ ] Confirmation

---

## 🍰 Bibliothèque de Recettes

### Données

- [ ] **Créer 15-20 recettes de test** (JSON ou directement en DB)
  - [ ] Structurer données : titre, slug, description, catégorie, difficulté, temps, ingrédients (par section), étapes (avec images optionnelles), tags
  - [ ] Obtenir/créer images hero (16:9) pour chaque recette
  - [ ] Obtenir/créer images pour étapes (optionnel mais recommandé)

### Page Listing `/recettes`

- [ ] Grid responsive de Recipe Cards
- [ ] Card design :
  - [ ] Image hero avec aspect-ratio
  - [ ] Badge difficulté
  - [ ] Titre
  - [ ] Temps total
  - [ ] Badge "Premium" (locked) si recette payante
  - [ ] Hover effect (lift)

- [ ] **Filtres** (Sidebar ou Top bar)
  - [ ] Catégorie (Gâteaux, Tartes, Pâtisserie, etc.)
  - [ ] Difficulté (Débutant, Intermédiaire, Expert)
  - [ ] Temps (<30min, 30-60min, 1-2h, >2h)
  - [ ] Reset filters button

- [ ] **Recherche instantanée**
  - [ ] Input avec debounce (300ms)
  - [ ] Fuzzy search avec Fuse.js
  - [ ] Recherche dans titre, description, ingrédients, tags

- [ ] **Pagination ou Infinite Scroll**
  - [ ] Décider : pagination classique ou infinite scroll
  - [ ] Implémenter avec React hooks

### Page Détail `/recettes/[slug]`

- [ ] **Hero Section**
  - [ ] Image full-width haute qualité
  - [ ] Titre superposé avec glassmorphism
  - [ ] Breadcrumb (Accueil > Recettes > Nom de la recette)

- [ ] **Métadonnées**
  - [ ] Temps prep, cuisson, total (icônes)
  - [ ] Difficulté (badge coloré)
  - [ ] Portions (par défaut 6)

- [ ] **Calculateur de portions**
  - [ ] Slider ou +/- buttons (2 à 12 personnes)
  - [ ] Recalcul automatique des quantités
  - [ ] Mise à jour temps réel

- [ ] **Liste d'ingrédients**
  - [ ] Groupés par composant (Pâte, Crème, Glaçage, etc.)
  - [ ] Checkbox pour cocher
  - [ ] Quantités précises avec unités
  - [ ] Bouton "Tout cocher" / "Tout décocher"

- [ ] **Étapes de préparation**
  - [ ] Numérotation claire
  - [ ] Texte avec markdown simple (gras, italique)
  - [ ] Image pour chaque étape (optionnel)
  - [ ] Tips de Florent (encarts colorés terracotta)
  - [ ] Timers cliquables intégrés (ex: "Cuire 35 min" → démarre un timer)

- [ ] **Fonctionnalités premium**
  - [ ] Bouton "Générer liste de courses" → PDF téléchargeable
  - [ ] Mode Chef : Bouton "Activer mode cuisine"
    - [ ] Full screen
    - [ ] Grosse typographie
    - [ ] Navigation swipe gauche/droite
    - [ ] Screen always on (Wake Lock API)
  - [ ] Partage social (WhatsApp, Pinterest, Facebook, Copy link)

- [ ] **Section similaires**
  - [ ] 3 recettes similaires
  - [ ] Au moins 1-2 premium avec badge lock

- [ ] **CTA conversion** (si recette gratuite)
  - [ ] Bandeau sticky bottom
  - [ ] "Débloquer 100+ recettes comme celle-ci"
  - [ ] CTA vers membership

- [ ] **SEO**
  - [ ] Metadata title et description optimisés
  - [ ] Schema.org JSON-LD (Recipe markup)
  - [ ] OpenGraph tags pour partage social

---

## 🎛️ CRM Admin

### Authentification

- [ ] Page `/admin/login`
  - [ ] Formulaire email + mot de passe
  - [ ] Validation avec Supabase Auth
  - [ ] Vérifier role === 'admin'
  - [ ] Redirection vers dashboard si déjà connecté

- [ ] Middleware de protection
  - [ ] Vérifier session dans middleware.ts
  - [ ] Rediriger vers /admin/login si non connecté
  - [ ] Vérifier role admin

- [ ] Bouton déconnexion

### Dashboard Principal `/admin`

- [ ] **KPIs Cards** (en haut)
  - [ ] Total abonnés newsletter
  - [ ] Nouveaux abonnés ce mois (+ % évolution)
  - [ ] Taux d'ouverture moyen
  - [ ] Taux de clics moyen

- [ ] **Graphiques** (Recharts)
  - [ ] Évolution abonnés sur 12 mois (Line chart)
  - [ ] Top 5 recettes les plus vues (Bar chart)
  - [ ] Taux d'engagement newsletter (Line chart)

- [ ] **Quick Actions**
  - [ ] Bouton "Nouvelle recette"
  - [ ] Bouton "Nouvelle newsletter"
  - [ ] Bouton "Voir abonnés"

- [ ] **Activité récente**
  - [ ] 10 derniers abonnés newsletter
  - [ ] 5 dernières recettes ajoutées

### Gestion Recettes `/admin/recettes`

- [ ] **Liste des recettes** (Table)
  - [ ] Colonnes : Image (mini), Titre, Catégorie, Difficulté, Statut (Draft/Published), Visibilité (Free/Premium), Vues, Date création, Actions
  - [ ] Filtres : Statut, Visibilité, Catégorie, Difficulté
  - [ ] Recherche par titre
  - [ ] Actions : Modifier, Dupliquer, Supprimer, Voir sur le site (nouvelle tab)
  - [ ] Pagination

- [ ] **Créer/Modifier recette** `/admin/recettes/new` et `/admin/recettes/[id]/edit`

  **Onglet 1 : Informations générales**
  - [ ] Titre (input)
  - [ ] Slug (auto-généré ou éditable)
  - [ ] Description courte (textarea, max 150 chars)
  - [ ] Catégorie (multi-select)
  - [ ] Difficulté (radio)
  - [ ] Temps préparation, cuisson (number inputs en minutes)
  - [ ] Portions par défaut (number)
  - [ ] Image hero (upload Supabase Storage + preview + crop 16:9)
  - [ ] Statut (Draft / Published)
  - [ ] Visibilité (Free / Premium)

  **Onglet 2 : Ingrédients**
  - [ ] Bouton "+ Ajouter une section"
  - [ ] Pour chaque section :
    - [ ] Nom section (input) ex: "Pâte"
    - [ ] Liste ingrédients :
      - [ ] Bouton "+ Ajouter ingrédient"
      - [ ] Quantité (number), Unité (select), Nom (input)
      - [ ] Drag & drop pour réordonner
      - [ ] Bouton supprimer

  **Onglet 3 : Préparation (Étapes)**
  - [ ] Bouton "+ Ajouter une étape"
  - [ ] Pour chaque étape :
    - [ ] Numéro (auto)
    - [ ] Texte (textarea avec markdown simple)
    - [ ] Image (upload optionnel)
    - [ ] Timer ? Checkbox + durée (minutes)
    - [ ] Tips du chef (textarea optionnel)
    - [ ] Drag & drop pour réordonner
    - [ ] Bouton supprimer

  **Onglet 4 : Médias Premium** (si recette Premium)
  - [ ] Upload vidéo ou URL Vimeo/YouTube
  - [ ] Upload PDF ou générer auto à partir de la recette

  **Onglet 5 : SEO & Métadonnées**
  - [ ] Meta title (input, max 60 chars)
  - [ ] Meta description (textarea, max 160 chars)
  - [ ] Tags (input multiple)
  - [ ] Preview Schema.org JSON-LD

  **Actions**
  - [ ] Enregistrer brouillon
  - [ ] Prévisualiser (ouvre dans nouvelle tab)
  - [ ] Publier

- [ ] **Suppression**
  - [ ] Modal de confirmation
  - [ ] Suppression soft (statut 'deleted') ou hard delete ?

### Gestion Abonnés Newsletter `/admin/newsletter/abonnes`

- [ ] **Liste abonnés** (Table)
  - [ ] Colonnes : Email, Prénom, Date inscription, Source, Statut, Tags, Total Opens, Total Clicks, Actions
  - [ ] Filtres : Statut (Active, Unsubscribed, Bounced), Source, Tags
  - [ ] Recherche par email/prénom
  - [ ] Pagination
  - [ ] Actions : Voir détail, Modifier tags, Désabonner, Supprimer (RGPD)

- [ ] **Export CSV**
  - [ ] Bouton "Exporter la liste"
  - [ ] Filtres appliqués exportés aussi

- [ ] **Détail Abonné** (Modal ou page)
  - [ ] Profil : Email, Prénom, Date inscription, Source
  - [ ] Tags (éditable)
  - [ ] Engagement : Taux ouverture, clics, dernier email ouvert
  - [ ] Historique : Inscriptions, emails reçus/ouverts/cliqués
  - [ ] Actions admin : Modifier, Ajouter/retirer tags, Envoyer email perso, Supprimer

### Gestion Campagnes Newsletter `/admin/newsletter/campagnes`

- [ ] **Liste campagnes** (Table)
  - [ ] Colonnes : Date envoi, Sujet, Type, Destinataires (count), Opens, Clicks, Statut (Draft, Scheduled, Sent)
  - [ ] Filtres : Statut, Type
  - [ ] Actions : Voir, Modifier (si Draft), Dupliquer, Voir analytics

- [ ] **Créer/Modifier campagne** `/admin/newsletter/campagnes/new`
  - [ ] Sujet (input)
  - [ ] Préheader (input)
  - [ ] Destinataires (select) : Tous, Newsletter gratuite, Segment custom (filtres tags)
  - [ ] Contenu (éditeur) :
    - [ ] Éditeur visuel (React Email components) OU
    - [ ] Code React Email directement
    - [ ] Blocs pré-fabriqués : Header, Intro, Recette, Image, CTA, Footer
    - [ ] Preview live (mobile & desktop)
  - [ ] Planification :
    - [ ] Envoyer maintenant (bouton)
    - [ ] Planifier : Date + Heure (datetime input)
  - [ ] Test : Envoyer email de test à une adresse

- [ ] **Analytics campagne** (Page détail)
  - [ ] KPIs : Envoyés, Opens, Clicks, Unsubscribes, Bounces
  - [ ] Taux : Open rate, Click rate, Unsubscribe rate
  - [ ] Graphique : Opens et Clicks dans le temps (24h après envoi)
  - [ ] Liste des clics par lien (URL + nombre de clics)

### Analytics Globales `/admin/analytics`

- [ ] **Graphiques**
  - [ ] Évolution abonnés newsletter (12 mois)
  - [ ] Taux d'engagement newsletter moyen (12 mois)
  - [ ] Top 10 recettes les plus vues (all time)
  - [ ] Sources d'acquisition (Pie chart : Instagram, TikTok, Google, etc.)

- [ ] **Tableaux**
  - [ ] Métriques quotidiennes (7 derniers jours)
  - [ ] Export CSV

---

## 🔔 PWA (Progressive Web App)

- [ ] **Manifest** (`/public/manifest.json`)
  - [ ] Nom, short_name, description
  - [ ] Icons (192x192, 512x512)
  - [ ] Theme color, background color
  - [ ] Display: standalone
  - [ ] Start URL

- [ ] **Service Worker** (`/public/sw.js`)
  - [ ] Cache stratégies :
    - [ ] Cache-first pour assets statiques (images, CSS, JS)
    - [ ] Network-first pour API calls
    - [ ] Offline fallback page
  - [ ] Sync en arrière-plan (quand connexion revient)
  - [ ] Notifications push (Phase 2)

- [ ] **Installable**
  - [ ] Bouton "Installer l'app" dans header (si A2HS disponible)
  - [ ] Prompt personnalisé avant le prompt natif

- [ ] **Offline Mode**
  - [ ] Cache des recettes favorites
  - [ ] Page offline avec message sympathique
  - [ ] Sync notes/photos ajoutées offline quand connexion revient

---

## 🎨 Assets & Contenu

### Images

- [ ] Logo Florent Food (PNG transparent, SVG si possible)
- [ ] Favicon (16x16, 32x32, 192x192, 512x512)
- [ ] Hero vidéo background (MP4, optimisée, loop)
- [ ] Photos collaborations (Chef Monde, Audi, Richard Marx)
- [ ] Portrait Florent (À propos)
- [ ] 15-20 images hero recettes (16:9, haute qualité)
- [ ] Images étapes recettes (optionnel)
- [ ] Mockup livre (3D rotatif si possible)

### Textes

- [ ] Section "Mon histoire" (300-500 mots, storytelling)
- [ ] 15-20 recettes complètes (titre, description, ingrédients, étapes, tips)
- [ ] Témoignages clients authentiques (5-10 mini reviews)
- [ ] FAQ (10-15 questions/réponses)
- [ ] Mentions légales
- [ ] CGV (Conditions Générales de Vente)
- [ ] Politique de confidentialité (RGPD compliant)
- [ ] Politique de cookies

### Emails

- [ ] E-book "10 recettes essentielles" (PDF, design premium)
- [ ] Textes des 5 emails séquence de bienvenue
- [ ] Template newsletter hebdomadaire

---

## 🚀 Optimisations & Tests

### Performance

- [ ] Optimiser images (Next.js Image component partout)
- [ ] Lazy loading composants (React.lazy + Suspense)
- [ ] Code splitting par route
- [ ] Analyser bundle size (`npm run build` puis `npx @next/bundle-analyzer`)
- [ ] Lighthouse audit : score >90 partout

### SEO

- [ ] Sitemap.xml généré automatiquement
- [ ] Robots.txt
- [ ] Schema.org markup (Recipe, Organization, BreadcrumbList)
- [ ] OpenGraph tags sur toutes les pages
- [ ] Twitter Card tags
- [ ] Meta descriptions sur toutes les pages
- [ ] H1 unique par page
- [ ] URLs propres et slugifiées

### Accessibilité

- [ ] Audit axe DevTools : 0 erreur
- [ ] Navigation clavier complète
- [ ] ARIA labels sur éléments interactifs
- [ ] Contrast ratio >4.5:1 partout
- [ ] Focus visible sur tous les éléments
- [ ] Alt text sur toutes les images

### Responsive

- [ ] Tester sur iPhone SE (375px)
- [ ] Tester sur iPhone 12 Pro (390px)
- [ ] Tester sur iPad (768px)
- [ ] Tester sur Desktop 1920px
- [ ] Vérifier toutes les pages/composants

### Tests

- [ ] Tests unitaires (Vitest) pour fonctions utils
- [ ] Tests E2E (Playwright) :
  - [ ] Inscription newsletter
  - [ ] Navigation recettes
  - [ ] Filtres recettes
  - [ ] Mode Chef
  - [ ] Login admin

---

## 📦 Phase 2 (Après validation Phase 1)

- [ ] Configuration Stripe
- [ ] Page Membership avec pricing
- [ ] Checkout Stripe
- [ ] Customer Portal Stripe
- [ ] Webhooks Stripe
- [ ] 100+ recettes premium
- [ ] Vidéos HD hébergées
- [ ] Page Livre avec bundles
- [ ] Panier & Checkout Livre
- [ ] Gestion commandes livre (CRM)
- [ ] Tracking livraison
- [ ] Lives mensuels (Zoom/StreamYard)

---

**Bon courage ! 💪 Le projet est bien lancé, maintenant c'est à vous de jouer ! 🚀**

N'oubliez pas de commencer par configurer Supabase et Resend avant de coder (voir `SETUP_GUIDE.md`).
