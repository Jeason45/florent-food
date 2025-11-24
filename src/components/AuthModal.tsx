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
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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

          // Auto-login après inscription
          await login(email);
          setStatus('success');
          setTimeout(() => {
            onClose();
            setEmail('');
            setStatus('idle');
          }, 1500);
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
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          borderRadius: '24px',
          maxWidth: '480px',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(212, 175, 55, 0.2)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative gradient background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '150px',
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(199, 122, 78, 0.15) 100%)',
            opacity: 0.5,
            filter: 'blur(40px)',
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
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          <X size={18} color="#fff" />
        </button>

        <div style={{ padding: '48px 40px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2
              style={{
                fontSize: '28px',
                fontWeight: '600',
                background: 'linear-gradient(to right, #D4AF37, #C77A4E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '12px',
                fontFamily: 'var(--font-cormorant), serif',
              }}
            >
              Accès Membre
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', lineHeight: '1.6' }}>
              Connecte-toi pour accéder à toutes les recettes
            </p>
          </div>

          {/* Mode Toggle */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '32px',
              background: 'rgba(0, 0, 0, 0.3)',
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
                background: mode === 'new' ? 'linear-gradient(to right, #D4AF37, #C77A4E)' : 'transparent',
                color: mode === 'new' ? '#000' : 'rgba(255, 255, 255, 0.7)',
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
                background: mode === 'existing' ? 'linear-gradient(to right, #D4AF37, #C77A4E)' : 'transparent',
                color: mode === 'existing' ? '#000' : 'rgba(255, 255, 255, 0.7)',
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
                  color: 'rgba(255, 255, 255, 0.9)',
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
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              />
            </div>

            {status === 'error' && (
              <div
                style={{
                  padding: '12px 16px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '8px',
                  marginBottom: '24px',
                }}
              >
                <p style={{ color: '#ef4444', fontSize: '13px', margin: 0 }}>{errorMessage}</p>
              </div>
            )}

            {status === 'success' && (
              <div
                style={{
                  padding: '12px 16px',
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  borderRadius: '8px',
                  marginBottom: '24px',
                  textAlign: 'center',
                }}
              >
                <p style={{ color: '#22c55e', fontSize: '14px', margin: 0, fontWeight: '500' }}>
                  ✓ Connexion réussie !
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              style={{
                width: '100%',
                padding: '16px',
                background: 'linear-gradient(to right, #D4AF37, #C77A4E)',
                border: 'none',
                borderRadius: '12px',
                color: '#000',
                fontSize: '15px',
                fontWeight: '600',
                cursor: status === 'loading' || status === 'success' ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                opacity: status === 'loading' || status === 'success' ? 0.7 : 1,
                letterSpacing: '0.5px',
              }}
              onMouseEnter={(e) => {
                if (status === 'idle' || status === 'error') {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(212, 175, 55, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
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
            style={{
              marginTop: '24px',
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.5)',
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
