import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import numToWord from "./plugins/numberToWord";
import numberRules from "./plugins/numberValidationRules";

Vue.config.productionTip = false;

Vue.use(numToWord);

Vue.use(numberRules);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
