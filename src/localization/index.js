// import Vue from 'vue';
// import VueI18n from 'vue-i18n';
// import { ENGLISH } from './strings/en';
// import { RUSSIAN } from './strings/ru';

// Vue.use(VueI18n);

// const i18n = new VueI18n({
//   locale: 'ru',
//   messages: TRANSLATIONS
// });

// export default i18n;


import Vue from 'vue';
import VueI18n from 'vue-i18n';
import {
  RUSSIAN
} from './strings/ru';
import axios from 'axios'

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: 'ru', // установка локализации
  fallbackLocale: 'ru',
  messages: { // установка сообщений локализации
    ru: RUSSIAN
  }
});

const loadedLanguages = ['ru']; // список локализаций, которые пред-загружены

function setI18nLanguage(lang) {
  i18n.locale = lang;
  axios.defaults.headers.common['Accept-Language'] = lang;
  document.querySelector('html').setAttribute('lang', lang);
  return lang;
}

export function loadLanguageAsync(lang) {
  // Если локализация та же
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  // Если локализация уже была загружена
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  // Если локализация ещё не была загружена
  return axios.get(`public/localization/${lang}`)
    .then(messages => {
      messages = JSON.parse(messages.data.result);
      
      i18n.setLocaleMessage(lang, messages);
      loadedLanguages.push(lang);
      return setI18nLanguage(lang);
    })
}