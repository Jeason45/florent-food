# 📧 Système de Newsletter Hebdomadaire - Florent Food

## Vue d'ensemble

Le système de newsletter hebdomadaire permet de gérer et d'automatiser l'envoi de newsletters contenant les recettes de la semaine. Les newsletters sont organisées par semaines (dimanche à dimanche) et s'affichent automatiquement sur le site.

---

## 🏗️ Architecture

### Base de données (Prisma)

- **Newsletter**: Contient les informations de la newsletter (sujet, dates, statut, etc.)
- **NewsletterRecipe**: Table de liaison entre Newsletter et Recipe (avec position)
- **Recipe**: Les recettes publiées
- **NewsletterSubscriber**: Les abonnés à la newsletter

### Statuts des newsletters

1. **DRAFT** 📝 - Brouillon (en cours de création)
2. **SCHEDULED** 📆 - Programmée (sera activée automatiquement)
3. **ACTIVE** ✅ - Active (visible sur le site, emails envoyés)
4. **SENT** 📧 - Envoyée (emails envoyés mais plus active)
5. **ARCHIVED** 📦 - Archivée (période terminée)

---

## 📅 Workflow Hebdomadaire

### 1. Création d'une newsletter

#### Via l'interface admin (`/admin/newsletter/new`)

1. Remplir le sujet de l'email
2. Écrire le message d'introduction
3. **Sélectionner la période** (dimanche à dimanche)
   - Date de début : dimanche
   - Date de fin : calculée automatiquement (+6 jours)
   - Numéro de semaine : calculé automatiquement
4. Ajouter les recettes (minimum 1, pas de maximum)
   - La première recette = recette principale (featured)
   - Les suivantes = recettes secondaires
5. Ajouter un conseil du chef (optionnel)
6. Choisir les destinataires (Tous, Gratuits, Premium)

#### Options de sauvegarde

- **💾 Enregistrer brouillon** : Statut = DRAFT (pas visible, pas envoyée)
- **📆 Programmer** : Statut = SCHEDULED (sera activée automatiquement le dimanche)
- **🚀 Activer & Envoyer** : Statut = ACTIVE (immédiatement visible + emails envoyés)

### 2. Vue calendrier (`/admin/newsletter/calendar`)

- Vue mensuelle des newsletters par semaine
- Visualisation des statuts par couleur
- Clic sur une semaine vide = création avec dates pré-remplies
- Clic sur une newsletter = édition
- Statistiques du mois

### 3. Affichage sur le site

Le site (`/`) affiche automatiquement :
- Les recettes de la newsletter ACTIVE uniquement
- Un bandeau avec le numéro de semaine et les dates
- Les recettes groupées par catégorie (Pâtisserie, Plats, Apéro)

Si aucune newsletter active : affichage d'un message d'invitation à s'abonner.

---

## ⚙️ Automatisation (Cron Job)

### Fonctionnement

Le cron job `/api/cron/newsletter-rotation` s'exécute **quotidiennement à 00h00 UTC** et :

1. **Archive** les newsletters ACTIVE dont la date de fin est dépassée
   - Change le statut de ACTIVE → ARCHIVED

2. **Active** les newsletters SCHEDULED dont la date de début est atteinte
   - Change le statut de SCHEDULED → ACTIVE
   - Envoie les emails aux abonnés
   - Met à jour le compteur de destinataires

### Configuration

#### Sur Vercel (Production)

Le fichier `vercel.json` configure automatiquement le cron :

```json
{
  "crons": [{
    "path": "/api/cron/newsletter-rotation",
    "schedule": "0 0 * * *"
  }]
}
```

#### Test manuel

```bash
# Avec authentification
curl -X GET http://localhost:3001/api/cron/newsletter-rotation \
  -H "Authorization: Bearer VOTRE_CRON_SECRET"

# Sans authentification (dev)
curl -X GET http://localhost:3001/api/cron/newsletter-rotation
```

#### Sécurité

Pour protéger l'endpoint en production, ajouter dans `.env` :

```env
CRON_SECRET=votre_token_secret_aleatoire
```

Le cron job vérifiera le header `Authorization: Bearer ${CRON_SECRET}`.

### Alternatives au cron Vercel

Si vous n'utilisez pas Vercel, vous pouvez configurer le cron avec :

- **GitHub Actions** : Créer un workflow qui appelle l'endpoint
- **Cron-job.org** : Service gratuit de cron HTTP
- **Serveur Linux** : Crontab traditionnel
- **Vercel Cron** : Gratuit sur tous les plans

---

## 🚀 Exemple de workflow complet

### Semaine 48 (26 nov - 2 déc 2024)

**Lundi 18 novembre** (J-8)
- L'admin crée la newsletter pour la semaine 48
- Sélectionne 5 recettes
- Clique sur "Programmer" → Statut = SCHEDULED

**Dimanche 26 novembre à 00h00** (J-0)
- Le cron job s'exécute
- La newsletter passe de SCHEDULED → ACTIVE
- Les emails sont envoyés aux abonnés
- Les recettes apparaissent sur le site

**26 nov - 2 déc**
- Les visiteurs du site voient les recettes de la semaine 48
- Les abonnés peuvent cliquer sur les recettes depuis leur email

**Dimanche 2 décembre à 00h00** (J+7)
- Le cron job s'exécute
- La newsletter semaine 48 passe de ACTIVE → ARCHIVED
- La newsletter semaine 49 (si programmée) passe à ACTIVE
- Le site affiche maintenant les recettes de la semaine 49

---

## 🔧 API Endpoints

### Newsletter active
```
GET /api/newsletter/active
```

Retourne la newsletter actuellement active avec ses recettes.

### Rotation des newsletters (Cron)
```
GET /api/cron/newsletter-rotation
POST /api/cron/newsletter-rotation
```

Exécute la rotation automatique des newsletters.

---

## ✅ Checklist de déploiement

- [ ] Base de données Prisma migrée
- [ ] Variables d'environnement configurées
  - [ ] `DATABASE_URL`
  - [ ] `CRON_SECRET` (optionnel mais recommandé)
  - [ ] `NEXT_PUBLIC_SITE_URL`
- [ ] `vercel.json` commit et déployé
- [ ] Tester le cron manuellement après déploiement
- [ ] Créer au moins une newsletter SCHEDULED pour tester
- [ ] Vérifier les logs Vercel Cron après la première exécution

---

## 📝 Notes importantes

1. **Une seule newsletter ACTIVE à la fois** : Le système est conçu pour n'avoir qu'une newsletter active simultanément.

2. **Dates dimanche à dimanche** : Les newsletters suivent les semaines ISO (dimanche à dimanche).

3. **Recettes groupées par catégorie** : Sur le site, les recettes sont automatiquement groupées selon leurs catégories.

4. **Flexibilité du nombre de recettes** : Minimum 1 recette, pas de maximum.

5. **Template d'email adaptatif** : Le template s'adapte automatiquement au nombre de recettes (grille 2 colonnes).

---

## 🐛 Dépannage

### Le site n'affiche aucune recette

1. Vérifier qu'il y a une newsletter avec statut ACTIVE :
   ```sql
   SELECT * FROM newsletters WHERE status = 'active';
   ```

2. Vérifier que la newsletter a des recettes associées :
   ```sql
   SELECT * FROM newsletter_recipes WHERE newsletter_id = 'xxx';
   ```

### Le cron ne s'exécute pas

1. Vérifier les logs Vercel : Dashboard > Functions > Cron Jobs
2. Tester manuellement l'endpoint
3. Vérifier le fuseau horaire (Vercel Cron = UTC)

### Les newsletters ne passent pas de SCHEDULED à ACTIVE

1. Vérifier la `startDate` de la newsletter (doit être <= aujourd'hui)
2. Vérifier que le statut est bien SCHEDULED
3. Consulter les logs du cron job

---

## 💡 Améliorations futures possibles

- [ ] Statistiques d'engagement par newsletter
- [ ] A/B testing des sujets d'emails
- [ ] Segmentation avancée des abonnés
- [ ] Export PDF des newsletters
- [ ] Réenvoi automatique aux non-ouvreurs
- [ ] Templates d'emails multiples
- [ ] Preview mobile dans l'admin
- [ ] Duplication de newsletters existantes

---

**Documentation créée le 22 novembre 2025**
**Système développé avec Next.js 15, Prisma, PostgreSQL**
