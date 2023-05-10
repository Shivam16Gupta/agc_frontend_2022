import FormApi from '../../../apis/FormApi'
import { FORM_ACTION } from '../../../constants/Constants'
import { fixApiResponse, getUserDetail } from '../../../utils/Utils'
import { updateStore } from '../commonActions'

var registrationNo = getUserDetail('user_id')

export const fetchAdvancedDetails = () => {
  return (dispatch) => {
    const data = {
      formAction: FORM_ACTION.ADVANCED_DETAILS,
      registrationNo,
    }
    FormApi.fetchForm(data).then((res) => {
      res.data = fixApiResponse(res.data)
      dispatch(updateStore(FORM_ACTION.ADVANCED_DETAILS, res.data))
    })
  }
}

export const submitAdvancedDetails = (data, moveToNextStep) => {
  return (dispatch) => {
    const formData = new FormData()
    formData.append('formAction', FORM_ACTION.ADVANCED_DETAILS)
    formData.append('registrationNo', registrationNo)
    formData.append('motherName', data.motherName)
    formData.append('parentsOccupation', data.parentsOccupation)
    formData.append('guardianName', data.guardianName)
    formData.append('relationOfApplicant', data.relationOfApplicant)
    formData.append('houseNo', data.houseNo)
    formData.append('street', data.street)
    formData.append('pincode', data.pincode)
    formData.append('postOffice', data.postOffice)
    formData.append('state', data.state)
    formData.append('city', data.city)
    formData.append('cHouseNo', data.cHouseNo)
    formData.append('cStreet', data.cStreet)
    formData.append('cPincode', data.cPincode)
    formData.append('cPostOffice', data.cPostOffice)
    formData.append('cState', data.cState)
    formData.append('cCity', data.cCity)
    FormApi.submitForm(formData).then((res) => {
      if (res.status === 200) {
        dispatch(updateStore(FORM_ACTION.ADVANCED_DETAILS, data))
        moveToNextStep()
      }
    })
  }
}
