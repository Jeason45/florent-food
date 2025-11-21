'use client';

import { useState } from 'react';

interface NewsletterFormProps {
  variant?: 'hero' | 'footer';
}

export default function NewsletterForm({ variant = 'footer' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName, source: 'website' })
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage('Merci ! Vérifie ton email pour confirmer ton inscription. 🎉');
        setEmail('');
        setFirstName('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Une erreur est survenue');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Impossible de s\'inscrire. Réessaie plus tard.');
    } finally {
      setLoading(false);
    }
  };

  if (variant === 'hero') {
    return (
      <div style={{
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px'
          }}>
            <input
              type="text"
              placeholder="Prénom"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{
                padding: '16px 20px',
                borderRadius: '12px',
                border: '2px solid rgba(212,175,55,0.2)',
                background: 'rgba(255,255,255,0.05)',
                color: '#fff',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#D4AF37'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)'}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: '16px 20px',
                borderRadius: '12px',
                border: '2px solid rgba(212,175,55,0.2)',
                background: 'rgba(255,255,255,0.05)',
                color: '#fff',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#D4AF37'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '18px 32px',
              borderRadius: '12px',
              border: 'none',
              background: loading ? '#666' : 'linear-gradient(135deg, #D4AF37 0%, #C77A4E 100%)',
              color: '#000',
              fontSize: '16px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 20px rgba(212,175,55,0.3)'
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(212,175,55,0.5)';
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,175,55,0.3)';
            }}
          >
            {loading ? 'Inscription...' : 'Recevoir les recettes gratuites'}
          </button>
        </form>

        {status !== 'idle' && (
          <p style={{
            marginTop: '16px',
            textAlign: 'center',
            color: status === 'success' ? '#10b981' : '#ef4444',
            fontSize: '14px'
          }}>
            {message}
          </p>
        )}

        <p style={{
          marginTop: '12px',
          textAlign: 'center',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.5)'
        }}>
          Pas de spam. Désinscription en 1 clic.
        </p>
      </div>
    );
  }

  // Footer variant
  return (
    <div style={{
      maxWidth: '400px'
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: 700,
        color: '#fff',
        marginBottom: '12px'
      }}>
        Newsletter Gratuite
      </h3>
      <p style={{
        fontSize: '14px',
        color: 'rgba(255,255,255,0.6)',
        marginBottom: '16px'
      }}>
        Reçois mes meilleures recettes chaque semaine
      </p>

      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <input
          type="email"
          placeholder="Ton email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: '14px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(212,175,55,0.2)',
            background: 'rgba(255,255,255,0.05)',
            color: '#fff',
            fontSize: '14px',
            outline: 'none'
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '14px',
            borderRadius: '8px',
            border: 'none',
            background: loading ? '#666' : 'linear-gradient(135deg, #D4AF37 0%, #C77A4E 100%)',
            color: '#000',
            fontSize: '14px',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Inscription...' : 'M\'inscrire'}
        </button>
      </form>

      {status !== 'idle' && (
        <p style={{
          marginTop: '12px',
          fontSize: '13px',
          color: status === 'success' ? '#10b981' : '#ef4444'
        }}>
          {message}
        </p>
      )}
    </div>
  );
}
