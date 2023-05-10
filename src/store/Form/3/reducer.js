import { FORM_ACTION } from '../../../constants/Constants'

const initialState = {
  documents: null,
}
const documentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORM_ACTION.UPLOAD_DOCUMENTS:
      return {
        ...state,
        documents: action.payload,
      }
    default:
      return state
  }
}

export default documentsReducer
