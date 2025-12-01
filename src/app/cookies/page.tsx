'use client';

import Link from 'next/link';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF7]" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Navigation */}
      <div className="border-b border-[#E8E3D5] py-8 w-full px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#8B7355] hover:text-[#C77A4E] transition-colors duration-300 text-sm font-light tracking-[0.1em] uppercase"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Retour
        </Link>
      </div>

      {/* Hero */}
      <section className="py-24 md:py-32 px-8 w-full" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p className="text-xs font-light tracking-[0.3em] uppercase text-[#8B7355] mb-6" style={{ textAlign: 'center' }}>
          Gestion des Traceurs
        </p>

        <h1 className="font-serif text-[64px] md:text-[80px] font-light text-[#0F0F0F] leading-[0.9] mb-8 tracking-tight" style={{ textAlign: 'center' }}>
          Politique<br/>Cookies
        </h1>

        <div className="w-16 h-[0.5px] bg-[#C77A4E]"></div>
      </section>

      {/* Contenu */}
      <main className="pb-32 px-8 w-full" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="max-w-[700px] w-full" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4rem' }}>

          {/* Introduction */}
          <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p className="text-base font-light text-[#2A2A2A] leading-relaxed max-w-[600px]" style={{ textAlign: 'center' }}>
              Cette page vous informe sur l'utilisation des cookies sur le site Florent Food
              et comment vous pouvez gérer vos préférences.
            </p>
          </section>

          <div className="w-16 h-[0.5px] bg-[#E8E3D5]"></div>

          {/* Section 1 */}
          <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <h2 className="font-serif text-3xl font-light text-[#0F0F0F]" style={{ textAlign: 'center' }}>
              Qu'est-ce qu'un cookie ?
            </h2>

            <p className="text-base font-light text-[#2A2A2A] leading-relaxed max-w-[600px]" style={{ textAlign: 'center' }}>
              Un cookie est un petit fichier texte déposé sur votre terminal lors de la visite d'un site web.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', maxWidth: '600px' }}>
              <p className="text-base font-light text-[#2A2A2A]">Mémoriser vos préférences</p>
              <p className="text-base font-light text-[#2A2A2A]">Faciliter votre navigation</p>
              <p className="text-base font-light text-[#2A2A2A]">Analyser le trafic du site</p>
              <p className="text-base font-light text-[#2A2A2A]">Améliorer l'expérience utilisateur</p>
            </div>
          </section>

          <div className="w-16 h-[0.5px] bg-[#E8E3D5]"></div>

          {/* Section 2 */}
          <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '100%' }}>
            <h2 className="font-serif text-3xl font-light text-[#0F0F0F]" style={{ textAlign: 'center' }}>
              Types de cookies
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem', maxWidth: '600px' }}>
              {/* Cookies essentiels */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Cookies essentiels</p>
                  <p className="text-xs font-light tracking-[0.2em] uppercase text-[#8B7355]">Nécessaires</p>
                </div>

                <p className="text-base font-light text-[#2A2A2A] leading-relaxed" style={{ textAlign: 'center' }}>
                  Ces cookies sont indispensables au fonctionnement du site.<br />
                  Ils ne peuvent pas être désactivés.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                    <p className="text-xs font-medium tracking-[0.15em] uppercase text-[#8B7355]">
                      auth-token
                    </p>
                    <p className="text-sm font-light text-[#2A2A2A]">Authentification abonné — 30 jours</p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                    <p className="text-xs font-medium tracking-[0.15em] uppercase text-[#8B7355]">
                      florent_admin_session
                    </p>
                    <p className="text-sm font-light text-[#2A2A2A]">Session administrateur — 7 jours</p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                    <p className="text-xs font-medium tracking-[0.15em] uppercase text-[#8B7355]">
                      cookie_consent
                    </p>
                    <p className="text-sm font-light text-[#2A2A2A]">Mémorisation de vos choix — 12 mois</p>
                  </div>
                </div>
              </div>

              {/* Cookies analytiques */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Cookies analytiques</p>
                  <p className="text-xs font-light tracking-[0.2em] uppercase text-[#8B7355]">Optionnels</p>
                </div>

                <p className="text-base font-light text-[#2A2A2A] leading-relaxed" style={{ textAlign: 'center' }}>
                  Ces cookies nous aident à comprendre comment vous utilisez le site.<br />
                  Vous pouvez les refuser.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <p className="text-sm font-light text-[#2A2A2A]">Pages visitées</p>
                  <p className="text-sm font-light text-[#2A2A2A]">Temps passé sur le site</p>
                  <p className="text-sm font-light text-[#2A2A2A]">Parcours de navigation</p>
                  <p className="text-sm font-light text-[#2A2A2A]">Taux de rebond</p>
                </div>

                <p className="text-xs font-light text-[#8B7355]">
                  Durée : 13 mois maximum
                </p>
              </div>

              {/* Cookies fonctionnels */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Cookies fonctionnels</p>
                  <p className="text-xs font-light tracking-[0.2em] uppercase text-[#8B7355]">Optionnels</p>
                </div>

                <p className="text-base font-light text-[#2A2A2A] leading-relaxed" style={{ textAlign: 'center' }}>
                  Ces cookies améliorent votre expérience<br />
                  en mémorisant vos préférences.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <p className="text-sm font-light text-[#2A2A2A]">Préférences d'affichage</p>
                  <p className="text-sm font-light text-[#2A2A2A]">Langue choisie</p>
                  <p className="text-sm font-light text-[#2A2A2A]">Recettes favorites</p>
                </div>
              </div>
            </div>
          </section>

          <div className="w-16 h-[0.5px] bg-[#E8E3D5]"></div>

          {/* Section 3 */}
          <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <h2 className="font-serif text-3xl font-light text-[#0F0F0F]" style={{ textAlign: 'center' }}>
              Cookies tiers
            </h2>

            <p className="text-base font-light text-[#2A2A2A] leading-relaxed max-w-[600px]" style={{ textAlign: 'center' }}>
              Certains cookies peuvent être déposés par des services tiers que nous utilisons :
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
              {/* Google Analytics */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Google Analytics</p>
                <p className="text-sm font-light text-[#2A2A2A]" style={{ textAlign: 'center' }}>
                  Analyse d'audience et statistiques de visite
                </p>
                <p className="text-xs font-light text-[#8B7355]">
                  Nécessite votre consentement
                </p>
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-light text-[#C77A4E] hover:text-[#8B7355] transition-colors duration-300"
                >
                  Voir leur politique →
                </a>
              </div>

              {/* Cloudinary */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Cloudinary</p>
                <p className="text-sm font-light text-[#2A2A2A]" style={{ textAlign: 'center' }}>
                  Hébergement et optimisation d'images
                </p>
                <a
                  href="https://cloudinary.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-light text-[#C77A4E] hover:text-[#8B7355] transition-colors duration-300"
                >
                  Voir leur politique →
                </a>
              </div>
            </div>
          </section>

          <div className="w-16 h-[0.5px] bg-[#E8E3D5]"></div>

          {/* Section 4 */}
          <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '100%' }}>
            <h2 className="font-serif text-3xl font-light text-[#0F0F0F]" style={{ textAlign: 'center' }}>
              Gérer vos cookies
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem', maxWidth: '600px' }}>
              {/* Via notre site */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Sur notre site</p>
                <p className="text-base font-light text-[#2A2A2A] leading-relaxed" style={{ textAlign: 'center' }}>
                  Vous pouvez accepter ou refuser les cookies via la bannière<br className="hidden md:block" />
                  qui s'affiche lors de votre première visite.
                </p>
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      localStorage.removeItem('cookie_consent');
                      window.location.reload();
                    }
                  }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#2A2A2A] text-white text-sm font-light tracking-[0.1em] uppercase hover:bg-[#C77A4E] transition-colors duration-300"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                  </svg>
                  Modifier mes préférences
                </button>
              </div>

              {/* Via le navigateur */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Via votre navigateur</p>
                <p className="text-base font-light text-[#2A2A2A] leading-relaxed" style={{ textAlign: 'center' }}>
                  Vous pouvez également configurer votre navigateur<br className="hidden md:block" />
                  pour refuser les cookies :
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm font-light text-[#2A2A2A]">
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C77A4E] hover:text-[#8B7355] transition-colors duration-300"
                    style={{ textAlign: 'center' }}
                  >
                    Chrome
                  </a>

                  <a
                    href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C77A4E] hover:text-[#8B7355] transition-colors duration-300"
                    style={{ textAlign: 'center' }}
                  >
                    Firefox
                  </a>

                  <a
                    href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C77A4E] hover:text-[#8B7355] transition-colors duration-300"
                    style={{ textAlign: 'center' }}
                  >
                    Safari
                  </a>

                  <a
                    href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C77A4E] hover:text-[#8B7355] transition-colors duration-300"
                    style={{ textAlign: 'center' }}
                  >
                    Edge
                  </a>
                </div>

                <p className="text-sm font-light text-[#8B7355]">
                  ⚠ Bloquer tous les cookies peut affecter l'expérience de navigation
                </p>
              </div>
            </div>
          </section>

          <div className="w-16 h-[0.5px] bg-[#E8E3D5]"></div>

          {/* Section 5 */}
          <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '100%' }}>
            <h2 className="font-serif text-3xl font-light text-[#0F0F0F]" style={{ textAlign: 'center' }}>
              Durée de conservation
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', maxWidth: '600px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Authentification abonné</p>
                <p className="text-base font-light text-[#2A2A2A]">30 jours</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Session admin</p>
                <p className="text-base font-light text-[#2A2A2A]">7 jours</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Cookies analytiques</p>
                <p className="text-base font-light text-[#2A2A2A]">13 mois maximum</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Consentement cookies</p>
                <p className="text-base font-light text-[#2A2A2A]">12 mois</p>
              </div>
            </div>
          </section>

          <div className="w-16 h-[0.5px] bg-[#E8E3D5]"></div>

          {/* Section 6 */}
          <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <h2 className="font-serif text-3xl font-light text-[#0F0F0F]" style={{ textAlign: 'center' }}>
              En savoir plus
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', maxWidth: '600px' }}>
              <Link
                href="/politique-confidentialite"
                className="px-8 py-4 bg-white border border-[#E8E3D5] text-[#2A2A2A] text-sm font-light tracking-[0.1em] uppercase hover:border-[#C77A4E] hover:text-[#C77A4E] transition-all duration-300"
              >
                Politique de Confidentialité
              </Link>

              <a
                href="https://www.cnil.fr/fr/cookies-et-autres-traceurs"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white border border-[#E8E3D5] text-[#2A2A2A] text-sm font-light tracking-[0.1em] uppercase hover:border-[#C77A4E] hover:text-[#C77A4E] transition-all duration-300"
              >
                CNIL — Cookies et traceurs
              </a>
            </div>
          </section>

          <div className="w-16 h-[0.5px] bg-[#E8E3D5]"></div>

          {/* Section 7 */}
          <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <h2 className="font-serif text-3xl font-light text-[#0F0F0F]" style={{ textAlign: 'center' }}>
              Contact
            </h2>

            <p className="text-base font-light text-[#2A2A2A]" style={{ textAlign: 'center' }}>
              Pour toute question :{' '}
              <a
                href="mailto:florentcmtpro@gmail.com"
                className="text-[#C77A4E] hover:text-[#8B7355] transition-colors duration-300"
              >
                florentcmtpro@gmail.com
              </a>
            </p>
          </section>

          {/* Footer */}
          <div className="mt-32 pt-12 border-t border-[#E8E3D5] w-full" style={{ display: 'flex', justifyContent: 'center' }}>
            <p className="text-xs font-light tracking-[0.2em] uppercase text-[#8B7355]" style={{ textAlign: 'center' }}>
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
