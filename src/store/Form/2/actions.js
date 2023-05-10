import FormApi from '../../../apis/FormApi'
import { FORM_ACTION } from '../../../constants/Constants'
import {
  fixApiResponse,
  getCourseType,
  getUserDetail,
  modifyKeys,
  verifyString,
} from '../../../utils/Utils'
import academicDetailsStatic from '../../../views/StudentSrc/StaticData/academic.json'
import coCurriculumStaticData from '../../../StaticData/coCurriculum.json'
import { updateStore } from '../commonActions'

var registrationNo = getUserDetail('user_id')

export const fetchAcademicFacultyDetails = () => {
  return (dispatch) => {
    const data = {
      formAction: FORM_ACTION.ACADEMIC_FACULTY_DETAILS,
      registrationNo,
    }
    FormApi.fetchForm(data).then((response) => {
      response.data = fixApiResponse(response.data)
      response.data.academicDetails = response.data.academicDetails
        ? JSON.parse(
            verifyString(response.data.academicDetails),
            (key, value) => {
              return typeof value === 'string' ? value.trim() : value
            }
          )
        : academicDetailsStatic[
            getCourseType(getUserDetail('course')) +
              '-' +
              getUserDetail('admissionYear')
          ]
      modifyKeys(response.data.academicDetails)
      response.data.majorSubjects = response.data.majorSubjects
        ? JSON.parse(response.data.majorSubjects)
        : []
      response.data.minorSubjects = response.data.minorSubjects
        ? JSON.parse(response.data.minorSubjects)
        : []
      response.data.vocationalSubjects = response.data.vocationalSubjects
        ? JSON.parse(response.data.vocationalSubjects)
        : []
      response.data.coCurriculumSem1 =
        getUserDetail('course') === '1BA' || getUserDetail('course') == '6BSC'
          ? coCurriculumStaticData[getUserDetail('admissionYear')]['ODD']
          : ''
      response.data.coCurriculumSem2 =
        getUserDetail('course') === '1BA' || getUserDetail('course') == '6BSC'
          ? coCurriculumStaticData[getUserDetail('admissionYear')]['EVEN']
          : ''
      dispatch(updateStore(FORM_ACTION.ACADEMIC_FACULTY_DETAILS, response.data))
    })
  }
}

export const submitAcademicFacultyDetails = (data, moveToNextStep) => {
  return (dispatch) => {
    const formData = new FormData()
    formData.append('formAction', FORM_ACTION.ACADEMIC_FACULTY_DETAILS)
    formData.append('registrationNo', registrationNo)
    formData.append('academicDetails', JSON.stringify(data.academicDetails))
    formData.append('majorSubjects', JSON.stringify(data.majorSubjects))
    formData.append('minorSubjects', JSON.stringify(data.minorSubjects))
    formData.append(
      'vocationalSubjects',
      JSON.stringify(data.vocationalSubjects)
    )
    formData.append('coCurriculumSem1', data.coCurriculumSem1)
    formData.append('coCurriculumSem2', data.coCurriculumSem2)
    FormApi.submitForm(formData).then((res) => {
      if (res.status === 200) {
        dispatch(updateStore(FORM_ACTION.ACADEMIC_FACULTY_DETAILS, data))
        moveToNextStep()
      }
    })
  }
}
