import axios from 'axios';

import { showLoading, hideLoading } from '../components/common/loading';
const service = axios.create({
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        accessToken: window.localStorage.getItem('access_token')
    }

    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    // timeout: 5000
});
service.defaults.baseURL = process.env.VUE_APP_BASE_API;
service.interceptors.request.use(
    config => {
        showLoading();
        if (config.url.indexOf('/getAccessTokenByIdmoAuthCode') > 0) {
            service.defaults.headers = '';
        }

        // config.url = config.url + "?access_token=" + getToken();
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        hideLoading();
        if (response.status === 200) {
            return response.data;
        } else if (response.code === 400) {
            this.$message({
                showClose: true,
                message: '请重新登录',
                type: 'error'
            });
            next('/sso/login');
        }
    },
    error => {
        hideLoading();
        return Promise.reject(error.response.data);
    }
);

export default service;
