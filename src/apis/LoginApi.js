import { addErrorMsg } from '../utils/Utils'
import BaseApi from './BaseApi'
import URLS from './Urls'

class LoginApi {
  async userLogin(data) {
    return BaseApi.getWithParams(URLS.LOGIN, data)
      .then((res) => {
        return res
      })
      .catch(() => {
        addErrorMsg('Invalid login or Username password are incorrect')
      })
  }
}

export default new LoginApi()
