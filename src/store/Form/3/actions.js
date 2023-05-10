import FormApi from '../../../apis/FormApi'
import { FORM_ACTION } from '../../../constants/Constants'
import { fixApiResponse, getUserDetail } from '../../../utils/Utils'
import { updateStore } from '../commonActions'

var registrationNo = getUserDetail('user_id')

export const fetchDocumentsDetails = () => {
  return (dispatch) => {
    const data = {
      formAction: FORM_ACTION.UPLOAD_DOCUMENTS,
      registrationNo,
    }
    FormApi.fetchForm(data).then((res) => {
      res.data = fixApiResponse(res.data)
      res.data.documents = res.data.documents
        ? JSON.parse(res.data.documents)
        : []
      dispatch(updateStore(FORM_ACTION.UPLOAD_DOCUMENTS, res.data))
    })
  }
}

export const submitDocumentsDetails = (data, moveToNextStep) => {
  return (dispatch) => {
    const formData = new FormData()
    formData.append('formAction', FORM_ACTION.UPLOAD_DOCUMENTS)
    formData.append('registrationNo', registrationNo)
    formData.append('documents', JSON.stringify(data.documents))
    data.documents &&
      data.documents.length > 0 &&
      data.documents.map(
        (item, index) =>
          item.document &&
          item.document !== '' &&
          typeof item.document === 'object' &&
          formData.append('document' + index, item.document)
      )
    FormApi.submitForm(formData).then((res) => {
      if (res.status === 200) {
        dispatch(updateStore(FORM_ACTION.UPLOAD_DOCUMENTS, data))
        moveToNextStep && moveToNextStep()
      }
    })
  }
}
