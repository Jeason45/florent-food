import Link from 'next/link';

export const metadata = {
  title: 'Mentions Légales | Florent Food',
  description: 'Mentions légales du site Florent Food',
};

export default function MentionsLegalesPage() {
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
          Informations Légales
        </p>

        <h1 className="font-serif text-[64px] md:text-[80px] font-light text-[#0F0F0F] leading-[0.9] mb-8 tracking-tight" style={{ textAlign: 'center' }}>
          Mentions<br/>Légales
        </h1>

        <div className="w-16 h-[0.5px] bg-[#C77A4E]"></div>
      </section>

      {/* Contenu */}
      <main className="pb-32 px-8 w-full" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="max-w-[700px] w-full" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4rem' }}>

          {/* Section 1 */}
          <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '100%' }}>
            <h2 className="font-serif text-3xl font-light text-[#0F0F0F]" style={{ textAlign: 'center' }}>
              Éditeur du site
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Nom</p>
                <p className="text-base font-light text-[#2A2A2A]">Florent cmt</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Statut</p>
                <p className="text-base font-light text-[#2A2A2A]">Entrepreneur individuel</p>
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
          <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <h2 className="font-serif text-3xl font-light text-[#0F0F0F]" style={{ textAlign: 'center' }}>
              Directeur de la publication
            </h2>

            <p className="text-base font-light text-[#2A2A2A] leading-relaxed" style={{ textAlign: 'center' }}>
              Le directeur de la publication du site est Florent cmt.
            </p>
          </section>

          <div className="w-16 h-[0.5px] bg-[#E8E3D5]"></div>

          {/* Section 3 */}
          <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '100%' }}>
            <h2 className="font-serif text-3xl font-light text-[#0F0F0F]" style={{ textAlign: 'center' }}>
              Hébergement
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Hébergeur</p>
                <p className="text-base font-light text-[#2A2A2A]">Contabo GmbH</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Adresse</p>
                <p className="text-base font-light text-[#2A2A2A] leading-relaxed" style={{ textAlign: 'center' }}>
                  Aschauer Straße 32a<br />
                  81549 München, Allemagne
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Site web</p>
                <a
                  href="https://contabo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-light text-[#C77A4E] hover:text-[#8B7355] transition-colors duration-300"
                >
                  contabo.com
                </a>
              </div>
            </div>
          </section>

          <div className="w-16 h-[0.5px] bg-[#E8E3D5]"></div>

          {/* Section 4 */}
          <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <h2 className="font-serif text-3xl font-light text-[#0F0F0F]" style={{ textAlign: 'center' }}>
              Propriété intellectuelle
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', maxWidth: '600px' }}>
              <p className="text-base font-light text-[#2A2A2A] leading-relaxed" style={{ textAlign: 'center' }}>
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur
                et la propriété intellectuelle. Tous les droits de reproduction sont réservés.
              </p>
              <p className="text-base font-light text-[#2A2A2A] leading-relaxed" style={{ textAlign: 'center' }}>
                La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est
                formellement interdite sauf autorisation expresse du directeur de la publication.
              </p>
            </div>
          </section>

          <div className="w-16 h-[0.5px] bg-[#E8E3D5]"></div>

          {/* Section 5 */}
          <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '100%' }}>
            <h2 className="font-serif text-3xl font-light text-[#0F0F0F]" style={{ textAlign: 'center' }}>
              Données personnelles
            </h2>

            <p className="text-base font-light text-[#2A2A2A] leading-relaxed max-w-[600px]" style={{ textAlign: 'center' }}>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit
              d'accès, de rectification et de suppression des données vous concernant.
            </p>

            <p className="text-base font-light text-[#2A2A2A]" style={{ textAlign: 'center' }}>
              Pour exercer ce droit :{' '}
              <a
                href="mailto:florentcmtpro@gmail.com"
                className="text-[#C77A4E] hover:text-[#8B7355] transition-colors duration-300"
              >
                florentcmtpro@gmail.com
              </a>
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '3rem' }}>
              <Link
                href="/politique-confidentialite"
                className="px-8 py-4 bg-white border border-[#E8E3D5] text-[#2A2A2A] text-sm font-light tracking-[0.1em] uppercase hover:border-[#C77A4E] hover:text-[#C77A4E] transition-all duration-300"
              >
                Politique de Confidentialité
              </Link>

              <Link
                href="/cookies"
                className="px-8 py-4 bg-white border border-[#E8E3D5] text-[#2A2A2A] text-sm font-light tracking-[0.1em] uppercase hover:border-[#C77A4E] hover:text-[#C77A4E] transition-all duration-300"
              >
                Gestion des Cookies
              </Link>
            </div>
          </section>

          <div className="w-16 h-[0.5px] bg-[#E8E3D5]"></div>

          {/* Section 6 */}
          <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '100%' }}>
            <h2 className="font-serif text-3xl font-light text-[#0F0F0F]" style={{ textAlign: 'center' }}>
              Crédits
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Conception</p>
                <span className="text-base font-light text-[#C77A4E]">
                  JL Studio — Jeason Lemoine
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#8B7355]">Photographies</p>
                <p className="text-base font-light text-[#2A2A2A]">Florent cmt & Cloudinary</p>
              </div>
            </div>
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
