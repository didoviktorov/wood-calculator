export default {
  install(Vue) {
    function validation() {
      let language = this.$store.state.languages.languages[
        this.$store.state.selectedLang
      ];
      let literals = this.$store.state.validationRulesLiterals;
      let validationRules = [
        (v) => !!v || language[literals[0]],
        (v) => !isNaN(v) || language[literals[1]],
        (v) => v > 0 || language[literals[2]],
        (v) => Number.isInteger(Number(v)) || language[literals[3]],
      ];

      return validationRules;
    }

    Vue.prototype.$getnumberValidationRules = validation;
  },
};
