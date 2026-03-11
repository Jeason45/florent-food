import Link from 'next/link';

export const metadata = {
  title: 'Politique de Confidentialité | Florent Food',
  description: 'Politique de confidentialité et protection des données personnelles',
};

export default function PolitiqueConfidentialitePage() {
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
          Protection des Données
        </p>

        <h1 className="font-serif text-[64px] md:text-[80px] font-light text-[#0F0F0F] leading-[0.9] mb-8 tracking-tight" style={{ textAlign: 'center' }}>
          Politique de<br/>Confidentialité
        </h1>

        <div className="w-16 h-[0.5px] bg-[#C77A4E]"></div>
      </section>

      {/* Contenu */}
      <main className="pb-32 px-8 w-full" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="max-w-[700px] w-full" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4rem' }}>

          {/* Introduction */}
          <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p className="text-base font-light text-[#2A2A2A] leading-relaxed max-w-[600px]" style={{ textAlign: 'center' }}>
              Chez Florent Food, nous prenons la protection de vos données personnelles très au sérieux.
              Cette politique explique comment nous collectons, utilisons et protégeons vos informations
              conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>
          </section>

          <div className="w-16 h-[0.5px] bg-[#E8E3D5]"></div>

          {/* Section 1 */}
          <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '100%' }}>
            <h2 className="font-serif text-3xl font-light text-[#0F0F0F]" style={{ textAlign: 'center' }}>
              Responsable du traitement
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Responsable</p>
                <p className="text-base font-light text-[#2A2A2A]">Florent Carivenc</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">SIRET</p>
                <p className="text-base font-light text-[#2A2A2A]">927 497 875 00017</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Adresse</p>
                <p className="text-base font-light text-[#2A2A2A] leading-relaxed" style={{ textAlign: 'center' }}>
                  229 rue Saint-Honoré<br />
                  75001 Paris, France
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Contact</p>
                <a
                  href="mailto:florentcmtpro@gmail.com"
                  className="text-base font-light text-[#C77A4E] hover:text-[#8B7355] transition-colors duration-300"
                >
                  florentcmtpro@gmail.com
                </a>
              </div>
            </div>
          </section>

          <div className="w-16 h-[0.5px] bg-[#E8E3D5]"></div>

          {/* Section 2 */}
          <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '100%' }}>
            <h2 className="font-serif text-3xl font-light text-[#0F0F0F]" style={{ textAlign: 'center' }}>
              Données collectées
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', maxWidth: '600px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Newsletter</p>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <p className="text-base font-light text-[#2A2A2A]">Prénom (optionnel)</p>
                  <p className="text-base font-light text-[#2A2A2A]">Adresse email</p>
                  <p className="text-base font-light text-[#2A2A2A]">Date d'inscription</p>
                  <p className="text-base font-light text-[#2A2A2A]">Statut d'abonnement</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Données analytiques (si consentement)</p>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <p className="text-base font-light text-[#2A2A2A]">Pages visitées</p>
                  <p className="text-base font-light text-[#2A2A2A]">Durée de visite</p>
                  <p className="text-base font-light text-[#2A2A2A]">Parcours de navigation</p>
                </div>
                <p className="text-sm font-light text-[#8B7355]" style={{ textAlign: 'center' }}>
                  Via Google Analytics - uniquement avec votre accord
                </p>
              </div>
            </div>
          </section>

          <div className="w-16 h-[0.5px] bg-[#E8E3D5]"></div>

          {/* Section 3 */}
          <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '100%' }}>
            <h2 className="font-serif text-3xl font-light text-[#0F0F0F]" style={{ textAlign: 'center' }}>
              Finalité du traitement
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', maxWidth: '600px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Newsletter</p>
                <p className="text-base font-light text-[#2A2A2A] leading-relaxed" style={{ textAlign: 'center' }}>
                  Vous envoyer nos recettes hebdomadaires et actualités culinaires
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Amélioration</p>
                <p className="text-base font-light text-[#2A2A2A] leading-relaxed" style={{ textAlign: 'center' }}>
                  Analyser le trafic et améliorer l'expérience utilisateur
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Conformité</p>
                <p className="text-base font-light text-[#2A2A2A] leading-relaxed" style={{ textAlign: 'center' }}>
                  Conservation pour respect des obligations légales
                </p>
              </div>
            </div>
          </section>

          <div className="w-16 h-[0.5px] bg-[#E8E3D5]"></div>

          {/* Section 4 */}
          <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <h2 className="font-serif text-3xl font-light text-[#0F0F0F]" style={{ textAlign: 'center' }}>
              Base légale
            </h2>

            <p className="text-base font-light text-[#2A2A2A] leading-relaxed max-w-[600px]" style={{ textAlign: 'center' }}>
              Le traitement de vos données repose sur votre consentement explicite lors de votre inscription
              à la newsletter. Vous pouvez retirer ce consentement à tout moment.
            </p>
          </section>

          <div className="w-16 h-[0.5px] bg-[#E8E3D5]"></div>

          {/* Section 5 */}
          <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '100%' }}>
            <h2 className="font-serif text-3xl font-light text-[#0F0F0F]" style={{ textAlign: 'center' }}>
              Durée de conservation
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', maxWidth: '600px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Abonnés actifs</p>
                <p className="text-base font-light text-[#2A2A2A]">
                  Tant que vous êtes abonné à la newsletter
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Après désinscription</p>
                <p className="text-base font-light text-[#2A2A2A]">
                  Suppression immédiate de vos données personnelles
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Cookies</p>
                <p className="text-base font-light text-[#2A2A2A]">13 mois maximum</p>
              </div>
            </div>
          </section>

          <div className="w-16 h-[0.5px] bg-[#E8E3D5]"></div>

          {/* Section 6 */}
          <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '100%' }}>
            <h2 className="font-serif text-3xl font-light text-[#0F0F0F]" style={{ textAlign: 'center' }}>
              Vos droits
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', maxWidth: '600px' }}>
              <p className="text-base font-light text-[#2A2A2A]">Droit d'accès à vos données</p>
              <p className="text-base font-light text-[#2A2A2A]">Droit de rectification</p>
              <p className="text-base font-light text-[#2A2A2A]">Droit à l'effacement</p>
              <p className="text-base font-light text-[#2A2A2A]">Droit d'opposition</p>
              <p className="text-base font-light text-[#2A2A2A]">Droit à la portabilité</p>
              <p className="text-base font-light text-[#2A2A2A]">Droit de limitation du traitement</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '3rem' }}>
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#8B7355]">
                Comment exercer vos droits ?
              </p>
              <p className="text-base font-light text-[#2A2A2A]" style={{ textAlign: 'center' }}>
                Contactez-nous à :{' '}
                <a
                  href="mailto:florentcmtpro@gmail.com"
                  className="text-[#C77A4E] hover:text-[#8B7355] transition-colors duration-300"
                >
                  florentcmtpro@gmail.com
                </a>
              </p>
              <p className="text-sm font-light text-[#8B7355]">
                Nous vous répondrons dans un délai maximum d'un mois
              </p>
            </div>
          </section>

          <div className="w-16 h-[0.5px] bg-[#E8E3D5]"></div>

          {/* Section 7 */}
          <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <h2 className="font-serif text-3xl font-light text-[#0F0F0F]" style={{ textAlign: 'center' }}>
              Sécurité des données
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', maxWidth: '600px' }}>
              <p className="text-base font-light text-[#2A2A2A] leading-relaxed" style={{ textAlign: 'center' }}>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger
                vos données contre l'accès non autorisé, la perte accidentelle ou la modification non autorisée.
              </p>
              <p className="text-base font-light text-[#2A2A2A] leading-relaxed" style={{ textAlign: 'center' }}>
                Notre hébergeur (Contabo GmbH) respecte les normes de sécurité européennes et nos communications
                sont chiffrées via HTTPS (SSL/TLS).
              </p>
            </div>
          </section>

          <div className="w-16 h-[0.5px] bg-[#E8E3D5]"></div>

          {/* Section 8 */}
          <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '100%' }}>
            <h2 className="font-serif text-3xl font-light text-[#0F0F0F]" style={{ textAlign: 'center' }}>
              Partage des données
            </h2>

            <p className="text-base font-light text-[#2A2A2A] leading-relaxed max-w-[600px]" style={{ textAlign: 'center' }}>
              Nous ne vendons, ne louons ni ne partageons vos données personnelles avec des tiers,
              sauf dans les cas suivants :
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Prestataires techniques</p>
                <p className="text-base font-light text-[#2A2A2A]" style={{ textAlign: 'center' }}>
                  Contabo (hébergement), Cloudinary (images)
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Outils d'analyse</p>
                <p className="text-base font-light text-[#2A2A2A]" style={{ textAlign: 'center' }}>
                  Google Analytics (statistiques de visite)<br />
                  <span className="text-sm text-[#8B7355]">Uniquement si vous acceptez les cookies analytiques</span>
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Obligations légales</p>
                <p className="text-base font-light text-[#2A2A2A]">
                  Si requis par la loi ou une autorité judiciaire
                </p>
              </div>
            </div>
          </section>

          <div className="w-16 h-[0.5px] bg-[#E8E3D5]"></div>

          {/* Section 9 */}
          <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <h2 className="font-serif text-3xl font-light text-[#0F0F0F]" style={{ textAlign: 'center' }}>
              Cookies
            </h2>

            <p className="text-base font-light text-[#2A2A2A]" style={{ textAlign: 'center' }}>
              Pour en savoir plus sur l'utilisation des cookies, consultez notre{' '}
              <Link href="/cookies" className="text-[#C77A4E] hover:text-[#8B7355] transition-colors duration-300">
                Politique de Cookies
              </Link>
            </p>
          </section>

          <div className="w-16 h-[0.5px] bg-[#E8E3D5]"></div>

          {/* Section 10 */}
          <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <h2 className="font-serif text-3xl font-light text-[#0F0F0F]" style={{ textAlign: 'center' }}>
              Droit de réclamation
            </h2>

            <p className="text-base font-light text-[#2A2A2A] leading-relaxed max-w-[600px]" style={{ textAlign: 'center' }}>
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire
              une réclamation auprès de la CNIL :
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <p className="text-base font-light text-[#2A2A2A]" style={{ textAlign: 'center' }}>
                3 Place de Fontenoy - TSA 80715<br />
                75334 PARIS CEDEX 07
              </p>
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-light text-[#C77A4E] hover:text-[#8B7355] transition-colors duration-300"
              >
                www.cnil.fr
              </a>
            </div>
          </section>

          <div className="w-16 h-[0.5px] bg-[#E8E3D5]"></div>

          {/* Section 11 */}
          <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <h2 className="font-serif text-3xl font-light text-[#0F0F0F]" style={{ textAlign: 'center' }}>
              Modifications
            </h2>

            <p className="text-base font-light text-[#2A2A2A] leading-relaxed max-w-[600px]" style={{ textAlign: 'center' }}>
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.
              Toute modification sera publiée sur cette page avec une date de mise à jour.
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
