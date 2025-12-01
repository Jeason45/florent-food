'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useSidebar } from '@/components/admin/SidebarContext';
import { ArrowLeft, Send } from 'lucide-react';

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
  category: string[];
}

interface Newsletter {
  id: string;
  subject: string;
  content: {
    introMessage?: string;
    recipeIds?: string[];
    tipOfWeek?: string;
    sendTo?: string;
    html?: string;
  };
  status: string;
  startDate: string;
  endDate: string;
  weekNumber: number;
  sentAt: string | null;
  recipientsCount: number;
  opensCount: number;
  clicksCount: number;
}

export default function EditNewsletterPage() {
  const params = useParams();
  const router = useRouter();
  const newsletterId = params.id as string;
  const { sidebarWidth } = useSidebar();

  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  // Form state
  const [subject, setSubject] = useState('');
  const [introMessage, setIntroMessage] = useState('');
  const [tipOfWeek, setTipOfWeek] = useState('');
  const [sendTo, setSendTo] = useState('ALL');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedRecipes, setSelectedRecipes] = useState<Array<{ id: string; recipeId: string }>>([]);

  useEffect(() => {
    fetchNewsletter();
    fetchRecipes();
  }, [newsletterId]);

  const fetchNewsletter = async () => {
    try {
      const response = await fetch(`/api/admin/newsletter/${newsletterId}`);
      const data = await response.json();
      if (data.success && data.newsletter) {
        const nl = data.newsletter;
        setNewsletter(nl);
        setSubject(nl.subject || '');
        setIntroMessage(nl.content?.introMessage || '');
        setTipOfWeek(nl.content?.tipOfWeek || '');
        setSendTo(nl.content?.sendTo || 'ALL');
        setStartDate(nl.startDate ? new Date(nl.startDate).toISOString().split('T')[0] : '');
        setEndDate(nl.endDate ? new Date(nl.endDate).toISOString().split('T')[0] : '');

        // Initialiser les recettes sélectionnées
        const recipeIds = nl.content?.recipeIds || [];
        if (recipeIds.length > 0) {
          setSelectedRecipes(recipeIds.map((id: string, index: number) => ({
            id: (index + 1).toString(),
            recipeId: id
          })));
        } else {
          setSelectedRecipes([{ id: '1', recipeId: '' }]);
        }
      }
    } catch (error) {
      console.error('Error fetching newsletter:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipes = async () => {
    try {
      const response = await fetch('/api/admin/recipes?status=PUBLISHED');
      const data = await response.json();
      if (data.success) {
        setRecipes(data.recipes);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const getRecipeById = (id: string) => recipes.find(r => r.id === id);

  const addRecipe = () => {
    const newId = (selectedRecipes.length + 1).toString();
    setSelectedRecipes([...selectedRecipes, { id: newId, recipeId: '' }]);
  };

  const removeRecipe = (id: string) => {
    if (selectedRecipes.length <= 1) {
      alert('Vous devez avoir au moins 1 recette dans la newsletter');
      return;
    }
    setSelectedRecipes(selectedRecipes.filter(r => r.id !== id));
  };

  const updateRecipe = (id: string, recipeId: string) => {
    setSelectedRecipes(selectedRecipes.map(r =>
      r.id === id ? { ...r, recipeId } : r
    ));
  };

  const getSelectedRecipeIds = () => selectedRecipes
    .filter(r => r.recipeId)
    .map(r => r.recipeId);

  const calculateEndDate = (start: string) => {
    if (!start) return '';
    const startDateObj = new Date(start);
    const endDateObj = new Date(startDateObj);
    endDateObj.setDate(startDateObj.getDate() + 6);
    return endDateObj.toISOString().split('T')[0];
  };

  const handleStartDateChange = (date: string) => {
    setStartDate(date);
    const calculatedEnd = calculateEndDate(date);
    setEndDate(calculatedEnd);
  };

  const getWeekNumber = (date: Date): number => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  };

  const validateNewsletter = () => {
    if (!subject || !introMessage) {
      alert('Merci de remplir au moins le sujet et le message d\'intro');
      return false;
    }

    const validRecipeIds = getSelectedRecipeIds();
    if (validRecipeIds.length === 0) {
      alert('Merci de sélectionner au moins 1 recette');
      return false;
    }

    if (!startDate || !endDate) {
      alert('Merci de sélectionner les dates de la newsletter');
      return false;
    }

    return true;
  };

  const handleSave = async (newStatus?: string) => {
    if (!validateNewsletter()) return;

    setSaving(true);
    try {
      const weekNumber = getWeekNumber(new Date(startDate));
      const response = await fetch(`/api/admin/newsletter/${newsletterId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          introMessage,
          recipeIds: getSelectedRecipeIds(),
          tipOfWeek,
          sendTo,
          startDate,
          endDate,
          weekNumber,
          status: newStatus || newsletter?.status,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('✅ Newsletter mise à jour avec succès !');
        router.push('/admin/newsletter');
      } else {
        alert(`❌ Erreur: ${data.error}`);
      }
    } catch (error) {
      console.error('Error updating newsletter:', error);
      alert('❌ Erreur lors de la mise à jour');
    } finally {
      setSaving(false);
    }
  };

  const generatePreviewHTML = () => {
    const validRecipeIds = getSelectedRecipeIds();
    if (validRecipeIds.length === 0) return '';

    const selectedRecipeObjects = validRecipeIds
      .map(id => getRecipeById(id))
      .filter(Boolean) as Recipe[];

    if (selectedRecipeObjects.length === 0) return '';

    const featuredRecipe = selectedRecipeObjects[0];
    const secondaryRecipes = selectedRecipeObjects.slice(1);
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3001';
    const dateString = new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const secondaryRecipesRows: Recipe[][] = [];
    for (let i = 0; i < secondaryRecipes.length; i += 2) {
      secondaryRecipesRows.push(secondaryRecipes.slice(i, i + 2));
    }

    const secondaryRecipesHTML = secondaryRecipesRows.map(row => {
      const recipesInRow = row.map(recipe => `
        <td style="width: ${row.length === 1 ? '100%' : '50%'}; padding: 0;">
          <div style="position: relative; height: 350px; overflow: hidden;">
            <img src="${recipe?.imageUrl || ''}" alt="${recipe?.title || ''}" style="width: 100%; height: 100%; object-fit: cover;">
            <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 30px; background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 100%);">
              <h3 style="font-size: 22px; color: #fff; font-weight: 700; margin-bottom: 8px;">
                ${recipe?.title || ''}
              </h3>
              <a href="${baseUrl}/recettes/${recipe?.slug || ''}" style="color: #D4AF37; text-decoration: none; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">
                Découvrir →
              </a>
            </div>
          </div>
        </td>
      `).join('');

      return `<tr>${recipesInRow}</tr>`;
    }).join('');

    const quoteHTML = tipOfWeek ? `
      <tr>
        <td style="background: #1a1a1a; padding: 80px 60px; text-align: center;">
          <div style="font-size: 60px; color: #D4AF37; margin-bottom: 30px; opacity: 0.5;">"</div>
          <p style="font-size: 28px; color: #fff; line-height: 1.5; font-weight: 300; font-style: italic; margin-bottom: 30px;">
            ${tipOfWeek}
          </p>
          <div style="font-size: 14px; color: #D4AF37; letter-spacing: 2px; text-transform: uppercase;">
            Conseil de Florent
          </div>
        </td>
      </tr>
    ` : '';

    return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin:0; padding:0; background:#000;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:700px; margin:0 auto; background:#000;">
    <tr>
      <td style="position: relative; height: 500px; background: linear-gradient(135deg, #D4AF37 0%, #C77A4E 100%); display: flex; align-items: center; justify-content: center; text-align: center; padding: 60px 40px;">
        <div>
          <div style="font-size: 11px; letter-spacing: 3px; color: rgba(0,0,0,0.6); margin-bottom: 20px; text-transform: uppercase;">
            Édition du ${dateString}
          </div>
          <h1 style="font-size: 52px; color: #000; font-weight: 900; letter-spacing: -1px; line-height: 1.1; margin-bottom: 20px; text-transform: uppercase;">
            Saveurs<br>d'Exception
          </h1>
          <div style="font-size: 16px; color: rgba(0,0,0,0.7); letter-spacing: 1px;">
            ${selectedRecipeObjects.length === 1 ? 'Une Recette Exclusive' : `${selectedRecipeObjects.length} Recettes Exclusives`}
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <td style="background: #fff; padding: 60px 50px; border-left: 4px solid #D4AF37;">
        <p style="font-size: 20px; line-height: 1.7; color: #1a1a1a; font-weight: 300; margin: 0; white-space: pre-line;">
          ${introMessage}
        </p>
        <div style="margin-top: 30px; font-size: 14px; color: #D4AF37; font-style: italic;">
          — Florent
        </div>
      </td>
    </tr>
    <tr>
      <td style="background: #000; padding: 0; position: relative;">
        <div style="position: relative;">
          <img src="${featuredRecipe.imageUrl || ''}" alt="${featuredRecipe.title}" style="width: 100%; height: 450px; object-fit: cover; display: block;">
          <div style="padding: 50px; background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 100%); position: absolute; bottom: 0; left: 0; right: 0;">
            <div style="font-size: 80px; font-weight: 900; color: #D4AF37; line-height: 1; margin-bottom: 10px; opacity: 0.3;">01</div>
            <h2 style="font-size: 38px; color: #fff; font-weight: 700; margin-bottom: 16px; text-transform: uppercase; letter-spacing: -0.5px;">
              ${featuredRecipe.title}
            </h2>
            <p style="font-size: 16px; color: rgba(255,255,255,0.9); line-height: 1.6; margin-bottom: 24px;">
              ${featuredRecipe.description || 'Une création exceptionnelle qui va éveiller vos papilles.'}
            </p>
            <a href="${baseUrl}/recettes/${featuredRecipe.slug}" style="display: inline-block; background: #D4AF37; color: #000; padding: 14px 32px; text-decoration: none; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700;">
              Voir la Recette
            </a>
          </div>
        </div>
      </td>
    </tr>
    ${secondaryRecipes.length > 0 ? `
    <tr>
      <td>
        <table width="100%" cellpadding="0" cellspacing="2" border="0" style="background: #000;">
          ${secondaryRecipesHTML}
        </table>
      </td>
    </tr>
    ` : ''}
    ${quoteHTML}
    <tr>
      <td style="background: #000; padding: 50px; text-align: center; border-top: 1px solid #333;">
        <div style="font-size: 24px; color: #D4AF37; font-weight: 900; margin-bottom: 20px; letter-spacing: 2px;">
          FLORENT FOOD
        </div>
        <p style="font-size: 11px; color: #666; line-height: 2; letter-spacing: 1px; text-transform: uppercase; margin: 0;">
          Haute Cuisine · Paris<br>
          <a href="#" style="color: #D4AF37; text-decoration: none;">Se Désinscrire</a> ·
          <a href="#" style="color: #D4AF37; text-decoration: none;">Préférences</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();
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
          maxWidth: '1200px',
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
            <div>
              <button
                onClick={() => router.push('/admin/newsletter')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '14px',
                  cursor: 'pointer',
                  marginBottom: '12px',
                  padding: 0
                }}
              >
                <ArrowLeft size={18} />
                Retour aux newsletters
              </button>
              <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                Modifier la Newsletter
              </h1>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 600,
                  background: newsletter.status === 'ACTIVE' ? 'rgba(52, 211, 153, 0.2)' :
                              newsletter.status === 'SCHEDULED' ? 'rgba(251, 191, 36, 0.2)' :
                              'rgba(99, 102, 241, 0.2)',
                  color: newsletter.status === 'ACTIVE' ? '#34d399' :
                         newsletter.status === 'SCHEDULED' ? '#fbbf24' : '#818cf8'
                }}>
                  {newsletter.status === 'ACTIVE' && '🟢 Active'}
                  {newsletter.status === 'SCHEDULED' && '⏰ Programmée'}
                  {newsletter.status === 'DRAFT' && '📝 Brouillon'}
                  {newsletter.status === 'ARCHIVED' && '📦 Archivée'}
                </span>
                {newsletter.weekNumber && (
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
                    Semaine {newsletter.weekNumber}
                  </span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setShowPreview(true)}
                disabled={saving}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '10px',
                  color: '#fff',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: saving ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  opacity: saving ? 0.5 : 1
                }}
              >
                👁️ Prévisualiser
              </button>
              <button
                onClick={() => handleSave('DRAFT')}
                disabled={saving}
                style={{
                  background: 'rgba(99, 102, 241, 0.2)',
                  border: '1px solid rgba(99, 102, 241, 0.4)',
                  borderRadius: '10px',
                  color: '#818cf8',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: saving ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  opacity: saving ? 0.5 : 1
                }}
              >
                💾 Sauvegarder
              </button>
              {newsletter.status !== 'ACTIVE' && (
                <button
                  onClick={() => handleSave('SCHEDULED')}
                  disabled={saving}
                  style={{
                    background: 'rgba(251, 191, 36, 0.2)',
                    border: '1px solid rgba(251, 191, 36, 0.4)',
                    borderRadius: '10px',
                    color: '#fbbf24',
                    padding: '12px 24px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: saving ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s',
                    opacity: saving ? 0.5 : 1
                  }}
                >
                  📆 Programmer
                </button>
              )}
              <button
                onClick={() => handleSave('ACTIVE')}
                disabled={saving}
                style={{
                  background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#000',
                  padding: '12px 28px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: saving ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 16px rgba(52, 211, 153, 0.3)',
                  opacity: saving ? 0.5 : 1
                }}
              >
                {saving ? '⏳ Sauvegarde...' : '✅ Activer'}
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
            {/* Subject */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '30px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                color: '#34d399',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Sujet de l'email *
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Ex: 3 Recettes d'Automne qui vont te régaler 🍂"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '16px',
                  outline: 'none'
                }}
              />
            </div>

            {/* Intro Message */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '30px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                color: '#34d399',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Message d'Introduction *
              </label>
              <textarea
                value={introMessage}
                onChange={(e) => setIntroMessage(e.target.value)}
                placeholder="Écris ton message perso ici..."
                rows={5}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '15px',
                  outline: 'none',
                  lineHeight: 1.6,
                  resize: 'vertical'
                }}
              />
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '8px' }}>
                {introMessage.length} caractères · Recommandé: 150-250
              </p>
            </div>

            {/* Dates */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '30px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                color: '#34d399',
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                📅 Période de la Newsletter *
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '16px', alignItems: 'end' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.7)',
                    marginBottom: '8px',
                    fontWeight: 500
                  }}>
                    Date de début
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => handleStartDateChange(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '15px',
                      outline: 'none',
                      colorScheme: 'dark'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.7)',
                    marginBottom: '8px',
                    fontWeight: 500
                  }}>
                    Date de fin
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    readOnly
                    disabled
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: '10px',
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: '15px',
                      outline: 'none',
                      cursor: 'not-allowed',
                      colorScheme: 'dark'
                    }}
                  />
                </div>

                {startDate && (
                  <div style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #C77A4E 100%)',
                    padding: '14px 20px',
                    borderRadius: '10px',
                    textAlign: 'center',
                    minWidth: '120px'
                  }}>
                    <div style={{
                      fontSize: '11px',
                      color: 'rgba(0,0,0,0.7)',
                      marginBottom: '2px',
                      fontWeight: 600,
                      letterSpacing: '0.5px'
                    }}>
                      SEMAINE
                    </div>
                    <div style={{
                      fontSize: '24px',
                      color: '#000',
                      fontWeight: 900,
                      lineHeight: 1
                    }}>
                      {getWeekNumber(new Date(startDate))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Recipes Selection */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '30px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <label style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#34d399',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Recettes de la Newsletter
                </label>
                <span style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.5)',
                  background: 'rgba(255,255,255,0.05)',
                  padding: '6px 12px',
                  borderRadius: '6px'
                }}>
                  {getSelectedRecipeIds().length} sélectionnées
                </span>
              </div>

              {selectedRecipes.map((recipeSlot, index) => {
                const selectedRecipe = recipeSlot.recipeId ? getRecipeById(recipeSlot.recipeId) : null;
                const isFirst = index === 0;

                return (
                  <div key={recipeSlot.id} style={{ marginBottom: '20px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '12px'
                    }}>
                      <div style={{
                        background: isFirst
                          ? 'linear-gradient(135deg, #D4AF37 0%, #C77A4E 100%)'
                          : 'rgba(212, 175, 55, 0.2)',
                        border: isFirst ? 'none' : '2px solid #D4AF37',
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: isFirst ? '16px' : '14px',
                        fontWeight: isFirst ? 900 : 700,
                        color: isFirst ? '#000' : '#D4AF37'
                      }}>
                        {index + 1}
                      </div>
                      <span style={{ fontSize: '14px', color: '#fff', fontWeight: 600, flex: 1 }}>
                        {isFirst ? 'Recette Principale' : `Recette #${index + 1}`}
                      </span>
                      {selectedRecipes.length > 1 && (
                        <button
                          onClick={() => removeRecipe(recipeSlot.id)}
                          style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: '6px',
                            color: '#ef4444',
                            padding: '6px 12px',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          ✕ Supprimer
                        </button>
                      )}
                    </div>

                    <select
                      value={recipeSlot.recipeId}
                      onChange={(e) => updateRecipe(recipeSlot.id, e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '10px',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="">Sélectionner une recette...</option>
                      {recipes.map(recipe => (
                        <option key={recipe.id} value={recipe.id}>
                          {recipe.title}
                        </option>
                      ))}
                    </select>

                    {selectedRecipe && (
                      <div style={{
                        marginTop: '16px',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: isFirst ? '2px solid #D4AF37' : '1px solid rgba(212, 175, 55, 0.3)'
                      }}>
                        <img
                          src={selectedRecipe.imageUrl || ''}
                          alt={selectedRecipe.title}
                          style={{
                            width: '100%',
                            height: isFirst ? '200px' : '150px',
                            objectFit: 'cover'
                          }}
                        />
                        <div style={{ padding: isFirst ? '16px' : '12px' }}>
                          <h4 style={{
                            color: isFirst ? '#D4AF37' : '#fff',
                            fontSize: isFirst ? '16px' : '14px',
                            marginBottom: isFirst ? '8px' : '4px',
                            fontWeight: isFirst ? 700 : 600
                          }}>
                            {selectedRecipe.title}
                          </h4>
                          <div style={{
                            fontSize: isFirst ? '12px' : '11px',
                            color: 'rgba(255,255,255,0.5)'
                          }}>
                            ⏱️ {selectedRecipe.totalTime}min · 📊 {selectedRecipe.difficulty}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              <button
                onClick={addRecipe}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'rgba(52, 211, 153, 0.1)',
                  border: '2px dashed rgba(52, 211, 153, 0.3)',
                  borderRadius: '10px',
                  color: '#34d399',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '12px'
                }}
              >
                <span style={{ fontSize: '18px' }}>+</span>
                Ajouter une recette
              </button>
            </div>

            {/* Tip of Week */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '30px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Conseil du Chef (optionnel)
              </label>
              <textarea
                value={tipOfWeek}
                onChange={(e) => setTipOfWeek(e.target.value)}
                placeholder="Partage ton meilleur conseil de la semaine..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '15px',
                  outline: 'none',
                  lineHeight: 1.6,
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Send To Options */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '30px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                color: '#34d399',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Envoyer À
              </label>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {['ALL', 'FREE', 'PREMIUM'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setSendTo(option)}
                    style={{
                      padding: '12px 24px',
                      background: sendTo === option
                        ? 'linear-gradient(135deg, #34d399 0%, #10b981 100%)'
                        : 'rgba(255,255,255,0.05)',
                      border: sendTo === option
                        ? 'none'
                        : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      color: sendTo === option ? '#000' : '#fff',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  >
                    {option === 'ALL' && '👥 Tous les abonnés'}
                    {option === 'FREE' && '📧 Gratuits uniquement'}
                    {option === 'PREMIUM' && '⭐ Premium uniquement'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Preview Modal */}
        {showPreview && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '20px'
            }}
            onClick={() => setShowPreview(false)}
          >
            <div style={{
              background: '#fff',
              borderRadius: '12px',
              width: '100%',
              maxWidth: '900px',
              maxHeight: '95vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                background: '#1a1a1a',
                padding: '20px 30px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #333'
              }}>
                <div>
                  <h3 style={{ color: '#fff', margin: 0, fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>
                    Prévisualisation
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: '13px' }}>
                    Sujet: {subject}
                  </p>
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                >
                  ×
                </button>
              </div>
              <div style={{
                flex: 1,
                overflow: 'auto',
                background: '#f5f5f5',
                padding: '20px'
              }}>
                <div
                  dangerouslySetInnerHTML={{ __html: generatePreviewHTML() }}
                  style={{ margin: '0 auto' }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
