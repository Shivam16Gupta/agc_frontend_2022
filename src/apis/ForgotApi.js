import { addErrorMsg, errorDialog } from '../utils/Utils'
import BaseApi from './BaseApi'
import URLS from './Urls'

class ForgotApi {
  async forgotRegistration(data) {
    return BaseApi.getWithParams(URLS.FORGOT_REGISTRATION, data)
      .then((response) => {
        if (response.status === 200) {
          errorDialog(
            'Your registration no. is : ' + response.data.registrationNo,
            'Registration No.'
          )
        }
      })
      .catch(() => {
        addErrorMsg('Entered details does not match')
      })
  }
}

export default new ForgotApi()
