import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { ENGLISH } from './strings/en';
import { RUSSIAN } from './strings/ru';

Vue.use(VueI18n);

const TRANSLATIONS = {
  en: ENGLISH,
  ru: RUSSIAN
};

const i18n = new VueI18n({
  locale: 'ru',
  messages: TRANSLATIONS
});

export default i18n;
