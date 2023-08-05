import i18n from 'i18next';
import en from './locales/en.json';
import zh from './locales/zh.json';
import ko from './locales/ko.json';

import { initReactI18next } from 'react-i18next';

export const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
  ko: {
    translation: ko,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: localStorage.getItem('language') ? localStorage.getItem('language') : 'en',
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
});
