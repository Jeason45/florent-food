import Link from 'next/link';

export const metadata = {
  title: 'Mentions Légales | Florent Food',
  description: 'Mentions légales du site Florent Food',
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFBF7] to-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Retour à l'accueil
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Mentions Légales
        </h1>

        <div className="prose prose-lg max-w-none">
          {/* Éditeur du site */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Éditeur du site
            </h2>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <p className="mb-2"><strong>Nom :</strong> Florent Carivenc</p>
              <p className="mb-2"><strong>Statut :</strong> Particulier</p>
              <p className="mb-2">
                <strong>Adresse :</strong><br />
                15 rue des cresses, Maison 245<br />
                34110 Vic la Gardiole<br />
                France
              </p>
              <p className="mb-2">
                <strong>Email :</strong>{' '}
                <a href="mailto:florentcmtpro@gmail.com" className="text-orange-600 hover:text-orange-700">
                  florentcmtpro@gmail.com
                </a>
              </p>
              <p className="mb-0"><strong>SIRET :</strong> En cours d'obtention</p>
            </div>
          </section>

          {/* Directeur de publication */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Directeur de la publication
            </h2>
            <p>Le directeur de la publication du site est Florent Carivenc.</p>
          </section>

          {/* Hébergement */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Hébergement
            </h2>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <p className="mb-2"><strong>Hébergeur :</strong> Contabo GmbH</p>
              <p className="mb-2">
                <strong>Adresse :</strong><br />
                Aschauer Straße 32a<br />
                81549 München<br />
                Allemagne
              </p>
              <p className="mb-2"><strong>Site web :</strong>{' '}
                <a
                  href="https://contabo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 hover:text-orange-700"
                >
                  https://contabo.com
                </a>
              </p>
              <p className="mb-0"><strong>Serveur :</strong> IP 194.163.180.53</p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Propriété intellectuelle
            </h2>
            <p className="mb-4">
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur
              et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les
              documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
            <p>
              La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est
              formellement interdite sauf autorisation expresse du directeur de la publication.
            </p>
          </section>

          {/* Protection des données */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Protection des données personnelles
            </h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit
              d'accès, de rectification et de suppression des données vous concernant. Pour exercer ce droit,
              veuillez nous contacter à l'adresse : {' '}
              <a href="mailto:florentcmtpro@gmail.com" className="text-orange-600 hover:text-orange-700">
                florentcmtpro@gmail.com
              </a>
            </p>
            <p className="mt-4">
              Pour plus d'informations, consultez notre{' '}
              <Link href="/politique-confidentialite" className="text-orange-600 hover:text-orange-700 underline">
                Politique de Confidentialité
              </Link>.
            </p>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Cookies
            </h2>
            <p>
              Ce site utilise des cookies pour améliorer l'expérience utilisateur. Pour en savoir plus,
              consultez notre{' '}
              <Link href="/cookies" className="text-orange-600 hover:text-orange-700 underline">
                Politique de Cookies
              </Link>.
            </p>
          </section>

          {/* Crédits */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Crédits
            </h2>
            <p className="mb-2">
              <strong>Conception et développement :</strong> Jeason Lemoine
            </p>
            <p className="mb-2">
              <strong>Images :</strong> Cloudinary & Photos personnelles
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Contact
            </h2>
            <p>
              Pour toute question concernant le site, vous pouvez nous contacter à l'adresse :{' '}
              <a href="mailto:florentcmtpro@gmail.com" className="text-orange-600 hover:text-orange-700">
                florentcmtpro@gmail.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-600">
          <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</p>
        </div>
      </main>
    </div>
  );
}
