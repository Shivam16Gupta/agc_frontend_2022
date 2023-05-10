import { FORM_ACTION } from '../../../constants/Constants'

const initialState = {
  meritDetails: null,
}
const meritDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORM_ACTION.MERIT_DETAILS:
      return {
        ...state,
        meritDetails: action.payload,
      }
    default:
      return state
  }
}

export default meritDetailsReducer
