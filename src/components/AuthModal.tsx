'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login } = useAuth();
  const [mode, setMode] = useState<'new' | 'existing'>('new');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'pending_confirmation'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Fonction pour déclencher le feu d'artifice de confettis
  const triggerConfetti = async () => {
    const confettiModule = await import('canvas-confetti');
    const confetti = confettiModule.default;
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 99999,
      colors: ['#D4AF37', '#C77A4E', '#FFD700', '#FFA500', '#FF6347']
    };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      if (mode === 'existing') {
        // Mode connexion
        await login(email);
        setStatus('success');
        setTimeout(() => {
          onClose();
          setEmail('');
          setStatus('idle');
        }, 1500);
      } else {
        // Mode inscription - vérifier d'abord si l'email existe
        const checkResponse = await fetch('/api/auth/check-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        const checkData = await checkResponse.json();

        if (checkData.exists && checkData.status === 'active') {
          // Email existe déjà, basculer en mode connexion
          await login(email);
          setStatus('success');
          setTimeout(() => {
            onClose();
            setEmail('');
            setStatus('idle');
          }, 1500);
        } else {
          // Nouvel email, inscription
          const subscribeResponse = await fetch('/api/newsletter/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, source: 'auth_modal' }),
          });

          const subscribeData = await subscribeResponse.json();

          if (!subscribeResponse.ok) {
            throw new Error(subscribeData.error || 'Erreur lors de l\'inscription');
          }

          // Afficher message de confirmation email (pas d'auto-login car statut PENDING)
          setStatus('pending_confirmation');
          triggerConfetti();
        }
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Une erreur est survenue. Réessaye plus tard.'
      );
    }
  };

  return (
    <div
      className="auth-modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        padding: '12px',
      }}
      onClick={onClose}
    >
      <style>{`
        @media (max-width: 480px) {
          .auth-modal-content {
            border-radius: 16px !important;
            max-height: 90vh;
            overflow-y: auto;
          }
          .auth-modal-inner {
            padding: 32px 20px !important;
          }
          .auth-modal-title {
            font-size: 24px !important;
          }
          .auth-modal-subtitle {
            font-size: 13px !important;
          }
          .auth-modal-toggle {
            gap: 6px !important;
          }
          .auth-modal-toggle button {
            padding: 10px 8px !important;
            font-size: 12px !important;
          }
          .auth-modal-input {
            padding: 12px 14px !important;
            font-size: 14px !important;
          }
          .auth-modal-submit {
            padding: 14px !important;
            font-size: 14px !important;
          }
          .auth-modal-footer {
            font-size: 10px !important;
          }
        }
      `}</style>
      <div
        className="auth-modal-content"
        style={{
          background: '#FFFBF7',
          borderRadius: '24px',
          maxWidth: '420px',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative top bar */}
        <div
          style={{
            height: '4px',
            background: 'linear-gradient(to right, #D4AF37, #C77A4E)',
          }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.05)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
          }}
        >
          <X size={18} color="#2D2D2D" />
        </button>

        <div className="auth-modal-inner" style={{ padding: '40px 32px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h2
              className="auth-modal-title"
              style={{
                fontSize: '28px',
                fontWeight: '600',
                color: '#2D2D2D',
                marginBottom: '10px',
                fontFamily: 'var(--font-cormorant), serif',
              }}
            >
              Accès Membre
            </h2>
            <p className="auth-modal-subtitle" style={{ color: '#6B6B6B', fontSize: '14px', lineHeight: '1.6' }}>
              Connecte-toi pour accéder à toutes les recettes
            </p>
          </div>

          {/* Mode Toggle */}
          <div
            className="auth-modal-toggle"
            style={{
              display: 'flex',
              gap: '10px',
              marginBottom: '28px',
              background: '#F4F1DE',
              padding: '6px',
              borderRadius: '12px',
            }}
          >
            <button
              onClick={() => setMode('new')}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                background: mode === 'new' ? '#D4AF37' : 'transparent',
                color: mode === 'new' ? '#fff' : '#6B6B6B',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              Nouveau Membre
            </button>
            <button
              onClick={() => setMode('existing')}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                background: mode === 'existing' ? '#D4AF37' : 'transparent',
                color: mode === 'existing' ? '#fff' : '#6B6B6B',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              Déjà Membre
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '24px' }}>
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: '#2D2D2D',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                placeholder="ton@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'loading' || status === 'success'}
                className="auth-modal-input"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: '#fff',
                  border: '1px solid #E8E4D9',
                  borderRadius: '12px',
                  color: '#2D2D2D',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#D4AF37';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#E8E4D9';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {status === 'error' && (
              <div
                style={{
                  padding: '12px 16px',
                  background: '#FEF2F2',
                  border: '1px solid #FECACA',
                  borderRadius: '8px',
                  marginBottom: '24px',
                }}
              >
                <p style={{ color: '#DC2626', fontSize: '13px', margin: 0 }}>{errorMessage}</p>
              </div>
            )}

            {status === 'success' && (
              <div
                style={{
                  padding: '12px 16px',
                  background: '#F0FDF4',
                  border: '1px solid #BBF7D0',
                  borderRadius: '8px',
                  marginBottom: '24px',
                  textAlign: 'center',
                }}
              >
                <p style={{ color: '#16A34A', fontSize: '14px', margin: 0, fontWeight: '500' }}>
                  Connexion réussie !
                </p>
              </div>
            )}

            {status === 'pending_confirmation' && (
              <div
                style={{
                  padding: '20px',
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(199, 122, 78, 0.1) 100%)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: '12px',
                  marginBottom: '24px',
                  textAlign: 'center',
                }}
              >
                <p style={{ color: '#16A34A', fontSize: '18px', margin: 0, fontWeight: '600', marginBottom: '12px' }}>
                  ✨ Email envoyé !
                </p>
                <p style={{ color: '#2D2D2D', fontSize: '14px', margin: 0, lineHeight: '1.6', marginBottom: '8px' }}>
                  Vérifie ta boîte mail et clique sur le lien de confirmation.
                </p>
                <p style={{ color: '#6B6B6B', fontSize: '12px', margin: 0, fontStyle: 'italic' }}>
                  Pense à vérifier tes spams, c'est notre premier échange !
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading' || status === 'success' || status === 'pending_confirmation'}
              className="auth-modal-submit"
              style={{
                width: '100%',
                padding: '16px',
                background: '#D4AF37',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '15px',
                fontWeight: '600',
                cursor: status === 'loading' || status === 'success' || status === 'pending_confirmation' ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                opacity: status === 'loading' || status === 'success' || status === 'pending_confirmation' ? 0.7 : 1,
                letterSpacing: '0.5px',
              }}
              onMouseEnter={(e) => {
                if (status === 'idle' || status === 'error') {
                  e.currentTarget.style.background = '#C9A432';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(212, 175, 55, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#D4AF37';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {status === 'loading'
                ? mode === 'new'
                  ? 'Inscription...'
                  : 'Connexion...'
                : status === 'success'
                ? 'Succès !'
                : mode === 'new'
                ? 'S\'inscrire'
                : 'Se connecter'}
            </button>
          </form>

          {/* Footer note */}
          <p
            className="auth-modal-footer"
            style={{
              marginTop: '20px',
              fontSize: '11px',
              color: '#9CA3AF',
              textAlign: 'center',
              lineHeight: '1.6',
            }}
          >
            {mode === 'new'
              ? 'En t\'inscrivant, tu acceptes de recevoir notre newsletter et notre politique de confidentialité.'
              : 'Saisis l\'email utilisé lors de ton inscription à la newsletter.'}
          </p>
        </div>
      </div>
    </div>
  );
}
