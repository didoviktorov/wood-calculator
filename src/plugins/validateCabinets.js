export default {
  install(Vue) {
    function validate(cabinets) {
      for (let cabinet of cabinets) {
        let value = parseInt(cabinet.outerWidth);
        if (value == 0) {
          return false;
        }
      }
      return true;
    }

    Vue.prototype.$validateCabinets = validate;
  }
};
