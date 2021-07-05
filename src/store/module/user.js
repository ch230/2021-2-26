import { login } from '@/api/login';
import { getToken, setToken, setUserid } from '@/utils/auth';

const user = {
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        roles: [],
        permissions: []
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        }
    },
    actions: {
        // 登录
        Login({ commit }, userInfo) {
            const username = userInfo.username.trim();
            const password = userInfo.password;

            return new Promise((resolve, reject) => {
                login(username, password)
                    .then(res => {
                        // setToken(res.data.access_token);
                        // setUserid(res.data.userid);
                        // commit("SET_TOKEN", res.data.token);
                        // window.localStorage.setItem("token", res.data.token);
                        resolve();
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }
    }
};

export default user;
