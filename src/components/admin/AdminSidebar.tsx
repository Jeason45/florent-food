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
      color: '#818cf8'
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
      color: '#34d399'
    },
    {
      href: '/admin/recettes',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
      label: 'Recettes',
      color: '#D4AF37'
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
      color: '#a78bfa'
    },
    {
      href: '/admin/analytics',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      ),
      label: 'Analytics',
      color: '#fbbf24'
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
