"use client";

import { ExternalLink } from "lucide-react";

export function BookPromoSection() {
  return (
    <section className="book-promo-section" style={{
      background: '#1a1a1a',
      padding: '30px 20px'
    }}>
      <style>{`
        .book-promo-container {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          text-align: center;
        }
        .book-promo-image {
          width: 100%;
          max-width: 500px;
          height: auto;
          filter: drop-shadow(0 30px 60px rgba(212, 175, 55, 0.4));
          transition: transform 0.3s ease;
        }
        .book-promo-image:hover {
          transform: scale(1.05) rotate(-2deg);
        }
        .book-promo-content {
          display: flex;
          flex-direction: column;
          gap: 15px;
          align-items: center;
        }
        .book-promo-badge {
          color: #D4AF37;
          font-size: 12px;
          letter-spacing: 3px;
        }
        .book-promo-title {
          font-size: 32px;
          font-weight: 700;
          color: #fff;
          margin: 0;
          line-height: 1.3;
        }
        .book-promo-title span {
          color: #D4AF37;
        }
        .book-promo-description {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.7;
          margin: 0;
          max-width: 500px;
        }
        .book-promo-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #D4AF37;
          color: #000;
          padding: 18px 36px;
          border-radius: 50px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          margin-top: 10px;
        }
        .book-promo-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4);
        }
        @media (min-width: 768px) {
          .book-promo-container {
            flex-direction: row;
            text-align: left;
            gap: 40px;
          }
          .book-promo-image {
            width: 45%;
            max-width: 450px;
            flex-shrink: 0;
          }
          .book-promo-content {
            align-items: flex-start;
            flex: 1;
            min-width: 0;
          }
          .book-promo-title {
            font-size: 42px;
          }
        }
        @media (min-width: 1024px) {
          .book-promo-container {
            gap: 60px;
          }
          .book-promo-image {
            width: 50%;
            max-width: 550px;
          }
        }
      `}</style>

      <div className="book-promo-container">
        <picture>
          <source srcSet="/livre-florent.webp" type="image/webp" />
          <img
            src="/livre-florent.png"
            alt="Les Recettes de Florent - Le livre"
            className="book-promo-image"
            loading="lazy"
            width="500"
            height="281"
          />
        </picture>

        <div className="book-promo-content">
          <p className="book-promo-badge">MON PREMIER LIVRE</p>

          <h2 className="book-promo-title">
            Les Recettes de <span>Florent</span>
          </h2>

          <p className="book-promo-description">
            Retrouve mes meilleures recettes dans un livre exclusif. Des plats gourmands, des astuces de chef et des créations originales à réaliser chez toi.
          </p>

          <a
            href="https://www.dashbook.fr/project/les-recettes-de-florent"
            target="_blank"
            rel="noopener noreferrer"
            className="book-promo-cta"
          >
            Commander le livre
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
