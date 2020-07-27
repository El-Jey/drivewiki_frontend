import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './mutation-types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isSearchOpened: false,
    vehicles: null,
    carModelDetails: null,
    isEmptyCarModelDetails: false,
    motorcycles: null,
    motorcycleModelDetails: null,
    isEmptyMotorcycleModelDetails: false,
    selectedBrand: ''
  },
  mutations: {
    [types.TOGGLE_SITE_SEARCH](state) {
      state.isSearchOpened = !state.isSearchOpened;
    },
    [types.VEHICLES_LIST](state, vehiclesList) {
      state.vehicles = vehiclesList;
    },
    [types.CAR_DETAILS](state, modelInfo) {
      state.carModelDetails = modelInfo;
    },
    [types.IS_EMPTY_CAR_DETAILS](state, flag) {
      state.isEmptyCarModelDetails = flag;
    },
    [types.MOTORCYCLE_DETAILS](state, modelInfo) {
      state.motorcycleModelDetails = modelInfo;
    },
    [types.IS_EMPTY_MOTORCYCLE_DETAILS](state, flag) {
      state.isEmptyMotorcycleModelDetails = flag;
    },
    [types.SELECTED_BRAND](state, brand) {
      state.selectedBrand = state.selectedBrand == brand ? '' : brand;
    }
  },
  getters: {
    isSearchOpened: state => {
      return state.isSearchOpened;
    }
  }
})