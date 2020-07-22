import Vue from 'vue';
import App from './Components/App.vue';

import router from './router';
import store from './store';
import i18n from './localization';

import CustomPlugin from './CustomPlugin';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretRight, faCaretDown, faSearch, faBars, faBan, faTimes, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import './assets/styles/main.scss';

library.add(faCaretRight, faCaretDown, faSearch, faBars, faBan, faTimes, faSlidersH);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(CustomPlugin);

new Vue({
  el: '#app',
  render: h => h(App),
  i18n,
  router,
  store,
  CustomPlugin
})
