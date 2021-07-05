import Cookies from 'js-cookie'

const TokenKey = 'ft-Token'
const userId = 'user_id'

export function getToken() {
  return Cookies.get(TokenKey)
}



export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUserid(user_id) {
  return Cookies.set(userId, user_id)
}

export function getUserid() {
  return Cookies.get(userId)
}


export function removeUserid() {
  return Cookies.remove(userId)
}

