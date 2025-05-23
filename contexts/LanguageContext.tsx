
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import enTranslations from '../locales/en';
import arTranslations from '../locales/ar';

export type SupportedLanguage = 'en' | 'ar';
export type TranslationKey = keyof typeof enTranslations; // Assuming en.ts has all keys

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  t: (key: TranslationKey, replacements?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<SupportedLanguage, any> = {
  en: enTranslations,
  ar: arTranslations,
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>('en');

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'ar') {
      // setLanguageState('ar'); // Default to Arabic if browser preference is Arabic
    }
    // Default to English if not, or keep 'en' as app default.
    // For this exercise, we'll start with English and let user switch.
  }, []);
  

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
  };

  const t = useCallback((key: TranslationKey, replacements?: Record<string, string | number>): string => {
    let translationString = translations[language][key] || translations['en'][key] || key.toString();
    
    if (replacements) {
      Object.keys(replacements).forEach(placeholder => {
        translationString = translationString.replace(`{{${placeholder}}}`, String(replacements[placeholder]));
      });
    }
    return translationString;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
