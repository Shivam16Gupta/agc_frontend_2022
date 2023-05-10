import FormApi from '../../../apis/FormApi'
import { FORM_ACTION } from '../../../constants/Constants'
import { fixApiResponse, getUserDetail } from '../../../utils/Utils'
import { updateStore } from '../commonActions'

var registrationNo = getUserDetail('user_id')

export const fetchUserSubDetails = () => {
  return (dispatch) => {
    const data = {
      formAction: FORM_ACTION.USER_SUB_DETAILS,
      registrationNo,
    }
    FormApi.fetchForm(data).then((res) => {
      res.data = fixApiResponse(res.data)
      dispatch(updateStore(FORM_ACTION.USER_SUB_DETAILS, res.data))
    })
  }
}

export const submitUserSubDetails = (data, moveToNextStep) => {
  return (dispatch) => {
    const formData = new FormData()
    formData.append('formAction', FORM_ACTION.USER_SUB_DETAILS)
    formData.append('registrationNo', registrationNo)
    formData.append('ern', data.ern)
    formData.append('nameTitle', data.nameTitle)
    formData.append('religion', data.religion)
    formData.append('caste', data.caste)
    formData.append('parentMobile', data.parentMobile)
    formData.append('aadharNo', data.aadharNo)
    formData.append('email', data.email)
    formData.append('mediumOfInstitution', data.mediumOfInstitution)
    formData.append('passportPhoto', data.passportPhoto)
    formData.append('wrn', data.wrn)
    formData.append('wrnFile', data.wrnFile)
    FormApi.submitForm(formData).then((res) => {
      if (res.status === 200) {
        dispatch(updateStore(FORM_ACTION.USER_SUB_DETAILS, data))
        moveToNextStep()
      }
    })
  }
}
