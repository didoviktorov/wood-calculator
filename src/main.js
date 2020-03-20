import "core-js/stable";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
// import toasted from "./plugins/vue-toasted";
import numToWord from "./plugins/numberToWord";
import numberRules from "./plugins/numberValidationRules";
import lowerCabinetInstance from "./plugins/copyInnerLowerCabinets";
import validateCabinets from "./plugins/validateCabinets";

import Toasted from "vue-toasted";

let options = {
  position: "top-center",
  duration: 300000,
  closeOnSwipe: true,
  singleton: true,
  containerClass: "notification"
};

Vue.use(Toasted, options);

Vue.config.productionTip = false;

Vue.use(numToWord);

Vue.use(numberRules);

Vue.use(lowerCabinetInstance);

Vue.use(validateCabinets);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
