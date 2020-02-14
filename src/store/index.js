import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lowerShelf: {
      title: "ДОЛНИ ШКАФОВЕ",
      cabinets: [],
      staticCabinets: [],
      outerSides: [],
      height: 0,
      width: 0,
      depth: 0,
      pureWidth: 0
    },
    calculationUnit: "мм"
  },
  mutations: {
    CHANGE_METRIC_UNIT(state, unit) {
      state.calculationUnit = unit;
    },
    CHANGE_SHELF_WIDTH(state, value) {
      state.lowerShelf.width = value;
    },
    CHANGE_SHELF_HEIGHT(state, value) {
      state.lowerShelf.height = value;
    },
    CHANGE_SHELF_DEPTH(state, value) {
      state.lowerShelf.depth = value;
    },
    ADD_STATIC_CABINET(state, value) {
      state.lowerShelf.staticCabinets.push(value);
    },
    REMOVE_STATIC_CABINET(state) {
      state.lowerShelf.staticCabinets.splice(
        state.lowerShelf.staticCabinets.length - 1
      );
    },
    ADD_ALL_STATIC_FIELDS_WIDTH(state, value) {
      if (state.lowerShelf.staticCabinets.length > 0) {
        state.lowerShelf.staticCabinets = [];
      }
      value.forEach(element => {
        element.width = parseInt(element.width);
        state.lowerShelf.staticCabinets.push(element);
      });
    },
    ADD_SHELF_OUTER_SIDE(state, side) {
      let sideToAdd = {
        width: parseInt(side.width),
        height: parseInt(side.height),
        depth: parseInt(side.depth)
      };
      state.lowerShelf.outerSides.push(sideToAdd);
    },
    REMOVE_SHELF_OUTER_SIDE(state, index) {
      state.lowerShelf.outerSides.splice(index, 1);
    },
    CLEAR_SHELF_OUTER_SIDES(state) {
      state.lowerShelf.outerSides = [];
    }
  },
  actions: {
    cnangeMetricUnit(store, unit) {
      store.commit("CHANGE_METRIC_UNIT", unit);
    },
    changeShelfWidth(store, value) {
      store.commit("CHANGE_SHELF_WIDTH", value);
    },
    changeShelfHeight(store, value) {
      store.commit("CHANGE_SHELF_HEIGHT", value);
    },
    changeShelfDepth(store, value) {
      store.commit("CHANGE_SHELF_DEPTH", value);
    },
    addStaticCabinet(store, value) {
      store.commit("ADD_STATIC_CABINET", value);
    },
    removeStaticCabinet(store) {
      store.commit("REMOVE_STATIC_CABINET");
    },
    addStaticFieldsWidth(store, value) {
      store.commit("ADD_ALL_STATIC_FIELDS_WIDTH", value);
    },
    addShelfOuterSide(store, side) {
      store.commit("ADD_SHELF_OUTER_SIDE", side);
    },
    clearShelfOuterSides(store) {
      store.commit("CLEAR_SHELF_OUTER_SIDES");
    },
    removeShelfOuterSide(store, index) {
      if (index >= 0 && index < store.state.lowerShelf.outerSides.length) {
        store.commit("REMOVE_SHELF_OUTER_SIDE", index);
      }
    }
  },
  modules: {}
});
