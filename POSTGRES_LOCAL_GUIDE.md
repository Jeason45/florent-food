# 🐘 PostgreSQL Local - Guide d'Installation

Guide complet pour installer et configurer PostgreSQL en local sur macOS pour Florent Food.

---

## 📦 Installation PostgreSQL via Homebrew

### Étape 1 : Installer PostgreSQL

```bash
# Installer PostgreSQL
brew install postgresql@16

# Démarrer le service PostgreSQL
brew services start postgresql@16
```

**Temps estimé :** 2-3 minutes

### Étape 2 : Vérifier l'installation

```bash
# Vérifier que PostgreSQL est bien installé
psql --version
# Devrait afficher : psql (PostgreSQL) 16.x
```

### Étape 3 : Créer la base de données Florent Food

```bash
# Se connecter à PostgreSQL (en tant qu'utilisateur système)
psql postgres

# Dans le prompt psql, créer la base de données :
CREATE DATABASE florent_food;

# Créer un utilisateur dédié (optionnel mais recommandé)
CREATE USER florent_admin WITH PASSWORD 'votre_mot_de_passe_securise';

# Donner tous les privilèges sur la base
GRANT ALL PRIVILEGES ON DATABASE florent_food TO florent_admin;

# Quitter psql
\q
```

---

## 🔧 Configuration du projet

### Étape 1 : Installer Prisma (ORM)

Prisma va remplacer le client Supabase pour gérer la base de données.

```bash
cd "/Users/jeasonlemoine/Desktop/Projet Flo/florent-food"

# Installer Prisma
npm install prisma @prisma/client

# Initialiser Prisma
npx prisma init
```

Cela va créer :
- `prisma/schema.prisma` (schéma de base de données)
- `.env` avec `DATABASE_URL`

### Étape 2 : Configurer `.env.local`

Ouvrez `.env.local` et ajoutez :

```env
# PostgreSQL Local
DATABASE_URL="postgresql://florent_admin:votre_mot_de_passe_securise@localhost:5432/florent_food?schema=public"

# OU si vous utilisez l'utilisateur système (pas de mot de passe) :
DATABASE_URL="postgresql://localhost:5432/florent_food?schema=public"
```

**Format de l'URL :**
```
postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]?schema=public
```

### Étape 3 : Créer le schéma Prisma

Je vais créer un fichier `prisma/schema.prisma` adapté depuis le schéma Supabase.

**Le schéma sera créé automatiquement par Claude dans les prochains messages.**

### Étape 4 : Appliquer le schéma à la base

```bash
# Créer les tables dans PostgreSQL
npx prisma db push

# Générer le client Prisma
npx prisma generate
```

### Étape 5 : Ouvrir Prisma Studio (optionnel mais utile)

```bash
# Interface graphique pour voir/éditer vos données
npx prisma studio
```

Ouvre automatiquement http://localhost:5555 avec une interface visuelle pour gérer la DB.

---

## 🔄 Remplacer Supabase par Prisma dans le code

### Avant (Supabase)

```typescript
import { createClient } from "@/lib/supabase/server";

const supabase = await createClient();
const { data, error } = await supabase
  .from('recipes')
  .select('*')
  .eq('status', 'published');
```

### Après (Prisma)

```typescript
import { prisma } from "@/lib/prisma";

const recipes = await prisma.recipe.findMany({
  where: { status: 'published' }
});
```

**Bien plus simple !** 🎉

---

## 🗄️ Commandes PostgreSQL utiles

### Démarrer/Arrêter PostgreSQL

```bash
# Démarrer
brew services start postgresql@16

# Arrêter
brew services stop postgresql@16

# Redémarrer
brew services restart postgresql@16

# Statut
brew services info postgresql@16
```

### Se connecter à la base de données

```bash
# Avec psql
psql florent_food

# Ou avec l'URL complète
psql postgresql://localhost:5432/florent_food
```

### Commandes psql utiles

```sql
-- Lister les bases de données
\l

-- Se connecter à une base
\c florent_food

-- Lister les tables
\dt

-- Voir la structure d'une table
\d recipes

-- Voir toutes les données d'une table
SELECT * FROM recipes;

-- Quitter
\q
```

---

## 🎯 Avantages PostgreSQL Local

✅ **Gratuit à 100%** - Aucune limite
✅ **Rapide** - Pas de latence réseau
✅ **Contrôle total** - Vous êtes admin
✅ **Hors ligne** - Fonctionne sans Internet
✅ **Pas de limite de projets** - Créez autant de DB que vous voulez

⚠️ **Inconvénient** : Pas accessible depuis Internet (mais OK pour dev local)

---

## 🚀 Migration future vers hébergement cloud

Quand vous voudrez mettre en production, vous pourrez facilement migrer vers :

1. **Supabase** (plan payant ou nouveau compte)
2. **Neon** (gratuit)
3. **Railway** (5$/mois gratuit)
4. **Vercel Postgres** (intégré avec Vercel)

**Migration simple :**
```bash
# Exporter le schéma
npx prisma db pull

# Changer DATABASE_URL dans .env
# Appliquer sur la nouvelle base
npx prisma db push
```

---

## ✅ Checklist Installation

- [ ] PostgreSQL installé via Homebrew
- [ ] Service PostgreSQL démarré
- [ ] Base de données `florent_food` créée
- [ ] Utilisateur `florent_admin` créé (optionnel)
- [ ] Prisma installé (`npm install prisma @prisma/client`)
- [ ] `.env.local` configuré avec `DATABASE_URL`
- [ ] Schéma Prisma créé (`prisma/schema.prisma`)
- [ ] Tables créées (`npx prisma db push`)
- [ ] Prisma Studio testé (`npx prisma studio`)

---

## 🆘 Dépannage

### "psql: command not found"

PostgreSQL n'est pas dans le PATH.

**Solution :**
```bash
# Ajouter à votre .zshrc ou .bash_profile
echo 'export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### "connection refused"

PostgreSQL n'est pas démarré.

**Solution :**
```bash
brew services start postgresql@16
```

### "database does not exist"

La base `florent_food` n'existe pas.

**Solution :**
```bash
psql postgres
CREATE DATABASE florent_food;
\q
```

---

**Prêt à installer PostgreSQL ? Dites-moi quand c'est fait, je créerai le schéma Prisma ! 🚀**
