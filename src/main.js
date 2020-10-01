import Vue from 'vue';
import App from './Components/App.vue';

import router from './router';
import store from './store';
import {
  i18n
} from './localization';

import CustomPlugin from './CustomPlugin';

import {
  library
} from '@fortawesome/fontawesome-svg-core';
import {
  faBan,
  faBars,
  faCaretDown,
  faCaretRight,
  faChevronDown,
  faSearch,
  faSlidersH,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome';

import './assets/styles/main.scss';

library.add(faBan, faBars, faCaretDown, faCaretRight, faCaretRight, faChevronDown, faSearch, faSlidersH, faTimes);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(CustomPlugin);

router.beforeEach((_to, _from, next) => {
  if (!store.state.vehiclesSettings) {
    store.dispatch('getVehiclesSettings')
      .then(() => {
        next(); // TODO: SET_CURRENT_VEHICLE_TYPE
      })
      .catch((err) => {
        console.log(err); // TODO: на страницу ошибки, next('error')
      });
  } else {
    next();
  }
});

new Vue({
  el: '#app',
  render: h => h(App),
  i18n,
  router,
  store,
  CustomPlugin
})