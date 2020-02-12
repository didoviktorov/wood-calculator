import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lowerShelf: {
      title: "ДОЛНИ ШКАФОВЕ",
      cabinets: [],
      staticCabinets: [],
      height: 0,
      lenght: 0,
      depth: 0
    },
    calculationUnit: "мм"
  },
  mutations: {
    CHANGE_METRIC_UNIT(state, unit) {
      state.calculationUnit = unit;
    },
    CHANGE_SHELF_LENGHT(state, value) {
      state.lowerShelf.lenght = value;
    }
  },
  actions: {
    chnageMetricUnit(store, unit) {
      store.commit("CHANGE_METRIC_UNIT", unit);
    },
    chnageShelfLenght(store, value) {
      store.commit("CHANGE_SHELF_LENGHT", value);
    }
  },
  modules: {}
});
