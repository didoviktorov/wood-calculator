import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lowerShelf: {
      title: "ДОЛНИ ШКАФОВЕ",
      cabinets: [],
      staticCabinets: [],
      outherSides: [],
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
    },
    ADD_STATIC_CABINET(state, value) {
      state.lowerShelf.staticCabinets.push(value);
    },
    REMOVE_STATIC_CABINET(state) {
      state.lowerShelf.staticCabinets.splice(state.lowerShelf.staticCabinets.length - 1);
    },
    ADD_ALL_STATIC_FIELDS_WIDTH(state, value) {
      state.lowerShelf.staticCabinets.forEach(element => {
        element.lenght = value;
      });
    }
  },
  actions: {
    chnageMetricUnit(store, unit) {
      store.commit("CHANGE_METRIC_UNIT", unit);
    },
    chnageShelfLenght(store, value) {
      store.commit("CHANGE_SHELF_LENGHT", value);
    },
    addStaticCabinet(store, value) {
      store.commit("ADD_STATIC_CABINET", value);
    },
    removeStaticCabinet(store) {
      store.commit("REMOVE_STATIC_CABINET");
    },
    addStaticFieldsWidth(store, value) {
      store.commit("ADD_ALL_STATIC_FIELDS_WIDTH", value);
    }
  },
  modules: {}
});
