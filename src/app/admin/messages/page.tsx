'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import { useSidebar } from '@/components/admin/SidebarContext';
import { useEffect, useState } from 'react';
import { Mail, MailOpen, Reply, Trash2, Clock, User, MessageSquare } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'UNREAD' | 'READ' | 'REPLIED';
  createdAt: string;
  readAt: string | null;
  repliedAt: string | null;
}

interface Stats {
  total: number;
  unread: number;
  read: number;
  replied: number;
}

export default function MessagesAdminPage() {
  const { sidebarWidth } = useSidebar();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, unread: 0, read: 0, replied: 0 });
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);

      const res = await fetch(`/api/admin/messages?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages);
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, [statusFilter]);

  const handleMarkAs = async (id: string, status: 'READ' | 'REPLIED') => {
    try {
      await fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      fetchMessages();
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, status });
      }
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return;

    try {
      await fetch(`/api/admin/messages?id=${id}`, { method: 'DELETE' });
      fetchMessages();
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const openMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    if (message.status === 'UNREAD') {
      handleMarkAs(message.id, 'READ');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'UNREAD': return <Mail size={16} />;
      case 'READ': return <MailOpen size={16} />;
      case 'REPLIED': return <Reply size={16} />;
      default: return <Mail size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'UNREAD': return '#D4AF37';
      case 'READ': return '#64748b';
      case 'REPLIED': return '#10b981';
      default: return '#64748b';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    if (diffHours < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `Il y a ${diffMins} min`;
    } else if (diffHours < 24) {
      return `Il y a ${Math.floor(diffHours)}h`;
    } else if (diffDays < 7) {
      return `Il y a ${Math.floor(diffDays)}j`;
    } else {
      return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #0a0e1a 0%, #0f1b2e 100%)' }}>
      <AdminSidebar />

      <div style={{
        flex: 1,
        marginLeft: sidebarWidth,
        padding: '32px 40px',
        transition: 'margin-left 0.3s ease'
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
            background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
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
            Messages de Contact
          </span>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageSquare size={20} style={{ color: '#6366f1' }} />
              </div>
              <div>
                <p style={{ color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Total</p>
                <p style={{ color: '#fff', fontSize: '24px', fontWeight: '700' }}>{stats.total}</p>
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(212, 175, 55, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={20} style={{ color: '#D4AF37' }} />
              </div>
              <div>
                <p style={{ color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Non lus</p>
                <p style={{ color: '#D4AF37', fontSize: '24px', fontWeight: '700' }}>{stats.unread}</p>
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(100, 116, 139, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MailOpen size={20} style={{ color: '#64748b' }} />
              </div>
              <div>
                <p style={{ color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Lus</p>
                <p style={{ color: '#fff', fontSize: '24px', fontWeight: '700' }}>{stats.read}</p>
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Reply size={20} style={{ color: '#10b981' }} />
              </div>
              <div>
                <p style={{ color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Répondus</p>
                <p style={{ color: '#10b981', fontSize: '24px', fontWeight: '700' }}>{stats.replied}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          {['all', 'UNREAD', 'READ', 'REPLIED'].map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: statusFilter === filter ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255,255,255,0.05)',
                color: statusFilter === filter ? '#D4AF37' : '#94a3b8',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {filter === 'all' ? 'Tous' : filter === 'UNREAD' ? 'Non lus' : filter === 'READ' ? 'Lus' : 'Répondus'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ display: 'grid', gridTemplateColumns: selectedMessage ? '1fr 1fr' : '1fr', gap: '24px' }}>
          {/* Messages List */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.06)',
            overflow: 'hidden'
          }}>
            {loading ? (
              <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
                Chargement...
              </div>
            ) : messages.length === 0 ? (
              <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
                Aucun message
              </div>
            ) : (
              <div>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => openMessage(message)}
                    style={{
                      padding: '16px 20px',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                      cursor: 'pointer',
                      background: selectedMessage?.id === message.id ? 'rgba(212, 175, 55, 0.1)' : message.status === 'UNREAD' ? 'rgba(212, 175, 55, 0.05)' : 'transparent',
                      transition: 'background 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{ color: getStatusColor(message.status), marginTop: '2px' }}>
                        {getStatusIcon(message.status)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ color: '#fff', fontWeight: message.status === 'UNREAD' ? '600' : '400', fontSize: '14px' }}>
                            {message.name}
                          </span>
                          <span style={{ color: '#64748b', fontSize: '12px' }}>
                            {formatDate(message.createdAt)}
                          </span>
                        </div>
                        <p style={{ color: message.status === 'UNREAD' ? '#fff' : '#94a3b8', fontSize: '13px', fontWeight: message.status === 'UNREAD' ? '500' : '400', marginBottom: '4px' }}>
                          {message.subject}
                        </p>
                        <p style={{ color: '#64748b', fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {message.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Message Detail */}
          {selectedMessage && (
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.06)',
              overflow: 'hidden'
            }}>
              {/* Header */}
              <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <h2 style={{ color: '#fff', fontSize: '18px', fontWeight: '600' }}>
                    {selectedMessage.subject}
                  </h2>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {selectedMessage.status !== 'REPLIED' && (
                      <button
                        onClick={() => handleMarkAs(selectedMessage.id, 'REPLIED')}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: 'none',
                          background: 'rgba(16, 185, 129, 0.2)',
                          color: '#10b981',
                          fontSize: '12px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Reply size={14} />
                        Marquer répondu
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(selectedMessage.id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        background: 'rgba(239, 68, 68, 0.2)',
                        color: '#ef4444',
                        fontSize: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', color: '#64748b', fontSize: '13px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <User size={14} />
                    <span>{selectedMessage.name}</span>
                  </div>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#D4AF37', textDecoration: 'none' }}
                  >
                    <Mail size={14} />
                    <span>{selectedMessage.email}</span>
                  </a>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} />
                    <span>{new Date(selectedMessage.createdAt).toLocaleString('fr-FR')}</span>
                  </div>
                </div>
              </div>

              {/* Message Body */}
              <div style={{ padding: '24px' }}>
                <p style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                  {selectedMessage.message}
                </p>
              </div>

              {/* Reply Button */}
              <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                >
                  <Reply size={18} />
                  Répondre par email
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
