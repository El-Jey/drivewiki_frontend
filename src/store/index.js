import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './mutation-types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    carModelDetails: null,
    currentVehicleType: null,
    isEmptyCarModelDetails: false,
    isEmptyMotorcycleModelDetails: false,
    isSearchOpened: false,
    loadingCircle: false,
    loadingData: null,
    motorcycles: null,
    motorcycleModelDetails: null,
    selectedBrand: '',
    vehicles: null,
    vehiclesSettings: null
  },
  mutations: {
    [types.CAR_DETAILS](state, modelInfo) {
      state.carModelDetails = modelInfo;
    },
    [types.IS_EMPTY_CAR_DETAILS](state, flag) {
      state.isEmptyCarModelDetails = flag;
    },
    [types.IS_EMPTY_MOTORCYCLE_DETAILS](state, flag) {
      state.isEmptyMotorcycleModelDetails = flag;
    },
    [types.IS_LOADING](state, args) {
      state[args.name] = args.value;
    },
    [types.MOTORCYCLE_DETAILS](state, modelInfo) {
      state.motorcycleModelDetails = modelInfo;
    },
    [types.SELECTED_BRAND](state, brand) {
      state.selectedBrand = state.selectedBrand == brand ? '' : brand;
    },
    [types.SET_LOADING_DATA](state, data) {
      state.loadingData = data;
    },
    [types.SET_CURRENT_VEHICLE_TYPE](state, data) {
      state.currentVehicleType = data;
    },
    [types.TOGGLE_SITE_SEARCH](state) {
      state.isSearchOpened = !state.isSearchOpened;
    },
    [types.VEHICLES_SETTINGS](state, data) {
      state.vehiclesSettings = data;
    },
    [types.VEHICLES_MODELS_LIST](state, vehiclesList) {
      state.vehicles = vehiclesList;
    }
  },
  getters: {
    isSearchOpened: state => {
      return state.isSearchOpened;
    }
  }
})