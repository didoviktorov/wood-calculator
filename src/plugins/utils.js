export default {
  install(Vue) {
    function translate(literal) {
      return this.$store.state.languages.languages[
        this.$store.state.selectedLang
      ][literal];
    }

    Vue.prototype.$translate = translate;
  },
};
