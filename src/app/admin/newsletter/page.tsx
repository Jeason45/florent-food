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
  isVisibleOnSite: boolean;
  isActiveForNewSubscribers: boolean;
}

interface ManagementData {
  newsletter: {
    id: string;
    subject: string;
    status: string;
    sentAt: string | null;
    createdAt: string;
  };
  received: Array<{
    id: string;
    subscriberId: string | null;
    email: string;
    firstName: string | null;
    subscriberStatus: string | undefined;
    sentAt: string;
    openedAt: string | null;
    clickedAt: string | null;
    provider: string | null;
  }>;
  queued: Array<{
    id: string;
    subscriberId: string | null;
    email: string;
    firstName: string | null;
    subscriberStatus: string | undefined;
    scheduledFor: string | null;
    attempts: number;
    priority: number;
  }>;
  duplicates: Array<{
    subscriberId: string;
    email: string;
    firstName: string | null;
    count: number;
    sendDates: string[];
  }>;
  stats: {
    totalReceived: number;
    totalQueued: number;
    totalDuplicates: number;
    uniqueRecipients: number;
  };
}

export default function NewsletterPage() {
  const { sidebarWidth } = useSidebar();
  const router = useRouter();
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [managementData, setManagementData] = useState<ManagementData[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingManagement, setLoadingManagement] = useState(false);
  const [activeTab, setActiveTab] = useState<'list' | 'management'>('list');
  const [expandedNewsletter, setExpandedNewsletter] = useState<string | null>(null);

  useEffect(() => {
    fetchNewsletters();
  }, []);

  useEffect(() => {
    if (activeTab === 'management' && managementData.length === 0) {
      fetchManagementData();
    }
  }, [activeTab]);

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

  const fetchManagementData = async () => {
    try {
      setLoadingManagement(true);
      const response = await fetch('/api/admin/newsletter/management');
      const data = await response.json();
      if (data.success) {
        setManagementData(data.data);
      }
    } catch (error) {
      console.error('Error fetching management data:', error);
    } finally {
      setLoadingManagement(false);
    }
  };

  const handleToggleVisibility = async (id: string, isCurrentlyVisible: boolean) => {
    const action = isCurrentlyVisible ? 'retirer du site' : 'afficher sur le site';

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

  const handleToggleActiveForNew = async (id: string, isCurrentlyActive: boolean) => {
    const action = isCurrentlyActive
      ? 'désactiver pour les nouveaux inscrits'
      : 'activer pour les nouveaux inscrits (remplacera la newsletter active actuelle)';

    if (!confirm(`Êtes-vous sûr de vouloir ${action} ?`)) return;

    try {
      const response = await fetch(`/api/admin/newsletter/${id}/toggle-active-for-new`, {
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
      console.error('Error toggling active for new:', error);
      alert('Erreur lors du changement');
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

          {activeTab === 'list' && (
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
          )}
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '4px',
          marginBottom: '32px',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <button
            onClick={() => setActiveTab('list')}
            style={{
              padding: '16px 24px',
              background: activeTab === 'list' ? 'rgba(52, 211, 153, 0.1)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'list' ? '2px solid #34d399' : '2px solid transparent',
              color: activeTab === 'list' ? '#34d399' : 'rgba(255,255,255,0.6)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseOver={(e) => {
              if (activeTab !== 'list') {
                e.currentTarget.style.color = '#fff';
              }
            }}
            onMouseOut={(e) => {
              if (activeTab !== 'list') {
                e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
              }
            }}
          >
            📋 Liste des newsletters
          </button>
          <button
            onClick={() => setActiveTab('management')}
            style={{
              padding: '16px 24px',
              background: activeTab === 'management' ? 'rgba(52, 211, 153, 0.1)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'management' ? '2px solid #34d399' : '2px solid transparent',
              color: activeTab === 'management' ? '#34d399' : 'rgba(255,255,255,0.6)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseOver={(e) => {
              if (activeTab !== 'management') {
                e.currentTarget.style.color = '#fff';
              }
            }}
            onMouseOut={(e) => {
              if (activeTab !== 'management') {
                e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
              }
            }}
          >
            🔍 Gestion & Distribution
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'list' ? (
          /* LISTE DES NEWSLETTERS (ancien contenu) */
          <>
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

                      {/* Bouton Visibilité Site */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleVisibility(newsletter.id, newsletter.isVisibleOnSite);
                        }}
                        title={newsletter.isVisibleOnSite ? 'Masquer du site' : 'Afficher sur le site'}
                        style={{
                          background: newsletter.isVisibleOnSite
                            ? 'rgba(251, 191, 36, 0.1)'
                            : 'rgba(99, 102, 241, 0.1)',
                          border: newsletter.isVisibleOnSite
                            ? '1px solid rgba(251, 191, 36, 0.3)'
                            : '1px solid rgba(99, 102, 241, 0.3)',
                          borderRadius: '8px',
                          color: newsletter.isVisibleOnSite ? '#fbbf24' : '#6366f1',
                          padding: '10px 16px',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.3s'
                        }}
                        onMouseOver={(e) => {
                          if (newsletter.isVisibleOnSite) {
                            e.currentTarget.style.background = 'rgba(251, 191, 36, 0.2)';
                            e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.5)';
                          } else {
                            e.currentTarget.style.background = 'rgba(99, 102, 241, 0.2)';
                            e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)';
                          }
                        }}
                        onMouseOut={(e) => {
                          if (newsletter.isVisibleOnSite) {
                            e.currentTarget.style.background = 'rgba(251, 191, 36, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.3)';
                          } else {
                            e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
                          }
                        }}
                      >
                        {newsletter.isVisibleOnSite ? '👁️ Site' : '🙈 Site'}
                      </button>

                      {/* Bouton Activer pour nouveaux inscrits */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleActiveForNew(newsletter.id, newsletter.isActiveForNewSubscribers);
                        }}
                        title={newsletter.isActiveForNewSubscribers ? 'Désactiver pour les nouveaux' : 'Activer pour les nouveaux inscrits'}
                        style={{
                          background: newsletter.isActiveForNewSubscribers
                            ? 'rgba(52, 211, 153, 0.1)'
                            : 'rgba(156, 163, 175, 0.1)',
                          border: newsletter.isActiveForNewSubscribers
                            ? '1px solid rgba(52, 211, 153, 0.3)'
                            : '1px solid rgba(156, 163, 175, 0.3)',
                          borderRadius: '8px',
                          color: newsletter.isActiveForNewSubscribers ? '#34d399' : '#9ca3af',
                          padding: '10px 16px',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.3s'
                        }}
                        onMouseOver={(e) => {
                          if (newsletter.isActiveForNewSubscribers) {
                            e.currentTarget.style.background = 'rgba(52, 211, 153, 0.2)';
                            e.currentTarget.style.borderColor = 'rgba(52, 211, 153, 0.5)';
                          } else {
                            e.currentTarget.style.background = 'rgba(156, 163, 175, 0.2)';
                            e.currentTarget.style.borderColor = 'rgba(156, 163, 175, 0.5)';
                          }
                        }}
                        onMouseOut={(e) => {
                          if (newsletter.isActiveForNewSubscribers) {
                            e.currentTarget.style.background = 'rgba(52, 211, 153, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(52, 211, 153, 0.3)';
                          } else {
                            e.currentTarget.style.background = 'rgba(156, 163, 175, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(156, 163, 175, 0.3)';
                          }
                        }}
                      >
                        {newsletter.isActiveForNewSubscribers ? '🔔 Nouveaux' : '🔕 Nouveaux'}
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
          </>
        ) : (
          /* GESTION & DISTRIBUTION */
          loadingManagement ? (
            <div style={{
              textAlign: 'center',
              padding: '60px',
              color: 'rgba(255,255,255,0.6)'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '3px solid rgba(52, 211, 153, 0.3)',
                borderTop: '3px solid #34d399',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 16px'
              }}></div>
              Chargement des données de gestion...
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          ) : managementData.length === 0 ? (
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '80px 40px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '24px' }}>📊</div>
              <h2 style={{ fontSize: '24px', color: '#fff', marginBottom: '16px', fontWeight: 700 }}>
                Aucune donnée de gestion
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>
                Les données de distribution apparaîtront ici une fois que vous aurez envoyé des newsletters.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {managementData.map((data) => (
                <div
                  key={data.newsletter.id}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    overflow: 'hidden'
                  }}
                >
                  {/* Newsletter Header */}
                  <div
                    onClick={() => setExpandedNewsletter(
                      expandedNewsletter === data.newsletter.id ? null : data.newsletter.id
                    )}
                    style={{
                      padding: '24px',
                      cursor: 'pointer',
                      background: expandedNewsletter === data.newsletter.id
                        ? 'rgba(52, 211, 153, 0.05)'
                        : 'transparent',
                      borderBottom: expandedNewsletter === data.newsletter.id
                        ? '1px solid rgba(255,255,255,0.1)'
                        : 'none',
                      transition: 'all 0.3s'
                    }}
                    onMouseOver={(e) => {
                      if (expandedNewsletter !== data.newsletter.id) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (expandedNewsletter !== data.newsletter.id) {
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
                          {data.newsletter.subject}
                        </h3>
                        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                          {data.newsletter.sentAt
                            ? `Envoyée le ${formatDate(data.newsletter.sentAt)}`
                            : `Créée le ${formatDate(data.newsletter.createdAt)}`
                          }
                        </div>
                      </div>

                      {/* Stats Cards Mini */}
                      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '24px', fontWeight: 700, color: '#34d399' }}>
                            {data.stats.uniqueRecipients}
                          </div>
                          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Destinataires
                          </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '24px', fontWeight: 700, color: '#fbbf24' }}>
                            {data.stats.totalQueued}
                          </div>
                          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            En attente
                          </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '24px', fontWeight: 700, color: data.stats.totalDuplicates > 0 ? '#ef4444' : '#6366f1' }}>
                            {data.stats.totalDuplicates}
                          </div>
                          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Doublons
                          </div>
                        </div>
                        <div style={{
                          fontSize: '20px',
                          color: '#34d399',
                          transform: expandedNewsletter === data.newsletter.id ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s'
                        }}>
                          ▼
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedNewsletter === data.newsletter.id && (
                    <div style={{ padding: '24px' }}>
                      {/* Section: Abonnés qui ont reçu */}
                      <div style={{ marginBottom: '32px' }}>
                        <h4 style={{
                          color: '#34d399',
                          fontSize: '16px',
                          fontWeight: 600,
                          marginBottom: '16px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          ✅ Abonnés qui ont reçu ({data.received.length})
                        </h4>
                        {data.received.length === 0 ? (
                          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontStyle: 'italic' }}>
                            Aucun abonné n'a encore reçu cette newsletter
                          </p>
                        ) : (
                          <div style={{
                            background: 'rgba(255,255,255,0.02)',
                            borderRadius: '8px',
                            maxHeight: '300px',
                            overflowY: 'auto'
                          }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                              <thead style={{ position: 'sticky', top: 0, background: 'rgba(0,0,0,0.5)' }}>
                                <tr>
                                  <th style={{ padding: '12px', textAlign: 'left', color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600 }}>Email</th>
                                  <th style={{ padding: '12px', textAlign: 'left', color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600 }}>Statut</th>
                                  <th style={{ padding: '12px', textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600 }}>Envoyé</th>
                                  <th style={{ padding: '12px', textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600 }}>Ouvert</th>
                                  <th style={{ padding: '12px', textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600 }}>Cliqué</th>
                                  <th style={{ padding: '12px', textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600 }}>Provider</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.received.map((recipient, idx) => (
                                  <tr key={recipient.id} style={{
                                    borderTop: idx > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none'
                                  }}>
                                    <td style={{ padding: '12px', color: '#fff', fontSize: '13px' }}>
                                      {recipient.firstName ? `${recipient.firstName} (${recipient.email})` : recipient.email}
                                    </td>
                                    <td style={{ padding: '12px', fontSize: '12px' }}>
                                      <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '6px',
                                        background: recipient.subscriberStatus === 'ACTIVE' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(156, 163, 175, 0.2)',
                                        color: recipient.subscriberStatus === 'ACTIVE' ? '#10b981' : '#9ca3af',
                                        fontSize: '11px',
                                        fontWeight: 600
                                      }}>
                                        {recipient.subscriberStatus || 'N/A'}
                                      </span>
                                    </td>
                                    <td style={{ padding: '12px', textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>
                                      {new Date(recipient.sentAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                                    </td>
                                    <td style={{ padding: '12px', textAlign: 'center', fontSize: '12px' }}>
                                      {recipient.openedAt ? '✅' : '—'}
                                    </td>
                                    <td style={{ padding: '12px', textAlign: 'center', fontSize: '12px' }}>
                                      {recipient.clickedAt ? '✅' : '—'}
                                    </td>
                                    <td style={{ padding: '12px', textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>
                                      {recipient.provider || '—'}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>

                      {/* Section: File d'attente */}
                      <div style={{ marginBottom: '32px' }}>
                        <h4 style={{
                          color: '#fbbf24',
                          fontSize: '16px',
                          fontWeight: 600,
                          marginBottom: '16px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          ⏳ File d'attente ({data.queued.length})
                        </h4>
                        {data.queued.length === 0 ? (
                          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontStyle: 'italic' }}>
                            Aucun email en attente pour cette newsletter
                          </p>
                        ) : (
                          <div style={{
                            background: 'rgba(255,255,255,0.02)',
                            borderRadius: '8px',
                            maxHeight: '300px',
                            overflowY: 'auto'
                          }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                              <thead style={{ position: 'sticky', top: 0, background: 'rgba(0,0,0,0.5)' }}>
                                <tr>
                                  <th style={{ padding: '12px', textAlign: 'left', color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600 }}>Email</th>
                                  <th style={{ padding: '12px', textAlign: 'left', color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600 }}>Statut</th>
                                  <th style={{ padding: '12px', textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600 }}>Programmé pour</th>
                                  <th style={{ padding: '12px', textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600 }}>Tentatives</th>
                                  <th style={{ padding: '12px', textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600 }}>Priorité</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.queued.map((queued, idx) => (
                                  <tr key={queued.id} style={{
                                    borderTop: idx > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none'
                                  }}>
                                    <td style={{ padding: '12px', color: '#fff', fontSize: '13px' }}>
                                      {queued.firstName ? `${queued.firstName} (${queued.email})` : queued.email}
                                    </td>
                                    <td style={{ padding: '12px', fontSize: '12px' }}>
                                      <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '6px',
                                        background: queued.subscriberStatus === 'ACTIVE' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(156, 163, 175, 0.2)',
                                        color: queued.subscriberStatus === 'ACTIVE' ? '#10b981' : '#9ca3af',
                                        fontSize: '11px',
                                        fontWeight: 600
                                      }}>
                                        {queued.subscriberStatus || 'N/A'}
                                      </span>
                                    </td>
                                    <td style={{ padding: '12px', textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>
                                      {queued.scheduledFor ? formatDate(queued.scheduledFor) : '—'}
                                    </td>
                                    <td style={{ padding: '12px', textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>
                                      {queued.attempts}
                                    </td>
                                    <td style={{ padding: '12px', textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>
                                      {queued.priority}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>

                      {/* Section: Doublons */}
                      {data.duplicates.length > 0 && (
                        <div>
                          <h4 style={{
                            color: '#ef4444',
                            fontSize: '16px',
                            fontWeight: 600,
                            marginBottom: '16px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            ⚠️ Doublons détectés ({data.duplicates.length})
                          </h4>
                          <div style={{
                            background: 'rgba(239, 68, 68, 0.05)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '8px',
                            padding: '16px'
                          }}>
                            {data.duplicates.map((dup, idx) => (
                              <div
                                key={dup.subscriberId}
                                style={{
                                  padding: '12px',
                                  borderTop: idx > 0 ? '1px solid rgba(239, 68, 68, 0.1)' : 'none',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center'
                                }}
                              >
                                <div>
                                  <div style={{ color: '#fff', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>
                                    {dup.firstName ? `${dup.firstName} (${dup.email})` : dup.email}
                                  </div>
                                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
                                    {dup.sendDates.map((date, i) => (
                                      <span key={i}>
                                        {i > 0 && ' • '}
                                        {new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div style={{
                                  padding: '6px 12px',
                                  borderRadius: '8px',
                                  background: 'rgba(239, 68, 68, 0.2)',
                                  color: '#ef4444',
                                  fontSize: '13px',
                                  fontWeight: 700
                                }}>
                                  {dup.count}x
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
