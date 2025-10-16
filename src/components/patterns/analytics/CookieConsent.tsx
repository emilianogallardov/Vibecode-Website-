'use client';

import { useState, useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

type ConsentState = {
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    // Check if consent has been given before
    const storedConsent = localStorage.getItem('cookie-consent');
    if (!storedConsent) {
      setShowBanner(true);
    } else {
      const parsed = JSON.parse(storedConsent);
      updateGtagConsent(parsed);
    }
  }, []);

  const updateGtagConsent = (consentState: ConsentState) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': consentState.analytics ? 'granted' : 'denied',
        'ad_storage': consentState.marketing ? 'granted' : 'denied',
        'ad_user_data': consentState.marketing ? 'granted' : 'denied',
        'ad_personalization': consentState.marketing ? 'granted' : 'denied',
        'personalization_storage': consentState.preferences ? 'granted' : 'denied',
      });
    }
  };

  const handleAcceptAll = () => {
    const fullConsent = {
      analytics: true,
      marketing: true,
      preferences: true,
    };
    setConsent(fullConsent);
    localStorage.setItem('cookie-consent', JSON.stringify(fullConsent));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    updateGtagConsent(fullConsent);
    setShowBanner(false);
  };

  const handleAcceptNecessary = () => {
    const minimalConsent = {
      analytics: false,
      marketing: false,
      preferences: false,
    };
    setConsent(minimalConsent);
    localStorage.setItem('cookie-consent', JSON.stringify(minimalConsent));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    updateGtagConsent(minimalConsent);
    setShowBanner(false);
  };

  const handleCustomize = () => {
    // Save custom preferences
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    updateGtagConsent(consent);
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4 md:p-6">
      <div className="container mx-auto">
        <div className="md:flex md:items-center md:justify-between">
          <div className="mb-4 md:mb-0 md:mr-6">
            <h3 className="text-lg font-semibold mb-2">Cookie Preferences</h3>
            <p className="text-sm text-gray-600">
              We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{' '}
              <a href="/cookies" className="link">
                Learn more
              </a>
            </p>

            {/* Customization Options */}
            <div className="mt-3 space-y-2">
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="mr-2"
                />
                <span className="text-gray-700">Necessary (Always enabled)</span>
              </label>
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={consent.analytics}
                  onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-gray-700">Analytics</span>
              </label>
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={consent.marketing}
                  onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-gray-700">Marketing</span>
              </label>
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={consent.preferences}
                  onChange={(e) => setConsent({ ...consent, preferences: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-gray-700">Preferences</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleAcceptNecessary}
              className="btn-secondary text-sm py-2 px-4"
            >
              Necessary Only
            </button>
            <button
              onClick={handleCustomize}
              className="btn-secondary text-sm py-2 px-4"
            >
              Save Preferences
            </button>
            <button
              onClick={handleAcceptAll}
              className="btn-primary text-sm py-2 px-4"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}