import Vue from "vue";
import Vuex from "vuex";
import languages from "../assets/languages.json";

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
      feetHeightOfCabinet: 0,
      pureWidth: 0
    },
    upperShelf: {
      title: "ГОРНИ ШКАФОВЕ",
      height: 0,
      width: 0,
      depth: 0,
      cabinets: [],
      outerSides: []
    },
    otherDetails: [],
    calculationUnit: "мм",
    staticOuterSideWidth: 18,
    standardFeetHeightOfCabinet: 100,
    maxNumberOfDoors: 2,
    cabinetBackDiff: 5,
    cabinetDoorDiff: 7,
    languages,
    selectedLang: "BG",
    validatoinRulesLiterals: ["required", "mustBeNumber", "greaterThan", "mustBeInteger"]
  },
  mutations: {
    CHANGE_LANGUAGE(state, lang) {
      state.selectedLang = lang;
    },
    CHANGE_STATIC_SIDE_WIDTH(state, newWidth) {
      state.staticOuterSideWidth = newWidth;
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
    ADD_UPPER_SHELF_OUTER_SIDE(state, side) {
      let sideToAdd = {
        width: parseInt(side.width),
        height: parseInt(side.height),
        depth: parseInt(side.depth)
      };
      state.upperShelf.outerSides.push(sideToAdd);
    },
    REMOVE_SHELF_OUTER_SIDE(state, index) {
      state.lowerShelf.outerSides.splice(index, 1);
    },
    REMOVE_UPPER_SHELF_OUTER_SIDE(state, index) {
      state.upperShelf.outerSides.splice(index, 1);
    },
    CLEAR_SHELF_OUTER_SIDES(state) {
      state.lowerShelf.outerSides = [];
    },
    CLEAR_UPPER_SHELF_OUTER_SIDES(state) {
      state.upperShelf.outerSides = [];
    },
    CHANGE_CABINETS_FEETS_HEIGHT(state, value) {
      state.standardFeetHeightOfCabinet = value;
    },
    ADD_LOWER_SHELF_CABINETS(state, params) {
      state.lowerShelf.cabinets = [];
      for (let cabinet of params.cabinets) {
        let cabinetToAdd = params.copyCabinet(cabinet);
        state.lowerShelf.cabinets.push(cabinetToAdd);
      }
    },
    REMOVE_ALL_LOWER_SHELF_CABINETS(state) {
      state.lowerShelf.cabinets = [];
    },
    SAVE_CABINET(state, params) {
      state.lowerShelf.cabinets.splice(
        params.cabinetIndex,
        1,
        params.editedCabinet
      );
    },
    CHANGE_UPPER_SHELF_WIDTH(state, newWidth) {
      state.upperShelf.width = newWidth;
    },
    CHANGE_UPPER_SHELF_HEIGHT(state, newHeight) {
      state.upperShelf.height = newHeight;
    },
    CHANGE_UPPER_SHELF_DEPTH(state, newDepth) {
      state.upperShelf.depth = newDepth;
    },
    ADD_UPPER_SHELF_CABINETS(state, params) {
      state.upperShelf.cabinets = [];
      for (let cabinet of params.cabinets) {
        let cabinetToAdd = params.copyCabinet(cabinet);
        state.upperShelf.cabinets.push(cabinetToAdd);
      }
    },
    REMOVE_ALL_UPPER_SHELF_CABINETS(state) {
      state.upperShelf.cabinets = [];
    },
    SAVE_UPPER_CABINET(state, params) {
      state.upperShelf.cabinets.splice(
        params.cabinetIndex,
        1,
        params.editedCabinet
      );
    },
    ADD_OTHER_DETAILS(state, newDetails) {
      state.otherDetails = [];
      for (let newDetail of newDetails) {
        let detailToAdd = {
          count: newDetail.count,
          width: parseInt(newDetail.width),
          height: {
            hasEdging: newDetail.height.hasEdging,
            value: parseInt(newDetail.height.value)
          },
          length: {
            hasEdging: newDetail.length.hasEdging,
            value: parseInt(newDetail.length.value)
          },
          isValid: newDetail.isValid
        };

        state.otherDetails.push(detailToAdd);
      }
    },
    REMOVE_OTHER_DETAIL(state, index) {
      state.otherDetails.splice(index, 1);
    }
  },
  actions: {
    changeLanguage(store, lang) {
      store.commit("CHANGE_LANGUAGE", lang);
    },
    addOtherDetails(store, details) {
      store.commit("ADD_OTHER_DETAILS", details);
    },
    removeOtherDetail(store, index) {
      store.commit("REMOVE_OTHER_DETAIL", index);
    },
    changeStaticsidewidth(store, newWidth) {
      store.commit("CHANGE_STATIC_SIDE_WIDTH", newWidth);
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
    addUpperShelfOuterSide(store, side) {
      store.commit("ADD_UPPER_SHELF_OUTER_SIDE", side);
    },
    clearShelfOuterSides(store) {
      store.commit("CLEAR_SHELF_OUTER_SIDES");
    },
    clearUpperShelfOuterSides(store) {
      store.commit("CLEAR_UPPER_SHELF_OUTER_SIDES");
    },
    removeShelfOuterSide(store, index) {
      if (index >= 0 && index < store.state.lowerShelf.outerSides.length) {
        store.commit("REMOVE_SHELF_OUTER_SIDE", index);
      }
    },
    removeUpperShelfOuterSide(store, index) {
      if (index >= 0 && index < store.state.upperShelf.outerSides.length) {
        store.commit("REMOVE_UPPER_SHELF_OUTER_SIDE", index);
      }
    },
    changeInnerCabinetsFeetHeight(store, value) {
      store.commit("CHANGE_CABINETS_FEETS_HEIGHT", value);
    },
    addLowerShelfCabinets(store, params) {
      store.commit("ADD_LOWER_SHELF_CABINETS", params);
    },
    removeAllLowerInnerCabinets(store) {
      store.commit("REMOVE_ALL_LOWER_SHELF_CABINETS");
    },
    saveCabinetLowerShelfCabinets(store, params) {
      store.commit("SAVE_CABINET", params);
    },
    changeUpperShelfWidth(store, newWidth) {
      store.commit("CHANGE_UPPER_SHELF_WIDTH", newWidth);
    },
    changeUpperShelfHeight(store, newHeight) {
      store.commit("CHANGE_UPPER_SHELF_HEIGHT", newHeight);
    },
    changeUpperShelfDepth(store, newDepth) {
      store.commit("CHANGE_UPPER_SHELF_DEPTH", newDepth);
    },
    addUpperShelfCabinets(store, params) {
      store.commit("ADD_UPPER_SHELF_CABINETS", params);
    },
    removeAllUpperInnerCabinets(store) {
      store.commit("REMOVE_ALL_UPPER_SHELF_CABINETS");
    },
    saveCabinetUpperShelfCabinets(store, params) {
      store.commit("SAVE_UPPER_CABINET", params);
    }
  },
  getters: {
    translate: (state, literal) => {

      return state.languages.languages[state.selectedLang][literal];
    },
    getLowerShelfPureWidth: state => {
      let pureWidth = state.lowerShelf.width;

      for (let staticCabinet of state.lowerShelf.staticCabinets) {
        pureWidth -= staticCabinet.width;
      }

      for (let cabinet of state.lowerShelf.cabinets) {
        pureWidth -= cabinet.outerWidth;
      }

      for (let outerSide of state.lowerShelf.outerSides) {
        pureWidth -= outerSide.width;
      }

      return pureWidth;
    },
    getUpperShelfPureWidth: state => {
      let currentWidth = 0;
      for (let cabinet of state.upperShelf.cabinets) {
        currentWidth += cabinet.outerWidth;
      }

      for (let outerSide of state.upperShelf.outerSides) {
        currentWidth += outerSide.width;
      }

      return state.upperShelf.width - currentWidth;
    }
  },
  modules: {}
});
