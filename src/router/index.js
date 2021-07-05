import Vue from 'vue';
import Router from 'vue-router';

const originalPush = Router.prototype.push

originalPush.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router);
export const routers =
    [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: "/role",
                    name: "role",
                    meta: {
                        title: '角色管理'
                    },
                    component: () => import (
                    /* webpackChunkName: "role" */
                   '../components/page/role.vue' )
                },
                {
                    path: "/permission",
                    name: "permission",
                    meta: {
                        title: '权限管理',
                        // permission: true
                    },
                    component: () => import (
                    /* webpackChunkName: "permission" */
                    "../components/page/Permission.vue")
                },
                
                {
                    path: "/group",
                    name: "group",
                    meta: {
                        title: '部门管理',
                    },
                    component: () => import (
                    /* webpackChunkName: "permission" */
                    "../components/page/group.vue")
                },
                
                {
                    path: "/statisticalForm",
                    name: "statisticalForm",
                    meta: {
                        title: '统计报表'
                    },
                    component: () => import (
                    /* webpackChunkName: "table" */
                    "../components/page/statisticalForm.vue")
                },
                {
                    path: "/change",
                    name: "change",
                    meta: {
                        title: '变动管理'
                    },
                    component: () => import (
                    /* webpackChunkName: "table" */
                    "../components/page/change.vue")
                },
                {
                    path: "/tree",
                    name: "tree",
                    meta: {
                        title: '职位架构'
                    },
                    component: () => import (
                    /* webpackChunkName: "table" */
                    "../components/page/tree.vue")
                },
                 {
                    path: "/leader",
                    name: "leader",
                    meta: {
                        title: '干部管理'
                    },
                    component: () => import (
                    /* webpackChunkName: "table" */
                    "../components/page/leader.vue")
                },
                {
                    path: "/dimensional",
                    name: "dimensional",
                    meta: {
                        title: '维度分析'
                    },
                    component: () => import (
                    /* webpackChunkName: "tabs" */
                    "../components/page/dimensional.vue")
                },
                {
                    path: "/position",
                    name: "position",
                    meta: {
                        title: '职位架构'
                    },
                    component: () => import (
                    /* webpackChunkName: "icon" */
                    "../components/page/position.vue")
                },     
               
            ]
        },
    ]
let _publicPath = '';
if (process.env.NODE_ENV === 'staging') {
    _publicPath = '/gan_bu_guan_li_sys/'
} else if (process.env.NODE_ENV === 'production') {
    _publicPath = '/'
} else {
    _publicPath = '/'
}

export default new Router({
    base: _publicPath,
    mode: "history", // 去掉url中的#

    routes: routers
});



