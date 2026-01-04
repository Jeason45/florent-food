'use client';

import { useState, useEffect } from 'react';
import { X, Mail, Send, Eye, MousePointer, AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  firstName: string | null;
  status: string;
  subscriptionType: string;
  totalOpens: number;
  totalClicks: number;
  subscribedAt: string;
  unsubscribedAt: string | null;
  lastOpenedAt: string | null;
}

interface Stats {
  totalNewslettersReceived: number;
  totalEmailsSent: number;
  totalOpens: number;
  totalClicks: number;
  openRate: number;
  clickRate: number;
  lastActivity: string;
}

interface NewsletterDelivery {
  id: string;
  newsletterId: string;
  newsletterSubject: string;
  newsletterType: string;
  status: string;
  sentAt: string;
  deliveredAt: string | null;
  openedAt: string | null;
  clickedAt: string | null;
  provider: string | null;
  error: string | null;
}

interface MailLog {
  id: string;
  type: string;
  subject: string;
  status: string;
  sentAt: string;
  deliveredAt: string | null;
  openedAt: string | null;
  clickedAt: string | null;
  provider: string | null;
  error: string | null;
  newsletterId: string | null;
}

interface Event {
  id: string;
  eventType: string;
  newsletterId: string | null;
  newsletterSubject: string | null;
  metadata: any;
  createdAt: string;
}

interface HistoryData {
  subscriber: Subscriber;
  stats: Stats;
  newsletterDeliveries: NewsletterDelivery[];
  mailLogs: MailLog[];
  recentEvents: Event[];
}

interface SubscriberHistoryModalProps {
  subscriberId: string;
  onClose: () => void;
}

export default function SubscriberHistoryModal({
  subscriberId,
  onClose
}: SubscriberHistoryModalProps) {
  const [data, setData] = useState<HistoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'newsletters' | 'emails' | 'events'>('newsletters');

  useEffect(() => {
    fetchHistory();
  }, [subscriberId]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/subscribers/${subscriberId}/history`);
      if (response.ok) {
        const historyData = await response.json();
        setData(historyData);
      } else {
        console.error('Failed to fetch history');
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
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

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; bgColor: string; label: string }> = {
      SENT: { color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.2)', label: 'Envoyé' },
      DELIVERED: { color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.2)', label: 'Délivré' },
      OPENED: { color: '#a78bfa', bgColor: 'rgba(167, 139, 250, 0.2)', label: 'Ouvert' },
      CLICKED: { color: '#D4AF37', bgColor: 'rgba(212, 175, 55, 0.2)', label: 'Cliqué' },
      FAILED: { color: '#ef4444', bgColor: 'rgba(239, 68, 68, 0.2)', label: 'Échec' },
      BOUNCED: { color: '#94a3b8', bgColor: 'rgba(148, 163, 184, 0.2)', label: 'Rebond' },
      sent: { color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.2)', label: 'Envoyé' },
      delivered: { color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.2)', label: 'Délivré' },
      opened: { color: '#a78bfa', bgColor: 'rgba(167, 139, 250, 0.2)', label: 'Ouvert' },
      clicked: { color: '#D4AF37', bgColor: 'rgba(212, 175, 55, 0.2)', label: 'Cliqué' },
      failed: { color: '#ef4444', bgColor: 'rgba(239, 68, 68, 0.2)', label: 'Échec' },
    };

    const config = statusConfig[status] || { color: '#94a3b8', bgColor: 'rgba(148, 163, 184, 0.2)', label: status };

    return (
      <span style={{
        display: 'inline-block',
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: 600,
        background: config.bgColor,
        color: config.color,
        border: `1px solid ${config.color}40`
      }}>
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
      onClick={onClose}>
        <div style={{
          background: 'linear-gradient(135deg, #1a1f2e 0%, #0f1318 100%)',
          borderRadius: '16px',
          border: '1px solid rgba(212, 175, 55, 0.2)',
          padding: '48px',
          maxWidth: '500px',
          width: '90%',
        }}
        onClick={(e) => e.stopPropagation()}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(212, 175, 55, 0.3)',
              borderTop: '3px solid #D4AF37',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <span style={{ color: '#fff', fontSize: '16px', fontWeight: 600 }}>Chargement...</span>
          </div>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '24px',
      overflowY: 'auto'
    }}
    onClick={onClose}>
      <div style={{
        background: 'linear-gradient(135deg, #0a0e1a 0%, #0f1b2e 100%)',
        borderRadius: '16px',
        border: '1px solid rgba(212, 175, 55, 0.2)',
        maxWidth: '1200px',
        width: '100%',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
      }}
      onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          padding: '32px',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
          background: 'rgba(212, 175, 55, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: '24px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#D4AF37',
                  boxShadow: '0 0 12px rgba(212, 175, 55, 0.6)'
                }} />
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#fff',
                  margin: 0,
                  letterSpacing: '-0.5px'
                }}>
                  Historique Complet
                </h2>
              </div>
              <p style={{ fontSize: '16px', color: '#D4AF37', margin: '0 0 8px 0', fontWeight: 500 }}>
                {data.subscriber.firstName || data.subscriber.email}
              </p>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                {data.subscriber.email}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '6px 12px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 600,
                  background: data.subscriber.status === 'ACTIVE' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                  color: data.subscriber.status === 'ACTIVE' ? '#10b981' : '#ef4444',
                  border: `1px solid ${data.subscriber.status === 'ACTIVE' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {data.subscriber.status}
                </span>
                <span style={{
                  display: 'inline-block',
                  padding: '6px 12px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 600,
                  background: 'rgba(212, 175, 55, 0.2)',
                  color: '#D4AF37',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {data.subscriber.subscriptionType}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                color: 'rgba(255,255,255,0.6)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)';
                e.currentTarget.style.color = '#ef4444';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          padding: '24px 32px',
          background: 'rgba(0,0,0,0.2)',
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(212, 175, 55, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Mail size={16} style={{ color: '#D4AF37' }} />
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Newsletters
              </span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#D4AF37' }}>
              {data.stats.totalNewslettersReceived}
            </div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(167, 139, 250, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Eye size={16} style={{ color: '#a78bfa' }} />
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Taux d'ouverture
              </span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#a78bfa' }}>
              {data.stats.openRate}%
            </div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <MousePointer size={16} style={{ color: '#10b981' }} />
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Taux de clic
              </span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#10b981' }}>
              {data.stats.clickRate}%
            </div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <TrendingUp size={16} style={{ color: '#3b82f6' }} />
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Total Emails
              </span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#3b82f6' }}>
              {data.stats.totalEmailsSent}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '4px',
          padding: '0 32px',
          background: 'rgba(0,0,0,0.2)',
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
          <button
            onClick={() => setActiveTab('newsletters')}
            style={{
              padding: '16px 24px',
              background: activeTab === 'newsletters' ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'newsletters' ? '2px solid #D4AF37' : '2px solid transparent',
              color: activeTab === 'newsletters' ? '#D4AF37' : 'rgba(255,255,255,0.6)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseOver={(e) => {
              if (activeTab !== 'newsletters') {
                e.currentTarget.style.color = '#fff';
              }
            }}
            onMouseOut={(e) => {
              if (activeTab !== 'newsletters') {
                e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
              }
            }}
          >
            Newsletters ({data.newsletterDeliveries.length})
          </button>
          <button
            onClick={() => setActiveTab('emails')}
            style={{
              padding: '16px 24px',
              background: activeTab === 'emails' ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'emails' ? '2px solid #D4AF37' : '2px solid transparent',
              color: activeTab === 'emails' ? '#D4AF37' : 'rgba(255,255,255,0.6)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseOver={(e) => {
              if (activeTab !== 'emails') {
                e.currentTarget.style.color = '#fff';
              }
            }}
            onMouseOut={(e) => {
              if (activeTab !== 'emails') {
                e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
              }
            }}
          >
            Tous les emails ({data.mailLogs.length})
          </button>
          <button
            onClick={() => setActiveTab('events')}
            style={{
              padding: '16px 24px',
              background: activeTab === 'events' ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'events' ? '2px solid #D4AF37' : '2px solid transparent',
              color: activeTab === 'events' ? '#D4AF37' : 'rgba(255,255,255,0.6)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseOver={(e) => {
              if (activeTab !== 'events') {
                e.currentTarget.style.color = '#fff';
              }
            }}
            onMouseOut={(e) => {
              if (activeTab !== 'events') {
                e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
              }
            }}
          >
            Événements ({data.recentEvents.length})
          </button>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px 32px'
        }}>
          {activeTab === 'newsletters' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {data.newsletterDeliveries.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '12px',
                  border: '1px dashed rgba(255,255,255,0.1)'
                }}>
                  <Mail size={48} style={{ color: 'rgba(212, 175, 55, 0.3)', marginBottom: '16px' }} />
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', margin: 0 }}>
                    Aucune newsletter envoyée
                  </p>
                </div>
              ) : (
                data.newsletterDeliveries.map((delivery) => (
                  <div key={delivery.id} style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(212, 175, 55, 0.15)',
                    borderRadius: '12px',
                    padding: '20px',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(212, 175, 55, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.15)';
                  }}>
                    <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '16px', gap: '16px' }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontSize: '16px',
                          fontWeight: 600,
                          color: '#fff',
                          margin: '0 0 8px 0'
                        }}>
                          {delivery.newsletterSubject}
                        </h3>
                        <p style={{
                          fontSize: '13px',
                          color: 'rgba(255,255,255,0.5)',
                          margin: 0
                        }}>
                          Type: {delivery.newsletterType}
                        </p>
                      </div>
                      {getStatusBadge(delivery.status)}
                    </div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                      gap: '12px',
                      fontSize: '12px',
                      color: 'rgba(255,255,255,0.6)'
                    }}>
                      <div>
                        <span style={{ color: '#D4AF37', fontWeight: 600 }}>Envoyé:</span><br />
                        {formatDate(delivery.sentAt)}
                      </div>
                      {delivery.openedAt && (
                        <div>
                          <span style={{ color: '#a78bfa', fontWeight: 600 }}>Ouvert:</span><br />
                          {formatDate(delivery.openedAt)}
                        </div>
                      )}
                      {delivery.clickedAt && (
                        <div>
                          <span style={{ color: '#10b981', fontWeight: 600 }}>Cliqué:</span><br />
                          {formatDate(delivery.clickedAt)}
                        </div>
                      )}
                      {delivery.provider && (
                        <div>
                          <span style={{ color: '#3b82f6', fontWeight: 600 }}>Via:</span><br />
                          {delivery.provider}
                        </div>
                      )}
                    </div>
                    {delivery.error && (
                      <div style={{
                        marginTop: '12px',
                        padding: '12px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '8px',
                        fontSize: '12px',
                        color: '#ef4444'
                      }}>
                        <strong>Erreur:</strong> {delivery.error}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'emails' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {data.mailLogs.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '12px',
                  border: '1px dashed rgba(255,255,255,0.1)'
                }}>
                  <Send size={48} style={{ color: 'rgba(212, 175, 55, 0.3)', marginBottom: '16px' }} />
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', margin: 0 }}>
                    Aucun email envoyé
                  </p>
                </div>
              ) : (
                data.mailLogs.map((log) => (
                  <div key={log.id} style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '20px',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  }}>
                    <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '16px', gap: '16px' }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontSize: '16px',
                          fontWeight: 600,
                          color: '#fff',
                          margin: '0 0 8px 0'
                        }}>
                          {log.subject}
                        </h3>
                        <p style={{
                          fontSize: '13px',
                          color: 'rgba(255,255,255,0.5)',
                          margin: 0
                        }}>
                          Type: {log.type}
                        </p>
                      </div>
                      {getStatusBadge(log.status)}
                    </div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                      gap: '12px',
                      fontSize: '12px',
                      color: 'rgba(255,255,255,0.6)'
                    }}>
                      <div>
                        <span style={{ color: '#D4AF37', fontWeight: 600 }}>Envoyé:</span><br />
                        {formatDate(log.sentAt)}
                      </div>
                      {log.openedAt && (
                        <div>
                          <span style={{ color: '#a78bfa', fontWeight: 600 }}>Ouvert:</span><br />
                          {formatDate(log.openedAt)}
                        </div>
                      )}
                      {log.provider && (
                        <div>
                          <span style={{ color: '#3b82f6', fontWeight: 600 }}>Via:</span><br />
                          {log.provider}
                        </div>
                      )}
                    </div>
                    {log.error && (
                      <div style={{
                        marginTop: '12px',
                        padding: '12px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '8px',
                        fontSize: '12px',
                        color: '#ef4444'
                      }}>
                        <strong>Erreur:</strong> {log.error}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'events' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {data.recentEvents.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '12px',
                  border: '1px dashed rgba(255,255,255,0.1)'
                }}>
                  <Clock size={48} style={{ color: 'rgba(212, 175, 55, 0.3)', marginBottom: '16px' }} />
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', margin: 0 }}>
                    Aucun événement enregistré
                  </p>
                </div>
              ) : (
                data.recentEvents.map((event) => (
                  <div key={event.id} style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderLeft: '3px solid #D4AF37',
                    borderRadius: '8px',
                    padding: '16px 20px',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(212, 175, 55, 0.05)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#D4AF37',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {event.eventType}
                      </span>
                      <span style={{
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.5)'
                      }}>
                        {formatDate(event.createdAt)}
                      </span>
                    </div>
                    {event.newsletterSubject && (
                      <p style={{
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.7)',
                        margin: 0
                      }}>
                        Newsletter: {event.newsletterSubject}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '20px 32px',
          borderTop: '1px solid rgba(212, 175, 55, 0.2)',
          background: 'rgba(0,0,0,0.2)',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '12px 32px',
              background: 'rgba(212, 175, 55, 0.2)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              borderRadius: '8px',
              color: '#D4AF37',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(212, 175, 55, 0.3)';
              e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.6)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(212, 175, 55, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
            }}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
