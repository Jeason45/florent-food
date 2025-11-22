'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useSidebar } from '@/components/admin/SidebarContext';
import { ArrowLeft } from 'lucide-react';

interface Newsletter {
  id: string;
  subject: string;
  content: any;
  status: string;
  sentAt: string | null;
  recipientsCount: number;
  opensCount: number;
  clicksCount: number;
}

export default function ViewNewsletterPage() {
  const params = useParams();
  const router = useRouter();
  const newsletterId = params.id as string;
  const { sidebarWidth } = useSidebar();
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsletter();
  }, [newsletterId]);

  const fetchNewsletter = async () => {
    try {
      const response = await fetch(`/api/admin/newsletter/${newsletterId}`);
      const data = await response.json();
      if (data.success) {
        setNewsletter(data.newsletter);
      }
    } catch (error) {
      console.error('Error fetching newsletter:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #0a0e1a 0%, #0f1b2e 100%)' }}>
        <AdminSidebar />
        <div style={{
          flex: 1,
          marginLeft: `${sidebarWidth}px`,
          transition: 'margin-left 0.3s ease',
          padding: '40px',
          color: '#fff',
          textAlign: 'center'
        }}>
          Chargement...
        </div>
      </div>
    );
  }

  if (!newsletter) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #0a0e1a 0%, #0f1b2e 100%)' }}>
        <AdminSidebar />
        <div style={{
          flex: 1,
          marginLeft: `${sidebarWidth}px`,
          transition: 'margin-left 0.3s ease',
          padding: '40px',
          color: '#fff',
          textAlign: 'center'
        }}>
          Newsletter introuvable
        </div>
      </div>
    );
  }

  const htmlContent = newsletter.content?.html || '';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #0a0e1a 0%, #0f1b2e 100%)' }}>
      <AdminSidebar />

      <div style={{
        flex: 1,
        marginLeft: `${sidebarWidth}px`,
        transition: 'margin-left 0.3s ease',
        padding: '40px'
      }}>
        {/* Bouton Retour */}
        <button
          onClick={() => router.push('/admin/newsletter')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            padding: '10px 16px',
            color: '#fff',
            fontSize: '14px',
            cursor: 'pointer',
            marginBottom: '24px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          }}
        >
          <ArrowLeft size={18} />
          Retour aux newsletters
        </button>

        {/* Header */}
        <div style={{
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
            {newsletter.subject}
          </h1>
          <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
            <span>
              {newsletter.status === 'SENT' && '✅ Envoyée'}
              {newsletter.status === 'DRAFT' && '📝 Brouillon'}
              {newsletter.status === 'SCHEDULED' && '⏰ Programmée'}
            </span>
            <span>• {newsletter.recipientsCount} destinataire{newsletter.recipientsCount > 1 ? 's' : ''}</span>
            {newsletter.sentAt && (
              <span>• {new Date(newsletter.sentAt).toLocaleString('fr-FR')}</span>
            )}
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '24px', marginTop: '20px' }}>
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '16px 24px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#fbbf24' }}>
                {newsletter.opensCount}
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                Ouvertures
              </div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '16px 24px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#6366f1' }}>
                {newsletter.clicksCount}
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                Clics
              </div>
            </div>
            {newsletter.opensCount > 0 && (
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                padding: '16px 24px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#34d399' }}>
                  {Math.round((newsletter.opensCount / newsletter.recipientsCount) * 100)}%
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                  Taux d'ouverture
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Newsletter Preview */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
        }}>
          <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            style={{
              width: '100%',
              maxWidth: '700px',
              margin: '0 auto'
            }}
          />
        </div>
      </div>
    </div>
  );
}
