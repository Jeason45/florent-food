"use client";

const socials = [
  { name: "TikTok", count: "467K", icon: "https://cdn.simpleicons.org/tiktok/ffffff", bgColor: "#000000", link: "https://www.tiktok.com/@florent_cmt" },
  { name: "Instagram", count: "130K", icon: "https://cdn.simpleicons.org/instagram/ffffff", bgColor: "#E4405F", link: "https://www.instagram.com/florentfood/" },
  { name: "Snapchat", count: "126K", icon: "https://cdn.simpleicons.org/snapchat/ffffff", bgColor: "#FFFC00", link: "https://www.snapchat.com/add/florent_cmt", darkIcon: true },
  { name: "YouTube", count: "105K", icon: "https://cdn.simpleicons.org/youtube/ffffff", bgColor: "#FF0000", link: "https://www.youtube.com/@FlorentYtb" },
  { name: "Facebook", count: "20K", icon: "https://cdn.simpleicons.org/facebook/ffffff", bgColor: "#1877F2", link: "https://www.facebook.com/share/1AGZdmHNqt/?mibextid=wwXIfr" },
];

const brands = [
  { name: "Audi", icon: "https://cdn.simpleicons.org/audi/ffffff", bgColor: "#000000" },
  { name: "McDonald's", icon: "https://cdn.simpleicons.org/mcdonalds/ffffff", bgColor: "#FFC72C" },
  { name: "Uber Eats", icon: "https://cdn.simpleicons.org/ubereats/ffffff", bgColor: "#06C167" },
  { name: "Paramount+", icon: "https://cdn.simpleicons.org/paramountplus/ffffff", bgColor: "#0064FF" },
];

export default function TestSocialPage() {
  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', padding: '40px 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '60px', fontSize: '24px', color: '#333' }}>
        Nouvelles variations - Section Réseaux Sociaux
      </h1>

      {/* VERSION 1 - Icônes seules pour collaborations + ligne de séparation */}
      <div style={{ marginBottom: '80px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#666', fontSize: '14px', letterSpacing: '2px' }}>VERSION 1 - ICÔNES SEULES + SÉPARATION</h2>
        <div style={{
          background: '#1a1a1a',
          borderRadius: '20px',
          padding: '30px 20px',
          textAlign: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <p style={{ color: '#D4AF37', fontSize: '16px', letterSpacing: '3px', marginBottom: '25px', marginTop: 0 }}>REJOINS +848K ABONNÉS</p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: '50px',
                  padding: '8px 20px 8px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: s.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}>
                  <img
                    src={s.darkIcon ? s.icon.replace('/ffffff', '/000000') : s.icon}
                    alt={s.name}
                    style={{ width: '18px', height: '18px' }}
                  />
                </div>
                <span style={{ color: '#fff', fontWeight: 600, fontSize: '16px' }}>{s.count}</span>
              </a>
            ))}
          </div>

          {/* Séparation dorée */}
          <div style={{
            width: '80px',
            height: '1px',
            background: 'rgba(212,175,55,0.3)',
            margin: '30px auto'
          }} />

          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', letterSpacing: '2px', display: 'block', marginBottom: '15px' }}>COLLABORATIONS</span>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {brands.map((b, i) => (
              <div key={i} style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: b.bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '12px'
              }}>
                <img src={b.icon} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VERSION 2 - Card intérieure pour collaborations */}
      <div style={{ marginBottom: '80px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#666', fontSize: '14px', letterSpacing: '2px' }}>VERSION 2 - CARD INTÉRIEURE</h2>
        <div style={{
          background: '#1a1a1a',
          borderRadius: '20px',
          padding: '30px 20px',
          textAlign: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <p style={{ color: '#D4AF37', fontSize: '16px', letterSpacing: '3px', marginBottom: '25px', marginTop: 0 }}>REJOINS +848K ABONNÉS</p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: '50px',
                  padding: '8px 20px 8px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: s.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}>
                  <img
                    src={s.darkIcon ? s.icon.replace('/ffffff', '/000000') : s.icon}
                    alt={s.name}
                    style={{ width: '18px', height: '18px' }}
                  />
                </div>
                <span style={{ color: '#fff', fontWeight: 600, fontSize: '16px' }}>{s.count}</span>
              </a>
            ))}
          </div>

          {/* Card intérieure */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '20px',
            marginTop: '25px',
            border: '1px solid rgba(255,255,255,0.08)'
          }}>
            <span style={{ color: '#D4AF37', fontSize: '11px', letterSpacing: '2px', display: 'block', marginBottom: '15px' }}>ILS M'ONT FAIT CONFIANCE</span>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              {brands.map((b, i) => (
                <div key={i} style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: b.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px'
                }}>
                  <img src={b.icon} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* VERSION 3 - Layout horizontal */}
      <div style={{ marginBottom: '80px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#666', fontSize: '14px', letterSpacing: '2px' }}>VERSION 3 - HORIZONTAL (RÉSEAUX / COLLABS)</h2>
        <div style={{
          background: '#1a1a1a',
          borderRadius: '20px',
          padding: '30px 20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '40px',
          flexWrap: 'wrap',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Réseaux sociaux */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#D4AF37', fontSize: '14px', letterSpacing: '3px', marginBottom: '20px', marginTop: 0 }}>+848K ABONNÉS</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '50px',
                    padding: '6px 16px 6px 6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.15)'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: s.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.15)'
                  }}>
                    <img
                      src={s.darkIcon ? s.icon.replace('/ffffff', '/000000') : s.icon}
                      alt={s.name}
                      style={{ width: '16px', height: '16px' }}
                    />
                  </div>
                  <span style={{ color: '#fff', fontWeight: 600, fontSize: '14px' }}>{s.count}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Séparateur vertical */}
          <div style={{ width: '1px', height: '60px', background: 'rgba(255,255,255,0.15)' }} />

          {/* Collaborations */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', letterSpacing: '2px', marginBottom: '15px', marginTop: 0 }}>COLLABORATIONS</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {brands.map((b, i) => (
                <div key={i} style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: b.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px'
                }}>
                  <img src={b.icon} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* VERSION 4 - Ultra minimaliste (icônes seules) */}
      <div style={{ marginBottom: '80px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#666', fontSize: '14px', letterSpacing: '2px' }}>VERSION 4 - ULTRA MINIMALISTE</h2>
        <div style={{
          background: '#1a1a1a',
          borderRadius: '20px',
          padding: '30px 20px',
          textAlign: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <p style={{ color: '#D4AF37', fontSize: '14px', letterSpacing: '3px', marginBottom: '25px', marginTop: 0 }}>+848K ABONNÉS SUR LES RÉSEAUX</p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: s.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid rgba(255,255,255,0.2)',
                  transition: 'transform 0.2s'
                }}>
                  <img
                    src={s.darkIcon ? s.icon.replace('/ffffff', '/000000') : s.icon}
                    alt={s.name}
                    style={{ width: '24px', height: '24px' }}
                  />
                </div>
              </a>
            ))}

            {/* Petit séparateur */}
            <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.2)', margin: '0 10px' }} />

            {brands.map((b, i) => (
              <div key={i} style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: b.bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px',
                opacity: 0.8
              }}>
                <img src={b.icon} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VERSION 5 - Fond dégradé avec accent doré */}
      <div style={{ marginBottom: '80px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#666', fontSize: '14px', letterSpacing: '2px' }}>VERSION 5 - DÉGRADÉ + ACCENT DORÉ</h2>
        <div style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2520 100%)',
          borderRadius: '20px',
          padding: '35px 20px',
          textAlign: 'center',
          border: '1px solid rgba(212,175,55,0.2)',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <p style={{ color: '#D4AF37', fontSize: '16px', letterSpacing: '3px', marginBottom: '25px', marginTop: 0, fontWeight: 600 }}>REJOINS +848K ABONNÉS</p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '50px',
                  padding: '8px 20px 8px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  textDecoration: 'none',
                  border: '1px solid rgba(212,175,55,0.15)'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: s.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img
                    src={s.darkIcon ? s.icon.replace('/ffffff', '/000000') : s.icon}
                    alt={s.name}
                    style={{ width: '18px', height: '18px' }}
                  />
                </div>
                <span style={{ color: '#fff', fontWeight: 600, fontSize: '16px' }}>{s.count}</span>
              </a>
            ))}
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px',
            marginTop: '25px'
          }}>
            <div style={{ flex: 1, maxWidth: '100px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.3))' }} />
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', letterSpacing: '2px' }}>PARTENAIRES</span>
            <div style={{ flex: 1, maxWidth: '100px', height: '1px', background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.3))' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginTop: '15px' }}>
            {brands.map((b, i) => (
              <div key={i} style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: b.bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px'
              }}>
                <img src={b.icon} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VERSION ACTUELLE (pour comparaison) */}
      <div style={{ marginBottom: '80px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#666', fontSize: '14px', letterSpacing: '2px' }}>VERSION ACTUELLE (comparaison)</h2>
        <div style={{
          background: '#1a1a1a',
          borderRadius: '20px',
          padding: '30px 20px',
          textAlign: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <p style={{ color: '#D4AF37', fontSize: '16px', letterSpacing: '3px', marginBottom: '25px', marginTop: 0 }}>REJOINS +848K ABONNÉS</p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: '50px',
                  padding: '8px 20px 8px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: s.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}>
                  <img
                    src={s.darkIcon ? s.icon.replace('/ffffff', '/000000') : s.icon}
                    alt={s.name}
                    style={{ width: '18px', height: '18px' }}
                  />
                </div>
                <span style={{ color: '#fff', fontWeight: 600, fontSize: '16px' }}>{s.count}</span>
              </a>
            ))}
          </div>
          <div style={{ marginTop: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', letterSpacing: '2px' }}>COLLABORATIONS</span>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {brands.map((b, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: '50px',
                  padding: '6px 16px 6px 6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: b.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.15)',
                    padding: '8px'
                  }}>
                    <img src={b.icon} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <span style={{ color: '#fff', fontWeight: 600, fontSize: '13px' }}>{b.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
