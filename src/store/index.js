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
    calculationUnit: "см"
  },
  mutations: {},
  actions: {},
  modules: {}
});
