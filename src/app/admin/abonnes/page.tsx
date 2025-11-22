'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import { useSidebar } from '@/components/admin/SidebarContext';
import { useEffect, useState } from 'react';

interface Subscriber {
  id: string;
  email: string;
  firstName: string | null;
  status: string;
  subscriptionType: string;
  subscribedAt: string;
  confirmedAt: string | null;
  totalOpens: number;
  totalClicks: number;
  lastOpenedAt: string | null;
}

export default function AbonnesAdminPage() {
  const { sidebarWidth } = useSidebar();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (typeFilter !== 'all') params.append('type', typeFilter);
      if (searchQuery) params.append('search', searchQuery);

      const res = await fetch(`/api/admin/subscribers?${params.toString()}`);
      const data = await res.json();
      setSubscribers(data);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubscribers();
  }, [statusFilter, typeFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSubscribers();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet abonné ?')) return;

    try {
      await fetch('/api/admin/subscribers', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      fetchSubscribers();
    } catch (error) {
      console.error('Error deleting subscriber:', error);
    }
  };

  const handleToggleType = async (id: string, currentType: string) => {
    const newType = currentType === 'FREE' ? 'PREMIUM' : 'FREE';
    try {
      await fetch('/api/admin/subscribers', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, subscriptionType: newType })
      });
      fetchSubscribers();
    } catch (error) {
      console.error('Error updating subscriber:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return '#10b981';
      case 'PENDING': return '#fbbf24';
      case 'UNSUBSCRIBED': return '#ef4444';
      default: return '#94a3b8';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'PREMIUM' ? '#10b981' : '#f59e0b';
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
          gap: '12px',
          marginBottom: '40px'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
            boxShadow: '0 0 12px rgba(167, 139, 250, 0.4)'
          }} />
          <div style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(90deg, rgba(167, 139, 250, 0.3) 0%, transparent 100%)'
          }} />
          <span style={{
            fontSize: '10px',
            color: 'rgba(255,255,255,0.4)',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase'
          }}>
            Gestion des Abonnés
          </span>
        </div>

        {/* Filters & Search */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '24px',
          flexWrap: 'wrap'
        }}>
          {/* Search */}
          <form onSubmit={handleSearch} style={{ flex: 1, minWidth: '300px', display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Rechercher par email ou prénom..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                padding: '12px 16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Rechercher
            </button>
          </form>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '12px 16px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '14px',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="all">Tous les statuts</option>
            <option value="ACTIVE">Actifs</option>
            <option value="PENDING">En attente</option>
            <option value="UNSUBSCRIBED">Désabonnés</option>
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{
              padding: '12px 16px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '14px',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="all">Tous les types</option>
            <option value="FREE">Gratuit</option>
            <option value="PREMIUM">Premium</option>
          </select>
        </div>

        {/* Stats Summary */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
              Total
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#fff' }}>
              {subscribers.length}
            </div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
              Actifs
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#10b981' }}>
              {subscribers.filter(s => s.status === 'ACTIVE').length}
            </div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
              Premium
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#10b981' }}>
              {subscribers.filter(s => s.subscriptionType === 'PREMIUM').length}
            </div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ color: '#fff', fontSize: '16px', textAlign: 'center', padding: '40px' }}>
            Chargement...
          </div>
        ) : subscribers.length === 0 ? (
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '40px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center'
          }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>
              Aucun abonné trouvé
            </p>
          </div>
        ) : (
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)',
            overflow: 'hidden'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse'
              }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <th style={{ padding: '16px', textAlign: 'left', color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Email
                    </th>
                    <th style={{ padding: '16px', textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Type
                    </th>
                    <th style={{ padding: '16px', textAlign: 'left', color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Inscrit le
                    </th>
                    <th style={{ padding: '16px', textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Engagement
                    </th>
                    <th style={{ padding: '16px', textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((sub) => (
                    <tr
                      key={sub.id}
                      style={{
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                        transition: 'background 0.2s'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <td style={{ padding: '16px', color: '#fff', fontSize: '14px' }}>
                        {sub.email}
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 600,
                          background: `${getTypeColor(sub.subscriptionType)}20`,
                          color: getTypeColor(sub.subscriptionType)
                        }}>
                          {sub.subscriptionType}
                        </span>
                      </td>
                      <td style={{ padding: '16px', color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                        {new Date(sub.subscribedAt).toLocaleDateString('fr-FR')}
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                        <div style={{ fontSize: '12px' }}>
                          📧 {sub.totalOpens} · 🔗 {sub.totalClicks}
                        </div>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <button
                            onClick={() => handleToggleType(sub.id, sub.subscriptionType)}
                            style={{
                              padding: '6px 12px',
                              background: 'rgba(167, 139, 250, 0.2)',
                              border: '1px solid rgba(167, 139, 250, 0.4)',
                              borderRadius: '6px',
                              color: '#a78bfa',
                              fontSize: '12px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.background = 'rgba(167, 139, 250, 0.3)';
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.background = 'rgba(167, 139, 250, 0.2)';
                            }}
                          >
                            → {sub.subscriptionType === 'FREE' ? 'PREMIUM' : 'FREE'}
                          </button>
                          <button
                            onClick={() => handleDelete(sub.id)}
                            style={{
                              padding: '6px 12px',
                              background: 'rgba(239, 68, 68, 0.2)',
                              border: '1px solid rgba(239, 68, 68, 0.4)',
                              borderRadius: '6px',
                              color: '#ef4444',
                              fontSize: '12px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)';
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                            }}
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
