import Vue from "vue";
import Router from "vue-router";
import Clock from '../pages/clockIn/index.vue';

Vue.use(Router);

let routes = new Router({
  mode:"history",
  base:"cardRecord",
  routes: [
    {
      path: "/",
      redirect: "/clock",
      component: Clock,
      meta: {
        title: "一卡通"
      }
    },
    {
      path: "/clock",
      component: Clock,
      meta: {
        title: "一卡通"
      }
    }
  ]
});
routes.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
export default routes;
