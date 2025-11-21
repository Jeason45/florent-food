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
  category: string[];
}

export default function NewNewsletterPage() {
  const { sidebarWidth } = useSidebar();
  const router = useRouter();
  const [subject, setSubject] = useState('');
  const [introMessage, setIntroMessage] = useState('');
  const [tipOfWeek, setTipOfWeek] = useState('');
  const [sendTo, setSendTo] = useState('ALL');
  const [showPreview, setShowPreview] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [featuredRecipeId, setFeaturedRecipeId] = useState('');
  const [secondaryRecipe1Id, setSecondaryRecipe1Id] = useState('');
  const [secondaryRecipe2Id, setSecondaryRecipe2Id] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('/api/admin/recipes?status=PUBLISHED');
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

  const getRecipeById = (id: string) => recipes.find(r => r.id === id);

  const handlePreview = () => {
    if (!subject || !introMessage || !featuredRecipeId) {
      alert('Merci de remplir au moins le sujet, le message d\'intro et la recette principale');
      return;
    }
    setShowPreview(true);
  };

  const generatePreviewHTML = () => {
    const featuredRecipe = getRecipeById(featuredRecipeId);
    const secondaryRecipes = [
      getRecipeById(secondaryRecipe1Id),
      getRecipeById(secondaryRecipe2Id)
    ].filter(Boolean);

    if (!featuredRecipe) return '';

    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3001';
    const dateString = new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const secondaryRecipesHTML = secondaryRecipes.map(recipe => `
      <td style="width: 50%; padding: 0;">
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

    const premiumCTAHTML = sendTo !== 'PREMIUM' ? `
      <tr>
        <td style="background: linear-gradient(135deg, #D4AF37 0%, #C77A4E 100%); padding: 70px 60px; text-align: center;">
          <div style="display: inline-block; background: #000; color: #D4AF37; padding: 8px 24px; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 30px; font-weight: 700;">
            Exclusif Premium
          </div>
          <h3 style="font-size: 42px; color: #000; font-weight: 900; margin-bottom: 20px; text-transform: uppercase; letter-spacing: -1px;">
            Rejoignez<br>l'Élite Culinaire
          </h3>
          <p style="font-size: 16px; color: rgba(0,0,0,0.8); line-height: 1.6; margin-bottom: 40px; max-width: 500px; margin-left: auto; margin-right: auto;">
            Accédez à notre bibliothèque complète de recettes d'exception,
            masterclass en vidéo HD, et techniques de chef. Une expérience
            gastronomique sans compromis.
          </p>
          <a href="${baseUrl}/premium" style="display: inline-block; background: #000; color: #D4AF37; padding: 18px 50px; text-decoration: none; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700;">
            Devenir Membre Premium
          </a>
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
    <!-- Hero -->
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
            Trois Recettes Exclusives
          </div>
        </div>
      </td>
    </tr>

    <!-- Intro -->
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

    <!-- Featured Recipe -->
    <tr>
      <td style="background: #000; padding: 0; position: relative;">
        <div style="position: relative;">
          <img src="${featuredRecipe.imageUrl || ''}" alt="${featuredRecipe.title}" style="width: 100%; height: 450px; object-fit: cover; display: block;">
          <div style="padding: 50px; background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 100%); position: absolute; bottom: 0; left: 0; right: 0;">
            <div style="font-size: 80px; font-weight: 900; color: #D4AF37; line-height: 1; margin-bottom: 10px; opacity: 0.3;">
              01
            </div>
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
    <!-- Grid Recipes -->
    <tr>
      <td>
        <table width="100%" cellpadding="0" cellspacing="2" border="0" style="background: #000;">
          <tr>
            ${secondaryRecipesHTML}
          </tr>
        </table>
      </td>
    </tr>
    ` : ''}

    ${quoteHTML}

    ${premiumCTAHTML}

    <!-- Footer -->
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

  const handleSend = async () => {
    // Validation
    if (!subject || !introMessage) {
      alert('Merci de remplir au moins le sujet et le message d\'intro');
      return;
    }

    if (!featuredRecipeId) {
      alert('Merci de sélectionner au moins la recette principale');
      return;
    }

    const confirmed = confirm(`Êtes-vous sûr de vouloir envoyer cette newsletter maintenant ?\n\nCible: ${sendTo === 'ALL' ? 'Tous les abonnés' : sendTo === 'FREE' ? 'Abonnés gratuits' : 'Abonnés premium'}`);
    if (!confirmed) return;

    try {
      const response = await fetch('/api/admin/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          introMessage,
          featuredRecipeId,
          secondaryRecipeIds: [secondaryRecipe1Id, secondaryRecipe2Id].filter(Boolean),
          tipOfWeek,
          sendTo,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(`✅ Newsletter envoyée avec succès à ${data.recipientsCount} abonnés !`);
        // Rediriger vers la page de liste des newsletters
        router.push('/admin/newsletter');
      } else {
        alert(`❌ Erreur: ${data.error}`);
      }
    } catch (error) {
      console.error('Error sending newsletter:', error);
      alert('❌ Erreur lors de l\'envoi de la newsletter');
    }
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
            <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
              Nouvelle Newsletter
            </h1>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
              Template: Magazine Luxe
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handlePreview}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '10px',
                color: '#fff',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              }}
            >
              👁️ Prévisualiser
            </button>
            <button
              onClick={handleSend}
              style={{
                background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
                border: 'none',
                borderRadius: '10px',
                color: '#000',
                padding: '12px 28px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 16px rgba(52, 211, 153, 0.3)'
              }}
            >
              📤 Envoyer Maintenant
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
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '8px' }}>
              Un bon sujet augmente le taux d'ouverture de 50%
            </p>
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
              placeholder="Écris ton message perso ici... Ex: Salut la team ! Cette semaine j'ai testé 3 recettes d'automne qui déchirent..."
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

          {/* Recipes Selection */}
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
              Recettes de la Semaine
            </label>

            {/* Featured Recipe */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #C77A4E 100%)',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: 900,
                  color: '#000'
                }}>
                  1
                </div>
                <span style={{ fontSize: '14px', color: '#fff', fontWeight: 600 }}>
                  Recette Principale (Featured)
                </span>
              </div>
              <select
                value={featuredRecipeId}
                onChange={(e) => setFeaturedRecipeId(e.target.value)}
                disabled={loading}
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
              {featuredRecipeId && getRecipeById(featuredRecipeId) && (
                <div style={{
                  marginTop: '16px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '2px solid #D4AF37'
                }}>
                  <img
                    src={getRecipeById(featuredRecipeId)?.imageUrl || ''}
                    alt={getRecipeById(featuredRecipeId)?.title}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '16px' }}>
                    <h4 style={{ color: '#D4AF37', fontSize: '16px', marginBottom: '8px', fontWeight: 700 }}>
                      {getRecipeById(featuredRecipeId)?.title}
                    </h4>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', lineHeight: 1.5 }}>
                      {getRecipeById(featuredRecipeId)?.description}
                    </p>
                    <div style={{ marginTop: '12px', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                      ⏱️ {getRecipeById(featuredRecipeId)?.totalTime}min ·
                      📊 {getRecipeById(featuredRecipeId)?.difficulty}
                      {getRecipeById(featuredRecipeId)?.visibility === 'PREMIUM' && ' · ⭐ Premium'}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Secondary Recipes */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px'
              }}>
                <div style={{
                  background: 'rgba(212, 175, 55, 0.2)',
                  border: '2px solid #D4AF37',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#D4AF37'
                }}>
                  2
                </div>
                <span style={{ fontSize: '14px', color: '#fff', fontWeight: 600 }}>
                  Recette Secondaire #1
                </span>
              </div>
              <select
                value={secondaryRecipe1Id}
                onChange={(e) => setSecondaryRecipe1Id(e.target.value)}
                disabled={loading}
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
              {secondaryRecipe1Id && getRecipeById(secondaryRecipe1Id) && (
                <div style={{
                  marginTop: '16px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid rgba(212, 175, 55, 0.3)'
                }}>
                  <img
                    src={getRecipeById(secondaryRecipe1Id)?.imageUrl || ''}
                    alt={getRecipeById(secondaryRecipe1Id)?.title}
                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '12px' }}>
                    <h5 style={{ color: '#fff', fontSize: '14px', marginBottom: '4px', fontWeight: 600 }}>
                      {getRecipeById(secondaryRecipe1Id)?.title}
                    </h5>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
                      ⏱️ {getRecipeById(secondaryRecipe1Id)?.totalTime}min ·
                      📊 {getRecipeById(secondaryRecipe1Id)?.difficulty}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px'
              }}>
                <div style={{
                  background: 'rgba(212, 175, 55, 0.2)',
                  border: '2px solid #D4AF37',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#D4AF37'
                }}>
                  3
                </div>
                <span style={{ fontSize: '14px', color: '#fff', fontWeight: 600 }}>
                  Recette Secondaire #2
                </span>
              </div>
              <select
                value={secondaryRecipe2Id}
                onChange={(e) => setSecondaryRecipe2Id(e.target.value)}
                disabled={loading}
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
              {secondaryRecipe2Id && getRecipeById(secondaryRecipe2Id) && (
                <div style={{
                  marginTop: '16px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid rgba(212, 175, 55, 0.3)'
                }}>
                  <img
                    src={getRecipeById(secondaryRecipe2Id)?.imageUrl || ''}
                    alt={getRecipeById(secondaryRecipe2Id)?.title}
                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '12px' }}>
                    <h5 style={{ color: '#fff', fontSize: '14px', marginBottom: '4px', fontWeight: 600 }}>
                      {getRecipeById(secondaryRecipe2Id)?.title}
                    </h5>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
                      ⏱️ {getRecipeById(secondaryRecipe2Id)?.totalTime}min ·
                      📊 {getRecipeById(secondaryRecipe2Id)?.difficulty}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <p style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.4)',
              marginTop: '16px',
              padding: '12px',
              background: 'rgba(52, 211, 153, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(52, 211, 153, 0.2)'
            }}>
              💡 {loading ? 'Chargement des recettes...' : `${recipes.length} recettes publiées disponibles`}
            </p>
          </div>

          {/* Tip of the Week */}
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

          {/* Send Options */}
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
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
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
