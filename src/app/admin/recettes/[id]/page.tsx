'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import { useSidebar } from '@/components/admin/SidebarContext';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditRecipePage() {
  const { sidebarWidth } = useSidebar();
  const router = useRouter();
  const params = useParams();
  const recipeId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('INTERMEDIAIRE');
  const [prepTime, setPrepTime] = useState('15');
  const [cookTime, setCookTime] = useState('30');
  const [servings, setServings] = useState('4');
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [steps, setSteps] = useState<{ title: string; description: string }[]>([
    { title: '', description: '' }
  ]);
  const [visibility, setVisibility] = useState('FREE');
  const [status, setStatus] = useState('DRAFT');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchRecipe();
  }, [recipeId]);

  const fetchRecipe = async () => {
    try {
      const response = await fetch(`/api/admin/recipes/${recipeId}`);
      const data = await response.json();

      if (data.success) {
        const recipe = data.recipe;
        setTitle(recipe.title);
        setDescription(recipe.description || '');
        setImageUrl(recipe.imageUrl || '');
        setCategory(Array.isArray(recipe.category) ? recipe.category.join(', ') : '');
        setDifficulty(recipe.difficulty);
        setPrepTime(String(recipe.prepTime));
        setCookTime(String(recipe.cookTime));
        setServings(String(recipe.servings));
        setIngredients(Array.isArray(recipe.ingredients) ? recipe.ingredients : ['']);
        setSteps(Array.isArray(recipe.steps) && recipe.steps.length > 0
          ? recipe.steps
          : [{ title: '', description: '' }]
        );
        setVisibility(recipe.visibility);
        setStatus(recipe.status);
      }
    } catch (error) {
      console.error('Error fetching recipe:', error);
      alert('Erreur lors du chargement de la recette');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setImageUrl(data.url);
      } else {
        alert('Erreur lors de l\'upload de l\'image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Erreur lors de l\'upload');
    } finally {
      setUploading(false);
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const addStep = () => {
    setSteps([...steps, { title: '', description: '' }]);
  };

  const updateStep = (index: number, field: 'title' | 'description', value: string) => {
    const newSteps = [...steps];
    newSteps[index][field] = value;
    setSteps(newSteps);
  };

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleSubmit = async (newStatus: 'DRAFT' | 'PUBLISHED') => {
    if (!title || !description || !imageUrl) {
      alert('Merci de remplir au moins le titre, la description et l\'image');
      return;
    }

    const filteredIngredients = ingredients.filter(i => i.trim() !== '');
    const filteredSteps = steps.filter(s => s.description.trim() !== '');

    if (filteredIngredients.length === 0 || filteredSteps.length === 0) {
      alert('Merci d\'ajouter au moins un ingrédient et une étape');
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`/api/admin/recipes/${recipeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          category: category.split(',').map(c => c.trim()).filter(Boolean),
          difficulty,
          prepTime,
          cookTime,
          servings,
          ingredients: filteredIngredients,
          steps: filteredSteps,
          visibility,
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(`✅ Recette mise à jour !`);
        router.push('/admin/recettes');
      } else {
        alert(`❌ Erreur: ${data.error}`);
      }
    } catch (error) {
      console.error('Error updating recipe:', error);
      alert('❌ Erreur lors de la mise à jour');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #0a0e1a 0%, #0f1b2e 100%)' }}>
        <AdminSidebar />
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff'
        }}>
          Chargement...
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
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
            Modifier la Recette
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
            Modifie les informations de ta recette
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
          {/* Image Upload */}
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
              color: '#D4AF37',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Image de la recette *
            </label>

            {imageUrl ? (
              <div style={{ position: 'relative' }}>
                <img
                  src={imageUrl}
                  alt="Preview"
                  style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px' }}
                />
                <button
                  onClick={() => setImageUrl('')}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(0,0,0,0.8)',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 600
                  }}
                >
                  Changer
                </button>
              </div>
            ) : (
              <label style={{
                display: 'block',
                padding: '60px',
                border: '2px dashed rgba(212, 175, 55, 0.3)',
                borderRadius: '12px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                  disabled={uploading}
                />
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📸</div>
                <div style={{ color: '#D4AF37', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                  {uploading ? 'Upload en cours...' : 'Cliquer pour uploader une image'}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>
                  JPG, PNG jusqu'à 10MB
                </div>
              </label>
            )}
          </div>

          {/* Infos de base */}
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
              color: '#D4AF37',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Titre de la recette *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Carbonara Traditionnelle"
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '16px',
                outline: 'none',
                marginBottom: '20px'
              }}
            />

            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 600,
              color: '#D4AF37',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Une description alléchante de ta recette..."
              rows={4}
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

          {/* Catégorie & Détails */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '30px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.6)',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Catégories
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Italien, Plat Principal"
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.6)',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Difficulté
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="DEBUTANT">Débutant</option>
                  <option value="INTERMEDIAIRE">Intermédiaire</option>
                  <option value="EXPERT">Expert</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.6)',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Préparation (min)
                </label>
                <input
                  type="number"
                  value={prepTime}
                  onChange={(e) => setPrepTime(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.6)',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Cuisson (min)
                </label>
                <input
                  type="number"
                  value={cookTime}
                  onChange={(e) => setCookTime(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.6)',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Portions
                </label>
                <input
                  type="number"
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.6)',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Visibilité
                </label>
                <select
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="FREE">✨ Gratuit</option>
                  <option value="PREMIUM">⭐ Premium</option>
                </select>
              </div>
            </div>
          </div>

          {/* Ingrédients */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '30px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <label style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#D4AF37',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Ingrédients *
              </label>
              <button
                onClick={addIngredient}
                style={{
                  background: 'rgba(212, 175, 55, 0.2)',
                  border: '1px solid #D4AF37',
                  borderRadius: '8px',
                  color: '#D4AF37',
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                + Ajouter
              </button>
            </div>

            {ingredients.map((ingredient, index) => (
              <div key={index} style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                  placeholder="400g de spaghetti..."
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                {ingredients.length > 1 && (
                  <button
                    onClick={() => removeIngredient(index)}
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '8px',
                      color: '#ef4444',
                      padding: '12px 16px',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Étapes */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '30px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <label style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#D4AF37',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Étapes de préparation *
              </label>
              <button
                onClick={addStep}
                style={{
                  background: 'rgba(212, 175, 55, 0.2)',
                  border: '1px solid #D4AF37',
                  borderRadius: '8px',
                  color: '#D4AF37',
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                + Ajouter une étape
              </button>
            </div>

            {steps.map((step, index) => (
              <div key={index} style={{
                background: 'rgba(255,255,255,0.03)',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '16px',
                position: 'relative'
              }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 900,
                  color: '#D4AF37',
                  marginBottom: '12px',
                  opacity: 0.5
                }}>
                  Étape {index + 1}
                </div>

                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => updateStep(index, 'title', e.target.value)}
                  placeholder="Titre de l'étape (optionnel)"
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                    marginBottom: '12px'
                  }}
                />

                <textarea
                  value={step.description}
                  onChange={(e) => updateStep(index, 'description', e.target.value)}
                  placeholder="Description détaillée de l'étape..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                    lineHeight: 1.6,
                    resize: 'vertical'
                  }}
                />

                {steps.length > 1 && (
                  <button
                    onClick={() => removeStep(index)}
                    style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '8px',
                      color: '#ef4444',
                      padding: '8px 12px',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              onClick={() => router.push('/admin/recettes')}
              disabled={saving}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '12px',
                color: '#fff',
                padding: '14px 28px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: saving ? 'not-allowed' : 'pointer',
                opacity: saving ? 0.5 : 1
              }}
            >
              Annuler
            </button>
            <button
              onClick={() => handleSubmit('DRAFT')}
              disabled={saving}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '12px',
                color: '#fff',
                padding: '14px 28px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: saving ? 'not-allowed' : 'pointer',
                opacity: saving ? 0.5 : 1
              }}
            >
              Sauvegarder en brouillon
            </button>
            <button
              onClick={() => handleSubmit('PUBLISHED')}
              disabled={saving}
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #C77A4E 100%)',
                border: 'none',
                borderRadius: '12px',
                color: '#000',
                padding: '14px 28px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: saving ? 'not-allowed' : 'pointer',
                opacity: saving ? 0.5 : 1,
                boxShadow: '0 4px 16px rgba(212, 175, 55, 0.3)'
              }}
            >
              {saving ? 'Sauvegarde...' : 'Mettre à jour'}
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
