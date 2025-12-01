"use client";

const socials = [
  { name: "TikTok", count: "467K", icon: "https://cdn-icons-png.flaticon.com/512/3046/3046121.png", link: "https://www.tiktok.com/@florent_cmt" },
  { name: "Instagram", count: "130K", icon: "https://cdn-icons-png.flaticon.com/512/174/174855.png", link: "https://www.instagram.com/florentfood/" },
  { name: "Snapchat", count: "126K", icon: "https://cdn.simpleicons.org/snapchat/FFFC00", link: "https://www.snapchat.com/add/florent_cmt", hasOutline: true },
  { name: "YouTube", count: "105K", icon: "https://cdn-icons-png.flaticon.com/512/174/174883.png", link: "https://www.youtube.com/@FlorentYtb" },
  { name: "Facebook", count: "20K", icon: "https://cdn-icons-png.flaticon.com/512/174/174848.png", link: "https://www.facebook.com/share/1AGZdmHNqt/?mibextid=wwXIfr" },
];

const brands = [
  { name: "Audi", icon: "https://cdn.simpleicons.org/audi/000000" },
  { name: "McDonald's", icon: "https://cdn.simpleicons.org/mcdonalds/FFC72C" },
  { name: "Uber Eats", icon: "https://cdn.simpleicons.org/ubereats/06C167" },
  { name: "Paramount+", icon: "https://cdn.simpleicons.org/paramountplus/0064FF" },
];

export function SocialLinksSection() {
  return (
    <section style={{ background: '#fff', padding: '30px 20px', border: '1px solid #D4AF37' }}>
      <style>{`
        .social-footer-container {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        .social-footer-label {
          color: #D4AF37;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1px;
        }
        .social-footer-links {
          display: flex;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
        }
        .social-footer-link {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          padding: 8px 14px;
          border: 1px solid #eee;
          border-radius: 25px;
          transition: all 0.3s;
        }
        .social-footer-link:hover {
          border-color: #D4AF37;
          transform: translateY(-2px);
        }
        .social-footer-link img {
          width: 18px;
          height: 18px;
        }
        .social-footer-link span {
          color: #1a1a1a;
          font-size: 12px;
          font-weight: 600;
        }
        .social-footer-collabs {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .social-footer-collabs-label {
          color: #999;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        .social-footer-brand {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid #eee;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          transition: all 0.3s;
        }
        .social-footer-brand:hover {
          border-color: #D4AF37;
          transform: translateY(-2px);
        }
        .social-footer-brand img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        @media (max-width: 900px) {
          .social-footer-container {
            justify-content: center;
            text-align: center;
          }
          .social-footer-label {
            width: 100%;
            margin-bottom: 10px;
          }
          .social-footer-links {
            justify-content: center;
          }
          .social-footer-collabs {
            width: 100%;
            justify-content: center;
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid #eee;
          }
        }
      `}</style>
      <div className="social-footer-container">
        <span className="social-footer-label">+848K ABONNÉS</span>
        <div className="social-footer-links">
          {socials.map((s, i) => (
            <a
              key={i}
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              className="social-footer-link"
              aria-label={`${s.name} - ${s.count} abonnés`}
            >
              <img
                src={s.icon}
                alt={s.name}
                style={{ filter: s.hasOutline ? 'drop-shadow(0 0 1px #000)' : 'none' }}
              />
              <span>{s.count}</span>
            </a>
          ))}
        </div>
        <div className="social-footer-collabs">
          <span className="social-footer-collabs-label">Collabs</span>
          {brands.map((b, i) => (
            <div key={i} className="social-footer-brand">
              <img src={b.icon} alt={b.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
