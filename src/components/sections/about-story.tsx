"use client";

export function AboutStorySection() {
  return (
    <section className="relative pb-20 sm:pb-24 md:pb-32 lg:pb-40 bg-gradient-to-br from-[#FFF8F0] via-[#FFFBF7] to-[#FFF5EB] overflow-hidden" style={{ paddingTop: '40px' }}>
      <div className="relative max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl px-5 sm:px-8 lg:px-12" style={{ margin: '0 auto' }}>
        {/* Titre avec le même style que les sections recettes */}
        <div className="text-center mb-12 sm:mb-14 md:mb-16 lg:mb-20">
          {/* Ligne décorative au-dessus */}
          <div className="flex items-center justify-center mb-6 sm:mb-8 md:mb-10">
            <div className="h-[1px] w-16 sm:w-24 md:w-32" style={{ background: 'linear-gradient(to right, transparent, #D4AF37, #C77A4E)' }}></div>
            <div className="mx-4 sm:mx-6 md:mx-8">
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full" style={{ background: 'linear-gradient(to right, #D4AF37, #C77A4E)' }}></div>
            </div>
            <div className="h-[1px] w-16 sm:w-24 md:w-32" style={{ background: 'linear-gradient(to left, transparent, #C77A4E, #D4AF37)' }}></div>
          </div>

          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light mb-4 sm:mb-5 md:mb-6 lg:mb-8 leading-[0.95] tracking-[-0.03em]">
            <span className="bg-gradient-to-r from-[#C77A4E] to-[#D4AF37] bg-clip-text text-transparent">
              Quelques mots
            </span>
          </h2>

          <div className="max-w-5xl space-y-5 sm:space-y-6 md:space-y-8 text-base sm:text-lg md:text-xl lg:text-2xl text-[var(--gris-taupe)] leading-relaxed font-light" style={{ margin: '0 auto', marginTop: '0.75rem' }}>
            <p style={{ textAlign: 'center' }}>
              Vous m'avez peut-être déjà croisé sur vos écrans, avec mon accent chantant du Sud de la France et mon enthousiasme communicatif : je m'appelle <strong className="font-medium text-[var(--noir-luxe)]">Florent</strong>, j'ai 26 ans et je suis créateur de contenu culinaire de <strong className="font-medium text-[var(--noir-luxe)]">Montpellier</strong>.
            </p>

            <p style={{ textAlign: 'center' }}>
              Au fil de cette aventure, j'ai eu la chance de vivre des expériences incroyables. Parmi elles, être sollicité par <strong className="font-medium text-[var(--noir-luxe)]">Audi</strong> pour participer à un défi culinaire destiné à des sportifs de haut niveau. Une expérience enrichissante face à un jury d'exception : <strong className="font-medium text-[var(--noir-luxe)]">Thierry Marx</strong> et <strong className="font-medium text-[var(--noir-luxe)]">Jessica Préalpato</strong>. Challenge que j'ai eu l'honneur de remporter.
            </p>

            <p style={{ textAlign: 'center' }}>
              Cette passion m'a également poussé à aller plus loin. J'ai eu l'opportunité de concrétiser mon amour pour la cuisine en publiant mon premier livre de recettes. Chaque recette est accompagnée d'un QR code permettant d'accéder directement à la vidéo explicative, pour une expérience culinaire encore plus vivante et immersive. Vous trouverez le lien pour vous le procurer en bas de cette page.
            </p>

            <p style={{ textAlign: 'center' }}>
              Mais au fond, tout ça part d'une seule chose : depuis toujours, je suis un gourmand assumé, amoureux de la bonne cuisine, du partage et des moments conviviaux ! Aujourd'hui, je continue de partager ma passion avec vous, en rendant la cuisine accessible à tous.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
