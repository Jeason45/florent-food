'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import { useSidebar } from '@/components/admin/SidebarContext';

export default function AnalyticsAdminPage() {
  const { sidebarWidth } = useSidebar();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #0a0e1a 0%, #0f1b2e 100%)' }}>
      <AdminSidebar />

      <div style={{
        flex: 1,
        marginLeft: `${sidebarWidth}px`,
        transition: 'margin-left 0.3s ease',
        padding: '40px'
      }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '24px' }}>
          Analytics
        </h1>

        <div style={{
          background: 'rgba(255,255,255,0.05)',
          padding: '40px',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center'
        }}>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px' }}>
            Interface analytics à venir...
          </p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginTop: '12px' }}>
            Statistiques détaillées, taux d'ouverture, clics, conversions
          </p>
        </div>
      </div>
    </div>
  );
}
