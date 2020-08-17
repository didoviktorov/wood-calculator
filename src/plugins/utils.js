export default {
  install(Vue) {
    function translate(literal) {
      return this.$store.state.languages.languages[
        this.$store.state.selectedLang
      ][literal];
    }

    function getCabinetProps(cabinet) {
      let propsObject = JSON.parse(JSON.stringify(cabinet));
      delete propsObject.showCabinetElements;
      delete propsObject.isEdited;
      delete propsObject.isValid;
      delete propsObject.innerWidth;

      return propsObject;
    }

    Vue.prototype.$translate = translate;
    Vue.prototype.$getCabinetProps = getCabinetProps;
  },
};
