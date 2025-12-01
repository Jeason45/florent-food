"use client";

import { useState } from 'react';
import Link from 'next/link';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: 'linear-gradient(180deg, #FFFBF7 0%, #F5EDE4 50%, #E8DFD4 100%)',
      }}
    >
      {/* Bouton retour */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 text-[#8B7355] hover:text-[#C77A4E] transition-colors duration-300"
      >
        <ArrowLeft size={20} />
        <span className="text-sm font-light">Retour</span>
      </Link>

      {/* Contenu centré */}
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <div className="w-full max-w-[600px]">

          {status === 'success' ? (
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-[#C77A4E]/10 flex items-center justify-center">
                <CheckCircle size={48} className="text-[#C77A4E]" />
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] font-light mb-4">
                Message envoyé !
              </h2>
              <p className="text-[#8B7355] text-lg font-light mb-10">
                Merci pour ton message. Je te répondrai très bientôt.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="px-8 py-4 bg-[#1a1a1a] text-white font-medium rounded-lg hover:bg-[#333] transition-all duration-300"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <>
              {/* Titre */}
              <div className="text-center mb-12">
                <h1 className="font-serif text-[56px] md:text-[72px] lg:text-[88px] text-[#1a1a1a] font-light leading-[0.95] tracking-tight">
                  Contactez-moi
                </h1>
              </div>

              {/* Formulaire */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nom */}
                <div>
                  <label htmlFor="name" className="block text-[#8B7355] text-xs font-medium uppercase tracking-wider mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                    className="w-full px-5 py-4 bg-white border-2 border-[#E8E3D5] rounded-xl text-[#1a1a1a] text-base font-light placeholder-[#aaa] focus:outline-none focus:border-[#C77A4E] focus:ring-2 focus:ring-[#C77A4E]/10 transition-all disabled:opacity-50"
                    placeholder="Ton nom"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-[#8B7355] text-xs font-medium uppercase tracking-wider mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                    className="w-full px-5 py-4 bg-white border-2 border-[#E8E3D5] rounded-xl text-[#1a1a1a] text-base font-light placeholder-[#aaa] focus:outline-none focus:border-[#C77A4E] focus:ring-2 focus:ring-[#C77A4E]/10 transition-all disabled:opacity-50"
                    placeholder="ton@email.com"
                  />
                </div>

                {/* Objet */}
                <div>
                  <label htmlFor="subject" className="block text-[#8B7355] text-xs font-medium uppercase tracking-wider mb-2">
                    Objet *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                    className="w-full px-5 py-4 bg-white border-2 border-[#E8E3D5] rounded-xl text-[#1a1a1a] text-base font-light placeholder-[#aaa] focus:outline-none focus:border-[#C77A4E] focus:ring-2 focus:ring-[#C77A4E]/10 transition-all disabled:opacity-50"
                    placeholder="L'objet de ton message"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-[#8B7355] text-xs font-medium uppercase tracking-wider mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                    rows={6}
                    className="w-full px-5 py-4 bg-white border-2 border-[#E8E3D5] rounded-xl text-[#1a1a1a] text-base font-light placeholder-[#aaa] focus:outline-none focus:border-[#C77A4E] focus:ring-2 focus:ring-[#C77A4E]/10 transition-all resize-none disabled:opacity-50"
                    placeholder="Écris ton message ici..."
                  />
                </div>

                {/* Erreur */}
                {status === 'error' && (
                  <div className="flex items-center gap-3 px-5 py-4 bg-red-50 rounded-xl border border-red-200">
                    <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
                    <p className="text-red-600 text-sm">{errorMessage}</p>
                  </div>
                )}

                {/* Bouton */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group w-full py-5 bg-gradient-to-r from-[#C77A4E] to-[#D4AF37] text-white text-base font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-[#C77A4E]/20 hover:shadow-xl hover:shadow-[#D4AF37]/30 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer le message
                      <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
