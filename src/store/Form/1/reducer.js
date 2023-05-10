import { FORM_ACTION } from '../../../constants/Constants'

const initialState = {
  advancedDetails: null,
}
const advancedDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORM_ACTION.ADVANCED_DETAILS:
      return {
        ...state,
        advancedDetails: action.payload,
      }
    default:
      return state
  }
}

export default advancedDetailsReducer
