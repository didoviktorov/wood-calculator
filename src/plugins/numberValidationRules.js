export default {
  install(Vue) {
    function validation(language, literals) {
      let validationRules = [
        v => !!v || language[literals[0]],
        v => !isNaN(v) || language[literals[1]],
        v => v > 0 || language[literals[2]],
        v =>
          Number.isInteger(Number(v)) ||
          language[literals[3]]
      ];
      
      return validationRules;
    }
    
    Vue.prototype.$getnumberValidationRules = validation;
  }
};
