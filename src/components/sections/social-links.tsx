"use client";

export function SocialLinksSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#FFFBF7] via-[#FFF8F0] to-[#FFF5EB]" style={{ padding: '30px 20px' }}>
      <div className="relative max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl px-5 sm:px-8 lg:px-12" style={{ margin: '0 auto' }}>
        <div className="text-center">
          <p className="text-xs sm:text-sm text-[var(--gris-taupe)] uppercase tracking-[0.2em] font-light mb-6 sm:mb-8">
            Retrouve-moi sur
          </p>
          <div className="flex items-center justify-center gap-8 sm:gap-10 md:gap-12">
            <a
              href="https://www.instagram.com/florentfood/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 transition-all duration-300 hover:scale-110"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
                alt="Instagram"
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
              <span className="text-xs sm:text-sm text-[var(--gris-taupe)] group-hover:text-[#D4AF37] transition-colors font-medium">Instagram</span>
            </a>
            <a
              href="https://www.tiktok.com/@florent_cmt"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 transition-all duration-300 hover:scale-110"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png"
                alt="TikTok"
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
              <span className="text-xs sm:text-sm text-[var(--gris-taupe)] group-hover:text-[#D4AF37] transition-colors font-medium">TikTok</span>
            </a>
            <a
              href="https://www.youtube.com/@FlorentYtb"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 transition-all duration-300 hover:scale-110"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174883.png"
                alt="YouTube"
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
              <span className="text-xs sm:text-sm text-[var(--gris-taupe)] group-hover:text-[#D4AF37] transition-colors font-medium">YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
