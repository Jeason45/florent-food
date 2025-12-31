'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import { useSidebar } from '@/components/admin/SidebarContext';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface Settings {
  hero_image?: {
    value: string;
    type: string;
    label: string | null;
  };
}

export default function ParametresPage() {
  const { sidebarWidth } = useSidebar();
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Image hero par défaut (fallback)
  const defaultHeroImage = '/hero-test-4.jpg';

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      const data = await res.json();
      setSettings(data);
      if (data.hero_image?.value) {
        setPreviewUrl(data.hero_image.value);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Veuillez sélectionner une image' });
      return;
    }

    // Vérifier la taille (max 20MB - sera compressée automatiquement)
    if (file.size > 20 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'L\'image ne doit pas dépasser 20MB' });
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      // Upload vers Cloudinary via l'API avec optimisation automatique
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'hero'); // Type hero = optimisation pour images grand format

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadData.success) {
        throw new Error(uploadData.error || 'Erreur lors de l\'upload');
      }

      // Afficher les infos d'optimisation
      const originalSizeMB = (uploadData.originalSize / (1024 * 1024)).toFixed(2);
      console.log(`Image uploadée: ${originalSizeMB}MB (optimisée automatiquement)`);


      // Prévisualiser l'image
      setPreviewUrl(uploadData.url);

      // Sauvegarder le paramètre
      setSaving(true);
      const saveRes = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'hero_image',
          value: uploadData.url,
          type: 'image',
          label: 'Image Hero'
        }),
      });

      const saveData = await saveRes.json();

      if (!saveData.success) {
        throw new Error(saveData.error || 'Erreur lors de la sauvegarde');
      }

      setSettings(prev => ({
        ...prev,
        hero_image: {
          value: uploadData.url,
          type: 'image',
          label: 'Image Hero'
        }
      }));

      setMessage({ type: 'success', text: 'Image mise à jour et optimisée automatiquement !' });
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Erreur lors de l\'upload'
      });
    } finally {
      setUploading(false);
      setSaving(false);
    }
  };

  const handleResetToDefault = async () => {
    if (!confirm('Voulez-vous vraiment réinitialiser l\'image hero par défaut ?')) return;

    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'hero_image',
          value: '',
          type: 'image',
          label: 'Image Hero'
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      setPreviewUrl(null);
      setSettings(prev => {
        const newSettings = { ...prev };
        delete newSettings.hero_image;
        return newSettings;
      });

      setMessage({ type: 'success', text: 'Image réinitialisée par défaut' });
    } catch (error) {
      console.error('Error resetting image:', error);
      setMessage({
        type: 'error',
        text: 'Erreur lors de la réinitialisation'
      });
    } finally {
      setSaving(false);
    }
  };

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
          gap: '12px',
          marginBottom: '40px'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
            boxShadow: '0 0 12px rgba(168, 85, 247, 0.4)'
          }} />
          <div style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.3) 0%, transparent 100%)'
          }} />
          <span style={{
            fontSize: '10px',
            color: 'rgba(255,255,255,0.4)',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase'
          }}>
            Paramètres du site
          </span>
        </div>

        {loading ? (
          <div style={{ color: '#fff', fontSize: '18px' }}>Chargement...</div>
        ) : (
          <div style={{ maxWidth: '900px' }}>
            {/* Section Image Hero */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0.05) 100%)',
              padding: '32px',
              borderRadius: '16px',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(168, 85, 247, 0.3)',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <div>
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#a855f7',
                    margin: 0
                  }}>
                    Image Hero
                  </h2>
                  <p style={{
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.5)',
                    margin: '4px 0 0 0'
                  }}>
                    Image d'arrière-plan de la section principale du site
                  </p>
                </div>
              </div>

              {/* Message de feedback */}
              {message && (
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  backgroundColor: message.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                  border: `1px solid ${message.type === 'success' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
                  color: message.type === 'success' ? '#10b981' : '#ef4444',
                  fontSize: '14px'
                }}>
                  {message.text}
                </div>
              )}

              {/* Prévisualisation */}
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9',
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '20px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <Image
                  src={previewUrl || defaultHeroImage}
                  alt="Hero preview"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
                {!previewUrl && (
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '12px'
                  }}>
                    Image par défaut
                  </div>
                )}
                {(uploading || saving) && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '16px'
                  }}>
                    {uploading ? 'Upload en cours...' : 'Sauvegarde...'}
                  </div>
                )}
              </div>

              {/* Boutons d'action */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading || saving}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: uploading || saving ? 'not-allowed' : 'pointer',
                    opacity: uploading || saving ? 0.6 : 1,
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  Changer l'image
                </button>

                {previewUrl && (
                  <button
                    onClick={handleResetToDefault}
                    disabled={uploading || saving}
                    style={{
                      padding: '12px 24px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: 'rgba(255,255,255,0.05)',
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '14px',
                      fontWeight: 500,
                      cursor: uploading || saving ? 'not-allowed' : 'pointer',
                      opacity: uploading || saving ? 0.6 : 1,
                      transition: 'all 0.2s'
                    }}
                  >
                    Réinitialiser par défaut
                  </button>
                )}
              </div>

              <p style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.4)',
                marginTop: '16px',
                lineHeight: 1.5
              }}>
                Formats acceptés : JPG, PNG, WebP. Taille maximale : 20MB.
                <br />
                L'image sera automatiquement optimisée (max 1920px, compression qualité).
                <br />
                Dimensions recommandées : 1920x1080px ou plus (ratio 16:9).
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
