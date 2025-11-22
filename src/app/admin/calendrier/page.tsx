'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import { useSidebar } from '@/components/admin/SidebarContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Newsletter {
  id: string;
  subject: string;
  status: 'DRAFT' | 'SCHEDULED' | 'ACTIVE' | 'SENT' | 'ARCHIVED';
  startDate: string;
  endDate: string;
  weekNumber: number;
  recipientsCount: number;
  opensCount: number;
  clicksCount: number;
  createdAt: string;
}

interface WeekData {
  weekNumber: number;
  startDate: Date;
  endDate: Date;
  newsletters: Newsletter[]; // Plusieurs newsletters possibles par semaine
}

type ViewMode = 'grid' | 'list' | 'timeline';
type FilterStatus = 'ALL' | 'DRAFT' | 'SCHEDULED' | 'ACTIVE' | 'SENT' | 'ARCHIVED';

export default function CalendrierPage() {
  const { sidebarWidth } = useSidebar();
  const router = useRouter();
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [weeks, setWeeks] = useState<WeekData[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchNewsletters();
  }, []);

  useEffect(() => {
    generateWeeksForMonth(currentMonth);
  }, [currentMonth, newsletters]);

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

  const generateWeeksForMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const firstSunday = new Date(firstDay);
    const dayOfWeek = firstDay.getDay();
    if (dayOfWeek !== 0) {
      firstSunday.setDate(firstDay.getDate() - dayOfWeek);
    }
    const lastDay = new Date(year, month + 1, 0);
    const weeksData: WeekData[] = [];
    let currentSunday = new Date(firstSunday);

    while (currentSunday <= lastDay || currentSunday.getMonth() === month) {
      const weekStart = new Date(currentSunday);
      const weekEnd = new Date(currentSunday);
      weekEnd.setDate(weekEnd.getDate() + 6);
      const weekNumber = getWeekNumber(weekStart);
      // Récupérer TOUTES les newsletters de cette semaine (pas juste une)
      const weekNewsletters = newsletters.filter(n => n.weekNumber === weekNumber);

      weeksData.push({
        weekNumber,
        startDate: weekStart,
        endDate: weekEnd,
        newsletters: weekNewsletters
      });

      currentSunday.setDate(currentSunday.getDate() + 7);
      if (weeksData.length >= 6) break;
    }

    setWeeks(weeksData);
  };

  const getWeekNumber = (date: Date): number => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return { bg: 'rgba(99, 102, 241, 0.15)', border: '#6366f1', text: '#818cf8', solid: '#6366f1' };
      case 'SCHEDULED':
        return { bg: 'rgba(251, 191, 36, 0.15)', border: '#f59e0b', text: '#fbbf24', solid: '#f59e0b' };
      case 'ACTIVE':
        return { bg: 'rgba(52, 211, 153, 0.15)', border: '#10b981', text: '#34d399', solid: '#10b981' };
      case 'SENT':
        return { bg: 'rgba(168, 85, 247, 0.15)', border: '#a855f7', text: '#c084fc', solid: '#a855f7' };
      case 'ARCHIVED':
        return { bg: 'rgba(107, 114, 128, 0.15)', border: '#6b7280', text: '#9ca3af', solid: '#6b7280' };
      default:
        return { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)', text: '#fff', solid: '#fff' };
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'DRAFT': return '📝 Brouillon';
      case 'SCHEDULED': return '📆 Programmée';
      case 'ACTIVE': return '✅ Active';
      case 'SENT': return '📧 Envoyée';
      case 'ARCHIVED': return '📦 Archivée';
      default: return status;
    }
  };

  const createNewsletter = (weekData: WeekData) => {
    const startDateStr = weekData.startDate.toISOString().split('T')[0];
    router.push(`/admin/newsletter/new?startDate=${startDateStr}`);
  };

  const viewNewsletter = (newsletter: Newsletter) => {
    router.push(`/admin/newsletter/${newsletter.id}`);
  };

  const filteredNewsletters = newsletters.filter(n => {
    const matchesStatus = filterStatus === 'ALL' || n.status === filterStatus;
    const matchesSearch = !searchQuery || n.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredWeeks = weeks.filter(w => {
    if (w.newsletters.length === 0) return filterStatus === 'ALL';
    // Si filterStatus === 'ALL', afficher la semaine si elle a au moins une newsletter
    if (filterStatus === 'ALL') return true;
    // Sinon, afficher si au moins une newsletter correspond au filtre
    return w.newsletters.some(n => n.status === filterStatus);
  });

  const stats = {
    total: newsletters.length,
    draft: newsletters.filter(n => n.status === 'DRAFT').length,
    scheduled: newsletters.filter(n => n.status === 'SCHEDULED').length,
    active: newsletters.filter(n => n.status === 'ACTIVE').length,
    sent: newsletters.filter(n => n.status === 'SENT').length,
    archived: newsletters.filter(n => n.status === 'ARCHIVED').length,
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #0a0e1a 0%, #0f1b2e 100%)' }}>
      <AdminSidebar />

      <div style={{
        flex: 1,
        transition: 'margin-left 0.3s ease',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1600px',
          padding: '40px',
          marginLeft: `${sidebarWidth}px`,
          transition: 'margin-left 0.3s ease'
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
                background: 'linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)',
                boxShadow: '0 0 12px rgba(212, 175, 55, 0.4)'
              }} />
              <div style={{
                flex: 1,
                height: '1px',
                background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.3) 0%, transparent 100%)',
                width: '200px'
              }} />
              <span style={{
                fontSize: '10px',
                color: 'rgba(255,255,255,0.4)',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase'
              }}>
                Calendrier
              </span>
            </div>

            <button
              onClick={() => router.push('/admin/newsletter/new')}
              style={{
                background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
                border: 'none',
                borderRadius: '12px',
                color: '#000',
                padding: '14px 32px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 16px rgba(52, 211, 153, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
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

          {/* Stats Bar */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '20px 24px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '20px'
          }}>
            {[
              { label: 'Total', value: stats.total, color: '#fff' },
              { label: 'Brouillons', value: stats.draft, color: '#818cf8' },
              { label: 'Programmées', value: stats.scheduled, color: '#fbbf24' },
              { label: 'Active', value: stats.active, color: '#34d399' },
              { label: 'Envoyées', value: stats.sent, color: '#c084fc' },
              { label: 'Archivées', value: stats.archived, color: '#9ca3af' }
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: 700, color: stat.color, marginBottom: '4px' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Toolbar: View Mode + Filters */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '20px 24px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            {/* View Mode Selector */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: 600, marginRight: '8px' }}>
                VUE:
              </span>
              {[
                { mode: 'grid' as ViewMode, icon: '▦', label: 'Grille' },
                { mode: 'list' as ViewMode, icon: '☰', label: 'Liste' },
                { mode: 'timeline' as ViewMode, icon: '⎯', label: 'Timeline' }
              ].map(({ mode, icon, label }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  style={{
                    background: viewMode === mode
                      ? 'linear-gradient(135deg, #D4AF37 0%, #C77A4E 100%)'
                      : 'rgba(255,255,255,0.1)',
                    border: viewMode === mode ? 'none' : '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: viewMode === mode ? '#000' : '#fff',
                    padding: '10px 20px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onMouseOver={(e) => {
                    if (viewMode !== mode) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (viewMode !== mode) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    }
                  }}
                >
                  <span style={{ fontSize: '16px' }}>{icon}</span>
                  {label}
                </button>
              ))}
            </div>

            {/* Filter Status */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: 600, marginRight: '8px' }}>
                FILTRE:
              </span>
              {(['ALL', 'DRAFT', 'SCHEDULED', 'ACTIVE', 'SENT', 'ARCHIVED'] as FilterStatus[]).map(status => {
                const colors = status === 'ALL'
                  ? { solid: '#fff' }
                  : getStatusColor(status);

                return (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    style={{
                      background: filterStatus === status
                        ? colors.solid
                        : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${filterStatus === status ? colors.solid : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: '6px',
                      color: filterStatus === status ? '#000' : colors.solid,
                      padding: '6px 14px',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {status === 'ALL' ? 'Tout' : status}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <input
              type="text"
              placeholder="🔍 Rechercher une newsletter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff',
                padding: '10px 16px',
                fontSize: '13px',
                outline: 'none',
                minWidth: '250px',
                transition: 'all 0.2s'
              }}
            />
          </div>

          {/* Month Navigation (only for grid view) */}
          {viewMode === 'grid' && (
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '20px 24px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.1)',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <button
                onClick={previousMonth}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: '#fff',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                }}
              >
                ← Mois Précédent
              </button>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '4px', textTransform: 'capitalize' }}>
                  {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                </div>
                <button
                  onClick={goToToday}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#34d399',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Aujourd'hui
                </button>
              </div>

              <button
                onClick={nextMonth}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: '#fff',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                }}
              >
                Mois Suivant →
              </button>
            </div>
          )}

          {/* Content based on view mode */}
          {loading ? (
            <div style={{
              textAlign: 'center',
              padding: '80px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>
                Chargement du calendrier...
              </div>
            </div>
          ) : (
            <>
              {/* GRID VIEW */}
              {viewMode === 'grid' && (
                <div style={{ display: 'grid', gap: '16px' }}>
                  {filteredWeeks.map((week) => {
                    const isCurrentWeek = getWeekNumber(new Date()) === week.weekNumber;
                    const hasNewsletters = week.newsletters.length > 0;

                    return (
                      <div
                        key={week.weekNumber}
                        style={{
                          background: hasNewsletters ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
                          border: `2px solid ${isCurrentWeek ? '#34d399' : 'rgba(255,255,255,0.1)'}`,
                          borderRadius: '16px',
                          padding: '28px',
                          transition: 'all 0.3s',
                          position: 'relative',
                          boxShadow: isCurrentWeek ? '0 0 24px rgba(52, 211, 153, 0.3)' : 'none'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                          <div style={{
                            background: isCurrentWeek
                              ? 'linear-gradient(135deg, #34d399 0%, #10b981 100%)'
                              : 'linear-gradient(135deg, #D4AF37 0%, #C77A4E 100%)',
                            padding: '12px 20px',
                            borderRadius: '12px',
                            textAlign: 'center',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                          }}>
                            <div style={{
                              fontSize: '10px',
                              color: 'rgba(0,0,0,0.7)',
                              fontWeight: 700,
                              letterSpacing: '1px',
                              textTransform: 'uppercase'
                            }}>
                              {isCurrentWeek ? '⭐ CETTE SEMAINE' : 'SEMAINE'}
                            </div>
                            <div style={{
                              fontSize: '24px',
                              color: '#000',
                              fontWeight: 900,
                              lineHeight: 1,
                              marginTop: '4px'
                            }}>
                              {week.weekNumber}
                            </div>
                          </div>

                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '16px', color: '#fff', fontWeight: 700 }}>
                              {week.startDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                              {' → '}
                              {week.endDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </div>
                            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px', textTransform: 'capitalize' }}>
                              {week.startDate.toLocaleDateString('fr-FR', { weekday: 'long' })}
                              {' au '}
                              {week.endDate.toLocaleDateString('fr-FR', { weekday: 'long' })}
                            </div>
                          </div>
                        </div>

                        {hasNewsletters ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {week.newsletters.map((newsletter) => {
                              const colors = getStatusColor(newsletter.status);
                              return (
                                <div
                                  key={newsletter.id}
                                  onClick={() => viewNewsletter(newsletter)}
                                  style={{
                                    background: colors.bg,
                                    border: `2px solid ${colors.border}`,
                                    borderRadius: '12px',
                                    padding: '20px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s'
                                  }}
                                  onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateX(4px)';
                                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
                                  }}
                                  onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateX(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                  }}
                                >
                                  <div style={{
                                    display: 'inline-block',
                                    background: colors.bg,
                                    border: `2px solid ${colors.border}`,
                                    borderRadius: '8px',
                                    padding: '6px 16px',
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    color: colors.text,
                                    marginBottom: '12px'
                                  }}>
                                    {getStatusLabel(newsletter.status)}
                                  </div>

                                  <h3 style={{
                                    fontSize: '18px',
                                    fontWeight: 700,
                                    color: '#fff',
                                    marginBottom: '12px',
                                    lineHeight: 1.3
                                  }}>
                                    {newsletter.subject}
                                  </h3>

                                  <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: '12px',
                                    marginTop: '16px',
                                    paddingTop: '16px',
                                    borderTop: '1px solid rgba(255,255,255,0.1)'
                                  }}>
                                    <div>
                                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>
                                        Destinataires
                                      </div>
                                      <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>
                                        {newsletter.recipientsCount}
                                      </div>
                                    </div>
                                    <div>
                                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>
                                        Ouvertures
                                      </div>
                                      <div style={{ fontSize: '18px', fontWeight: 700, color: '#34d399' }}>
                                        {newsletter.opensCount}
                                      </div>
                                    </div>
                                    <div>
                                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>
                                        Clics
                                      </div>
                                      <div style={{ fontSize: '18px', fontWeight: 700, color: '#3b82f6' }}>
                                        {newsletter.clicksCount}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}

                            {/* Bouton pour créer une nouvelle newsletter cette semaine */}
                            <button
                              onClick={() => createNewsletter(week)}
                              style={{
                                background: 'rgba(52, 211, 153, 0.1)',
                                border: '2px dashed rgba(52, 211, 153, 0.3)',
                                borderRadius: '12px',
                                padding: '16px',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                color: '#34d399',
                                fontSize: '14px',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.background = 'rgba(52, 211, 153, 0.15)';
                                e.currentTarget.style.borderColor = 'rgba(52, 211, 153, 0.5)';
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.background = 'rgba(52, 211, 153, 0.1)';
                                e.currentTarget.style.borderColor = 'rgba(52, 211, 153, 0.3)';
                              }}
                            >
                              <span style={{ fontSize: '18px' }}>+</span>
                              Ajouter une newsletter cette semaine
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => createNewsletter(week)}
                            style={{ textAlign: 'center', padding: '40px 0', cursor: 'pointer' }}
                          >
                            <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.3 }}>
                              ➕
                            </div>
                            <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
                              Aucune newsletter pour cette semaine
                            </div>
                            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '8px' }}>
                              Cliquez pour en créer une
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* LIST VIEW */}
              {viewMode === 'list' && (
                <div style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  overflow: 'hidden'
                }}>
                  {/* Table Header */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr 150px 120px 120px 120px 100px',
                    gap: '16px',
                    padding: '20px 24px',
                    background: 'rgba(255,255,255,0.03)',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.5)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    <div>Semaine</div>
                    <div>Sujet</div>
                    <div>Période</div>
                    <div>Statut</div>
                    <div>Destinataires</div>
                    <div>Ouvertures</div>
                    <div>Clics</div>
                  </div>

                  {/* Table Rows */}
                  {filteredNewsletters.length === 0 ? (
                    <div style={{
                      textAlign: 'center',
                      padding: '60px',
                      color: 'rgba(255,255,255,0.5)'
                    }}>
                      Aucune newsletter trouvée
                    </div>
                  ) : (
                    filteredNewsletters.map((newsletter) => {
                      const colors = getStatusColor(newsletter.status);
                      const isActive = newsletter.status === 'ACTIVE';

                      return (
                        <div
                          key={newsletter.id}
                          onClick={() => viewNewsletter(newsletter)}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '80px 1fr 150px 120px 120px 120px 100px',
                            gap: '16px',
                            padding: '20px 24px',
                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            background: isActive ? 'rgba(52, 211, 153, 0.05)' : 'transparent'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = isActive
                              ? 'rgba(52, 211, 153, 0.1)'
                              : 'rgba(255,255,255,0.05)';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = isActive
                              ? 'rgba(52, 211, 153, 0.05)'
                              : 'transparent';
                          }}
                        >
                          <div style={{
                            fontSize: '18px',
                            fontWeight: 900,
                            color: isActive ? '#34d399' : '#D4AF37'
                          }}>
                            #{newsletter.weekNumber}
                          </div>
                          <div style={{
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#fff'
                          }}>
                            {newsletter.subject}
                          </div>
                          <div style={{
                            fontSize: '12px',
                            color: 'rgba(255,255,255,0.6)'
                          }}>
                            {new Date(newsletter.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                            {' → '}
                            {new Date(newsletter.endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                          </div>
                          <div>
                            <span style={{
                              display: 'inline-block',
                              background: colors.bg,
                              border: `1px solid ${colors.border}`,
                              borderRadius: '6px',
                              padding: '4px 10px',
                              fontSize: '11px',
                              fontWeight: 600,
                              color: colors.text
                            }}>
                              {newsletter.status}
                            </span>
                          </div>
                          <div style={{
                            fontSize: '16px',
                            fontWeight: 700,
                            color: '#fff'
                          }}>
                            {newsletter.recipientsCount}
                          </div>
                          <div style={{
                            fontSize: '16px',
                            fontWeight: 700,
                            color: '#34d399'
                          }}>
                            {newsletter.opensCount}
                          </div>
                          <div style={{
                            fontSize: '16px',
                            fontWeight: 700,
                            color: '#3b82f6'
                          }}>
                            {newsletter.clicksCount}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* TIMELINE VIEW */}
              {viewMode === 'timeline' && (
                <div style={{ position: 'relative' }}>
                  {/* Timeline Line */}
                  <div style={{
                    position: 'absolute',
                    left: '40px',
                    top: '0',
                    bottom: '0',
                    width: '2px',
                    background: 'linear-gradient(180deg, transparent, rgba(212, 175, 55, 0.5), transparent)'
                  }} />

                  {filteredNewsletters.length === 0 ? (
                    <div style={{
                      textAlign: 'center',
                      padding: '60px',
                      color: 'rgba(255,255,255,0.5)'
                    }}>
                      Aucune newsletter trouvée
                    </div>
                  ) : (
                    filteredNewsletters.map((newsletter, index) => {
                      const colors = getStatusColor(newsletter.status);
                      const isActive = newsletter.status === 'ACTIVE';

                      return (
                        <div
                          key={newsletter.id}
                          style={{
                            position: 'relative',
                            paddingLeft: '100px',
                            marginBottom: '40px'
                          }}
                        >
                          {/* Timeline Dot */}
                          <div style={{
                            position: 'absolute',
                            left: '28px',
                            top: '24px',
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: isActive
                              ? 'linear-gradient(135deg, #34d399 0%, #10b981 100%)'
                              : colors.solid,
                            border: '4px solid rgba(10, 14, 26, 1)',
                            boxShadow: isActive
                              ? '0 0 20px rgba(52, 211, 153, 0.6)'
                              : `0 0 12px ${colors.solid}`,
                            zIndex: 1
                          }} />

                          {/* Content Card */}
                          <div
                            onClick={() => viewNewsletter(newsletter)}
                            style={{
                              background: colors.bg,
                              border: `2px solid ${colors.border}`,
                              borderRadius: '16px',
                              padding: '24px',
                              cursor: 'pointer',
                              transition: 'all 0.3s',
                              boxShadow: isActive ? '0 0 24px rgba(52, 211, 153, 0.2)' : 'none'
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.transform = 'translateX(8px)';
                              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.transform = 'translateX(0)';
                              e.currentTarget.style.boxShadow = isActive
                                ? '0 0 24px rgba(52, 211, 153, 0.2)'
                                : 'none';
                            }}
                          >
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
                              marginBottom: '16px'
                            }}>
                              <div>
                                <div style={{
                                  display: 'inline-block',
                                  background: colors.bg,
                                  border: `2px solid ${colors.border}`,
                                  borderRadius: '8px',
                                  padding: '6px 16px',
                                  fontSize: '12px',
                                  fontWeight: 700,
                                  color: colors.text,
                                  marginBottom: '12px'
                                }}>
                                  {getStatusLabel(newsletter.status)}
                                </div>
                                <h3 style={{
                                  fontSize: '20px',
                                  fontWeight: 700,
                                  color: '#fff',
                                  marginBottom: '8px'
                                }}>
                                  {newsletter.subject}
                                </h3>
                                <div style={{
                                  fontSize: '13px',
                                  color: 'rgba(255,255,255,0.6)'
                                }}>
                                  📅 Semaine {newsletter.weekNumber} •{' '}
                                  {new Date(newsletter.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                                  {' → '}
                                  {new Date(newsletter.endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </div>
                              </div>

                              <div style={{
                                fontSize: '32px',
                                fontWeight: 900,
                                color: isActive ? '#34d399' : 'rgba(212, 175, 55, 0.3)',
                                lineHeight: 1
                              }}>
                                #{newsletter.weekNumber}
                              </div>
                            </div>

                            <div style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(3, 1fr)',
                              gap: '16px',
                              paddingTop: '16px',
                              borderTop: '1px solid rgba(255,255,255,0.1)'
                            }}>
                              <div>
                                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>
                                  👥 Destinataires
                                </div>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: '#fff' }}>
                                  {newsletter.recipientsCount}
                                </div>
                              </div>
                              <div>
                                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>
                                  📧 Ouvertures
                                </div>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: '#34d399' }}>
                                  {newsletter.opensCount}
                                </div>
                              </div>
                              <div>
                                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>
                                  🔗 Clics
                                </div>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: '#3b82f6' }}>
                                  {newsletter.clicksCount}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
