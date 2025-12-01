'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PrintButton() {
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClick = async () => {
    // Desktop: utiliser window.print() (instantané)
    if (!isMobile) {
      window.print();
      return;
    }

    // Mobile: utiliser l'API Puppeteer
    const slug = pathname.split('/').pop();

    if (!slug) {
      alert('Erreur: impossible de déterminer la recette');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/recettes/${slug}/pdf`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la génération du PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Ouvrir le PDF dans un nouvel onglet (permet à l'utilisateur de l'ouvrir avec une app PDF)
      window.open(url, '_blank');

      // Nettoyer l'URL après un délai (laisser le temps au navigateur de l'ouvrir)
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 5000);

    } catch (error) {
      console.error('Erreur téléchargement PDF:', error);
      alert('Erreur lors du téléchargement. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="print-button"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: loading ? '#9a8a5a' : '#D4AF37',
        color: '#000',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '30px',
        fontSize: '13px',
        fontWeight: 700,
        letterSpacing: '1px',
        textTransform: 'uppercase',
        cursor: loading ? 'wait' : 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        opacity: loading ? 0.8 : 1,
      }}
      onMouseEnter={(e) => {
        if (!loading) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
      }}
    >
      {loading ? (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
            <circle cx="12" cy="12" r="10" strokeOpacity="0.3"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"></path>
          </svg>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          Génération...
        </>
      ) : (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Télécharger PDF
        </>
      )}
    </button>
  );
}
