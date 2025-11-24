'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà donné son consentement
    const consentData = localStorage.getItem('cookie_consent');

    if (!consentData) {
      // Pas de consentement enregistré
      setTimeout(() => setShowBanner(true), 1000);
      return;
    }

    try {
      const { value, timestamp } = JSON.parse(consentData);
      const consentAge = Date.now() - timestamp;
      const twelveMonthsInMs = 365 * 24 * 60 * 60 * 1000; // 12 mois

      // Si le consentement a plus de 12 mois, on le supprime et on redemande
      if (consentAge > twelveMonthsInMs) {
        localStorage.removeItem('cookie_consent');
        setTimeout(() => setShowBanner(true), 1000);
      }
    } catch (error) {
      // Si le format est ancien (juste "accepted" ou "refused"), on le supprime
      localStorage.removeItem('cookie_consent');
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const acceptCookies = () => {
    const consentData = {
      value: 'accepted',
      timestamp: Date.now()
    };
    localStorage.setItem('cookie_consent', JSON.stringify(consentData));
    setShowBanner(false);
    // Recharger pour activer Google Analytics si configuré
    window.location.reload();
  };

  const refuseCookies = () => {
    const consentData = {
      value: 'refused',
      timestamp: Date.now()
    };
    localStorage.setItem('cookie_consent', JSON.stringify(consentData));
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="bg-white border-t border-gray-200 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="3"/>
                  <circle cx="12" cy="5" r="1"/>
                  <circle cx="19" cy="12" r="1"/>
                  <circle cx="12" cy="19" r="1"/>
                  <circle cx="5" cy="12" r="1"/>
                  <circle cx="16.5" cy="7.5" r="1"/>
                </svg>
              </div>
            </div>

            {/* Texte */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                🍪 Nous utilisons des cookies
              </h3>
              <p className="text-sm text-gray-600">
                Nous utilisons des cookies pour améliorer votre expérience sur notre site,
                analyser le trafic et personnaliser le contenu.{' '}
                <Link
                  href="/cookies"
                  className="text-orange-600 hover:text-orange-700 underline font-medium"
                >
                  En savoir plus
                </Link>
              </p>
            </div>

            {/* Boutons */}
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={refuseCookies}
                className="flex-1 sm:flex-none px-4 py-2.5 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Refuser
              </button>
              <button
                onClick={acceptCookies}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-md text-sm"
              >
                Accepter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
