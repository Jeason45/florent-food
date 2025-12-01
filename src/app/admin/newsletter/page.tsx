'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import { useSidebar } from '@/components/admin/SidebarContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Newsletter {
  id: string;
  subject: string;
  status: string;
  type: string;
  sentTo: string;
  totalSent: number;
  totalOpens: number;
  totalClicks: number;
  scheduledFor: string | null;
  sentAt: string | null;
  createdAt: string;
}

export default function NewsletterPage() {
  const { sidebarWidth } = useSidebar();
  const router = useRouter();
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    try {
      const response = await fetch('/api/admin/newsletter');
      const data = await response.json();
      if (data.success) {
        setNewsletters(data.newsletters);
      }
    } catch (error) {
      console.error('Error fetching newsletters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVisibility = async (id: string, currentStatus: string) => {
    const isCurrentlyVisible = currentStatus === 'ACTIVE';
    const action = isCurrentlyVisible ? 'retirer du site' : 'publier sur le site';

    if (!confirm(`Êtes-vous sûr de vouloir ${action} cette newsletter ?`)) return;

    try {
      const response = await fetch(`/api/admin/newsletter/${id}/toggle-visibility`, {
        method: 'PATCH',
      });
      const data = await response.json();
      if (data.success) {
        fetchNewsletters();
        alert(data.message);
      } else {
        alert(`Erreur: ${data.error}`);
      }
    } catch (error) {
      console.error('Error toggling visibility:', error);
      alert('Erreur lors du changement de visibilité');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette newsletter ?')) return;

    try {
      const response = await fetch(`/api/admin/newsletter/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        fetchNewsletters();
      } else {
        alert(`Erreur: ${data.error}`);
      }
    } catch (error) {
      console.error('Error deleting newsletter:', error);
      alert('Erreur lors de la suppression');
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
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '40px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
              boxShadow: '0 0 12px rgba(52, 211, 153, 0.4)'
            }} />
            <div style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(90deg, rgba(52, 211, 153, 0.3) 0%, transparent 100%)',
              width: '200px'
            }} />
            <span style={{
              fontSize: '10px',
              color: 'rgba(255,255,255,0.4)',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase'
            }}>
              Gestion Newsletter
            </span>
          </div>

          <button
            onClick={() => router.push('/admin/newsletter/new')}
            style={{
              background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
              border: 'none',
              borderRadius: '12px',
              color: '#000',
              padding: '14px 28px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s',
              boxShadow: '0 4px 16px rgba(52, 211, 153, 0.3)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(52, 211, 153, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(52, 211, 153, 0.3)';
            }}
          >
            <span style={{ fontSize: '18px' }}>+</span>
            Nouvelle Newsletter
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '40px'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
              Envoyées ce mois
            </div>
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#34d399' }}>
              0
            </div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
              Taux d'ouverture moyen
            </div>
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#fbbf24' }}>
              0%
            </div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
              Programmées
            </div>
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#6366f1' }}>
              0
            </div>
          </div>
        </div>

        {/* Newsletter List or Empty State */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.6)' }}>
            Chargement...
          </div>
        ) : newsletters.length === 0 ? (
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '80px 40px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>📧</div>
            <h2 style={{ fontSize: '24px', color: '#fff', marginBottom: '16px', fontWeight: 700 }}>
              Aucune newsletter pour le moment
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', marginBottom: '32px', lineHeight: 1.6 }}>
              Créez votre première newsletter et commencez à partager<br/>
              vos recettes avec vos abonnés !
            </p>
            <button
              onClick={() => router.push('/admin/newsletter/new')}
              style={{
                background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
                border: 'none',
                borderRadius: '12px',
                color: '#000',
                padding: '16px 32px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              Créer ma première newsletter
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {newsletters.map((newsletter) => (
              <div
                key={newsletter.id}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  padding: '24px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(52, 211, 153, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
                    {newsletter.subject}
                  </h3>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                    <span>
                      {newsletter.status === 'SENT' && '✅ Envoyée'}
                      {newsletter.status === 'DRAFT' && '📝 Brouillon'}
                      {newsletter.status === 'SCHEDULED' && '⏰ Programmée'}
                    </span>
                    <span>• {newsletter.totalSent} destinataire{newsletter.totalSent > 1 ? 's' : ''}</span>
                    {newsletter.sentAt && (
                      <span>• {new Date(newsletter.sentAt).toLocaleDateString('fr-FR')}</span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: '#fbbf24' }}>
                      {newsletter.totalOpens}
                    </div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
                      Ouvertures
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: '#6366f1' }}>
                      {newsletter.totalClicks}
                    </div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
                      Clics
                    </div>
                  </div>

                  <button
                    onClick={() => router.push(`/admin/newsletter/${newsletter.id}`)}
                    style={{
                      background: 'rgba(52, 211, 153, 0.1)',
                      border: '1px solid rgba(52, 211, 153, 0.3)',
                      borderRadius: '8px',
                      color: '#34d399',
                      padding: '10px 20px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.3s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(52, 211, 153, 0.2)';
                      e.currentTarget.style.borderColor = 'rgba(52, 211, 153, 0.5)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(52, 211, 153, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(52, 211, 153, 0.3)';
                    }}
                  >
                    ✏️ Modifier
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleVisibility(newsletter.id, newsletter.status);
                    }}
                    style={{
                      background: newsletter.status === 'ACTIVE'
                        ? 'rgba(251, 191, 36, 0.1)'
                        : 'rgba(99, 102, 241, 0.1)',
                      border: newsletter.status === 'ACTIVE'
                        ? '1px solid rgba(251, 191, 36, 0.3)'
                        : '1px solid rgba(99, 102, 241, 0.3)',
                      borderRadius: '8px',
                      color: newsletter.status === 'ACTIVE' ? '#fbbf24' : '#6366f1',
                      padding: '10px 20px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.3s'
                    }}
                    onMouseOver={(e) => {
                      if (newsletter.status === 'ACTIVE') {
                        e.currentTarget.style.background = 'rgba(251, 191, 36, 0.2)';
                        e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.5)';
                      } else {
                        e.currentTarget.style.background = 'rgba(99, 102, 241, 0.2)';
                        e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (newsletter.status === 'ACTIVE') {
                        e.currentTarget.style.background = 'rgba(251, 191, 36, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.3)';
                      } else {
                        e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
                      }
                    }}
                  >
                    {newsletter.status === 'ACTIVE' ? '👁️‍🗨️ Masquer' : '🌐 Publier'}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(newsletter.id);
                    }}
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '8px',
                      color: '#ef4444',
                      padding: '10px 20px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.3s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                      e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                    }}
                  >
                    🗑️ Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
