import BaseApi from './BaseApi'
import URLS from './Urls'

class FormApi {
  async submitForm(formData) {
    return BaseApi.postFormData(URLS.FORM_API, formData).then((res) => {
      return res
    })
  }
  async fetchForm(data) {
    return BaseApi.getWithParams(URLS.FORM_API, data)
  }
  async fetchFullForm(data) {
    return BaseApi.getWithParams(URLS.FETCH_FULL_USER_FORM, data).then(
      (res) => {
        return res
      }
    )
  }
  async fetchPaymentReceipts(data) {
    return BaseApi.getWithParams(URLS.FETCHPAYMENTRECEIPTS, data).then(
      (res) => {
        return res
      }
    )
  }
  async fetchPaymentDetails(data) {
    return BaseApi.getWithParams(URLS.FETCHPAYMENTDETAILS, data).then((res) => {
      return res
    })
  }
  async createCheckSum(data) {
    return BaseApi.postFormData(URLS.CHECKSUM, data).then((res) => {
      return res
    })
  }
  async courseFee(data) {
    return BaseApi.getWithParams(URLS.COURSE_FEE, data).then((res) => {
      return res
    })
  }
}

export default new FormApi()
