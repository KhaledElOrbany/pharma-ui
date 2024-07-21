import i18n from 'i18next';
import resources from './resources';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage?.getItem('language') ?? 'ar',
  fallbackLng: 'en',
  supportedLngs: ['ar', 'en'],
  defaultNS: 'fallback',
  fallbackNS: 'fallback',
  //TODO keySeparator: '.',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
