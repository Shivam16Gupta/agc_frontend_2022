import { combineReducers } from 'redux'
import userSubDetailsReducer from './Form/0/reducer'
import advancedDetailsReducer from './Form/1/reducer'
import academicFacultyDetailsReducer from './Form/2/reducer'
import uploadDocumentsReducer from './Form/3/reducer'
import meritDetailsReducer from './Form/4/reducer'
import declarationReducer from './Form/5/reducer'

const rootReducer = combineReducers({
  userSubDetails: userSubDetailsReducer,
  advancedDetails: advancedDetailsReducer,
  academicFacultyDetails: academicFacultyDetailsReducer,
  documents: uploadDocumentsReducer,
  meritDetails: meritDetailsReducer,
  declaration: declarationReducer,
})
export default rootReducer
