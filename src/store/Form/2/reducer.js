import { FORM_ACTION } from '../../../constants/Constants'

const initialState = {
  academicFacultyDetails: null,
}
const academicFascultyDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORM_ACTION.ACADEMIC_FACULTY_DETAILS:
      return {
        ...state,
        academicFacultyDetails: action.payload,
      }
    default:
      return state
  }
}

export default academicFascultyDetailsReducer
