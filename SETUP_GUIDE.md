# 🎨 Florent Food - Guide de Configuration Rapide

## 📋 Vue d'ensemble du projet

**Florent Food** est une plateforme premium pour créateur de contenu culinaire avec :
- Site vitrine élégant (inspiration Hermès)
- Système de newsletter avancé avec automatisations
- CRM complet pour gestion recettes et analytics
- Architecture prête pour Phase 2 (Membership + Vente livre)

**Stack** : Next.js 15 + Supabase + Resend + Vercel

---

## 🚀 Étape 1 : Configuration Supabase (15 min)

### 1.1 Créer le projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un compte gratuit
3. Créez un nouveau projet :
   - **Nom** : `florent-food` ou `florent-food-prod`
   - **Région** : `eu-west-1` (Irlande, proche de la France)
   - **Mot de passe** : Générez un mot de passe fort et **SAUVEGARDEZ-LE**

4. Attendez 2-3 minutes que le projet soit créé

### 1.2 Récupérer les clés API

Une fois le projet créé :

1. Allez dans **Settings** (⚙️) → **API**
2. Copiez les informations suivantes :
   - **Project URL** : `https://xxxxx.supabase.co`
   - **anon/public key** : `eyJhbGciOiJIUzI1N...` (commence par eyJ)
   - **service_role key** : `eyJhbGciOiJIUzI1N...` (commence par eyJ, **DIFFÉRENTE** de anon key)

⚠️ **ATTENTION** : La `service_role` key donne un accès complet à votre base. **NE JAMAIS la commit dans Git !**

### 1.3 Créer le schéma de base de données

1. Dans Supabase, allez dans **SQL Editor** (icône de base de données)
2. Cliquez sur **New query**
3. Copiez-collez **TOUT** le contenu du fichier `supabase/schema.sql`
4. Cliquez sur **Run** (F5)
5. Vérifiez qu'il n'y a pas d'erreur (vous devriez voir "Success. No rows returned")

### 1.4 Vérifier la création des tables

1. Allez dans **Table Editor** (icône de tableau)
2. Vous devriez voir 8 tables :
   - ✅ `profiles`
   - ✅ `newsletter_subscribers`
   - ✅ `recipes`
   - ✅ `newsletters`
   - ✅ `newsletter_events`
   - ✅ `email_automations`
   - ✅ `automation_queue`
   - ✅ `analytics_daily`

### 1.5 Créer votre compte admin

1. Allez dans **Authentication** → **Users**
2. Cliquez sur **Add user** → **Create new user**
3. Remplissez :
   - **Email** : Votre email (ex: `florent@florentfood.com`)
   - **Password** : Un mot de passe fort
   - **Auto Confirm User** : ✅ OUI (important !)
4. Cliquez sur **Create user**
5. Copiez le **User UID** (commence par un UUID comme `a1b2c3d4-...`)

6. Retournez dans **SQL Editor** et exécutez cette requête (remplacez `YOUR_USER_ID`) :

```sql
UPDATE profiles
SET role = 'admin'
WHERE id = 'YOUR_USER_ID';
```

---

## 📧 Étape 2 : Configuration Resend (10 min)

### 2.1 Créer un compte Resend

1. Allez sur [resend.com](https://resend.com)
2. Créez un compte gratuit (100 emails/jour gratuits)
3. Confirmez votre email

### 2.2 Obtenir votre API Key

1. Une fois connecté, allez dans **API Keys**
2. Cliquez sur **Create API Key**
3. Nom : `Florent Food - Production`
4. Permissions : **Full Access** (pour l'instant, restreindre en prod plus tard)
5. Cliquez sur **Create**
6. **COPIEZ LA CLÉ IMMÉDIATEMENT** (commence par `re_...`)
   - ⚠️ Vous ne pourrez plus la revoir après !

### 2.3 Vérifier votre domaine (optionnel mais recommandé)

**Option 1 : Utiliser le domaine temporaire Resend (pour tester)**
- Vous pouvez envoyer depuis `onboarding@resend.dev`
- Limitation : 100 emails/jour max

**Option 2 : Configurer votre propre domaine (production)**
1. Achetez un domaine (ex: `florentfood.com`)
2. Dans Resend, allez dans **Domains** → **Add Domain**
3. Entrez votre domaine
4. Ajoutez les enregistrements DNS fournis chez votre registrar
5. Attendez la vérification (quelques heures max)

---

## ⚙️ Étape 3 : Configuration du projet local (5 min)

### 3.1 Créer le fichier `.env.local`

1. À la racine du projet `/florent-food`, copiez `.env.local.example` vers `.env.local` :

```bash
cp .env.local.example .env.local
```

2. Ouvrez `.env.local` et remplissez :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1N...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1N...

# Resend
RESEND_API_KEY=re_...
FROM_EMAIL=noreply@florentfood.com
NOTIFICATION_EMAIL=florent@florentfood.com

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Florent Food
```

### 3.2 Installer les dépendances

```bash
cd /Users/jeasonlemoine/Desktop/Projet\ Flo/florent-food
npm install
```

### 3.3 Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## 🎯 Étape 4 : Prochaines étapes (développement en cours)

### ✅ Déjà fait :
- [x] Projet Next.js 15 initialisé
- [x] Design system premium créé (Hermès-inspired)
- [x] Configuration Supabase complète
- [x] Schéma de base de données avec RLS
- [x] Composants UI de base (Button, Card, Input, Badge)

### 🚧 En cours de développement :
- [ ] Homepage avec hero section vidéo
- [ ] Système de newsletter avec formulaire d'inscription
- [ ] Bibliothèque de recettes gratuites
- [ ] Page détail recette
- [ ] CRM Admin complet
- [ ] Automatisations emails (séquences de bienvenue)

---

## 📝 Commandes utiles

```bash
# Développement
npm run dev              # Lancer le serveur de dev

# Build & Production
npm run build            # Build pour production
npm run start            # Lancer en mode production

# Linting
npm run lint             # Vérifier le code

# Supabase (optionnel - si CLI installée)
npx supabase login       # Se connecter à Supabase
npx supabase link        # Lier le projet local au projet Supabase
npx supabase db pull     # Récupérer le schéma depuis le cloud
npx supabase gen types typescript --local > src/types/supabase.ts
```

---

## 🔐 Sécurité

### ❌ NE JAMAIS commit ces fichiers :
- `.env.local`
- `.env`
- Tout fichier contenant `SUPABASE_SERVICE_ROLE_KEY`
- Tout fichier contenant `RESEND_API_KEY`

Le fichier `.gitignore` est déjà configuré pour les ignorer.

### ✅ Bonnes pratiques :
- Utilisez `.env.local` pour le dev local
- Utilisez les variables d'environnement Vercel pour la production
- Ne partagez JAMAIS vos clés API publiquement

---

## 🆘 Troubleshooting

### "Cannot connect to Supabase"
- Vérifiez que `.env.local` existe et contient les bonnes clés
- Vérifiez que `NEXT_PUBLIC_SUPABASE_URL` est bien formaté (commence par `https://`)
- Redémarrez le serveur de dev (`Ctrl+C` puis `npm run dev`)

### "Auth error" / "RLS policy violation"
- Vérifiez que vous avez bien mis `role = 'admin'` dans la table `profiles`
- Vérifiez que le user ID correspond bien à celui dans Supabase Auth

### "Build errors"
- Supprimez `.next` : `rm -rf .next`
- Réinstallez les dépendances : `rm -rf node_modules package-lock.json && npm install`

---

## 📞 Support

Si vous avez des questions :
1. Consultez ce guide en premier
2. Vérifiez les fichiers de code (bien commentés)
3. Consultez la documentation officielle :
   - [Next.js 15](https://nextjs.org/docs)
   - [Supabase](https://supabase.com/docs)
   - [Resend](https://resend.com/docs)

---

## 🎨 Architecture du projet

```
florent-food/
├── src/
│   ├── app/                    # Pages Next.js (App Router)
│   │   ├── layout.tsx          # Layout principal
│   │   ├── page.tsx            # Homepage
│   │   ├── recettes/           # Pages recettes
│   │   └── admin/              # CRM Admin
│   ├── components/
│   │   ├── ui/                 # Composants UI de base
│   │   ├── layout/             # Header, Footer, Navigation
│   │   └── sections/           # Sections homepage
│   ├── lib/
│   │   ├── supabase/           # Clients Supabase
│   │   ├── resend/             # Configuration Resend
│   │   └── utils.ts            # Fonctions utilitaires
│   └── types/                  # Types TypeScript
├── public/                     # Assets statiques
├── supabase/
│   └── schema.sql              # Schéma de base de données
├── .env.local                  # Variables d'environnement (à créer)
└── package.json
```

---

**Prêt à démarrer ? Suivez les étapes ci-dessus dans l'ordre !** 🚀

Une fois Supabase et Resend configurés, revenez me voir pour continuer le développement du site vitrine.
