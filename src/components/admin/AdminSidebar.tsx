'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from './SidebarContext';

export default function AdminSidebar() {
  const pathname = usePathname();
  const { isCollapsed, setIsCollapsed } = useSidebar();

  const navItems = [
    {
      href: '/admin/dashboard',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
        </svg>
      ),
      label: 'Dashboard',
      color: '#3b82f6'
    },
    {
      href: '/admin/abonnes',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      label: 'Abonnés',
      color: '#ec4899'
    },
    {
      href: '/admin/messages',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      label: 'Messages',
      color: '#D4AF37'
    },
    {
      href: '/admin/recettes',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
          <path d="M7 2v20"/>
          <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
        </svg>
      ),
      label: 'Recettes',
      color: '#f59e0b'
    },
    {
      href: '/admin/newsletter',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      label: 'Newsletter',
      color: '#10b981'
    },
    {
      href: '/admin/calendrier',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ),
      label: 'Calendrier',
      color: '#8b5cf6'
    },
    {
      href: '/admin/analytics',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      ),
      label: 'Analytics',
      color: '#06b6d4'
    },
    {
      href: '/admin/parametres',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      ),
      label: 'Paramètres',
      color: '#a855f7'
    },
  ];

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') {
      return pathname === '/admin/dashboard' || pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <div style={{
      width: isCollapsed ? '80px' : '260px',
      background: 'linear-gradient(180deg, #000000 0%, #0a1628 100%)',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      height: '100vh',
      left: 0,
      top: 0,
      transition: 'width 0.3s ease',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      zIndex: 1000
    }}>
      {/* Header */}
      <div style={{
        padding: isCollapsed ? '24px 16px' : '24px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{
          opacity: isCollapsed ? 0 : 1,
          transition: 'opacity 0.3s ease',
          pointerEvents: isCollapsed ? 'none' : 'auto',
          width: isCollapsed ? 0 : 'auto',
          overflow: 'hidden',
          whiteSpace: 'nowrap'
        }}>
          <h1 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#818cf8',
            marginBottom: '2px',
            letterSpacing: '-0.01em'
          }}>
            Florent Food
          </h1>
          <p style={{
            fontSize: '11px',
            color: '#94a3b8',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            fontWeight: 500
          }}>
            CRM Platform
          </p>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '6px',
            padding: '8px',
            cursor: 'pointer',
            color: '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
            marginLeft: isCollapsed ? '0' : 'auto'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.color = '#e2e8f0';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.color = '#94a3b8';
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease'
            }}
          >
            <polyline points="11 17 6 12 11 7"/>
            <polyline points="18 17 13 12 18 7"/>
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav style={{
        flex: 1,
        padding: isCollapsed ? '16px 12px' : '16px',
        overflowY: 'auto'
      }}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              textDecoration: 'none',
              display: 'block',
              marginBottom: '4px'
            }}
          >
            <div style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: isCollapsed ? '12px' : '12px 16px',
              backgroundColor: isActive(item.href) ? `${item.color}26` : 'transparent',
              borderLeft: isActive(item.href) ? `3px solid ${item.color}` : '3px solid transparent',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: isActive(item.href) ? 600 : 500,
              cursor: 'pointer',
              transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
              justifyContent: isCollapsed ? 'center' : 'flex-start'
            }}
            onMouseOver={(e) => {
              if (!isActive(item.href)) {
                e.currentTarget.style.backgroundColor = `${item.color}14`;
              }
              const iconWrapper = e.currentTarget.querySelector('div[data-icon-wrapper]') as HTMLElement;
              const icon = e.currentTarget.querySelector('svg') as unknown as HTMLElement;
              const text = e.currentTarget.querySelector('span') as HTMLElement;
              if (iconWrapper && !isActive(item.href)) iconWrapper.style.transform = 'scale(1.02)';
              if (icon && !isActive(item.href)) icon.style.opacity = '1';
              if (text && !isActive(item.href)) {
                text.style.opacity = '1';
                text.style.transform = 'translateX(4px)';
              }
            }}
            onMouseOut={(e) => {
              if (!isActive(item.href)) {
                e.currentTarget.style.backgroundColor = 'transparent';
                const iconWrapper = e.currentTarget.querySelector('div[data-icon-wrapper]') as HTMLElement;
                const icon = e.currentTarget.querySelector('svg') as unknown as HTMLElement;
                const text = e.currentTarget.querySelector('span') as HTMLElement;
                if (iconWrapper) iconWrapper.style.transform = 'scale(1)';
                if (icon) icon.style.opacity = '0.7';
                if (text) {
                  text.style.opacity = '0.7';
                  text.style.transform = 'translateX(0)';
                }
              }
            }}
            title={isCollapsed ? item.label : undefined}
            >
              <div
                data-icon-wrapper
                style={{
                  color: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <div style={{ opacity: isActive(item.href) ? 1 : 0.7, transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)' }}>
                  {item.icon}
                </div>
              </div>
              {!isCollapsed && (
                <span style={{
                  color: item.color,
                  opacity: isActive(item.href) ? 1 : 0.7,
                  transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: 'translateX(0)'
                }}>
                  {item.label}
                </span>
              )}
            </div>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div style={{
        padding: isCollapsed ? '16px 12px' : '16px',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)'
      }}>
        {/* Bouton de déconnexion */}
        <button
          onClick={async () => {
            try {
              const response = await fetch('/api/admin/auth/logout', {
                method: 'POST'
              });
              if (response.ok) {
                window.location.href = '/admin/login';
              }
            } catch (error) {
              console.error('Logout error:', error);
            }
          }}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: isCollapsed ? '12px' : '12px 16px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 500,
            color: '#ef4444',
            cursor: 'pointer',
            transition: 'all 0.2s',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            marginBottom: '12px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
          }}
          title={isCollapsed ? 'Déconnexion' : undefined}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          {!isCollapsed && <span>Déconnexion</span>}
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          justifyContent: isCollapsed ? 'center' : 'flex-start'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            fontWeight: 700,
            color: '#fff',
            flexShrink: 0
          }}>
            F
          </div>
          {!isCollapsed && (
            <div style={{
              flex: 1,
              overflow: 'hidden'
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#fff',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                Admin
              </div>
              <div style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.5)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                Administrateur
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
