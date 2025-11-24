import Link from 'next/link';

export const metadata = {
  title: 'Politique de Confidentialité | Florent Food',
  description: 'Politique de confidentialité et protection des données personnelles',
};

export default function PolitiqueConfidentialitePage() {
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
          Politique de Confidentialité
        </h1>

        <div className="prose prose-lg max-w-none space-y-8">
          {/* Introduction */}
          <section>
            <p className="text-lg text-gray-700 leading-relaxed">
              Chez Florent Food, nous prenons la protection de vos données personnelles très au sérieux.
              Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons
              vos informations personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>
          </section>

          {/* Responsable du traitement */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Responsable du traitement des données
            </h2>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <p className="mb-2"><strong>Responsable :</strong> Florent Carivenc</p>
              <p className="mb-2"><strong>Adresse :</strong> 15 rue des cresses, Maison 245, 34110 Vic la Gardiole</p>
              <p className="mb-0">
                <strong>Email :</strong>{' '}
                <a href="mailto:florentcmtpro@gmail.com" className="text-orange-600 hover:text-orange-700">
                  florentcmtpro@gmail.com
                </a>
              </p>
            </div>
          </section>

          {/* Données collectées */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Données personnelles collectées
            </h2>
            <p className="mb-4">Nous collectons les données suivantes :</p>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">Newsletter</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Adresse email</li>
                <li>Date d'inscription</li>
                <li>Statut d'abonnement (actif/inactif)</li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Cookies et données de navigation</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Adresse IP</li>
                <li>Type de navigateur</li>
                <li>Pages visitées</li>
                <li>Durée de visite</li>
              </ul>
            </div>
          </section>

          {/* Finalité du traitement */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Finalité du traitement
            </h2>
            <p className="mb-4">Vos données sont collectées pour les finalités suivantes :</p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 ml-4">
              <li>
                <strong>Newsletter :</strong> Vous envoyer nos recettes hebdomadaires et actualités culinaires
              </li>
              <li>
                <strong>Amélioration du site :</strong> Analyser le trafic et améliorer l'expérience utilisateur
              </li>
              <li>
                <strong>Respect des obligations légales :</strong> Conservation pour conformité RGPD
              </li>
            </ul>
          </section>

          {/* Base légale */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Base légale du traitement
            </h2>
            <p>
              Le traitement de vos données repose sur votre <strong>consentement explicite</strong> lors de
              votre inscription à la newsletter. Vous pouvez retirer ce consentement à tout moment.
            </p>
          </section>

          {/* Durée de conservation */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Durée de conservation des données
            </h2>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <ul className="space-y-3 text-gray-700">
                <li>
                  <strong>Abonnés actifs :</strong> Tant que vous êtes abonné à la newsletter
                </li>
                <li>
                  <strong>Après désinscription :</strong> Suppression immédiate de vos données personnelles
                </li>
                <li>
                  <strong>Cookies :</strong> 13 mois maximum
                </li>
              </ul>
            </div>
          </section>

          {/* Vos droits */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Vos droits (RGPD)
            </h2>
            <p className="mb-4">
              Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-orange-600">✓</span>
                  Droit d'accès
                </h3>
                <p className="text-sm text-gray-600">
                  Obtenir une copie de vos données personnelles
                </p>
              </div>

              <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-orange-600">✓</span>
                  Droit de rectification
                </h3>
                <p className="text-sm text-gray-600">
                  Corriger vos données inexactes ou incomplètes
                </p>
              </div>

              <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-orange-600">✓</span>
                  Droit à l'effacement
                </h3>
                <p className="text-sm text-gray-600">
                  Demander la suppression de vos données
                </p>
              </div>

              <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-orange-600">✓</span>
                  Droit d'opposition
                </h3>
                <p className="text-sm text-gray-600">
                  Vous opposer au traitement de vos données
                </p>
              </div>

              <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-orange-600">✓</span>
                  Droit à la portabilité
                </h3>
                <p className="text-sm text-gray-600">
                  Récupérer vos données dans un format exploitable
                </p>
              </div>

              <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-orange-600">✓</span>
                  Droit de limitation
                </h3>
                <p className="text-sm text-gray-600">
                  Limiter le traitement de vos données
                </p>
              </div>
            </div>

            <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Comment exercer vos droits ?
              </h3>
              <p className="text-gray-700 mb-3">
                Pour exercer l'un de ces droits, contactez-nous à :{' '}
                <a
                  href="mailto:florentcmtpro@gmail.com"
                  className="text-orange-600 hover:text-orange-700 font-medium"
                >
                  florentcmtpro@gmail.com
                </a>
              </p>
              <p className="text-sm text-gray-600">
                Nous nous engageons à vous répondre dans un délai maximum d'un mois.
              </p>
            </div>
          </section>

          {/* Sécurité */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Sécurité de vos données
            </h2>
            <p className="mb-4">
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger
              vos données contre :
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>L'accès non autorisé</li>
              <li>La perte accidentelle</li>
              <li>La divulgation ou la modification non autorisée</li>
            </ul>
            <p className="mt-4">
              Notre hébergeur (Contabo) respecte les normes de sécurité européennes et nos communications
              sont chiffrées via HTTPS (SSL/TLS).
            </p>
          </section>

          {/* Partage des données */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Partage des données
            </h2>
            <p className="mb-4">
              Nous ne vendons, ne louons ni ne partageons vos données personnelles avec des tiers, sauf dans les cas suivants :
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>
                <strong>Prestataires techniques :</strong> Contabo (hébergement), Cloudinary (stockage d'images)
              </li>
              <li>
                <strong>Obligations légales :</strong> Si requis par la loi ou une autorité judiciaire
              </li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Cookies
            </h2>
            <p>
              Pour en savoir plus sur l'utilisation des cookies, consultez notre{' '}
              <Link href="/cookies" className="text-orange-600 hover:text-orange-700 underline font-medium">
                Politique de Cookies
              </Link>.
            </p>
          </section>

          {/* Réclamation */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. Droit de réclamation
            </h2>
            <p className="mb-4">
              Si vous estimez que vos droits ne sont pas respectés, vous avez le droit d'introduire
              une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) :
            </p>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <p className="mb-2"><strong>CNIL</strong></p>
              <p className="mb-2">3 Place de Fontenoy - TSA 80715</p>
              <p className="mb-2">75334 PARIS CEDEX 07</p>
              <p>
                Site web :{' '}
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 hover:text-orange-700"
                >
                  www.cnil.fr
                </a>
              </p>
            </div>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              11. Modifications de la politique
            </h2>
            <p>
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.
              Toute modification sera publiée sur cette page avec une date de mise à jour.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              12. Contact
            </h2>
            <p>
              Pour toute question concernant cette politique de confidentialité ou vos données personnelles,
              contactez-nous à :{' '}
              <a
                href="mailto:florentcmtpro@gmail.com"
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                florentcmtpro@gmail.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-600">
          <p>
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </main>
    </div>
  );
}
