'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export function ConfirmClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Token manquant');
      return;
    }

    fetch('/api/newsletter/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatus('success');
          setMessage('Ton inscription est confirmée ! 🎉');
        } else {
          setStatus('error');
          setMessage(data.error || 'Erreur de confirmation');
        }
      })
      .catch(() => {
        setStatus('error');
        setMessage('Erreur réseau');
      });
  }, [token]);

  return (
    <div style={{
      maxWidth: '500px',
      width: '100%',
      padding: '40px',
      borderRadius: '20px',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(212,175,55,0.2)',
      textAlign: 'center'
    }}>
      {status === 'loading' && (
        <>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid rgba(212,175,55,0.2)',
            borderTopColor: '#D4AF37',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }} />
          <h1 style={{ fontSize: '24px', color: '#fff', marginBottom: '12px' }}>
            Confirmation en cours...
          </h1>
        </>
      )}

      {status === 'success' && (
        <>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #D4AF37 0%, #C77A4E 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '40px'
          }}>
            ✓
          </div>
          <h1 style={{ fontSize: '28px', color: '#fff', marginBottom: '16px' }}>
            {message}
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', marginBottom: '32px' }}>
            Tu vas maintenant recevoir mes meilleures recettes chaque semaine.
          </p>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              padding: '16px 32px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #D4AF37 0%, #C77A4E 100%)',
              color: '#000',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '16px'
            }}
          >
            Retour à l'accueil
          </Link>
        </>
      )}

      {status === 'error' && (
        <>
          <div style={{
            width: '80px',
            height: '80px',
            background: '#ef4444',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '40px',
            color: '#fff'
          }}>
            ✕
          </div>
          <h1 style={{ fontSize: '24px', color: '#fff', marginBottom: '16px' }}>
            Erreur de confirmation
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', marginBottom: '32px' }}>
            {message}
          </p>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              padding: '16px 32px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '16px',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            Retour à l'accueil
          </Link>
        </>
      )}
    </div>
  );
}
