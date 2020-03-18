import Vue from "vue";
import Toasted from "vue-toasted";

let options = {
  position: "top-center",
  duration: 30000,
  closeOnSwipe: true,
  singleton: true,
  className: "notification"
};

Vue.use(Toasted, options);
