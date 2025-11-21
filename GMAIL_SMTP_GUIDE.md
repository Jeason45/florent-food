# 📧 Guide Configuration Gmail SMTP - Florent Food

## Pourquoi Gmail SMTP ?

✅ **Gratuit** : 500 emails/jour (largement suffisant pour Phase 1)
✅ **Fiable** : Excellente deliverability
✅ **Simple** : Configuration en 5 minutes
✅ **Sécurisé** : Authentification 2FA + App Password

---

## 🚀 Étape 1 : Activer la validation en 2 étapes (2FA)

### 1.1 Se connecter à votre compte Google

1. Allez sur [myaccount.google.com](https://myaccount.google.com)
2. Connectez-vous avec le compte Gmail que vous voulez utiliser pour Florent Food

### 1.2 Activer la 2FA

1. Dans le menu de gauche, cliquez sur **"Sécurité"**
2. Sous "Connexion à Google", trouvez **"Validation en 2 étapes"**
3. Cliquez sur **"Activer"**
4. Suivez les étapes :
   - Entrez votre numéro de téléphone
   - Recevez un code SMS
   - Confirmez le code
   - Activez la 2FA

✅ **Votre compte est maintenant plus sécurisé !**

---

## 🔐 Étape 2 : Générer un Mot de Passe d'Application

### 2.1 Accéder aux Mots de passe d'application

1. Toujours sur la page **"Sécurité"** de votre compte Google
2. Sous "Connexion à Google", trouvez **"Mots de passe d'application"**
   - ⚠️ Si vous ne voyez pas cette option, c'est que la 2FA n'est pas activée (retournez à l'Étape 1)
3. Cliquez sur **"Mots de passe d'application"**
4. Google peut vous demander de vous reconnecter (entrez votre mot de passe)

### 2.2 Créer le mot de passe d'application

1. Dans "Sélectionnez l'application", choisissez **"Autre (nom personnalisé)"**
2. Tapez : **"Florent Food - Newsletter"**
3. Cliquez sur **"Générer"**

### 2.3 Copier le mot de passe

Google va afficher un **mot de passe de 16 caractères** comme :

```
xxxx xxxx xxxx xxxx
```

⚠️ **IMPORTANT** :
- **COPIEZ-LE IMMÉDIATEMENT** dans un endroit sûr
- Vous ne pourrez **JAMAIS** le revoir après avoir fermé cette fenêtre
- C'est ce mot de passe que vous utiliserez dans `.env.local`

✅ **Cliquez sur "Terminé"**

---

## ⚙️ Étape 3 : Configurer le projet Florent Food

### 3.1 Créer le fichier `.env.local`

Dans le dossier du projet, créez (ou modifiez) le fichier `.env.local` :

```bash
cd "/Users/jeasonlemoine/Desktop/Projet Flo/florent-food"
cp .env.local.example .env.local
```

### 3.2 Remplir les variables Gmail

Ouvrez `.env.local` et remplissez :

```env
# Gmail SMTP
GMAIL_USER=votre.email@gmail.com
GMAIL_APP_PASSWORD=xxxxyyyyzzzzaaaa
NOTIFICATION_EMAIL=votre.email@gmail.com
```

**Exemple concret :**

```env
# Gmail SMTP
GMAIL_USER=florent.patisserie@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
NOTIFICATION_EMAIL=florent.patisserie@gmail.com
```

⚠️ **Notes importantes** :
- `GMAIL_USER` : Votre adresse Gmail complète
- `GMAIL_APP_PASSWORD` : Le mot de passe de 16 caractères (avec ou sans espaces, ça marche)
- `NOTIFICATION_EMAIL` : L'email qui recevra les notifications (nouvelles inscriptions, etc.)

---

## ✅ Étape 4 : Tester la configuration

### 4.1 Créer un script de test

Créez un fichier `test-email.ts` dans le dossier du projet :

```typescript
// test-email.ts
import { sendEmail, verifyGmailConnection } from "./src/lib/email/config";

async function testEmail() {
  console.log("🧪 Test de la configuration Gmail SMTP...\n");

  // 1. Vérifier la connexion
  console.log("1️⃣ Vérification connexion...");
  const isConnected = await verifyGmailConnection();

  if (!isConnected) {
    console.error("❌ Connexion échouée. Vérifiez vos credentials dans .env.local");
    return;
  }

  // 2. Envoyer un email de test
  console.log("\n2️⃣ Envoi d'un email de test...");
  const result = await sendEmail({
    to: process.env.GMAIL_USER!, // S'envoyer à soi-même
    subject: "🧪 Test Florent Food - Gmail SMTP",
    html: `
      <h1>Ça marche ! 🎉</h1>
      <p>Gmail SMTP est correctement configuré pour Florent Food.</p>
      <p>Vous pouvez maintenant envoyer des emails de newsletter.</p>
    `,
  });

  if (result.success) {
    console.log("✅ Email envoyé avec succès !");
    console.log("📧 Vérifiez votre boîte de réception:", process.env.GMAIL_USER);
  } else {
    console.error("❌ Erreur lors de l'envoi:", result.error);
  }
}

testEmail();
```

### 4.2 Lancer le test

```bash
npx tsx test-email.ts
```

### 4.3 Vérifier le résultat

Vous devriez voir :

```
🧪 Test de la configuration Gmail SMTP...

1️⃣ Vérification connexion...
✅ Gmail SMTP connecté avec succès

2️⃣ Envoi d'un email de test...
✅ Email envoyé avec succès: <message-id>
📧 Vérifiez votre boîte de réception: votre.email@gmail.com
```

**Allez vérifier votre boîte Gmail** : vous devriez avoir reçu l'email de test ! 🎉

---

## 🚨 Dépannage (Troubleshooting)

### Erreur : "Invalid login: 535-5.7.8 Username and Password not accepted"

**Causes possibles :**
1. ❌ Le mot de passe d'application est incorrect
2. ❌ La validation en 2 étapes n'est pas activée
3. ❌ Vous utilisez votre mot de passe Gmail normal (pas le mot de passe d'application)

**Solution :**
- Vérifiez que la 2FA est bien activée
- Générez un nouveau mot de passe d'application
- Copiez-le correctement dans `.env.local` (sans espaces superflus)

### Erreur : "Connection timeout"

**Causes possibles :**
1. ❌ Pas de connexion Internet
2. ❌ Port 587 bloqué par votre firewall/antivirus
3. ❌ Gmail SMTP temporairement indisponible

**Solution :**
- Vérifiez votre connexion Internet
- Désactivez temporairement votre firewall/antivirus
- Réessayez plus tard

### Erreur : "Daily sending quota exceeded"

**Cause :**
- Vous avez dépassé la limite de 500 emails/jour

**Solution :**
- Attendez 24h pour que le quota se réinitialise
- OU passez à un service professionnel (Resend, SendGrid, etc.) si vous avez besoin de plus

### L'email arrive dans les SPAMS

**Causes possibles :**
1. ❌ Domaine Gmail (@gmail.com) moins professionnel
2. ❌ Contenu de l'email détecté comme spam
3. ❌ Pas de SPF/DKIM configuré

**Solutions :**
- **Court terme** : Demander aux destinataires d'ajouter votre email aux contacts
- **Moyen terme** : Utiliser un domaine personnalisé (florentfood.com)
- **Long terme** : Passer à Resend/SendGrid avec domaine vérifié + SPF/DKIM

---

## 📊 Limites de Gmail SMTP

| Limite | Valeur |
|--------|--------|
| **Emails/jour** | 500 (compte gratuit) |
| **Destinataires/email** | 100 |
| **Taille max email** | 25 MB (pièces jointes incluses) |
| **Emails/seconde** | ~1-2 (rate limiting) |

**Pour Phase 1**, c'est largement suffisant pour :
- Newsletter hebdomadaire à 100-500 abonnés
- Emails automatiques (bienvenue, confirmations, etc.)

**Pour Phase 2** (si >500 abonnés), envisagez :
- **Resend** (100 emails/jour gratuit, puis 0,30€/1000)
- **SendGrid** (100 emails/jour gratuit, puis payant)
- **Brevo (ex-Sendinblue)** (300 emails/jour gratuit)

---

## 🎯 Configuration Recommandée pour Production

### Utiliser un email dédié

❌ **Évitez** : votre.email.perso@gmail.com
✅ **Préférez** : florent.newsletter@gmail.com

**Pourquoi ?**
- Séparation claire perso/pro
- Tracking plus facile
- Meilleure réputation email

### Créer un domaine personnalisé (optionnel mais recommandé)

Au lieu de `@gmail.com`, utilisez `@florentfood.com` :

1. Achetez un domaine (ex: OVH, Namecheap, ~10€/an)
2. Configurez Gmail pour envoyer depuis ce domaine
3. Ajoutez les enregistrements SPF/DKIM
4. Meilleure deliverability + image professionnelle

📖 **Guide Google** : [Envoyer des emails depuis un domaine personnalisé](https://support.google.com/mail/answer/22370)

---

## ✅ Checklist Finale

Avant de passer à la suite :

- [ ] 2FA activée sur le compte Gmail
- [ ] Mot de passe d'application généré et copié
- [ ] `.env.local` créé avec les bonnes variables
- [ ] Script de test exécuté avec succès
- [ ] Email de test reçu dans la boîte Gmail
- [ ] Serveur de dev relancé (`npm run dev`)

**Tout est bon ? Parfait ! 🎉**

Vous pouvez maintenant continuer le développement de la newsletter avec la fonction `sendEmail()` disponible dans tout le projet.

---

## 📞 Besoin d'aide ?

Si vous bloquez, n'hésitez pas à :
1. Vérifier les erreurs dans la console
2. Consulter la [documentation Gmail SMTP officielle](https://support.google.com/mail/answer/7126229)
3. Me recontacter pour assistance

**Bon courage avec Florent Food ! 🍰**
