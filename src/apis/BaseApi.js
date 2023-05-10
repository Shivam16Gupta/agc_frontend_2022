import {
  addLoader,
  getAxios,
  redirectUrl,
  removeLoader,
  unauthorizedUser,
  refreshApp,
} from './../utils/Utils'

class BaseApi {
  async get(URL) {
    addLoader()
    return getAxios()
      .get(URL)
      .then((res) => {
        removeLoader()
        return refreshApp(res)
      })
      .catch((err) => {
        if (unauthorizedUser(err)) {
          redirectUrl('/login')
          removeLoader()
          window.location.reload(true)
        }
        removeLoader()
        throw new Error(err)
      })
  }
  async getWithParams(URL, params) {
    addLoader()
    return getAxios()
      .get(URL, { params: params })
      .then((res) => {
        removeLoader()
        // const tmp=refreshApp(res)
        // return res;
        return refreshApp(res)
      })
      .catch((err) => {
        if (unauthorizedUser(err)) {
          redirectUrl('/login')
          removeLoader()
          window.location.reload(true)
        }
        removeLoader()
        throw new Error(err)
      })
  }
  async postFormData(URL, formData, params) {
    addLoader()
    return getAxios()
      .post(URL, formData, {
        params: params,
      })
      .then((res) => {
        removeLoader()
        return refreshApp(res)
      })
      .catch((err) => {
        if (unauthorizedUser(err)) {
          redirectUrl('/login')
          removeLoader()
          window.location.reload(true)
        }
        removeLoader()
        throw new Error(err)
      })
  }
  async deleteWithParams(URL, params) {
    addLoader()
    return getAxios()
      .delete(URL, { params: params })
      .then((res) => {
        removeLoader()
        return refreshApp(res)
      })
      .catch((err) => {
        if (unauthorizedUser(err)) {
          redirectUrl('/login')
          removeLoader()
          window.location.reload(true)
        }
        removeLoader()
        throw new Error(err)
      })
  }
  async patchFormData(URL, data) {
    addLoader()
    return getAxios()
      .patch(URL, data)
      .then((res) => {
        removeLoader()
        return refreshApp(res)
      })
      .catch((err) => {
        if (unauthorizedUser(err)) {
          redirectUrl('/login')
          removeLoader()
          window.location.reload(true)
        }
        removeLoader()
        throw new Error(err)
      })
  }
}

export default new BaseApi()
