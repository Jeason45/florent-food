# 🎨 Florent Food - La Haute Pâtisserie Accessible

> Plateforme premium pour créateur de contenu culinaire avec système de newsletter, recettes, et CRM intégré

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?style=flat-square&logo=supabase)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat-square&logo=tailwind-css)

---

## 📖 À propos

**Florent Food** est une plateforme web premium dédiée à Florent, créateur de contenu culinaire suivi par plus de **500K personnes** (Instagram 140K + TikTok 400K).

### 🎯 Vision

Démocratiser la haute pâtisserie en rendant accessibles les techniques des grands chefs grâce à des explications simples, du storytelling authentique et une pédagogie d'excellence.

### ⚡ Stratégie

**Phase 1 (6 semaines)** : Site vitrine + Newsletter gratuite → Acquisition d'audience
**Phase 2 (3 mois)** : Membership payant (12€/mois) + Vente livre
**Phase 3 (6+ mois)** : App mobile native (si >1000 membres)

---

## 🚀 Quick Start

### Prérequis

- Node.js 18+ et npm
- Compte Supabase (gratuit)
- Compte Resend (gratuit - 100 emails/jour)

### Installation

```bash
# 1. Aller dans le projet
cd "/Users/jeasonlemoine/Desktop/Projet Flo/florent-food"

# 2. Installer les dépendances
npm install

# 3. Configurer l'environnement
cp .env.local.example .env.local
# Éditez .env.local avec vos vraies clés API

# 4. Lancer le serveur de dev
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

### Configuration détaillée

📖 **Suivez le guide complet** : [SETUP_GUIDE.md](./SETUP_GUIDE.md)
📊 **Voir la progression** : [PROGRESS.md](./PROGRESS.md)

---

## 🏗️ Stack Technique

### Frontend
- **Next.js 15** (App Router, React Server Components)
- **TypeScript** (mode strict)
- **Tailwind CSS v4** (design system custom)
- **Framer Motion** (animations premium)
- **shadcn/ui inspired** (composants UI)

### Backend
- **Supabase** : PostgreSQL + Auth + Storage + RLS
- **Resend** : Emails transactionnels
- **Stripe** : Paiements (Phase 2)

### Hébergement
- **Vercel** : Déploiement continu, edge network

---

## 📁 Structure du Projet

```
florent-food/
├── src/
│   ├── app/                      # Pages Next.js
│   ├── components/               # Composants React
│   ├── lib/                      # Librairies (Supabase, utils)
│   └── types/                    # Types TypeScript
├── public/                       # Assets statiques
├── supabase/                     # Schéma DB
├── SETUP_GUIDE.md                # Guide configuration
├── PROGRESS.md                   # Suivi progression
└── README.md                     # Ce fichier
```

---

## 🎨 Design System Premium

### Palette "Hermès-Inspired"

- **Terracotta** `#E07A5F` - Couleur signature
- **Crème** `#F4F1DE` - Fond élégant
- **Noir élégant** `#2D2D2D` - Texte
- **Or** `#D4AF37` - Accents premium

### Typographie

- **Headings** : Playfair Display (serif)
- **Body** : Inter (sans-serif)

---

## 🧪 Commandes

```bash
npm run dev       # Serveur de développement
npm run build     # Build production
npm run start     # Lancer en production
npm run lint      # Vérifier le code
```

---

## 📈 Roadmap

### ✅ Phase 1 : Acquisition (6 semaines)

- [x] Design system premium
- [x] Homepage avec hero
- [x] Header/Footer
- [ ] Newsletter complète
- [ ] 15-20 recettes gratuites
- [ ] CRM admin

### 🚧 Phase 2 : Monétisation (3 mois)

- [ ] Membership 12€/mois
- [ ] 100+ recettes premium
- [ ] Vente livre
- [ ] Lives mensuels

### 🔮 Phase 3 : Scale (6+ mois)

- [ ] App mobile native
- [ ] Communauté
- [ ] Mode offline avancé

---

## 🤝 Développé par

**JLDS - Jeason Lemoine Digital Studio**

- Email : jlwebdesign33@gmail.com
- Website : jldigitalstudio.com

---

## 📄 License

Propriétaire - © 2025 Florent Food. Tous droits réservés.

---

**Fait avec ❤️ et passion pour la pâtisserie** 🍰
