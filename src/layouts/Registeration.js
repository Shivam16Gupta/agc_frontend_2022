import { Box, Divider, MenuItem, TextField } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import RegisterApi from 'apis/RegisterApi'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import LocalStorage from '../common/LocalStorage'
import Card from '../components/Card/Card'
import CardBody from '../components/Card/CardBody'
import RegularButton from '../components/CustomButtons/Button'
import CustomInput from '../components/CustomInput/CustomInput'
import {
  addErrorMsg,
  convertGender,
  errorDialog,
  redirectUrl,
  setErrorFields,
} from '../utils/Utils'
import coursesStaticData from '../StaticData/courses.json'
import categoryStaticData from '../StaticData/category.json'
import subCategoryStaticData from '../StaticData/subCategory.json'
import CustomText from '../components/CustomText/Customtext'
import config from 'myconfig'
import ReCAPTCHA from 'react-google-recaptcha'
import activatedCourse from '../StaticData/manageCourse.json'

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  logo: {
    marginTop: 50,
    width: '100px',
    height: '100px',
  },
})

class Registeration extends Component {
  constructor() {
    super()
    this.state = {
      isChecked: false,
      previousSessionRegNo: '',
      name: '',
      mobileNo: '',
      dob: '',
      gender: '',
      fatherName: '',
      course: '',
      admissionYear: '',
      category: '',
      subCategory: '',
      token: '',
      errorList: [],
    }
  }
  handleSubmit = () => {
    const {
      name,
      mobileNo,
      dob,
      gender,
      fatherName,
      course,
      admissionYear,
      category,
      subCategory,
      token,
      errorList,
    } = this.state
    if (!errorList.length) {
      if (
        name !== '' &&
        mobileNo !== '' &&
        dob !== '' &&
        gender !== '' &&
        fatherName !== '' &&
        course !== '' &&
        admissionYear !== '' &&
        category !== '' &&
        subCategory !== ''
      ) {
        // Checking the selected "Course" and "Year" are Opened
        if (activatedCourse[course].includes(admissionYear)) {
          if (!token) {
             addErrorMsg("Please verify you're not a robot")
          } else {
            const data = new FormData()
            data.append('name', name)
            data.append('mobile', mobileNo)
            data.append('dob', dob)
            data.append('gender', gender)
            data.append('fatherName', fatherName)
            data.append('course', course)
            data.append('admissionYear', admissionYear)
            data.append('category', category)
            data.append('subCategory', subCategory)
            data.append(
              'feesType',
              coursesStaticData.find((item) => item.courseId === course)
                .feesType
            )
            RegisterApi.StudentRegister(data).then((res) => {
              if (res.status === 200 && res.data && !res.data.error) {
                console.log(res.data);
                console.log(res.data.error);
                LocalStorage.setUser(res.data)
                this.props.history.push('/student')
              }
            })
          }
        } else {
          errorDialog('Admissions are closed for this course and year.')
        }
      } else {
        addErrorMsg('Please fill all the fields')
      }
    } else {
      addErrorMsg('Please remove errors from all the fields')
    }
  }

  handleChangeFields = (event, isError) => {
    const { errorList } = this.state
    setErrorFields(isError, errorList, event.target.name)
    if (event.target.name === 'course') {
      this.setState({
        errorList,
        [event.target.name]: event.target.value,
        admissionYear: '',
        previousSessionRegNo: '',
        name: '',
        dob: '',
        gender: '',
        isChecked: false,
      })
    } else if (event.target.name === 'admissionYear') {
      this.setState({
        errorList,
        [event.target.name]: event.target.value,
        previousSessionRegNo: '',
        name: '',
        dob: '',
        gender: '',
        isChecked: false,
      })
    } else if (event.target.name === 'previousSessionRegNo') {
      this.setState({
        errorList,
        [event.target.name]: event.target.value,
        name: '',
        dob: '',
        gender: '',
        isChecked: false,
      })
    } else {
      this.setState({
        errorList,
        [event.target.name]: event.target.value,
      })
    }
  }

  handleReCaptcha = (token) => {
    this.setState({ token })
  }

  handleSessionCheckValidate = () => {
    const { admissionYear, course } = this.state
    if (
      admissionYear === 2 &&
      (course === '1BA' || course === '6BSC' || course === '8BCOM')
    ) {
      return true
    } else if (
      admissionYear !== 1 &&
      course !== '13BED' &&
      course !== '3BBA' &&
      course !== '4BCA' &&
      course !== '5BSCBIOTECH'
    ) {
      return true
    } else {
      false
    }
  }

  handlePreviousSessionCheck = () => {
    const { admissionYear, previousSessionRegNo, course } = this.state
    if (previousSessionRegNo) {
      let data = ''
      if (
        admissionYear === 2 &&
        (course === '1BA' || course === '6BSC' || course === '8BCOM')
      ) {
        data = { registrationNo: previousSessionRegNo, checkOf: 'RISHI' }
      } else if (admissionYear > 1) {
        data = {
          registrationNo: previousSessionRegNo,
          checkOf: 'COURSEFEE',
        }
      }
      RegisterApi.previousSessionCheck(data).then((res) => {
        if (res.status === 200 && !res.data.error) {
          this.setState({
            name: res.data.data.name,
            dob: res.data.data.dob,
            gender: convertGender(res.data.data.gender),
            isChecked: true,
          })
        } else if (res.status === 200 && res.data.error) {
          this.setState({
            name: '',
            dob: '',
            gender: '',
            isChecked: false,
          })
          errorDialog(res.data.message)
        }
      })
    } else {
      addErrorMsg('Please enter previous session registration no.')
    }
  }

  render() {
    const { classes } = this.props
    const {
      name,
      dob,
      gender,
      course,
      admissionYear,
      category,
      subCategory,
      previousSessionRegNo,
      isChecked,
    } = this.state
    return (
      <div>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <div className="center">
            <img alt="logo" src="agracollege.png" className={classes.logo} />
          </div>
          <Card>
            <CardBody elevation={2} className={classes.paper}>
              <Typography component="h1" variant="h5">
                Registration
              </Typography>
              <div className={classes.form} noValidate>
                <Grid container spacing={2} alignItems="center">
                  <Grid item md={6} xs={12}>
                    <TextField
                      select
                      size="small"
                      fullWidth
                      label="Course"
                      onClick={this.handleChangeFields}
                      variant="outlined"
                      name="course"
                      value={course}
                    >
                      {coursesStaticData.map((item, key) => (
                        <MenuItem
                          disabled={item.disabled}
                          key={key}
                          value={item.courseId}
                        >
                          {item.courseName}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      select
                      size="small"
                      fullWidth
                      label="Year"
                      onClick={this.handleChangeFields}
                      variant="outlined"
                      name="admissionYear"
                      value={admissionYear}
                    >
                      <MenuItem disabled key="select" value="Select">
                        Select
                      </MenuItem>
                      {course &&
                        coursesStaticData
                          .find((item) => item.courseId === course)
                          .years.map(
                            (item, key) => (
                              // ((course !== '5BSCBIOTECH' &&
                              //   course !== '10BALLB' &&
                              //   course !== '11LLB') ||
                              //   (course === '5BSCBIOTECH' &&
                              //     item !== 2 &&
                              //     item !== 3) ||
                              //   (course === '10BALLB' &&
                              //     item !== 2 &&
                              //     item !== 3 &&
                              //     item !== 4 &&
                              //     item !== 5) ||
                              //   (course === '11LLB' &&
                              //     item !== 2 &&
                              //     item !== 3)) && (
                              <MenuItem key={key} value={item}>
                                {item}
                              </MenuItem>
                            )
                            // )
                          )}
                    </TextField>
                  </Grid>
                  {course &&
                    admissionYear &&
                    course !== '13BED' &&
                    course !== '3BBA' &&
                    course !== '4BCA' &&
                    course !== '5BSCBIOTECH' &&
                    admissionYear !== 1 && (
                      <Grid item xs={12}>
                        <CustomInput
                          isMandatory={true}
                          minLength={14}
                          maxLength={22}
                          labelText="Registration No."
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            name: 'previousSessionRegNo',
                            value: previousSessionRegNo,
                            helperText: 'Registration No. of (Session 2021-22)',
                          }}
                          handleChange={this.handleChangeFields}
                          errorMsg={'Invalid Registration No.'}
                        />
                        <div className="center">
                          <RegularButton
                            size="sm"
                            round
                            color="primary"
                            onClick={this.handlePreviousSessionCheck}
                          >
                            Verify
                          </RegularButton>
                        </div>
                        <Box pt={2} />
                      </Grid>
                    )}
                  <Grid item xs={12}>
                    <CustomInput
                      isMandatory={true}
                      minLength={5}
                      maxLength={50}
                      labelText="Name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: 'name',
                        value: name,
                        helperText:
                          'Name (as per highschool/secondary certificate)',
                        disabled:
                          isChecked || this.handleSessionCheckValidate(),
                      }}
                      handleChange={this.handleChangeFields}
                      errorMsg={'Name must be min. of 5 and max. 50 character'}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomInput
                      isMandatory={true}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: 'date',
                        name: 'dob',
                        value: dob,
                        helperText: 'Date of Birth',
                        disabled:
                          isChecked || this.handleSessionCheckValidate(),
                      }}
                      handleChange={this.handleChangeFields}
                      errorMsg={'Please select your dob'}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      select
                      size="small"
                      fullWidth
                      label="Gender"
                      onClick={this.handleChangeFields}
                      variant="outlined"
                      name="gender"
                      value={gender}
                      disabled={isChecked || this.handleSessionCheckValidate()}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Transgender">Transgender</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <CustomInput
                      isMandatory={true}
                      minLength={10}
                      maxLength={10}
                      isNumber={true}
                      labelText="Mobile No."
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: 'mobileNo',
                        type: 'number',
                      }}
                      handleChange={this.handleChangeFields}
                      errorMsg={'Mobile no must be of 10 digits'}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomInput
                      labelText="Father's Name"
                      isMandatory={true}
                      minLength={5}
                      maxLength={50}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: 'fatherName',
                      }}
                      handleChange={this.handleChangeFields}
                      errorMsg={
                        'Father Name must be min. of 5 and max. 50 character'
                      }
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      select
                      size="small"
                      fullWidth
                      label="Category"
                      onClick={this.handleChangeFields}
                      variant="outlined"
                      name="category"
                      value={category}
                    >
                      {categoryStaticData.map((item, key) => (
                        <MenuItem key={key} value={item.categoryId}>
                          {item.category}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      select
                      size="small"
                      fullWidth
                      label="Sub-Category"
                      onClick={this.handleChangeFields}
                      variant="outlined"
                      name="subCategory"
                      value={subCategory}
                    >
                      {subCategoryStaticData.map((item, key) => (
                        <MenuItem key={key} value={item.subCategoryId}>
                          {item.subCategory}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid container item xs={12} justifyContent="center">
                    <Box pt={2}>
                      <ReCAPTCHA
                        sitekey={config.CAPTCHA}
                        onChange={(token) => this.handleReCaptcha(token)}
                        onExpired={() => this.handleReCaptcha('')}
                      />
                    </Box>
                  </Grid>
                  <Grid container item xs={12} justifyContent="center">
                    <RegularButton
                      round
                      color="primary"
                      onClick={this.handleSubmit}
                    >
                      REGISTER
                    </RegularButton>
                  </Grid>
                  <Grid container item xs={12} justifyContent="flex-end">
                    <CustomText
                      underline
                      blue
                      bold
                      link
                      onClick={() => redirectUrl('/login')}
                    >
                      Go to Login ?
                    </CustomText>
                  </Grid>
                </Grid>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    )
  }
}

export default withRouter(withStyles(useStyles)(Registeration))
