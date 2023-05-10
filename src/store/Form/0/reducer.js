import { FORM_ACTION } from '../../../constants/Constants'

const initialState = {
  userSubDetails: null,
}
const userSubDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORM_ACTION.USER_SUB_DETAILS:
      return {
        ...state,
        userSubDetails: action.payload,
      }
    default:
      return state
  }
}

export default userSubDetailsReducer
