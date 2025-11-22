"use client";

export function AboutStorySection() {
  return (
    <section className="relative pb-20 sm:pb-24 md:pb-32 lg:pb-40 bg-gradient-to-br from-[#FFF8F0] via-[#FFFBF7] to-[#FFF5EB] overflow-hidden" style={{ paddingTop: '40px' }}>
      <div className="relative w-full max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl px-5 sm:px-8 lg:px-12" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        {/* Titre avec le même style que les sections recettes */}
        <div className="text-center mb-12 sm:mb-14 md:mb-16 lg:mb-20">
          {/* Ligne décorative au-dessus */}
          <div className="flex items-center justify-center mb-6 sm:mb-8 md:mb-10">
            <div className="h-[1px] w-16 sm:w-24 md:w-32 bg-gradient-to-r from-transparent to-[#E07A5F]"></div>
            <div className="mx-4 sm:mx-6 md:mx-8">
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#E07A5F]"></div>
            </div>
            <div className="h-[1px] w-16 sm:w-24 md:w-32 bg-gradient-to-l from-transparent to-[#E07A5F]"></div>
          </div>

          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light mb-4 sm:mb-5 md:mb-6 lg:mb-8 leading-[0.95] tracking-[-0.03em]">
            <span className="bg-gradient-to-r from-[#E07A5F] to-[#C9A961] bg-clip-text text-transparent">
              Quelques mots
            </span>
          </h2>

          <div className="max-w-2xl mx-auto space-y-5 sm:space-y-6 md:space-y-8 text-base sm:text-lg md:text-xl lg:text-2xl text-[var(--gris-taupe)] leading-relaxed font-light mt-4 sm:mt-5 md:mt-6">
            <p>
              J'ai eu la chance de participer à un défi culinaire organisé par <strong className="font-medium text-[var(--noir-luxe)]">Audi</strong>, devant <strong className="font-medium text-[var(--noir-luxe)]">Thierry Marx</strong> et <strong className="font-medium text-[var(--noir-luxe)]">Jessica Préalpato</strong>, élue meilleure pâtissière du monde en 2019.
            </p>

            <p>
              J'ai également collaboré avec des marques comme <strong className="font-medium text-[var(--noir-luxe)]">McDonald's</strong> et <strong className="font-medium text-[var(--noir-luxe)]">Uber Eats</strong>.
            </p>

            <p>
              Ce qui m'anime au quotidien, c'est simple : partager des recettes accessibles et transmettre ma passion pour la cuisine.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
