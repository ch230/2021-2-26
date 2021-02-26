import axios from "axios";
import { Toast } from "vant";
//全局配置

let request = axios.create({
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
});
request.defaults.timeout = 300000;
request.defaults.baseURL = "/devserver";

//请求拦截
request.interceptors.request.use(config => {
  Toast.loading({
    message: "加载中...",
    forbidClick: true
  });
  // config.headers.common["Authorization"] = "Basic cXl3eDpmdHd4MjAxOTA5MjQwMDE=";
  // if (config.url.indexOf('/devservertest/welink/getUserNameByCode') != -1) {
  //   config.baseURL = "";
  // } else if (config.url.indexOf('/sysUser/approveUserList') != -1) {
  //   config.baseURL = "";
  //   config.url = config.url + "?access_token=" + window.localStorage.getItem("access_token");
  // }
  return config;
});

//响应处理
var handleResponse = (result, successCB, errorCB) => {
  if (result.returnCode == "200" || result.code == "200") {
    successCB(result.data);
  } else {
    if (errorCB) {
      errorCB(result);
    }
  }
};

//错误处理
var handleError = error => {
  if (typeof error == "string") {
    //Message.error(error);
    //commons.closeLoading();
    //}else{
    //	Message.error('请求处理失败');
    //	commons.closeLoading();
  }
};

//GET请求
var sendGetRequest = (url, params, successCB, errorCB) => {
  request
    .get(url, {
      params: params
    })
    .then(response => {
      handleResponse(response.data, successCB, errorCB);
    })
    .catch(error => {
      handleError(error);
    });
};

//POST json请求
var sendPostRequest = (url, data, successCB, errorCB) => {
  request
    .post(url, data)
    .then(response => {
      handleResponse(response.data, successCB, errorCB);
    })
    .catch(error => {
      // Vue.$vux.toast.show({
      //   text: "请求错误",
      //   type: "warn"
      // });
      handleError(error);
    });
};

//POST Form请求
var sendFormRequest = (url, data, successCB, errorCB) => {
  request
    .post(url, data, {
      headers: {
        "Content-Type": "multer/form-data"
      }
    })
    .then(response => {
      handleResponse(response.data, successCB, errorCB);
    })
    .catch(error => {
      handleError(error);
    });
};

export default {
  sendGetRequest,
  sendPostRequest,
  sendFormRequest,
  handleResponse
};
