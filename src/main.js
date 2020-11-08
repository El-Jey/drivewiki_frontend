import Vue from 'vue';
import App from '@/Components/App.vue';

import router from '@/router';
import store from '@/store';
import {
  i18n
} from '@/localization';

import CustomPlugin from '@/CustomPlugin';

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

import '@/assets/styles/main.scss';

import {
  REQUEST_VEHICLES_SETTINGS,
  SET_CURRENT_VEHICLE_TYPE
} from "@/store/mutation-types";

library.add(faBan, faBars, faCaretDown, faCaretRight, faCaretRight, faChevronDown, faSearch, faSlidersH, faTimes);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(CustomPlugin);

router.beforeEach((to, _from, next) => {
  if (!store.state.vehiclesSettings) {
    store.dispatch(REQUEST_VEHICLES_SETTINGS)
      // Ok, settings are saved to the store
      .then(() => {
        let currentVehicleType = store.getters.getCurrentVehicleType(to.path); // The currently viewed section of site
        currentVehicleType = currentVehicleType.length ? currentVehicleType : null
        store.commit(SET_CURRENT_VEHICLE_TYPE, currentVehicleType);
        next();
      })
      .catch((err) => {
        console.log(err); // TODO: на страницу ошибки, примерно так: next('error')
      });
  } else {
    let currentVehicleType = store.getters.getCurrentVehicleType(to.path); // The currently viewed section of site
    currentVehicleType = currentVehicleType.length ? currentVehicleType : null
    store.commit(SET_CURRENT_VEHICLE_TYPE, currentVehicleType);
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