import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core'
import React from 'react'
import FormApi from '../../apis/FormApi'
import CardContainer from '../../common/CardContainer'
import CustomTable from '../../components/Table/PrintTable'
import {
  calculateMerit,
  fixApiResponse,
  getCourseType,
  getUserDetail,
  modifyKeys,
  verifyString,
} from '../../utils/Utils'
import { Autocomplete } from '@material-ui/lab'
import academicDetailsStatic from '../../views/StudentSrc/StaticData/academic.json'
import coCurriculumStaticData from '../../StaticData/coCurriculum.json'
import CustomText from '../../components/CustomText/Customtext'
import CustomInput from '../../components/CustomInput/CustomInput'
import streamData from '../../StaticData/stream.json'
import { ASSETS } from '../../constants/Constants'
import coursesStaticData from '../../StaticData/courses.json'
import categoryStaticData from '../../StaticData/category.json'
import subCategoryStaticData from '../../StaticData/subCategory.json'
import religionStaticData from '../../views/StudentSrc/StaticData/religion.json'
import statesStaticData from '../../views/StudentSrc/StaticData/states.json'
import citiesStaticData from '../../views/StudentSrc/StaticData/cities.json'
import majorSubjectsStaticData from '../../StaticData/majorSubjects.json'

const styles = {
  labelRoot: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  profilePhoto: {
    width: '100px',
    height: '120px',
    borderRadius: '5px',
  },
  signature: {
    width: '50px',
    height: '50px',
  },
}

class FormPreview extends React.Component {
  constructor() {
    super()
    this.state = {
      userFormData: '',
      course: getUserDetail('course'),
      admissionYear: getUserDetail('admissionYear'),
    }
  }

  componentDidMount() {
    const data = { registrationNo: getUserDetail('user_id') }
    FormApi.fetchFullForm(data).then((response) => {
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
      response.data.documents = response.data.documents
        ? JSON.parse(response.data.documents)
        : []
      response.data.totalMeritCount = !response.data.totalMeritCount
        ? 0
        : parseInt(response.data.totalMeritCount)
      this.setState({ userFormData: response.data })
    })
  }
  filterMajorSubjects = () => {
    const { userFormData, course, admissionYear } = this.state
    let subjects = majorSubjectsStaticData.filter(
      (item) =>
        item.courseId === course && // Filtering by "Course"
        item.streamId.includes(userFormData.academicDetails[1].stream) && // Filtering by "Stream"
        item.years.includes(admissionYear) && // Filtering by "Year"
        item.id !== '014LIS' // It is a "Minor Subject" no need to show here
    )
    userFormData.majorSubjects.map((item) => {
      let index = subjects.findIndex((itm) => item.id === itm.id)
      subjects.splice(index, 1)
    })
    return subjects
  }

  formatUsersData1 = (data) => {
    var formatted = data.map((item) => {
      return [
        categoryStaticData.find((itm) => itm.categoryId === item.category)
          .category,
        subCategoryStaticData.find(
          (itm) => itm.subCategoryId === item.subCategory
        ).subCategory,
        religionStaticData.find((itm) => itm.religionId === item.religion)
          .religion,
        item.caste,
      ]
    })
    return formatted
  }
  formatUsersData2 = (data) => {
    var formatted = data.map((item) => {
      return [
        item.parentMobile,
        item.aadharNo,
        item.mediumOfInstitution,
        item.wrn,
      ]
    })
    return formatted
  }

  formatAdvancedDetailsData1 = (data) => {
    var formatted = data.map((item) => {
      return [
        item.fatherName,
        item.motherName,
        item.parentsOccupation,
        item.guardianName,
        item.relationOfApplicant,
      ]
    })
    return formatted
  }
  formatAdvancedDetailsData2 = (data) => {
    var formatted = data.map((item) => {
      return [
        item.houseNo,
        item.street,
        item.pincode,
        item.postOffice,
        statesStaticData.find((itm) => itm.code === item.state).name,
        citiesStaticData.find((itm) => itm.id === item.city).name,
      ]
    })
    return formatted
  }

  formatAdvancedDetailsData3 = (data) => {
    var formatted = data.map((item) => {
      return [
        item.cHouseNo,
        item.cStreet,
        item.cPincode,
        item.cPostOffice,
        statesStaticData.find((itm) => itm.code === item.cState).name,
        citiesStaticData.find((itm) => itm.id === item.cCity).name,
      ]
    })
    return formatted
  }

  formatFacultyDetailsData = (data) => {
    var formatted = data.map((item) => {
      return [
        this.getJsonSelections(item.majorSubjects),
        item.minorSubjects && item.minorSubjects.length > 0
          ? this.getJsonSelections(item.minorSubjects) +
            ' (DEPENDS UPON AVAILABILITY OF SEATS.)'
          : '-',
        item.vocationalSubjects && item.vocationalSubjects.length > 0
          ? this.getJsonSelections(item.vocationalSubjects) +
            ' (DEPENDS UPON AVAILABILITY OF SEATS.)'
          : '-',
        item.coCurriculumSem1 && item.coCurriculumSem1 !== ''
          ? item.coCurriculumSem1
          : '-',
        item.coCurriculumSem2 && item.coCurriculumSem2 !== ''
          ? item.coCurriculumSem2
          : '-',
      ]
    })
    return formatted
  }

  formatMeritDetailsData1 = (data) => {
    var formatted = data.map((item) => {
      return [
        this.getMeritValue(item.nationalCompetition),
        this.getMeritValue(item.otherCompetition),
        this.getMeritValue(item.ncc),
        item.freedomFighter ? 'YES' : 'NO',
        item.nationalSevaScheme ? 'YES' : 'NO',
      ]
    })
    return formatted
  }

  formatMeritDetailsData2 = (data) => {
    var formatted = data.map((item) => {
      return [
        this.getMeritValue(item.roverRanger),
        item.otherRoverRanger ? 'YES' : 'NO',
        item.bcom ? 'YES' : 'NO',
        this.getMeritValue(item.other),
        item.totalMeritCount,
      ]
    })
    return formatted
  }

  getMeritValue = (value) => {
    if (!value || value === '' || value === 'none,0') {
      return '-'
    } else {
      return value.split(',')[0]
    }
  }

  getJsonSelections = (json) => {
    let str = ''
    json.map((item, i) => {
      if (str === '') {
        str = str + item.name
      } else {
        str = str + ', ' + item.name
      }
    })
    return str
  }

  convertDOB = (dob) => {
    if (dob) {
      let convertedDob = dob.split('-')
      return convertedDob[2] + '-' + convertedDob[1] + '-' + convertedDob[0]
    }
  }

  checkCourseDetails = () => {
    if (
      (getUserDetail('course') === '1BA' ||
        getUserDetail('course') === '6BSC') &&
      (getUserDetail('admissionYear') === '1' ||
        getUserDetail('admissionYear') === '2')
    ) {
      return 1
    } else {
      return 2
    }
  }

  render() {
    const { userFormData, course, admissionYear } = this.state
    const { classes } = this.props
    return (
      <div className="childContainer">
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Box py={2}>
              <CustomText small bold>
                APPLICATION FORM
              </CustomText>
            </Box>
          </Grid>
          <Grid container item xs={6} justifyContent="center">
            <Box py={2}>
              <CustomText xLarge bold>
                AGRA COLLEGE, AGRA
              </CustomText>
            </Box>
          </Grid>
          <Grid container item xs={3} justifyContent="flex-end">
            <img alt="logo" src="agracollege.png" className="logo" />
          </Grid>
          <Grid container item xs={12}>
            <CardContainer
              plainHeader
              darkHeading
              heading={'STUDENT INFO'}
              buttons={[]}
            >
              <Grid container spacing={2}>
                <Grid container item md={2} xs={3} justifyContent="center">
                  <img
                    className={classes.profilePhoto}
                    src={ASSETS.url + userFormData.passportPhoto}
                  />
                  <div className="center">
                    <img
                      className={classes.signature}
                      src={ASSETS.url + userFormData.signatureFile}
                    />
                    <CustomText small>SIGNATURE</CustomText>
                  </div>
                </Grid>
                <Grid item md={6} xs={5}>
                  <CustomText>
                    Registration No. : <b>{userFormData.registrationNo}</b>
                  </CustomText>
                  <CustomText bold>
                    {userFormData.nameTitle + ' ' + userFormData.name}
                  </CustomText>
                  <CustomText>{userFormData.email}</CustomText>
                  <CustomText>{this.convertDOB(userFormData.dob)}</CustomText>
                  <CustomText>{userFormData.gender}</CustomText>
                  <CustomText>{userFormData.mobile}</CustomText>
                  <CustomText large>
                    APPLIED FOR :{' '}
                    <b>
                      {userFormData &&
                        coursesStaticData.find(
                          (item) => item.courseId === userFormData.course
                        ).courseName +
                          ' (Year - ' +
                          userFormData.admissionYear +
                          ')'}
                    </b>
                  </CustomText>
                </Grid>
                <Grid item md={4} xs={4}>
                  <Typography variant="h5" component="div" gutterBottom>
                    <b>
                      {userFormData &&
                        admissionYear &&
                        course &&
                        admissionYear === '1' &&
                        (course === '1BA' ||
                          course === '6BSC' ||
                          course === '8BCOM') &&
                        'Your Merit is (' +
                          calculateMerit(
                            getCourseType(course),
                            admissionYear,
                            userFormData.academicDetails,
                            userFormData.totalMeritCount,
                            userFormData.majorSubjects,
                            userFormData.bcom
                          ) +
                          ')'}
                    </b>
                  </Typography>
                </Grid>
              </Grid>
            </CardContainer>
          </Grid>
          <Grid item xs={6}>
            <CardContainer
              noSpace
              darkHeading
              plainHeader
              heading={'SECTION 1 ( CATEGORY AND RELIGION )'}
              buttons={[]}
            >
              <CustomTable
                boldHeading
                isColumn={true}
                tableHead={['Category', 'Sub-Category', 'Religion', 'Caste']}
                tableData={
                  userFormData ? this.formatUsersData1([userFormData]) : []
                }
              />
            </CardContainer>
          </Grid>
          <Grid item xs={6}>
            <CardContainer
              noSpace
              darkHeading
              plainHeader
              heading={'SECTION 2 ( OTHER DETAILS )'}
              buttons={[]}
            >
              <CustomTable
                boldHeading
                isColumn={true}
                tableHead={[
                  'Parent Mobile',
                  'Aadhar No.',
                  'Medium of Studies',
                  'WRN',
                ]}
                tableData={
                  userFormData ? this.formatUsersData2([userFormData]) : []
                }
              />
            </CardContainer>
          </Grid>
          <Grid item xs={12}>
            <CardContainer
              noSpace
              darkHeading
              plainHeader
              heading={'SECTION 3 ( PARENTS DETAILS )'}
              buttons={[]}
            >
              <CustomTable
                boldHeading
                isColumn={true}
                tableHead={[
                  "Father's Name",
                  "Mother's Name",
                  'Parents Occupation',
                  'Guardian Name',
                  'Relation with Applicant',
                ]}
                tableData={
                  userFormData
                    ? this.formatAdvancedDetailsData1([userFormData])
                    : []
                }
              />
            </CardContainer>
          </Grid>
          <Grid item xs={6}>
            <CardContainer
              noSpace
              darkHeading
              plainHeader
              heading={'SECTION 4 ( PERMANENT ADDRESS )'}
              buttons={[]}
            >
              <CustomTable
                boldHeading
                isColumn={true}
                tableHead={[
                  'House No.',
                  'Street',
                  'Pincode',
                  'Post Office',
                  'State',
                  'City',
                ]}
                tableData={
                  userFormData
                    ? this.formatAdvancedDetailsData2([userFormData])
                    : []
                }
              />
            </CardContainer>
          </Grid>
          <Grid item xs={6}>
            <CardContainer
              plainHeader
              noSpace
              darkHeading
              heading={'SECTION 5 ( CORRESPONDENCE ADDRESS )'}
              buttons={[]}
            >
              <CustomTable
                boldHeading
                isColumn={true}
                tableHead={[
                  'House No.',
                  'Street',
                  'Pincode',
                  'Post Office',
                  'State',
                  'City',
                ]}
                tableData={
                  userFormData
                    ? this.formatAdvancedDetailsData3([userFormData])
                    : []
                }
              />
            </CardContainer>
          </Grid>
          <Grid item xs={12}>
            <br />
            <br />
            <br />
            <br />
            <CardContainer
              plainHeader
              noSpace
              darkHeading
              heading={'SECTION 6 ( PREVIOUS EDUCATION DETAILS )'}
              buttons={[]}
            >
              {userFormData &&
                userFormData.academicDetails.map((item, i) => (
                  <Box p={1} key={i}>
                    <Grid container alignItems="center">
                      <Grid item xs={3}>
                        <CustomInput
                          darkLabel
                          labelText="Name of Exam"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            name: 'nameOfExam',
                            value: item.nameOfExam,
                            disabled: true,
                          }}
                        />
                      </Grid>
                      {Object.keys(item).find((key) => key === 'major1') ? (
                        <Grid item xs={9}>
                          <Autocomplete
                            disabled={true}
                            value={item.major1}
                            multiple
                            name="major1"
                            options={this.filterMajorSubjects(item.major1)}
                            getOptionLabel={(option) => option.name}
                            filterSelectedOptions
                            renderInput={(params) => (
                              <TextField
                                label="Select Subject / Course"
                                {...params}
                                variant="standard"
                              />
                            )}
                          />
                        </Grid>
                      ) : (
                        <Grid item xs={6}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <CustomInput
                                darkLabel
                                labelText="Name of Board"
                                formControlProps={{
                                  fullWidth: true,
                                }}
                                inputProps={{
                                  name: 'board',
                                  value: item.board,
                                  disabled: true,
                                }}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <CustomInput
                                darkLabel
                                labelText="School / College"
                                formControlProps={{
                                  fullWidth: true,
                                }}
                                inputProps={{
                                  name: 'institution',
                                  value: item.institution,
                                  disabled: true,
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      )}
                      <Grid item xs={3}>
                        <CustomInput
                          darkLabel
                          labelText="Year"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            name: 'year',
                            value: item.year,
                            disabled: true,
                            type: 'number',
                          }}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <CustomInput
                          darkLabel
                          labelText="Roll No."
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            name: 'rollNo',
                            value: item.rollNo,
                            disabled: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <CustomInput
                              darkLabel
                              labelText="Total Marks"
                              formControlProps={{
                                fullWidth: true,
                              }}
                              inputProps={{
                                name: 'totalMarks',
                                value: item.totalMarks,
                                type: 'number',
                                disabled: true,
                              }}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <CustomInput
                              darkLabel
                              labelText="Marks Obtained"
                              formControlProps={{
                                fullWidth: true,
                              }}
                              inputProps={{
                                name: 'marksObtained',
                                value: item.marksObtained,
                                type: 'number',
                                disabled: true,
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={3}>
                        <CustomInput
                          darkLabel
                          labelText="Percentage / CGPA"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            name: 'percentage',
                            value: item.percentage,
                            disabled: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        {Object.keys(item).find((key) => key === 'promoted') ? (
                          <FormControlLabel
                            control={
                              <Checkbox
                                value="5"
                                checked={item.promoted}
                                name="promoted"
                                color="primary"
                                disabled={true}
                              />
                            }
                            label="Promoted ?"
                          />
                        ) : (
                          <CustomInput
                            darkLabel
                            labelText="Subjects"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              name: 'subjects',
                              value: item.subjects,
                              disabled: true,
                            }}
                          />
                        )}
                      </Grid>
                      {Object.keys(item).find((key) => key === 'stream') && (
                        <Grid item xs={6}>
                          <CustomInput
                            darkLabel
                            labelText="Stream"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              name: 'subjects',
                              value: streamData.find(
                                (itm) => itm.streamId === item.stream
                              ).stream,
                              disabled: true,
                            }}
                          />
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                ))}
            </CardContainer>
          </Grid>
          <Grid item xs={12}>
            <CardContainer
              plainHeader
              noSpace
              darkHeading
              heading={'SECTION 7 ( APPLIED SUBJECT / AREA )'}
              buttons={[]}
            >
              <CustomTable
                boldHeading
                isColumn={true}
                tableHead={[
                  this.checkCourseDetails() === 1 ? 'Major Subjects' : 'Course',
                  'Minor Subjects',
                  'Vocational Subjects',
                  'Co-Curriculum (ODD)',
                  'Co-Curriculum (EVEN)',
                ]}
                tableData={
                  userFormData
                    ? this.formatFacultyDetailsData([userFormData])
                    : []
                }
              />
            </CardContainer>
          </Grid>
          <Grid item xs={6}>
            <CardContainer
              autoHeight
              plainHeader
              noSpace
              darkHeading
              heading={'SECTION 8 ( MERIT 1 )'}
              buttons={[]}
            >
              <CustomTable
                boldHeading
                isColumn={true}
                tableHead={[
                  'National Competition',
                  'Other Competition',
                  'NCC',
                  'Freedom Fighter',
                  'National Seva Scheme',
                ]}
                tableData={
                  userFormData
                    ? this.formatMeritDetailsData1([userFormData])
                    : []
                }
              />
            </CardContainer>
          </Grid>
          <Grid item xs={6}>
            <CardContainer
              autoHeight
              plainHeader
              noSpace
              darkHeading
              heading={'SECTION 9 ( MERIT 2 )'}
              buttons={[]}
            >
              <CustomTable
                boldHeading
                isColumn={true}
                tableHead={[
                  'Rover Ranger',
                  'Other Rover Ranger',
                  'BCOM',
                  'Other',
                  'Total Merit Count',
                ]}
                tableData={
                  userFormData
                    ? this.formatMeritDetailsData2([userFormData])
                    : []
                }
              />
            </CardContainer>
          </Grid>
          <Grid item xs={12}>
            <br />
            <br />
            <br />
            <CardContainer
              plainHeader
              noSpace
              darkHeading
              heading={'DECLARATION'}
              buttons={[]}
            >
              <Box p={1}>
                <Typography variant="body1">
                  I solemnly declare that the above mentioned information is
                  correct and I fulfill the eligibility condition for the
                  course. Further, if admitted, I promise to abide by the rules
                  and norms of discipline of the institute.
                </Typography>
                <Grid container item xs={12} justifyContent="flex-end">
                  <Box pt={2}>
                    <CustomText bold>SIGNATURE</CustomText>
                  </Box>
                </Grid>
              </Box>
            </CardContainer>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(FormPreview)
