import FormApi from '../../../apis/FormApi'
import LocalStorage from '../../../common/LocalStorage'
import { FORM_ACTION } from '../../../constants/Constants'
import {
  errorDialog,
  fixApiResponse,
  getUserDetail,
  redirectUrl,
} from '../../../utils/Utils'
import { updateStore } from '../commonActions'

var registrationNo = getUserDetail('user_id')

export const fetchDeclarationDetails = () => {
  return (dispatch) => {
    const data = {
      formAction: FORM_ACTION.DECLARATION,
      registrationNo,
    }
    FormApi.fetchForm(data).then((res) => {
      res.data = fixApiResponse(res.data)
      dispatch(updateStore(FORM_ACTION.DECLARATION, res.data))
    })
  }
}

export const submitDeclarationDetails = (data) => {
  return (dispatch) => {
    const formData = new FormData()
    formData.append('formAction', FORM_ACTION.DECLARATION)
    formData.append('registrationNo', registrationNo)
    formData.append('submit', '1')
    formData.append('categoryFile', data.categoryFile)
    formData.append('subCategoryFile', data.subCategoryFile)
    formData.append('signatureFile', data.signatureFile)
    FormApi.submitForm(formData).then((res) => {
      if (res.data && res.status === 200) {
        dispatch(updateStore(FORM_ACTION.DECLARATION, data))
        LocalStorage.setUser(res.data)
        // FOR 2nd AND ABOVE YEAR ADMISSIONS (PAYMENT) CASE NEEDS TO BE ADDED HERE
        // if (payment) {
        // } else {
        // }
        // CURRENTLY "ELSE" IS RUNNING
        errorDialog('Your application is submitted successfully', 'Form')
        redirectUrl('sFormSubmit', 1)
      }
    })
  }
}

export const saveDeclarationDetails = (data) => {
  return (dispatch) => {
    const formData = new FormData()
    formData.append('formAction', FORM_ACTION.DECLARATION)
    formData.append('registrationNo', registrationNo)
    formData.append('categoryFile', data.categoryFile)
    formData.append('subCategoryFile', data.subCategoryFile)
    formData.append('signatureFile', data.signatureFile)
    FormApi.submitForm(formData).then((res) => {
      if (res.status === 200) {
        dispatch(updateStore(FORM_ACTION.DECLARATION, data))
        errorDialog(
          'Your application is saved. Your registration no. is : ' +
            registrationNo,
          'Form'
        )
        LocalStorage.removeUser()
        redirectUrl('/login')
      }
    })
  }
}
