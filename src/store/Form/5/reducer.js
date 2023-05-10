import { FORM_ACTION } from '../../../constants/Constants'

const initialState = {
  declaration: null,
}
const declarationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORM_ACTION.DECLARATION:
      return {
        ...state,
        declaration: action.payload,
      }
    default:
      return state
  }
}

export default declarationReducer
