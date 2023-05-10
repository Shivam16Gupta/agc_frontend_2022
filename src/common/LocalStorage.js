// var storage = window.localStorage
var sessionStorage = window.sessionStorage
// import { isJSON } from './../utils/Utils'
import jwt_decode from 'jwt-decode'

const LocalStorage = () => {
  return {
    setUser(obj) {
      sessionStorage.setItem('user_obj', obj)
    },
    getUserToken() {
      return (
        sessionStorage.getItem('user_obj') && sessionStorage.getItem('user_obj')
      )
    },
    getUser() {
      return (
        sessionStorage.getItem('user_obj') &&
        jwt_decode(sessionStorage.getItem('user_obj')).data
      )
      // isJSON(sessionStorage.getItem('user_obj')) &&
      // JSON.parse(sessionStorage.getItem('user_obj'))
    },
    removeUser() {
      sessionStorage.removeItem('user_obj')
    },
    getLogout() {
      this.removeUser()
    },
  }
}

export default new LocalStorage()
