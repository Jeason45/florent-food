"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Send, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Une erreur est survenue');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Impossible d\'envoyer le message. Réessaye plus tard.'
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-test-4.jpg"
          alt="Background"
          fill
          priority
          quality={75}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Bouton retour */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
        style={{
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <ArrowLeft size={20} className="text-white" />
      </Link>

      {/* Contenu centré */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20 relative z-10">
        <div className="w-full max-w-[500px]">

          {/* Card avec backdrop blur */}
          <div
            className="backdrop-blur-xl rounded-3xl border border-white/10"
            style={{
              background: 'rgba(107, 93, 82, 0.5)',
              padding: 'clamp(24px, 5vw, 40px)',
            }}
          >
            {status === 'success' ? (
              <div className="text-center py-6">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                  <CheckCircle size={40} className="text-[#D4AF37]" />
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-semibold mb-3"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: '#fff' }}
                >
                  Message envoyé !
                </h2>
                <p className="text-white/70 text-base font-light mb-8">
                  Merci pour ton message. Je te répondrai très bientôt.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-8 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)',
                  }}
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <>
                {/* Titre */}
                <div className="text-center mb-8">
                  <h1
                    className="text-3xl sm:text-4xl font-semibold leading-tight"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: '#fff' }}
                  >
                    Une question ?
                  </h1>
                  <p className="text-white/60 text-sm mt-2">
                    Je te réponds dans les plus brefs délais
                  </p>
                </div>

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Nom */}
                  <div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={status === 'loading'}
                      placeholder="Ton nom"
                      className="w-full rounded-full bg-transparent text-white placeholder-white/40 focus:outline-none focus:placeholder-white/60 transition-all disabled:opacity-50"
                      style={{
                        background: 'rgba(0, 0, 0, 0.35)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2), 0 0 20px rgba(212, 175, 55, 0.1)',
                        padding: '14px 20px',
                        fontSize: '14px',
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={status === 'loading'}
                      placeholder="Ton email"
                      className="w-full rounded-full bg-transparent text-white placeholder-white/40 focus:outline-none focus:placeholder-white/60 transition-all disabled:opacity-50"
                      style={{
                        background: 'rgba(0, 0, 0, 0.35)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2), 0 0 20px rgba(212, 175, 55, 0.1)',
                        padding: '14px 20px',
                        fontSize: '14px',
                      }}
                    />
                  </div>

                  {/* Objet - Select */}
                  <div>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      disabled={status === 'loading'}
                      className="w-full rounded-full text-white focus:outline-none transition-all disabled:opacity-50 appearance-none cursor-pointer"
                      style={{
                        background: 'rgba(0, 0, 0, 0.35)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2), 0 0 20px rgba(212, 175, 55, 0.1)',
                        padding: '14px 20px',
                        fontSize: '14px',
                        color: formData.subject ? '#fff' : 'rgba(255,255,255,0.4)',
                      }}
                    >
                      <option value="" disabled style={{ background: '#1a1a1a', color: 'rgba(255,255,255,0.4)' }}>
                        Choisir un sujet
                      </option>
                      <option value="question" style={{ background: '#1a1a1a', color: '#fff' }}>Question</option>
                      <option value="suggestion" style={{ background: '#1a1a1a', color: '#fff' }}>Suggestion</option>
                      <option value="collaboration" style={{ background: '#1a1a1a', color: '#fff' }}>Collaboration</option>
                      <option value="bug" style={{ background: '#1a1a1a', color: '#fff' }}>Bug / Problème technique</option>
                      <option value="autre" style={{ background: '#1a1a1a', color: '#fff' }}>Autre</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={status === 'loading'}
                      rows={4}
                      placeholder="Ton message..."
                      className="w-full bg-transparent text-white placeholder-white/40 focus:outline-none focus:placeholder-white/60 transition-all resize-none disabled:opacity-50"
                      style={{
                        background: 'rgba(0, 0, 0, 0.35)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2), 0 0 20px rgba(212, 175, 55, 0.1)',
                        padding: '14px 20px',
                        fontSize: '14px',
                        borderRadius: '20px',
                      }}
                    />
                  </div>

                  {/* Erreur */}
                  {status === 'error' && (
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                      <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
                      <p className="text-red-300 text-sm">{errorMessage}</p>
                    </div>
                  )}

                  {/* Bouton */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group w-full rounded-full text-white font-semibold transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 50%, #D4AF37 100%)',
                      backgroundSize: '200% 200%',
                      padding: '14px 24px',
                      fontSize: '13px',
                      letterSpacing: '0.03em',
                      textTransform: 'uppercase',
                      boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)',
                      cursor: status === 'loading' ? 'wait' : 'pointer',
                    }}
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Envoi...
                      </>
                    ) : (
                      <>
                        Envoyer
                        <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
