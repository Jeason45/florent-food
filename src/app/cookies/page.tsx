'use client';

import Link from 'next/link';

export default function CookiesPage() {
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
          Politique de Cookies
        </h1>

        <div className="prose prose-lg max-w-none space-y-8">
          {/* Introduction */}
          <section>
            <p className="text-lg text-gray-700 leading-relaxed">
              Cette page vous informe sur l'utilisation des cookies sur le site Florent Food et
              comment vous pouvez gérer vos préférences.
            </p>
          </section>

          {/* Qu'est-ce qu'un cookie */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Qu'est-ce qu'un cookie ?
            </h2>
            <p className="mb-4">
              Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, smartphone, tablette)
              lors de la visite d'un site web. Il permet de :
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Mémoriser vos préférences</li>
              <li>Faciliter votre navigation</li>
              <li>Analyser le trafic du site</li>
              <li>Améliorer l'expérience utilisateur</li>
            </ul>
          </section>

          {/* Types de cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Types de cookies utilisés
            </h2>

            <div className="space-y-4">
              {/* Cookies essentiels */}
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">🔒</span>
                  Cookies essentiels (nécessaires)
                </h3>
                <p className="text-gray-700 mb-3">
                  Ces cookies sont indispensables au fonctionnement du site. Ils ne peuvent pas être désactivés.
                </p>
                <div className="bg-white rounded-lg p-4 mt-3">
                  <p className="text-sm font-medium text-gray-900 mb-2">Exemples :</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <strong>florent_admin_session</strong> : Session d'authentification admin (7 jours)</li>
                    <li>• <strong>cookie_consent</strong> : Mémorisation de votre choix concernant les cookies (12 mois)</li>
                  </ul>
                </div>
              </div>

              {/* Cookies analytiques */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  Cookies analytiques (optionnels)
                </h3>
                <p className="text-gray-700 mb-3">
                  Ces cookies nous aident à comprendre comment vous utilisez le site pour l'améliorer.
                  Vous pouvez les refuser.
                </p>
                <div className="bg-white rounded-lg p-4 mt-3">
                  <p className="text-sm font-medium text-gray-900 mb-2">Ce que nous analysons :</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Pages les plus visitées</li>
                    <li>• Temps passé sur le site</li>
                    <li>• Parcours de navigation</li>
                    <li>• Taux de rebond</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-3 italic">
                    Durée de conservation : 13 mois maximum
                  </p>
                </div>
              </div>

              {/* Cookies fonctionnels */}
              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">⚙️</span>
                  Cookies fonctionnels (optionnels)
                </h3>
                <p className="text-gray-700 mb-3">
                  Ces cookies améliorent votre expérience en mémorisant vos préférences.
                </p>
                <div className="bg-white rounded-lg p-4 mt-3">
                  <p className="text-sm font-medium text-gray-900 mb-2">Exemples :</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Préférences d'affichage</li>
                    <li>• Langue choisie</li>
                    <li>• Recettes favorites</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Cookies tiers */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Cookies tiers
            </h2>
            <p className="mb-4">
              Certains cookies peuvent être déposés par des services tiers que nous utilisons :
            </p>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Services utilisés :</h3>

              <div className="space-y-4">
                <div className="pb-4 border-b border-gray-200 last:border-0">
                  <p className="font-medium text-gray-900 mb-2">Cloudinary</p>
                  <p className="text-sm text-gray-600 mb-2">
                    Hébergement et optimisation d'images
                  </p>
                  <a
                    href="https://cloudinary.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-orange-600 hover:text-orange-700 underline"
                  >
                    Voir leur politique de confidentialité →
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Gérer les cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Comment gérer vos cookies ?
            </h2>

            <div className="space-y-6">
              {/* Via notre bannière */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Sur notre site
                </h3>
                <p className="text-gray-700 mb-3">
                  Vous pouvez accepter ou refuser les cookies via la bannière qui s'affiche lors de votre première visite.
                </p>
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      localStorage.removeItem('cookie_consent');
                      window.location.reload();
                    }
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                  </svg>
                  Modifier mes préférences
                </button>
              </div>

              {/* Via le navigateur */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Via votre navigateur
                </h3>
                <p className="text-gray-700 mb-4">
                  Vous pouvez également configurer votre navigateur pour refuser les cookies :
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="font-medium text-gray-900 mb-2">Chrome</p>
                    <a
                      href="https://support.google.com/chrome/answer/95647"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-orange-600 hover:text-orange-700"
                    >
                      Guide Chrome →
                    </a>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="font-medium text-gray-900 mb-2">Firefox</p>
                    <a
                      href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-orange-600 hover:text-orange-700"
                    >
                      Guide Firefox →
                    </a>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="font-medium text-gray-900 mb-2">Safari</p>
                    <a
                      href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-orange-600 hover:text-orange-700"
                    >
                      Guide Safari →
                    </a>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="font-medium text-gray-900 mb-2">Edge</p>
                    <a
                      href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-orange-600 hover:text-orange-700"
                    >
                      Guide Edge →
                    </a>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-gray-700">
                    ⚠️ <strong>Attention :</strong> Bloquer tous les cookies peut affecter votre expérience
                    de navigation et empêcher certaines fonctionnalités du site de fonctionner correctement.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Durée de conservation */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Durée de conservation
            </h2>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 font-semibold text-gray-900">Type de cookie</th>
                    <th className="text-left py-3 font-semibold text-gray-900">Durée maximum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 text-gray-700">Cookies essentiels</td>
                    <td className="py-3 text-gray-700">12 mois</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-700">Cookies analytiques</td>
                    <td className="py-3 text-gray-700">13 mois</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-700">Cookies fonctionnels</td>
                    <td className="py-3 text-gray-700">12 mois</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-700">Session admin</td>
                    <td className="py-3 text-gray-700">7 jours</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Plus d'informations */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Pour en savoir plus
            </h2>
            <p className="mb-4">
              Pour plus d'informations sur la protection de vos données personnelles, consultez :
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/politique-confidentialite"
                  className="text-orange-600 hover:text-orange-700 underline font-medium"
                >
                  Notre Politique de Confidentialité
                </Link>
              </li>
              <li>
                <a
                  href="https://www.cnil.fr/fr/cookies-et-autres-traceurs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 hover:text-orange-700 underline"
                >
                  Site de la CNIL - Cookies et traceurs
                </a>
              </li>
            </ul>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Contact
            </h2>
            <p>
              Pour toute question concernant l'utilisation des cookies, contactez-nous à :{' '}
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
