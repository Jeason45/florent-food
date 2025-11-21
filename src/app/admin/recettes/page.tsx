'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import { useSidebar } from '@/components/admin/SidebarContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Recipe {
  id: string;
  title: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  difficulty: string;
  prepTime: number;
  cookTime: number;
  totalTime: number;
  visibility: string;
  status: string;
  category: string[];
  publishedAt: string | null;
  viewsCount: number;
  favoritesCount: number;
  createdAt: string;
}

export default function RecettesAdminPage() {
  const { sidebarWidth } = useSidebar();
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'PUBLISHED' | 'DRAFT'>('all');

  useEffect(() => {
    fetchRecipes();
  }, [filter]);

  const fetchRecipes = async () => {
    try {
      const url = filter === 'all'
        ? '/api/admin/recipes'
        : `/api/admin/recipes?status=${filter}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setRecipes(data.recipes);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) return;

    try {
      const response = await fetch(`/api/admin/recipes?id=${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        fetchRecipes();
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const filteredRecipes = recipes;

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
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
              Gestion des Recettes
            </h1>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
              {recipes.length} recette{recipes.length > 1 ? 's' : ''} au total
            </p>
          </div>

          <button
            onClick={() => router.push('/admin/recettes/new')}
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #C77A4E 100%)',
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
              boxShadow: '0 4px 16px rgba(212, 175, 55, 0.3)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(212, 175, 55, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(212, 175, 55, 0.3)';
            }}
          >
            <span style={{ fontSize: '18px' }}>+</span>
            Nouvelle Recette
          </button>
        </div>

        {/* Filters */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px'
        }}>
          {['all', 'PUBLISHED', 'DRAFT'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              style={{
                padding: '10px 20px',
                background: filter === f
                  ? 'rgba(212, 175, 55, 0.2)'
                  : 'rgba(255,255,255,0.05)',
                border: filter === f
                  ? '2px solid #D4AF37'
                  : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                color: filter === f ? '#D4AF37' : 'rgba(255,255,255,0.7)',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {f === 'all' ? 'Toutes' : f === 'PUBLISHED' ? 'Publiées' : 'Brouillons'}
            </button>
          ))}
        </div>

        {/* Recipes Grid */}
        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '60px',
            color: 'rgba(255,255,255,0.6)'
          }}>
            Chargement...
          </div>
        ) : filteredRecipes.length === 0 ? (
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '80px 40px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>🍳</div>
            <h2 style={{ fontSize: '24px', color: '#fff', marginBottom: '16px', fontWeight: 700 }}>
              Aucune recette
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', marginBottom: '32px' }}>
              Créez votre première recette pour commencer
            </p>
            <button
              onClick={() => router.push('/admin/recettes/new')}
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #C77A4E 100%)',
                border: 'none',
                borderRadius: '12px',
                color: '#000',
                padding: '16px 32px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Créer ma première recette
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  overflow: 'hidden',
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                {recipe.imageUrl && (
                  <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      display: 'flex',
                      gap: '8px'
                    }}>
                      {recipe.status === 'PUBLISHED' && (
                        <div style={{
                          background: '#10b981',
                          padding: '4px 12px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#fff'
                        }}>
                          Publié
                        </div>
                      )}
                      {recipe.visibility === 'PREMIUM' && (
                        <div style={{
                          background: '#D4AF37',
                          padding: '4px 12px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#000'
                        }}>
                          ⭐ Premium
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div style={{ padding: '20px' }}>
                  <h3 style={{
                    color: '#fff',
                    fontSize: '18px',
                    fontWeight: 700,
                    marginBottom: '8px',
                    lineHeight: 1.3
                  }}>
                    {recipe.title}
                  </h3>
                  <p style={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '13px',
                    lineHeight: 1.5,
                    marginBottom: '16px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {recipe.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.5)',
                    marginBottom: '16px'
                  }}>
                    <span>⏱️ {recipe.totalTime}min</span>
                    <span>📊 {recipe.difficulty}</span>
                    <span>👁️ {recipe.viewsCount}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '8px'
                  }}>
                    <button
                      onClick={() => router.push(`/admin/recettes/${recipe.id}`)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        background: 'rgba(212, 175, 55, 0.2)',
                        border: '1px solid #D4AF37',
                        borderRadius: '8px',
                        color: '#D4AF37',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Modifier
                    </button>
                    {recipe.status === 'PUBLISHED' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`/recettes/${recipe.slug}`, '_blank');
                        }}
                        style={{
                          padding: '10px 16px',
                          background: 'rgba(59, 130, 246, 0.1)',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          borderRadius: '8px',
                          color: '#3b82f6',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                        title="Prévisualiser"
                      >
                        👁️
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(recipe.id);
                      }}
                      style={{
                        padding: '10px 16px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '8px',
                        color: '#ef4444',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
