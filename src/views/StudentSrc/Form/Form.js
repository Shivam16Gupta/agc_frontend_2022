import {
  Box,
  Divider,
  Grid,
  Hidden,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core'
import GetAppIcon from '@material-ui/icons/GetApp'
import React, { useRef, useState } from 'react'
import CardContainer from '../../../common/CardContainer'
import RegularButton from '../../../components/CustomButtons/Button'
import { ASSETS, FORM_ACTION } from '../../../constants/Constants'
import AcademicFacultyDetails from './Academic_Faculty_Details'
import UserSubDetails from './UserSubDetails'
import Declaration from './Declaration'
import MeritDetails from './MeritDetails'
import AdvancedDetails from './AdvancedDetails'
import UploadDocuments from './UploadDocuments'
import CustomText from '../../../components/CustomText/Customtext'

const steps = [
  'User-Sub Details',
  'Advanced Details',
  'Academic & Faculty Details',
  'Upload Documents',
  'Merit Details',
  'Declaration',
]

function Form() {
  const ref = useRef()
  const [activeStep, setActiveStep] = useState(0)

  const handleSaveAndNext = () => {
    if (activeStep === FORM_ACTION.USER_SUB_DETAILS) {
      ref.current.handleSubmitUserSubDetails()
    } else if (activeStep === FORM_ACTION.ADVANCED_DETAILS) {
      ref.current.handleSubmitAdvancedDetails()
    } else if (activeStep === FORM_ACTION.ACADEMIC_FACULTY_DETAILS) {
      ref.current.handleSubmitAcademicFacultyDetails()
    } else if (activeStep === FORM_ACTION.UPLOAD_DOCUMENTS) {
      ref.current.handleSubmitDocuments()
    } else if (activeStep === FORM_ACTION.MERIT_DETAILS) {
      ref.current.handleSubmitMeritDetails()
    } else if (activeStep === FORM_ACTION.DECLARATION) {
      ref.current.handleSaveDetails()
    }
  }

  const moveToNextStep = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 500,
        left: 0,
        behavior: 'smooth',
      })
    }, [200])
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <div className="childContainer">
      <CardContainer
        heading={'Admission Form'}
        buttons={[
          <Hidden xsDown>
            <RegularButton
              round
              size="sm"
              color="danger"
              key="dp"
              target="_blank"
              href={`./${ASSETS.PROSPECTUS}`}
            >
              Download Prospectus &nbsp;&nbsp; <GetAppIcon />
            </RegularButton>
          </Hidden>,
        ]}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} md={9}>
            <CustomText white upperCase>
              Please read below all the instructions carefully before filling up
              the form
            </CustomText>
            <Divider />
            <Typography component="span" variant="caption">
              <ul>
                <li>
                  Please verify your details before clicking 'Submit' button
                </li>
                <li>After submitting FORM, it cannot be modify or change</li>
                <li>
                  Please note down your registration id after clicking 'Save
                  Draft' button
                </li>
                <li>
                  Your photo and signature must be in image format (jpeg/png)
                </li>
                <li>
                  All other uploads in the form can be in image(png/jpg/jpeg) or
                  pdf format
                </li>
                <li>
                  Any form related issue kindly email at :{' '}
                  <b>admissionagracollege@gmail.com</b>
                </li>
              </ul>
            </Typography>
          </Grid>
          <Grid container item xs={12} md={3} justifyContent="center">
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((item) => {
                return (
                  <Step key={item}>
                    <StepLabel>{item}</StepLabel>
                  </Step>
                )
              })}
            </Stepper>
          </Grid>
          <Grid item xs={12}>
            {activeStep === FORM_ACTION.USER_SUB_DETAILS ? (
              <UserSubDetails ref={ref} moveToNextStep={moveToNextStep} />
            ) : activeStep === FORM_ACTION.ADVANCED_DETAILS ? (
              <AdvancedDetails ref={ref} moveToNextStep={moveToNextStep} />
            ) : activeStep === FORM_ACTION.ACADEMIC_FACULTY_DETAILS ? (
              <AcademicFacultyDetails
                ref={ref}
                moveToNextStep={moveToNextStep}
              />
            ) : activeStep === FORM_ACTION.UPLOAD_DOCUMENTS ? (
              <UploadDocuments ref={ref} moveToNextStep={moveToNextStep} />
            ) : activeStep === FORM_ACTION.MERIT_DETAILS ? (
              <MeritDetails ref={ref} moveToNextStep={moveToNextStep} />
            ) : (
              <Declaration ref={ref} moveToNextStep={moveToNextStep} />
            )}
          </Grid>
          <Grid item xs={6}>
            <RegularButton
              color="rose"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </RegularButton>
          </Grid>
          <Grid container item xs={6} justifyContent="flex-end">
            <Box px={1}>
              <RegularButton
                color={activeStep === steps.length - 1 ? 'warning' : 'rose'}
                onClick={handleSaveAndNext}
              >
                {activeStep === steps.length - 1 ? 'Save Draft' : 'Save & Next'}
              </RegularButton>
            </Box>
            {activeStep === FORM_ACTION.DECLARATION && (
              <Box px={1}>
                <RegularButton
                  color="primary"
                  onClick={() => ref.current.handleSubmitForm()}
                >
                  Submit Application
                </RegularButton>
              </Box>
            )}
          </Grid>
        </Grid>
      </CardContainer>
    </div>
  )
}
export default Form
