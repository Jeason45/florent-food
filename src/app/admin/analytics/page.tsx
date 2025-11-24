'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useSidebar } from '@/components/admin/SidebarContext';
import { TrendingUp, Users, Eye, Clock, BarChart3, ExternalLink } from 'lucide-react';

interface AnalyticsStats {
  visitors: number;
  pageViews: number;
  avgSessionDuration: number;
  bounceRate: number;
}

export default function AnalyticsAdminPage() {
  const { sidebarWidth } = useSidebar();
  const [gaConfigured, setGaConfigured] = useState(false);
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    setGaConfigured(!!GA_ID);

    // Récupérer les statistiques si GA est configuré
    if (GA_ID) {
      fetchAnalytics();
    }
  }, [GA_ID]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/analytics/stats');
      const data = await response.json();

      if (response.ok) {
        setStats(data);
      } else {
        setError(data.error || 'Failed to fetch analytics');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #0a0e1a 0%, #0f1b2e 100%)' }}>
      <AdminSidebar />

      <div style={{
        flex: 1,
        marginLeft: `${sidebarWidth}px`,
        transition: 'margin-left 0.3s ease',
        padding: '40px'
      }}>
        {/* Header with decorative line - Same style as Dashboard */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flex: 1
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
              Analytics
            </span>
          </div>

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
                marginLeft: '20px'
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
                <p style={{ color: '#fff', fontSize: '32px', fontWeight: 700 }}>
                  {loading ? '...' : error ? '-' : stats?.visitors.toLocaleString() || '0'}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '4px' }}>
                  {loading ? 'Chargement...' : error ? 'Erreur de chargement' : 'Derniers 30 jours'}
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
                <p style={{ color: '#fff', fontSize: '32px', fontWeight: 700 }}>
                  {loading ? '...' : error ? '-' : stats?.pageViews.toLocaleString() || '0'}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '4px' }}>
                  {loading ? 'Chargement...' : error ? 'Erreur de chargement' : 'Nombre total de pages vues'}
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
                <p style={{ color: '#fff', fontSize: '32px', fontWeight: 700 }}>
                  {loading ? '...' : error ? '-' : stats ? `${Math.round(stats.avgSessionDuration)}s` : '0s'}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '4px' }}>
                  {loading ? 'Chargement...' : error ? 'Erreur de chargement' : 'Durée moyenne de session'}
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
                <p style={{ color: '#fff', fontSize: '32px', fontWeight: 700 }}>
                  {loading ? '...' : error ? '-' : stats ? `${(stats.bounceRate * 100).toFixed(1)}%` : '0%'}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '4px' }}>
                  {loading ? 'Chargement...' : error ? 'Erreur de chargement' : 'Pourcentage de sessions courtes'}
                </p>
              </div>
            </div>

            {/* Message d'erreur si problème API */}
            {error && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid rgba(239, 68, 68, 0.3)'
              }}>
                <h3 style={{ color: '#ef4444', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>
                  ⚠️ Erreur de connexion API
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: '1.6' }}>
                  {error}. Vérifiez que l'email du service account a bien été ajouté à Google Analytics avec les permissions "Viewer".
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
