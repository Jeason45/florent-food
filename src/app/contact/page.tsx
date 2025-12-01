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
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
    <div className="min-h-screen bg-[#FFFBF7] relative">
      {/* Navigation */}
      <div className="relative z-10 py-6 w-full px-6 md:px-10">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 text-[#8B7355] hover:text-[#C77A4E] transition-all duration-300"
        >
          <span className="w-10 h-10 rounded-full bg-white border border-[#E8E3D5] flex items-center justify-center group-hover:border-[#C77A4E] group-hover:bg-[#C77A4E] group-hover:text-white transition-all duration-300">
            <ArrowLeft size={16} strokeWidth={2} />
          </span>
          <span className="text-sm font-medium tracking-wide">Retour</span>
        </Link>
      </div>

      {/* Hero */}
      <section className="relative z-10 pt-6 pb-10 md:pt-10 md:pb-14 px-6 w-full" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 className="font-serif text-[40px] md:text-[56px] font-light text-[#1a1a1a] leading-[1.1] mb-4 tracking-tight" style={{ textAlign: 'center' }}>
          Me contacter
        </h1>

        <p className="text-base md:text-lg text-[#8B7355] font-light max-w-md leading-relaxed" style={{ textAlign: 'center' }}>
          Une question, une suggestion ou une collaboration ?
          <br />
          Je te réponds sous <span className="text-[#C77A4E] font-medium">48h</span>.
        </p>

        <div className="mt-6 w-20 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </section>

      {/* Formulaire */}
      <main className="relative z-10 pb-20 px-6 w-full" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="max-w-[500px] w-full">

          {status === 'success' ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
                padding: '3rem 2rem',
                background: '#fff',
                borderRadius: '24px',
                boxShadow: '0 10px 40px rgba(199, 122, 78, 0.1)',
                border: '2px solid #C77A4E',
              }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C77A4E] to-[#D4AF37] flex items-center justify-center">
                <CheckCircle size={32} className="text-white" strokeWidth={2} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <h2 className="font-serif text-2xl font-medium text-[#1a1a1a]">
                  Message envoyé !
                </h2>
                <p className="text-base font-light text-[#666] leading-relaxed" style={{ textAlign: 'center' }}>
                  Merci pour ton message.<br />
                  Je te répondrai très bientôt.
                </p>
              </div>
              <button
                onClick={() => setStatus('idle')}
                className="mt-2 px-6 py-3 bg-gradient-to-r from-[#C77A4E] to-[#D4AF37] text-white text-sm font-semibold tracking-wide rounded-full hover:shadow-lg hover:shadow-[#C77A4E]/30 transition-all duration-300"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Card container */}
              <div
                style={{
                  background: '#fff',
                  borderRadius: '24px',
                  padding: '1.75rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                  border: '1px solid #E8E3D5',
                }}
              >
                <div className="space-y-4">
                  {/* Row: Nom + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nom */}
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className={`text-xs font-semibold tracking-wider uppercase transition-colors duration-300 ${
                          focusedField === 'name' ? 'text-[#C77A4E]' : 'text-[#8B7355]'
                        }`}
                      >
                        Nom
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        disabled={status === 'loading'}
                        className={`w-full px-4 py-3.5 border-2 rounded-xl text-[#1a1a1a] text-[15px] font-light placeholder-[#aaa] focus:outline-none transition-all duration-300 disabled:opacity-50 ${
                          focusedField === 'name'
                            ? 'border-[#C77A4E] bg-[#C77A4E]/5'
                            : 'border-[#E8E3D5] bg-[#FAFAFA] hover:border-[#D4AF37]/50'
                        }`}
                        placeholder="Ton nom"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className={`text-xs font-semibold tracking-wider uppercase transition-colors duration-300 ${
                          focusedField === 'email' ? 'text-[#C77A4E]' : 'text-[#8B7355]'
                        }`}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        disabled={status === 'loading'}
                        className={`w-full px-4 py-3.5 border-2 rounded-xl text-[#1a1a1a] text-[15px] font-light placeholder-[#aaa] focus:outline-none transition-all duration-300 disabled:opacity-50 ${
                          focusedField === 'email'
                            ? 'border-[#C77A4E] bg-[#C77A4E]/5'
                            : 'border-[#E8E3D5] bg-[#FAFAFA] hover:border-[#D4AF37]/50'
                        }`}
                        placeholder="ton@email.com"
                      />
                    </div>
                  </div>

                  {/* Objet */}
                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className={`text-xs font-semibold tracking-wider uppercase transition-colors duration-300 ${
                        focusedField === 'subject' ? 'text-[#C77A4E]' : 'text-[#8B7355]'
                      }`}
                    >
                      Objet
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      required
                      disabled={status === 'loading'}
                      className={`w-full px-4 py-3.5 border-2 rounded-xl text-[#1a1a1a] text-[15px] font-light placeholder-[#aaa] focus:outline-none transition-all duration-300 disabled:opacity-50 ${
                        focusedField === 'subject'
                          ? 'border-[#C77A4E] bg-[#C77A4E]/5'
                          : 'border-[#E8E3D5] bg-[#FAFAFA] hover:border-[#D4AF37]/50'
                      }`}
                      placeholder="L'objet de ton message"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className={`text-xs font-semibold tracking-wider uppercase transition-colors duration-300 ${
                        focusedField === 'message' ? 'text-[#C77A4E]' : 'text-[#8B7355]'
                      }`}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      disabled={status === 'loading'}
                      rows={5}
                      className={`w-full px-4 py-3.5 border-2 rounded-xl text-[#1a1a1a] text-[15px] font-light placeholder-[#aaa] focus:outline-none transition-all duration-300 resize-none disabled:opacity-50 ${
                        focusedField === 'message'
                          ? 'border-[#C77A4E] bg-[#C77A4E]/5'
                          : 'border-[#E8E3D5] bg-[#FAFAFA] hover:border-[#D4AF37]/50'
                      }`}
                      placeholder="Écris ton message ici..."
                    />
                  </div>
                </div>
              </div>

              {/* Erreur */}
              {status === 'error' && (
                <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
                  <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-600">{errorMessage}</p>
                </div>
              )}

              {/* Bouton */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="group w-full py-4 bg-gradient-to-r from-[#C77A4E] to-[#D4AF37] text-white text-sm font-bold tracking-wider uppercase rounded-full overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:shadow-[#C77A4E]/25 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="flex items-center justify-center gap-3">
                  {status === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Envoi...
                    </>
                  ) : (
                    <>
                      Envoyer
                      <Send size={16} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
              </button>

              <p className="text-center text-xs text-[#999] pt-1">
                Tous les champs sont obligatoires
              </p>
            </form>
          )}

        </div>
      </main>
    </div>
  );
}
