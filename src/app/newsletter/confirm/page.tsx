import { Suspense } from 'react';
import { ConfirmClient } from './confirm-client';

export default function ConfirmPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a1410 0%, #0f0b08 100%)',
      padding: '20px'
    }}>
      <Suspense fallback={
        <div style={{
          maxWidth: '500px',
          width: '100%',
          padding: '40px',
          borderRadius: '20px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(212,175,55,0.2)',
          textAlign: 'center'
        }}>
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
            Chargement...
          </h1>
        </div>
      }>
        <ConfirmClient />
      </Suspense>
    </div>
  );
}
