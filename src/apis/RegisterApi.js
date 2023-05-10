import { addSuccessMsg } from 'utils/Utils'
import { addErrorMsg } from '../utils/Utils'
import BaseApi from './BaseApi'
import URLS from './Urls'

class RegisterApi {
  async StudentRegister(formData) {
    return BaseApi.postFormData(URLS.STUDENTREGISTER, formData).then((res) => {
      if (res.data.error) {
        addErrorMsg(res.data.message)
      } else {
        addSuccessMsg('SignUp Successful.')
      }
      return res
    })
  }
  async previousSessionCheck(data) {
    return BaseApi.getWithParams(URLS.PREVIOUS_SESSION_CHECK, data).then(
      (res) => {
        return res
      }
    )
  }
}

export default new RegisterApi()
