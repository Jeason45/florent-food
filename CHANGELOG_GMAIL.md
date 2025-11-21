# 🔄 Changelog - Migration vers Gmail SMTP

**Date** : 13 novembre 2025, 21h
**Changement** : Remplacement de Resend par Gmail SMTP

---

## ✅ Ce qui a été fait

### 1. Installation de Nodemailer

```bash
npm install nodemailer @types/nodemailer
```

### 2. Nouveaux fichiers créés

| Fichier | Description |
|---------|-------------|
| `src/lib/email/config.ts` | Configuration Gmail SMTP + fonction `sendEmail()` |
| `src/lib/email/templates.ts` | Templates emails HTML (Welcome, Confirmation, etc.) |
| `GMAIL_SMTP_GUIDE.md` | Guide complet pour configurer Gmail SMTP |
| `test-email.ts` | Script de test pour vérifier la configuration |
| `CHANGELOG_GMAIL.md` | Ce fichier |

### 3. Modifications

- ✅ `.env.local.example` mis à jour avec variables Gmail :
  - `GMAIL_USER`
  - `GMAIL_APP_PASSWORD`
  - `NOTIFICATION_EMAIL`

---

## 📝 Variables d'environnement

### Avant (Resend)

```env
RESEND_API_KEY=re_...
FROM_EMAIL=noreply@florentfood.com
NOTIFICATION_EMAIL=contact@florentfood.com
```

### Après (Gmail SMTP)

```env
GMAIL_USER=votre.email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
NOTIFICATION_EMAIL=votre.email@gmail.com
```

---

## 🚀 Comment utiliser Gmail SMTP maintenant

### Envoyer un email

```typescript
import { sendEmail } from "@/lib/email/config";

const result = await sendEmail({
  to: "destinataire@example.com",
  subject: "Mon sujet",
  html: "<h1>Mon contenu HTML</h1>",
});

if (result.success) {
  console.log("✅ Email envoyé !");
} else {
  console.error("❌ Erreur:", result.error);
}
```

### Utiliser un template

```typescript
import { sendEmail } from "@/lib/email/config";
import { welcomeEmail } from "@/lib/email/templates";

const result = await sendEmail({
  to: "nouveau@abonne.com",
  subject: "Bienvenue chez Florent Food !",
  html: welcomeEmail("Prénom"), // Génère HTML complet
});
```

### Vérifier la connexion

```typescript
import { verifyGmailConnection } from "@/lib/email/config";

const isConnected = await verifyGmailConnection();
if (isConnected) {
  console.log("✅ Gmail SMTP connecté");
}
```

---

## 🧪 Tester la configuration

```bash
# Après avoir configuré .env.local avec vos credentials Gmail
npx tsx test-email.ts
```

**Vous devriez recevoir 2 emails dans votre boîte Gmail.**

---

## 📊 Limites Gmail vs Resend

| Critère | Gmail SMTP | Resend |
|---------|------------|--------|
| **Prix** | ✅ Gratuit | ✅ Gratuit (100/jour) |
| **Emails/jour** | 500 | 3 000 (plan gratuit) |
| **Setup** | 5 min | 2 min |
| **Deliverability** | ⚠️ Bonne (si @gmail.com) | ✅ Excellente |
| **Analytics** | ❌ Non | ✅ Oui (opens, clicks) |
| **Domaine custom** | ⚠️ Complexe | ✅ Facile (DNS) |
| **Support** | ❌ Non | ✅ Oui |

**Recommandation** :
- **Phase 1** (< 500 abonnés) : Gmail SMTP parfait ✅
- **Phase 2** (> 500 abonnés) : Migrer vers Resend ou SendGrid

---

## 🔄 Pour revenir à Resend plus tard

Si vous voulez repasser à Resend :

1. Installer Resend :
```bash
npm install resend
```

2. Modifier `src/lib/email/config.ts` :
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, html }) {
  const { data, error } = await resend.emails.send({
    from: 'Florent Food <noreply@florentfood.com>',
    to,
    subject,
    html,
  });

  return error ? { success: false, error } : { success: true, messageId: data.id };
}
```

3. Mettre à jour `.env.local` :
```env
RESEND_API_KEY=re_...
```

---

## ✅ Checklist Configuration Gmail

Avant de continuer le développement :

- [ ] Créer un compte Gmail dédié (recommandé)
- [ ] Activer la validation en 2 étapes (2FA)
- [ ] Générer un mot de passe d'application (16 caractères)
- [ ] Copier `.env.local.example` vers `.env.local`
- [ ] Remplir `GMAIL_USER` et `GMAIL_APP_PASSWORD`
- [ ] Tester avec `npx tsx test-email.ts`
- [ ] Vérifier réception des 2 emails de test

📖 **Guide complet : `GMAIL_SMTP_GUIDE.md`**

---

## 📞 Support

Si vous avez des questions sur la configuration Gmail :

1. Consultez `GMAIL_SMTP_GUIDE.md` (très détaillé)
2. Vérifiez les erreurs dans la console
3. Testez avec le script `test-email.ts`

**Bon développement ! 🚀**
