import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueI18n from 'vue-i18n';
import ElementUI from 'element-ui';
import VueCookies from 'vue-cookies'
import { selectDictLabel } from './utils/form';
import { messages } from './components/common/i18n';

import Tree from './components/common/lib/index';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';

import 'babel-polyfill';
import { download } from './utils/form';
import Pagination from './components/common/Pagination';

Vue.use(Tree);
Vue.use(VueCookies)
// 全局组件挂载
Vue.component('Pagination', Pagination)

Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.download = download;


Vue.prototype.get_thousand_num = function (num) {
    return (num || 0).toString().replace(/\d+/, function (n) {
        var len = n.length;
        if (len % 3 === 0) {
            return n.replace(/(\d{3})/g, ',$1').slice(1);
        } else {
            return n.slice(0, len % 3) + n.slice(len % 3).replace(/(\d{3})/g, ',$1');
        }
    });
}

Vue.prototype.msgSuccess = function (msg) {

    this.$message({
        showClose: true,
        message: msg,
        type: "success"
    });
}

Vue.prototype.msgError = function (msg) {
    this.$message({
        showClose: true,
        message: msg,
        type: "error"
    });
}

Vue.prototype.msgInfo = function (msg) {
    this.$message.info(msg);
}


Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

//使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//     document.title = `${to.meta.title}`;
//     // const role=localStorage.getItem('access_token');
//     const role = localStorage.getItem('roleName') ||localStorage.getItem('access_token');
//     if (!role && to.path !== '/sso/login' && to.path !== '/login') {
//         next('/budgetQuery');

//     }
//     else if (to.meta.permission) {
//         //     //判断用户名是不是admin  只有admin才有权限   在路由中配置permission: true
//         //     // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//         role === 'admin' ? next() : next('/403');
//     }
//     else {
//         next();
//     }
// });


new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
