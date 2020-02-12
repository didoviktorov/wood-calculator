import Vue from "vue";
import VueRouter from "vue-router";
import Down from "../views/Down.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Долни Шкафове",
    component: Down
  },
  {
    path: "/upper",
    name: "Горни Шкафове",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Upper.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
