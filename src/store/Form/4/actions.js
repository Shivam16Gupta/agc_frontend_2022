import FormApi from '../../../apis/FormApi'
import { FORM_ACTION } from '../../../constants/Constants'
import { updateStore } from '../commonActions'
import { fixApiResponse, getUserDetail } from '../../../utils/Utils'

var registrationNo = getUserDetail('user_id')

export const fetchMeritDetails = () => {
  return (dispatch) => {
    const data = {
      formAction: FORM_ACTION.MERIT_DETAILS,
      registrationNo,
    }
    FormApi.fetchForm(data).then((res) => {
      res.data = fixApiResponse(res.data)
      res.data.totalMeritCount = !res.data.totalMeritCount
        ? 0
        : parseInt(res.data.totalMeritCount)
      dispatch(updateStore(FORM_ACTION.MERIT_DETAILS, res.data))
    })
  }
}

export const submitMeritDetails = (data, moveToNextStep) => {
  return (dispatch) => {
    const formData = new FormData()
    formData.append('formAction', FORM_ACTION.MERIT_DETAILS)
    formData.append('registrationNo', registrationNo)
    formData.append('nationalCompetition', data.nationalCompetition)
    formData.append('nationalCertificate', data.nationalCertificate)
    formData.append('otherCompetition', data.otherCompetition)
    formData.append('otherCertificate', data.otherCertificate)
    formData.append('ncc', data.ncc)
    formData.append('nccCertificate', data.nccCertificate)
    formData.append('freedomFighter', data.freedomFighter)
    formData.append('nationalSevaScheme', data.nationalSevaScheme)
    formData.append('nssDocument', data.nssDocument)
    formData.append('roverRanger', data.roverRanger)
    formData.append('otherRoverRanger', data.otherRoverRanger)
    formData.append('rrDocument', data.rrDocument)
    formData.append('bcom', data.bcom)
    formData.append('other', data.other)
    formData.append('uploadExtraMark', data.uploadExtraMark)
    formData.append('totalMeritCount', data.totalMeritCount)
    FormApi.submitForm(formData).then((res) => {
      if (res.status === 200) {
        dispatch(updateStore(FORM_ACTION.MERIT_DETAILS, data))
        moveToNextStep && moveToNextStep()
      }
    })
  }
}
