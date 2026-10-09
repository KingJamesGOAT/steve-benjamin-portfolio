import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Cookies from 'js-cookie';
import enTranslation from './locales/en/translation.json';
import frTranslation from './locales/fr/translation.json';

const COOKIE_NAME = 'i18next_lang';

// Custom cookie detector / sync
const savedLanguage = Cookies.get(COOKIE_NAME);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      fr: { translation: frTranslation },
    },
    fallbackLng: 'en',
    lng: savedLanguage || undefined,
    detection: {
      order: ['cookie', 'navigator', 'htmlTag'],
      lookupCookie: COOKIE_NAME,
      caches: ['cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('languageChanged', (lng) => {
  Cookies.set(COOKIE_NAME, lng, { expires: 365, sameSite: 'lax' });
  document.documentElement.lang = lng;
});

export default i18n;
