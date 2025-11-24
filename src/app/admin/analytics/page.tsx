'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useSidebar } from '@/components/admin/SidebarContext';
import { TrendingUp, Users, Eye, Clock, BarChart3, ExternalLink } from 'lucide-react';

export default function AnalyticsAdminPage() {
  const { sidebarWidth } = useSidebar();
  const [gaConfigured, setGaConfigured] = useState(false);
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    setGaConfigured(!!GA_ID);
  }, [GA_ID]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #0a0e1a 0%, #0f1b2e 100%)' }}>
      <AdminSidebar />

      <div style={{
        flex: 1,
        marginLeft: `${sidebarWidth}px`,
        transition: 'margin-left 0.3s ease',
        padding: '40px'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#fff' }}>
            📊 Analytics
          </h1>

          {gaConfigured && (
            <a
              href={`https://analytics.google.com/analytics/web/#/p${GA_ID?.replace('G-', '')}/reports/intelligenthome`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #D4AF37 0%, #C77A4E 100%)',
                color: '#000',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <ExternalLink size={16} />
              Ouvrir Google Analytics
            </a>
          )}
        </div>

        {!gaConfigured ? (
          /* Google Analytics non configuré */
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '40px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <BarChart3 size={48} color="#D4AF37" style={{ margin: '0 auto' }} />
            </div>
            <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>
              Google Analytics non configuré
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', marginBottom: '8px' }}>
              Pour voir les statistiques de votre site, configurez Google Analytics.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
              Ajoutez <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 8px', borderRadius: '4px' }}>NEXT_PUBLIC_GA_ID</code> dans votre fichier .env
            </p>
          </div>
        ) : (
          /* Google Analytics configuré - Afficher les statistiques */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* KPIs rapides */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <Users size={24} color="#D4AF37" />
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Visiteurs</span>
                </div>
                <p style={{ color: '#fff', fontSize: '32px', fontWeight: 700 }}>-</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '4px' }}>
                  Consultez Google Analytics pour voir les données en temps réel
                </p>
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.05)',
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <Eye size={24} color="#C77A4E" />
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Pages vues</span>
                </div>
                <p style={{ color: '#fff', fontSize: '32px', fontWeight: 700 }}>-</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '4px' }}>
                  Nombre total de pages vues
                </p>
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.05)',
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <Clock size={24} color="#8B7355" />
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Temps moyen</span>
                </div>
                <p style={{ color: '#fff', fontSize: '32px', fontWeight: 700 }}>-</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '4px' }}>
                  Durée moyenne de session
                </p>
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.05)',
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <TrendingUp size={24} color="#10b981" />
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Taux de rebond</span>
                </div>
                <p style={{ color: '#fff', fontSize: '32px', fontWeight: 700 }}>-</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '4px' }}>
                  Pourcentage de sessions courtes
                </p>
              </div>
            </div>

            {/* Info intégration API future */}
            <div style={{
              background: 'rgba(212, 175, 55, 0.1)',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid rgba(212, 175, 55, 0.3)'
            }}>
              <h3 style={{ color: '#D4AF37', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>
                💡 Intégration complète à venir
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: '1.6' }}>
                Pour afficher les statistiques directement ici, nous devrons configurer l'API Google Analytics Data.
                En attendant, utilisez le bouton "Ouvrir Google Analytics" ci-dessus pour accéder à toutes vos statistiques.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
