"use client";

export default function TestAnimationsPage() {
  return (
    <div style={{ background: '#1a1a1a', minHeight: '100vh', padding: '40px 20px' }}>
      <style>{`
        /* Animation 1: Pulse subtil */
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .anim-pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        /* Animation 2: Glow doré */
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 5px rgba(212, 175, 55, 0.3); }
          50% { text-shadow: 0 0 20px rgba(212, 175, 55, 0.6), 0 0 30px rgba(212, 175, 55, 0.4); }
        }
        .anim-glow {
          animation: glow 2s ease-in-out infinite;
        }

        /* Animation 3: Shimmer (effet brillant qui passe) */
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .anim-shimmer {
          background: linear-gradient(90deg, #D4AF37 0%, #fff 50%, #D4AF37 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        /* Animation 4: Scale léger */
        @keyframes scaleBreath {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .anim-scale {
          animation: scaleBreath 2.5s ease-in-out infinite;
        }

        /* Animation 5: Underline slide */
        .anim-underline {
          position: relative;
          display: inline-block;
        }
        .anim-underline::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #D4AF37, transparent);
          animation: slideUnderline 2s ease-in-out infinite;
        }
        @keyframes slideUnderline {
          0%, 100% { transform: scaleX(0.3); opacity: 0.5; }
          50% { transform: scaleX(1); opacity: 1; }
        }

        /* Animation 6: Fade in/out léger du chiffre */
        @keyframes numberPop {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); color: #fff; }
        }
        .anim-number-pop span {
          display: inline-block;
          animation: numberPop 1.5s ease-in-out infinite;
        }

        /* Animation 7: Gradient flow */
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .anim-gradient {
          background: linear-gradient(90deg, #D4AF37, #FFD700, #D4AF37, #B8960C, #D4AF37);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientFlow 4s ease infinite;
        }

        /* Animation 8: Typewriter count */
        @keyframes countUp {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .anim-count {
          animation: countUp 0.5s ease-out forwards;
        }
      `}</style>

      <h1 style={{ textAlign: 'center', marginBottom: '60px', color: '#fff', fontSize: '24px' }}>
        Animations pour "REJOINS +848K ABONNÉS"
      </h1>

      {/* Animation 1: Pulse */}
      <div style={{ marginBottom: '60px', textAlign: 'center' }}>
        <h3 style={{ color: '#666', fontSize: '12px', marginBottom: '20px', letterSpacing: '2px' }}>1. PULSE SUBTIL</h3>
        <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '20px', border: '1px solid #333' }}>
          <p className="anim-pulse" style={{ color: '#D4AF37', fontSize: '16px', letterSpacing: '3px', margin: 0 }}>
            REJOINS +848K ABONNÉS
          </p>
        </div>
      </div>

      {/* Animation 2: Glow */}
      <div style={{ marginBottom: '60px', textAlign: 'center' }}>
        <h3 style={{ color: '#666', fontSize: '12px', marginBottom: '20px', letterSpacing: '2px' }}>2. GLOW DORÉ</h3>
        <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '20px', border: '1px solid #333' }}>
          <p className="anim-glow" style={{ color: '#D4AF37', fontSize: '16px', letterSpacing: '3px', margin: 0 }}>
            REJOINS +848K ABONNÉS
          </p>
        </div>
      </div>

      {/* Animation 3: Shimmer */}
      <div style={{ marginBottom: '60px', textAlign: 'center' }}>
        <h3 style={{ color: '#666', fontSize: '12px', marginBottom: '20px', letterSpacing: '2px' }}>3. SHIMMER (BRILLANT)</h3>
        <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '20px', border: '1px solid #333' }}>
          <p className="anim-shimmer" style={{ fontSize: '16px', letterSpacing: '3px', margin: 0 }}>
            REJOINS +848K ABONNÉS
          </p>
        </div>
      </div>

      {/* Animation 4: Scale */}
      <div style={{ marginBottom: '60px', textAlign: 'center' }}>
        <h3 style={{ color: '#666', fontSize: '12px', marginBottom: '20px', letterSpacing: '2px' }}>4. SCALE (RESPIRATION)</h3>
        <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '20px', border: '1px solid #333' }}>
          <p className="anim-scale" style={{ color: '#D4AF37', fontSize: '16px', letterSpacing: '3px', margin: 0, display: 'inline-block' }}>
            REJOINS +848K ABONNÉS
          </p>
        </div>
      </div>

      {/* Animation 5: Underline */}
      <div style={{ marginBottom: '60px', textAlign: 'center' }}>
        <h3 style={{ color: '#666', fontSize: '12px', marginBottom: '20px', letterSpacing: '2px' }}>5. UNDERLINE SLIDE</h3>
        <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '20px', border: '1px solid #333' }}>
          <p className="anim-underline" style={{ color: '#D4AF37', fontSize: '16px', letterSpacing: '3px', margin: 0 }}>
            REJOINS +848K ABONNÉS
          </p>
        </div>
      </div>

      {/* Animation 6: Number Pop */}
      <div style={{ marginBottom: '60px', textAlign: 'center' }}>
        <h3 style={{ color: '#666', fontSize: '12px', marginBottom: '20px', letterSpacing: '2px' }}>6. NUMBER POP</h3>
        <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '20px', border: '1px solid #333' }}>
          <p className="anim-number-pop" style={{ color: '#D4AF37', fontSize: '16px', letterSpacing: '3px', margin: 0 }}>
            REJOINS <span>+848K</span> ABONNÉS
          </p>
        </div>
      </div>

      {/* Animation 7: Gradient Flow */}
      <div style={{ marginBottom: '60px', textAlign: 'center' }}>
        <h3 style={{ color: '#666', fontSize: '12px', marginBottom: '20px', letterSpacing: '2px' }}>7. GRADIENT FLOW</h3>
        <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '20px', border: '1px solid #333' }}>
          <p className="anim-gradient" style={{ fontSize: '16px', letterSpacing: '3px', margin: 0 }}>
            REJOINS +848K ABONNÉS
          </p>
        </div>
      </div>

      {/* Combinaison recommandée */}
      <div style={{ marginBottom: '60px', textAlign: 'center' }}>
        <h3 style={{ color: '#D4AF37', fontSize: '12px', marginBottom: '20px', letterSpacing: '2px' }}>⭐ RECOMMANDÉ: GLOW + UNDERLINE</h3>
        <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '20px', border: '1px solid #D4AF37' }}>
          <p className="anim-glow anim-underline" style={{ color: '#D4AF37', fontSize: '16px', letterSpacing: '3px', margin: 0 }}>
            REJOINS +848K ABONNÉS
          </p>
        </div>
      </div>

    </div>
  );
}
