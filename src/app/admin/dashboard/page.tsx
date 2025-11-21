'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import { useSidebar } from '@/components/admin/SidebarContext';
import { useEffect, useState } from 'react';

interface Stats {
  totalSubscribers: number;
  freeSubscribers: number;
  premiumSubscribers: number;
  thisMonthSubscribers: number;
}

export default function DashboardPage() {
  const { sidebarWidth } = useSidebar();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #0a0e1a 0%, #0f1b2e 100%)' }}>
      <AdminSidebar />

      <div style={{
        flex: 1,
        marginLeft: `${sidebarWidth}px`,
        transition: 'margin-left 0.3s ease',
        padding: '40px'
      }}>
        {/* Header with decorative line */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '40px'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)',
            boxShadow: '0 0 12px rgba(212, 175, 55, 0.4)'
          }} />
          <div style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.3) 0%, transparent 100%)'
          }} />
          <span style={{
            fontSize: '10px',
            color: 'rgba(255,255,255,0.4)',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase'
          }}>
            Dashboard
          </span>
        </div>

        {loading ? (
          <div style={{ color: '#fff', fontSize: '18px' }}>Chargement...</div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {/* Total Abonnés - HERO */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0.05) 100%)',
              padding: '32px',
              borderRadius: '16px',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(99, 102, 241, 0.4)',
              transition: 'all 0.3s',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = '#6366f1';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(99, 102, 241, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
                borderRadius: '50%'
              }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <span style={{
                  fontSize: '13px',
                  color: '#6366f1',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 700
                }}>
                  Total Abonnés
                </span>
              </div>
              <div style={{ fontSize: '42px', fontWeight: 800, marginBottom: '12px', color: '#6366f1', lineHeight: 1 }}>
                {stats?.totalSubscribers || 0}
              </div>
              <div style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.6)'
              }}>
                Tous les abonnés actifs
              </div>
            </div>

            {/* Abonnés Gratuits - HERO */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.05) 100%)',
              padding: '32px',
              borderRadius: '16px',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(245, 158, 11, 0.4)',
              transition: 'all 0.3s',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = '#f59e0b';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(245, 158, 11, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.4)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
                borderRadius: '50%'
              }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="8.5" cy="7" r="4"/>
                  <path d="M20 8v6"/>
                  <path d="M23 11h-6"/>
                </svg>
                <span style={{
                  fontSize: '13px',
                  color: '#f59e0b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 700
                }}>
                  Abonnés FREE
                </span>
              </div>
              <div style={{ fontSize: '42px', fontWeight: 800, marginBottom: '12px', color: '#f59e0b', lineHeight: 1 }}>
                {stats?.freeSubscribers || 0}
              </div>
              <div style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.6)'
              }}>
                Newsletter gratuite
              </div>
            </div>

            {/* Abonnés Premium - HERO */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.05) 100%)',
              padding: '32px',
              borderRadius: '16px',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(16, 185, 129, 0.4)',
              transition: 'all 0.3s',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = '#10b981';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(16, 185, 129, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
                borderRadius: '50%'
              }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
                <span style={{
                  fontSize: '13px',
                  color: '#10b981',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 700
                }}>
                  Abonnés PREMIUM
                </span>
              </div>
              <div style={{ fontSize: '42px', fontWeight: 800, marginBottom: '12px', color: '#10b981', lineHeight: 1 }}>
                {stats?.premiumSubscribers || 0}
              </div>
              <div style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.6)'
              }}>
                12€/mois - Contenu exclusif
              </div>
            </div>

            {/* Ce mois - HERO */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.05) 100%)',
              padding: '32px',
              borderRadius: '16px',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(212, 175, 55, 0.4)',
              transition: 'all 0.3s',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = '#D4AF37';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(212, 175, 55, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
                borderRadius: '50%'
              }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
                <span style={{
                  fontSize: '13px',
                  color: '#D4AF37',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 700
                }}>
                  Ce mois
                </span>
              </div>
              <div style={{ fontSize: '42px', fontWeight: 800, marginBottom: '12px', color: '#D4AF37', lineHeight: 1 }}>
                {stats?.thisMonthSubscribers || 0}
              </div>
              <div style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.6)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                </svg>
                Nouveaux abonnés ce mois
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
