import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './mutation-types';

const axios = require("axios").default;

Vue.use(Vuex);

const store = new Vuex.Store({
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
    [types.SET_CURRENT_VEHICLE_TYPE](state, data) {
      state.currentVehicleType = data;
    },
    [types.SET_LOADING_DATA](state, data) {
      state.loadingData = data;
    },
    [types.TOGGLE_SITE_SEARCH](state) {
      state.isSearchOpened = !state.isSearchOpened;
    },
    [types.VEHICLES_MODELS_LIST](state, vehiclesList) {
      state.vehicles = vehiclesList;
    },
    [types.VEHICLES_SETTINGS](state, data) {
      state.vehiclesSettings = data;
    }
  },
  actions: {
    [types.REQUEST_VEHICLES_SETTINGS](context) {
      return new Promise((resolve, reject) => {
        axios
          .get("/public/vehicles/types")
          .then((response) => {
            context.commit(types.VEHICLES_SETTINGS, response.data.result);
            return resolve();
          })
          .catch((error) => {
            return reject(error);
          });
      });
    }
  },
  getters: {
    isSiteSearchOpened: state => {
      return state.isSearchOpened;
    },
    getCurrentVehicleType: state => route => {
      return state.vehiclesSettings.filter((vehicle) => {
        return vehicle.route === route;
      });
    }
  }
})

export default store;