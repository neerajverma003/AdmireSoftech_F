import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCompanySettings, fallbackSettings } from '../api/settingsApi';

const SettingsContext = createContext(fallbackSettings);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(fallbackSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadSettings = async () => {
      try {
        const liveData = await getCompanySettings();
        if (isMounted && liveData) {
          setSettings(liveData);
        }
      } catch (err) {
        console.warn('[SettingsProvider] Error loading settings:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  const socialLinks = settings?.socialLinks || fallbackSettings.socialLinks;

  return (
    <SettingsContext.Provider value={{ settings, socialLinks, loading }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  return context || { settings: fallbackSettings, socialLinks: fallbackSettings.socialLinks, loading: false };
};
