//日期格式化
function formatDate(date, format) {

  //空处理
  if (isBlank(date)) return '';

  //支持10位时间戳
  if (typeof date == 'number' && (date + '').length == 10) {
    date = date * 1000;
  }

  //默认格式
  format = format || 'YYYY-MM-DD HH:mm:ss';

  return dateFns.format(date, format);
}

//参数序列化
function serialize(params) {
  var serializeStr = '';
  var serializeArray = [];
  if (params) {
    for (var key in params) {
      serializeArray.push(key + '=' + encodeURIComponent(params[key]));
    }
  }
  if (serializeArray.length > 0) {
    serializeStr = serializeArray.join('&');
  }
  return serializeStr;
}

//获取登录用户
function getLoginUser() {
  var loginUser = window.localStorage.getItem('loginUser');
  if (loginUser) {
    return JSON.parse(loginUser);
  }
  return {};
}

//判空
function isBlank(str) {
  if (str === null) return true;
  if (str === undefined) return true;
  if (str === '') return true;
  return false;
}


export default {
  formatDate,
  serialize,
  getLoginUser,
  isBlank,
}
