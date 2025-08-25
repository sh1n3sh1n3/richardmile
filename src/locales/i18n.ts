import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
// utils
import localStorageAvailable from '../utils/localStorageAvailable';
//
import { defaultLang } from './config-lang';
//
import enLocales from './langs/en';
import frLocales from './langs/fr';
import esLocales from './langs/es';
import ruLocales from './langs/ru';
import arLocales from './langs/ar';
import jaLocales from './langs/ja';
import cnLocales from './langs/cn';

// ----------------------------------------------------------------------

let lng = defaultLang.value;

const storageAvailable = localStorageAvailable();

if (storageAvailable) {
  lng = localStorage.getItem('i18nextLng') || defaultLang.value;
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: enLocales },
      fr: { translations: frLocales },
      es: { translations: esLocales },
      ru: { translations: ruLocales },
      ar: { translations: arLocales },
      ja: { translations: jaLocales },
      cn: { translations: cnLocales },
    },
    lng,
    fallbackLng: defaultLang.value,
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
