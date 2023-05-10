import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import { Autocomplete } from '@material-ui/lab'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RegularButton from '../../../components/CustomButtons/Button'
import CustomInput from '../../../components/CustomInput/CustomInput'
import {
  fetchAcademicFacultyDetails,
  submitAcademicFacultyDetails,
} from '../../../store/Form/2/actions'
import {
  addErrorMsg,
  checkMajorSelectionLimit,
  convertedMajorSubjects,
  getCourseType,
  getUserDetail,
  handleCGPA,
  mandatoryField,
} from '../../../utils/Utils'
import CustomText from '../../../components/CustomText/Customtext'
import academicDetailsStatic from '../StaticData/academic.json'
import academicData from '../../StudentSrc/StaticData/academicData.json'
import documentsStatic from '../../StudentSrc/StaticData/documents.json'
import vocationalStaticData from '../../../StaticData/vocationalSubjects.json'
import coCurriculumStaticData from '../../../StaticData/coCurriculum.json'
import meritCalculateData from '../../StudentSrc/StaticData/meritCalculate.json'
import BARestrictedCombinations from '../../../StaticData/BACombinations.json'
import majorSubjectsStaticData from '../../../StaticData/majorSubjects.json'
import minorSubjectsStaticData from '../../../StaticData/minorSubjects.json'
import streamData from '../../../StaticData/stream.json'
import Validation from '../Validation.json'
import { FORM_ACTION } from '../../../constants/Constants'
import { updateStore } from '../../../store/Form/commonActions'
import { submitDocumentsDetails } from '../../../store/Form/3/actions'
import { submitMeritDetails } from '../../../store/Form/4/actions'

const styles = {
  labelRoot: {
    fontSize: 12,
  },
}

const useStyles = makeStyles(styles)

function AcademicFacultyDetails(props, ref) {
  let dispatch = useDispatch()
  const academicFacultyDetailsData = useSelector(
    (state) => state.academicFacultyDetails.academicFacultyDetails
  )
  const documentsData = useSelector((state) => state.documents.documents)
  const classes = useStyles()
  const [fields, setFields] = useState({
    isChangesMade: false,
    course: getUserDetail('course'),
    admissionYear: getUserDetail('admissionYear'),
    academicDetails:
      academicDetailsStatic[
        getCourseType(getUserDetail('course')) +
          '-' +
          getUserDetail('admissionYear')
      ],
    documents: documentsData
      ? documentsData.documents
      : documentsStatic[
          getCourseType(getUserDetail('course')) +
            '-' +
            getUserDetail('admissionYear')
        ],
    majorSubjects: [],
    minorSubjects: [],
    vocationalSubjects: [],
    coCurriculumSem1:
      getUserDetail('course') === '1BA' || getUserDetail('course') == '6BSC'
        ? coCurriculumStaticData[getUserDetail('admissionYear')]['ODD']
        : '',
    coCurriculumSem2:
      getUserDetail('course') === '1BA' || getUserDetail('course') == '6BSC'
        ? coCurriculumStaticData[getUserDetail('admissionYear')]['EVEN']
        : '',
  })

  let {
    isChangesMade,
    course,
    admissionYear,
    majorSubjects,
    minorSubjects,
    vocationalSubjects,
    documents,
    academicDetails,
    coCurriculumSem1,
    coCurriculumSem2,
  } = fields

  useEffect(() => {
    if (!academicFacultyDetailsData) {
      dispatch(fetchAcademicFacultyDetails())
    } else {
      setFields({
        ...fields,
        ...academicFacultyDetailsData,
        isChangesMade: false,
      })
    }
  }, [academicFacultyDetailsData])

  const handleAddClick = () => {
    setFields({
      ...fields,
      academicDetails: [...academicDetails, ...academicData.academic],
    })
  }

  const handleInputChange = (e, index, val) => {
    const { name, value, checked } = e.target
    const list = [...academicDetails]
    if (val || value.match('^[A-Za-z0-9()/\\+-., $#]*$')) {
      if (val) {
        handleMajorDropDownData(e, val)
      } else if (name === 'promoted') {
        list[index][name] = checked
        setFields({
          ...fields,
          academicDetails: list,
        })
        if (checked) {
          list[index]['totalMarks'] = 0
          list[index]['marksObtained'] = 0
          list[index]['percentage'] = '_'
          setFields({
            ...fields,
            academicDetails: list,
          })
        } else {
          list[index]['totalMarks'] = ''
          list[index]['marksObtained'] = ''
          list[index]['percentage'] = ''
          setFields({
            ...fields,
            academicDetails: list,
          })
        }
      } else {
        if (
          name === 'marksObtained' &&
          (parseInt(value) <= parseInt(list[index]['totalMarks']) ||
            value === '')
        ) {
          list[index][name] = value
          setFields({
            ...fields,
            academicDetails: list,
          })
        } else if (name == 'percentage') {
          list[index][name] = value
          list[index]['totalMarks'] = 0
          list[index]['marksObtained'] = 0
          setFields({
            ...fields,
            academicDetails: list,
          })
        } else if (name !== 'marksObtained') {
          list[index][name] = value
          setFields({
            ...fields,
            academicDetails: list,
          })
        }
      }
      if (name === 'totalMarks' || name === 'marksObtained') {
        if (
          list[index]['totalMarks'] !== '' &&
          list[index]['marksObtained'] !== ''
        ) {
          let totalMarks = list[index]['totalMarks']
          let marksObtained = list[index]['marksObtained']
          let p = parseFloat((marksObtained / totalMarks) * 100).toFixed(2)
          list[index]['percentage'] = p + '%'
          setFields({
            ...fields,
            academicDetails: list,
          })
        }
      } else if (name === 'stream') {
        list.map((item, i) => {
          if (Object.keys(item).find((key) => key === 'major1')) {
            item.major1 = []
          }
        })
        setFields({
          ...fields,
          academicDetails: list,
          majorSubjects: [],
          minorSubjects: [],
          vocationalSem1: '',
          vocationalSem2: '',
        })
      }
    }
  }

  const getMajorFacultyId = () => {
    var facultyId1 = majorSubjects.filter(
      (item) => item.facultyId === majorSubjects[0].facultyId
    )
    var facultyId2 = majorSubjects.filter(
      (item) => item.facultyId === majorSubjects[1].facultyId
    )
    var facultyId3 = majorSubjects.filter(
      (item) => item.facultyId === majorSubjects[2].facultyId
    )
    if (
      facultyId1.length === 3 ||
      facultyId2.length === 3 ||
      facultyId3.length === 3
    ) {
      return majorSubjects[0].facultyId
    } else {
      return 0
    }
  }

  const handleMajorDropDownData = (event, value) => {
    // Limit of Selection
    const selectionLimit = checkMajorSelectionLimit()
    const convertedMS = convertedMajorSubjects(majorSubjects)
    if (majorSubjects.length > value.length || value.length === 0) {
      if (
        convertedMS.length > 0 &&
        convertedMS[0] === 'LLM' &&
        value.length === 0
      ) {
        academicDetails.splice(2, 1)
        academicDetails.splice(2, 1)
        documents.splice(2, 1)
        documents.splice(2, 1)
      } else if (
        convertedMS.length > 0 &&
        convertedMS[0] === 'LLB' &&
        value.length === 0
      ) {
        academicDetails.splice(2, 1)
        documents.splice(2, 1)
      }
      academicDetails.map((item) => {
        if (
          Object.keys(item).find((key) => key === 'major1' || key === 'faculty')
        ) {
          item.major1 = value
        }
      })
      setFields({
        ...fields,
        majorSubjects: value,
        minorSubjects: [],
        vocationalSem1: '',
        vocationalSem2: '',
        academicDetails,
        documents,
      })
      updateDocumentFields()
      updateMeritFields()
    } else {
      if (selectionLimit === 1) {
        if (value.length <= 1) {
          if (value[0].name === 'LLM') {
            academicDetails.splice(
              2,
              0,
              academicDetailsStatic.GraduationDegree,
              academicDetailsStatic.LLB
            )
            documents.splice(
              2,
              0,
              documentsStatic.GraduationDegree,
              documentsStatic.LLB
            )
          } else if (value[0].subjectName === 'LLB') {
            academicDetails.splice(2, 0, academicDetailsStatic.GraduationDegree)
            documents.splice(2, 0, documentsStatic.GraduationDegree)
          }
          academicDetails.map((item) => {
            if (Object.keys(item).find((key) => key === 'major1')) {
              item.major1 = value
            }
          })
          setFields({
            ...fields,
            majorSubjects: value,
            academicDetails,
            documents,
            isChangesMade: true,
          })
          updateDocumentFields()
          updateMeritFields()
        } else {
          addErrorMsg('You can select only 1 subject.')
        }
      } else if (selectionLimit === 3) {
        if (value.length <= 3) {
          // 1 - Combinations are Allowed
          // else - Not Allowed
          const comb = handleCheckCombination(value)
          // Faculty Involvement Check (1 or max 2)
          if (
            (course === '1BA' && admissionYear === '1' && value.length === 3) ||
            admissionYear === '2'
          ) {
            if (comb === 1 || admissionYear === '2') {
              var uniqueIds = []
              value.map((item) => {
                if (!uniqueIds.includes(item.facultyId)) {
                  uniqueIds.push(item.facultyId)
                }
              })
              if (uniqueIds.length <= 2 || admissionYear === '2') {
                academicDetails.map((item) => {
                  if (Object.keys(item).find((key) => key === 'major1')) {
                    item.major1 = value
                  }
                })
                setFields({
                  ...fields,
                  majorSubjects: value,
                  academicDetails,
                  isChangesMade: true,
                })
                updateMeritFields()
              } else {
                addErrorMsg(
                  'You cannot select all subjects of different faculty'
                )
              }
            } else {
              addErrorMsg('Combination of ' + comb + ' is not allowed')
            }
          } else if (
            (course === '1BA' && admissionYear === '1') ||
            admissionYear === '2'
          ) {
            if (comb === 1 || admissionYear === '2') {
              academicDetails.map((item) => {
                if (Object.keys(item).find((key) => key === 'major1')) {
                  item.major1 = value
                }
              })
              setFields({
                ...fields,
                majorSubjects: value,
                academicDetails,
                isChangesMade: true,
              })
              updateMeritFields()
            } else {
              addErrorMsg('Combination of ' + comb + ' is not allowed')
            }
          } else {
            academicDetails.map((item) => {
              if (Object.keys(item).find((key) => key === 'major1')) {
                item.major1 = value
              }
            })
            setFields({
              ...fields,
              majorSubjects: value,
              academicDetails,
              isChangesMade: true,
            })
            updateMeritFields()
          }
        } else {
          addErrorMsg('You can select only 3 subjects.')
        }
      }
    }
  }

  const handlePreferenceDropDown = (event, value, key) => {
    if (admissionYear === '2' && key === 'minorSubjects') {
      if (value.length <= 1) {
        setFields({
          ...fields,
          [key]: value,
        })
      } else {
        addErrorMsg('You can select only 1 subject.')
      }
    } else if (admissionYear === '2' && key === 'vocationalSubjects') {
      if (value.length <= 2) {
        setFields({
          ...fields,
          [key]: value,
        })
      } else {
        addErrorMsg('You can select only 2 subject.')
      }
    } else {
      if (value.length <= 5) {
        setFields({
          ...fields,
          [key]: value,
        })
      } else {
        addErrorMsg('You can select only 5 preference.')
      }
    }
  }

  const handleCheckCombination = (value, key) => {
    for (var i = 0; i < BARestrictedCombinations.length; i++) {
      var combFound = 0
      var c1 = BARestrictedCombinations[i][0]
      var c2 = BARestrictedCombinations[i][1]
      value.map((item) => {
        if (c1 == item.name || c2 == item.name) {
          combFound++
        }
      })
      if (combFound >= 2) {
        break
      }
    }
    return combFound >= 2 ? c1 + ' & ' + c2 : 1
  }

  const filterMinorSubjects = () => {
    if (majorSubjects.length === checkMajorSelectionLimit()) {
      if (
        (course === '1BA' && admissionYear === '1') ||
        (course === '1BA' && admissionYear === '2')
      ) {
        let minorSubjectsList = minorSubjectsStaticData[course][admissionYear]
        const id1 = majorSubjects[0].id
        const id2 = majorSubjects[1].id
        const id3 = majorSubjects[2].id
        var x = minorSubjectsList.filter((itm) => itm.majorId !== id1)
        var y = x.filter((itm) => itm.majorId !== id2)
        var z = y.filter((itm) => itm.majorId !== id3)
        const id = getMajorFacultyId()
        if (id !== 0 && admissionYear === '1') {
          let final = z.filter((item) => item.facultyId !== id)
          let subjects = [...final]
          minorSubjects.map((item) => {
            let index = subjects.findIndex((itm) => item.id === itm.id)
            subjects.splice(index, 1)
          })
          return subjects
        } else {
          let subjects = [...z]
          minorSubjects.map((item) => {
            let index = subjects.findIndex((itm) => item.id === itm.id)
            subjects.splice(index, 1)
          })
          return subjects
        }
      } else if (course === '6BSC' && admissionYear === '1') {
        let subjects = [...minorSubjectsStaticData['6BSC']['1']]
        minorSubjects.map((item) => {
          let index = subjects.findIndex((itm) => item.id === itm.id)
          subjects.splice(index, 1)
        })
        return subjects
      } else if (course === '6BSC' && admissionYear === '2') {
        let subjects = [...minorSubjectsStaticData['6BSC']['2']]
        minorSubjects.map((item) => {
          let index = subjects.findIndex((itm) => item.id === itm.id)
          subjects.splice(index, 1)
        })
        return subjects
      }
    } else {
      return []
    }
  }

  const updateDocumentFields = () => {
    dispatch(
      updateStore(FORM_ACTION.UPLOAD_DOCUMENTS, {
        documents,
      })
    )
  }

  const updateMeritFields = () => {
    dispatch(updateStore(FORM_ACTION.MERIT_DETAILS, meritFields()))
  }

  const meritFields = () => {
    return {
      nationalCompetition: '',
      nationalCertificate: '',
      otherCompetition: '',
      otherCertificate: '',
      ncc: '',
      uploadExtraMark: null,
      nccCertificate: '',
      freedomFighter: false,
      nationalSevaScheme: false,
      nssDocument: '',
      roverRanger: '',
      otherRoverRanger: false,
      rrDocument: '',
      bcom: false,
      other: '',
      totalMerit: {
        ...meritCalculateData,
      },
      totalMeritCount: 0,
    }
  }

  const handleRemoveClick = (index) => {
    const list = [...academicDetails]
    list.splice(index, 1)
    setFields({
      ...fields,
      academicDetails: list,
    })
  }

  // 0: not null, >1: null
  const checkJSONfields = (data) => {
    let isNull = 0
    if (data && data.length > 0) {
      data.map((item, i) => {
        for (let k in item) {
          if (
            typeof item[k] == 'string' &&
            (item[k] == undefined ||
              item[k] == 'undefined' ||
              item[k] == 'null' ||
              item[k] == null ||
              item[k] == '')
          ) {
            isNull = isNull + 1
            break
          }
        }
      })
    }
    return isNull
  }

  const handleSubmit = () => {
    if (academicDetails && checkJSONfields(academicDetails) <= 0) {
      let fac = 0
      if (course === '1BA' || course === '6BSC') {
        if (majorSubjects.length === checkMajorSelectionLimit()) {
          if (admissionYear !== '3') {
            if (admissionYear === '1') {
              if (
                minorSubjects.length > 3 &&
                minorSubjects.length <= 5 &&
                vocationalSubjects.length > 3 &&
                vocationalSubjects.length <= 5
              ) {
                fac = 1
              } else {
                addErrorMsg(
                  'Please Select Minor and Vocaltional Subjects Preference (5 Must)'
                )
              }
            } else if (admissionYear === '2') {
              if (
                minorSubjects.length === 1 &&
                vocationalSubjects.length === 2
              ) {
                fac = 1
              } else {
                addErrorMsg(
                  'Please Select (1) Minor Subject and (2) Vocational Subjects'
                )
              }
            }
          } else {
            fac = 1
          }
        } else {
          addErrorMsg('Please Select Major Subjects')
        }
      } else {
        if (checkMajorSelectionLimit() === majorSubjects.length) {
          fac = 1
        } else {
          addErrorMsg('Please Select Major Subject')
        }
      }
      if (fac == 1) {
        if (isChangesMade) {
          dispatch(submitDocumentsDetails({ documents }))
          dispatch(submitMeritDetails(meritFields()))
        }
        dispatch(
          submitAcademicFacultyDetails(fields, () => props.moveToNextStep())
        )
      }
    } else {
      addErrorMsg("Fill the empty fields in 'Academic Details' Section")
    }
  }

  const handleChangeFields = (event) => {
    const name = event.target.name
    setFields({
      ...fields,
      [name]: event.target.value,
    })
  }

  useImperativeHandle(ref, () => ({
    handleSubmitAcademicFacultyDetails() {
      handleSubmit()
    },
  }))

  const filterMajorSubjects = () => {
    let subjects = majorSubjectsStaticData.filter(
      (item) =>
        item.courseId === course && // Filtering by "Course"
        item.streamId.includes(academicDetails[1].stream) && // Filtering by "Stream"
        item.years.includes(admissionYear) && // Filtering by "Year"
        item.id !== '014LIS' // It is a "Minor Subject" no need to show here
    )
    majorSubjects.map((item) => {
      let index = subjects.findIndex((itm) => item.id === itm.id)
      subjects.splice(index, 1)
    })
    return subjects
  }

  const filterVocationalSubjects = (year) => {
    let subjects = [
      ...vocationalStaticData.filter((item) =>
        item.year.includes(parseInt(year))
      ),
    ]
    vocationalSubjects.map((item) => {
      let index = subjects.findIndex((itm) => item.id === itm.id)
      subjects.splice(index, 1)
    })
    return subjects
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className="headBg">
        <CustomText white upperCase>
          Academic Details
        </CustomText>
      </Grid>
      <Grid item xs={12}>
        {academicDetails.length > 0 &&
          academicDetails.map((item, i) => (
            <Box p={1} key={i}>
              <Grid container spacing={2} alignItems="center">
                <Grid item md={2} xs={12}>
                  <CustomInput
                    isMandatory={true}
                    minLength={Validation['nameOfExam']['minLength']}
                    maxLength={Validation['nameOfExam']['maxLength']}
                    smallLabel
                    labelText={mandatoryField('Name of Exam')}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      name: 'nameOfExam',
                      value: item.nameOfExam,
                      disabled: item.isDelete === 0,
                    }}
                    handleChange={(e) => handleInputChange(e, i)}
                  />
                </Grid>
                {Object.keys(item).find((key) => key === 'major1') ? (
                  <Grid item md={3} xs={12}>
                    <Box pt="5px">
                      <Autocomplete
                        value={item.major1}
                        onChange={(e, value) => handleInputChange(e, i, value)}
                        multiple
                        name="major1"
                        options={majorSubjectsStaticData.filter(
                          (itm) =>
                            itm.courseId === course &&
                            itm.streamId.includes(academicDetails[1].stream) &&
                            itm.years.includes(admissionYear) &&
                            itm.id !== '014LIS'
                        )}
                        getOptionLabel={(option) => option.name}
                        filterSelectedOptions
                        renderInput={(params) => (
                          <TextField
                            label={mandatoryField(
                              'Select Major Subjects / Course'
                            )}
                            {...params}
                            variant="outlined"
                          />
                        )}
                      />
                    </Box>
                  </Grid>
                ) : (
                  <Grid item md={2} xs={12}>
                    <CustomInput
                      isMandatory={true}
                      minLength={Validation['board']['minLength']}
                      maxLength={Validation['board']['maxLength']}
                      smallLabel
                      labelText={mandatoryField('Name of Board')}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: 'board',
                        value: item.board,
                      }}
                      handleChange={(e) => handleInputChange(e, i)}
                    />
                    <CustomInput
                      isMandatory={true}
                      minLength={Validation['institution']['minLength']}
                      maxLength={Validation['institution']['maxLength']}
                      smallLabel
                      labelText={mandatoryField('Name of Institution')}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: 'institution',
                        value: item.institution,
                      }}
                      handleChange={(e) => handleInputChange(e, i)}
                    />
                  </Grid>
                )}
                <Grid item md={1} xs={6}>
                  <CustomInput
                    isMandatory={true}
                    minLength={Validation['year']['minLength']}
                    maxLength={Validation['year']['maxLength']}
                    smallLabel
                    labelText={mandatoryField('Year')}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      name: 'year',
                      value: item.year,

                      type: 'number',
                    }}
                    handleChange={(e) => handleInputChange(e, i)}
                  />
                </Grid>
                <Grid item md={1} xs={6}>
                  <CustomInput
                    isMandatory={true}
                    minLength={Validation['rollNo']['minLength']}
                    maxLength={Validation['rollNo']['maxLength']}
                    smallLabel
                    labelText={mandatoryField('Roll No.')}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      name: 'rollNo',
                      value: item.rollNo,
                    }}
                    handleChange={(e) => handleInputChange(e, i)}
                  />
                </Grid>
                <Grid item md={2} xs={6}>
                  <CustomInput
                    isMandatory={true}
                    minLength={Validation['totalMarks']['minLength']}
                    maxLength={Validation['totalMarks']['maxLength']}
                    smallLabel
                    labelText={mandatoryField('Total Marks')}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      name: 'totalMarks',
                      value: item.totalMarks,
                      type: 'number',
                      disabled:
                        item.promoted ||
                        handleCGPA(admissionYear, course, i) > 0,
                    }}
                    handleChange={(e) => handleInputChange(e, i)}
                  />
                  <CustomInput
                    isMandatory={true}
                    minLength={Validation['marksObtained']['minLength']}
                    maxLength={Validation['marksObtained']['maxLength']}
                    smallLabel
                    labelText={mandatoryField('Marks Obtained')}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      name: 'marksObtained',
                      value: item.marksObtained,
                      type: 'number',
                      disabled:
                        item.promoted ||
                        handleCGPA(admissionYear, course, i) > 0,
                    }}
                    handleChange={(e) => handleInputChange(e, i)}
                  />
                </Grid>
                <Grid item md={1} xs={6}>
                  <CustomInput
                    isMandatory={true}
                    minLength={Validation['percentage']['minLength']}
                    maxLength={Validation['percentage']['maxLength']}
                    smallLabel
                    labelText={mandatoryField(
                      handleCGPA(admissionYear, course, i) < 1
                        ? 'Percentage'
                        : 'Percentage / CGPA'
                    )}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      name: 'percentage',
                      value: item.percentage,
                      type:
                        handleCGPA(admissionYear, course, i) < 1
                          ? 'text'
                          : 'number',
                      disabled:
                        handleCGPA(admissionYear, course, i) < 1 ? true : false,
                    }}
                    handleChange={(e) => handleInputChange(e, i)}
                  />
                </Grid>
                <Grid
                  item
                  md={Object.keys(item).find((key) => key === 'stream') ? 1 : 2}
                  xs={
                    Object.keys(item).find((key) => key === 'stream') ? 6 : 12
                  }
                >
                  {Object.keys(item).find((key) => key === 'promoted') ? (
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="5"
                          checked={item.promoted}
                          onChange={(e) => handleInputChange(e, i)}
                          name="promoted"
                          color="primary"
                        />
                      }
                      label="Promoted?"
                    />
                  ) : (
                    <CustomInput
                      isMandatory={true}
                      minLength={Validation['subjects']['minLength']}
                      maxLength={Validation['subjects']['maxLength']}
                      smallLabel
                      labelText={mandatoryField('Subjects')}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: 'subjects',
                        value: item.subjects,
                      }}
                      handleChange={(e) => handleInputChange(e, i)}
                    />
                  )}
                </Grid>
                {Object.keys(item).find((key) => key === 'stream') ? (
                  <Grid item md={2} xs={6}>
                    <TextField
                      InputLabelProps={{
                        classes: {
                          root: classes.labelRoot,
                        },
                      }}
                      select
                      fullWidth
                      size="small"
                      variant="outlined"
                      name="stream"
                      label={mandatoryField('Stream')}
                      value={item.stream}
                      onChange={(e) => handleInputChange(e, i)}
                    >
                      {streamData.map((item, key) => (
                        <MenuItem key={key} value={item.streamId}>
                          {item.stream}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                ) : null}
                <Grid container item md={1} xs={4} justifyContent="flex-end">
                  {item.isDelete === 1 && (
                    <RegularButton
                      fab
                      size="sm"
                      color="danger"
                      onClick={() => handleRemoveClick(i)}
                    >
                      <DeleteIcon />
                    </RegularButton>
                  )}
                </Grid>
                <Grid container item xs={12} justifyContent="flex-end">
                  {academicDetails && academicDetails.length - 1 === i && (
                    <Box pr="10px" pb="5px">
                      <div className="alignCenter">
                        <Typography>
                          Press on <b>"+"</b> button to add more certifications
                          / courses. &nbsp;&nbsp;
                        </Typography>
                        <RegularButton size="sm" onClick={handleAddClick}>
                          <AddIcon />
                        </RegularButton>
                      </div>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Box>
          ))}
      </Grid>
      <Grid item xs={12} className="headBg">
        <CustomText white upperCase>
          Faculty & Courses Details
        </CustomText>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          Selection of Major Subjects
        </Typography>
        <Divider />
      </Grid>
      {academicDetails.length > 0 && (
        <Grid item xs={12}>
          {(admissionYear === '2' || admissionYear === '3') &&
            (course === '1BA' || course === '6BSC') && (
              // This label will be shown only to "BA" and "BSC" (2nd Year Students)
              <CustomText spacing upperCase>
                3 Major Subjects to be filled must be the same as taken in the
                UG Previous Year University Examination.
              </CustomText>
            )}
          <Autocomplete
            multiple
            name="majorSubjects"
            value={majorSubjects}
            options={filterMajorSubjects(majorSubjects)}
            getOptionLabel={(option) => option.name}
            onChange={handleMajorDropDownData}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                label={mandatoryField('Select Subject / Course')}
                {...params}
                variant="outlined"
              />
            )}
          />
        </Grid>
      )}
      {(admissionYear === '1' || admissionYear === '2') &&
        (course === '1BA' || course === '6BSC') && (
          <Grid item xs={12}>
            <CustomText spacing upperCase>
              {admissionYear === '1'
                ? 'For Minor, choose 5 options, in order of preference, however, any minor can be allotted depending upon the availability of seats.'
                : '1 Minor Subject to be filled must be the same as taken in the UG first year university examination'}
            </CustomText>
            <Autocomplete
              disabled={majorSubjects.length !== checkMajorSelectionLimit()}
              multiple
              name="minorSubjects"
              value={minorSubjects}
              options={filterMinorSubjects(minorSubjects)}
              getOptionLabel={(option) => option.name}
              onChange={(e, val) =>
                handlePreferenceDropDown(e, val, 'minorSubjects')
              }
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  label={mandatoryField('Select Minor Subjects')}
                  {...params}
                  variant="outlined"
                />
              )}
            />
          </Grid>
        )}
      {(admissionYear === '1' || admissionYear === '2') &&
        (course === '1BA' || course === '6BSC') && (
          <Grid item xs={12}>
            <CustomText spacing upperCase>
              {admissionYear === '1'
                ? 'For Vocational Course, choose 5 options, in order of preference, however, any Vocational Course can be allotted depending upon the availability of seats.'
                : '2 Vocational courses to be filled must be the same as taken in the UG first year university examination'}
            </CustomText>
            <Autocomplete
              multiple
              name="vocationalSubjects"
              value={vocationalSubjects}
              options={filterVocationalSubjects(admissionYear)}
              getOptionLabel={(option) => option.name}
              onChange={(e, val) =>
                handlePreferenceDropDown(e, val, 'vocationalSubjects')
              }
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  label={mandatoryField('Select Vocational Subjects')}
                  {...params}
                  variant="outlined"
                />
              )}
            />
          </Grid>
        )}
      {(course === '1BA' || course === '6BSC') && (
        <Grid item xs={12}>
          <Typography variant="subtitle1">Co-Curriculum</Typography>
          <Divider />
        </Grid>
      )}
      {(course === '1BA' || course === '6BSC') && (
        <Grid item xs={6}>
          <TextField
            disabled={true}
            fullWidth
            variant="outlined"
            name="coCurriculumSem1"
            label={mandatoryField('Odd Semester')}
            value={coCurriculumSem1}
            onChange={handleChangeFields}
          />
        </Grid>
      )}
      {(course === '1BA' || course === '6BSC') && (
        <Grid item xs={6}>
          <TextField
            disabled={true}
            fullWidth
            variant="outlined"
            name="coCurriculumSem2"
            label={mandatoryField('Even Semester')}
            value={coCurriculumSem2}
            onChange={handleChangeFields}
          />
        </Grid>
      )}
    </Grid>
  )
}
export default forwardRef(AcademicFacultyDetails)
