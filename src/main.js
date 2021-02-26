// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import "lib-flexible";
import "babel-polyfill";
import FastClick from "fastclick";
import VueRouter from "vue-router";
import App from "./App";
import router from "./router";
import request from "./tool/request";
import commons from "./tool/commons";
import infiniteScorool from "./pages/InfiniteScroll/index";
import api from "@/router/api";
import _ from "lodash";
// import './tool/rem';
import { ToastPlugin } from "vux";

Vue.use(ToastPlugin);

import Loading from "./components/loading";
// import Loading from './components/common/global/loading'
Vue.use(Loading);

import Vant from "vant";
Vue.use(Vant);
import "vant/lib/index.css";
Vue.use(infiniteScorool);

FastClick.attach(document.body);
Vue.config.productionTip = false;
//绑定工具方法到原型
Vue.prototype.$request = request;
Vue.prototype.$lodash = _;
Vue.prototype.$commons = commons;
Vue.prototype.$api = api;
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app-box");
