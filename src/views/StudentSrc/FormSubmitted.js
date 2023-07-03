import { Box, Divider, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { withRouter } from 'react-router-dom'
import CardContainer from '../../common/CardContainer'
import RegularButton from '../../components/CustomButtons/Button'
import Success from '../../components/Typography/Success'
import {
  getFeeDetails,
  errorDialog,
  getUserDetail,
  redirectUrl,
  validateUser,
} from '../../utils/Utils'
import config from 'myconfig'
import FormApi from '../../apis/FormApi'
import CustomText from '../../components/CustomText/Customtext'
import LocalStorage from '../../common/LocalStorage'
import { FLAGS } from '../../constants/Constants'
import coursesStaticData from '../../StaticData/courses.json'

class FormSubmitted extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      courseFeeData: '',
    }
  }

  componentDidMount() {
    const user = LocalStorage.getUser()
    const data = {
      registrationNo: user.user_id,
      course: user.course,
      year: user.admissionYear,
      gender: user.gender,
      checksumVal: '',
    }
    FormApi.courseFee(data).then((res) => {
      if (res.status === 200) {
        this.setState({ courseFeeData: res.data })
      }
    })
  }

  handleMakePayment = (period) => {
    const { courseFeeData } = this.state
    const feeData = getFeeDetails(
      courseFeeData.fees,
      courseFeeData.majorSubjects,
      period
    )
    if (validateUser()) {
      const user = LocalStorage.getUser()
      const f = new FormData()
      f.append('extraFee', 'S_2022')
      f.append('userId', user.user_id)
      f.append('account', feeData.bankAccountId)
      f.append('amount', feeData.amount)
      f.append('responseUrl', config.RESPONSEURL)
      f.append('courseFee', '0')
      f.append('feesType', courseFeeData.fees_type)
      f.append('semType', period)
      f.append(
        'courseName',
        user.course === '9JOURNALISM'
          ? 'JOURNALISM'
          : coursesStaticData.find((item) => item.courseId === user.course)
              .courseName
      )
      f.append('fatherName', user.fatherName)
      FormApi.createCheckSum(f)
        .then((res) => {
          if (res.status === 200 && res.data) {
            const checksumVal = res.data
            this.setState({ checksumVal }, () => {
              document.getElementById('paymentform').submit()
            })
          } else {
            errorDialog('Please try after sometime.')
          }
        })
        .catch(() => {
          errorDialog('Please try after sometime.')
        })
    } else {
      errorDialog('Kindly refresh the page and try again')
    }
  }

  render() {
    const { courseFeeData, checksumVal } = this.state
    return (
      <div className="childContainer">
        <CardContainer heading="Thank You">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div id="registrationNoSlip" className="center">
                <Box py={2}>
                  <img alt="logo" src="agracollege.png" className="logo" />
                  <CustomText> Your Registration ID</CustomText>
                  <Success>{getUserDetail('user_id')}</Success>
                </Box>
                <CustomText>
                  NAME: <b>{getUserDetail('fullname')}</b>
                </CustomText>
                <CustomText>
                  FATHER NAME: <b>{getUserDetail('fatherName')}</b>
                </CustomText>
                <CustomText large>
                  APPLIED IN COURSE :{' '}
                  <b>
                    {coursesStaticData.find(
                      (item) => item.courseId === getUserDetail('course')
                    ).courseName +
                      ' (Year - ' +
                      getUserDetail('admissionYear') +
                      ')'}
                  </b>
                </CustomText>
              </div>
              <Divider />
            </Grid>
            <Grid container item xs={12} justifyContent="center">
              <Typography variant="h5">
                <b>Your Form is Submitted Successfully.</b>
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={12}
              direction="column"
              alignContent="center"
            >
              <Typography variant="h6">General instruction</Typography>
              <Divider />
              <Typography component="span" variant="body1">
                <ul>
                  <li>
                    Download submitted form along with payment reciept and
                    produce at the time of counselling.
                  </li>
                  <li>
                    You can login to our portal anytime using your registration
                    id and date of birth.
                  </li>
                  <li>
                    You can download application form with payment receipts
                    using below buttons.
                  </li>
                </ul>
              </Typography>
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <Grid item md={4} xs={12}>
                <RegularButton
                  fullWidth
                  color="primary"
                  onClick={() =>
                    window.open(config.BASE_URL + '#/previewForm', '_blank')
                  }
                >
                  Download Application Form
                </RegularButton>
              </Grid>
              <Grid item md={4} xs={12}>
                <RegularButton
                  fullWidth
                  color="primary"
                  onClick={() =>
                    window.open(config.BASE_URL + '#/previewReceipts', '_blank')
                  }
                >
                  Download Payment Receipts
                </RegularButton>
              </Grid>
              <Grid item md={4} xs={12}>
                <RegularButton
                  fullWidth
                  color="primary"
                  onClick={() => redirectUrl('sPaymentHistory', 1)}
                >
                  Payment History
                </RegularButton>
              </Grid>
            </Grid>
            <Grid container item xs={12} justifyContent="center">
              {courseFeeData && // PERIOD 1
              courseFeeData.fees.filter((item) => item.semester === '1')
                .length > 0 && // Check for Fee Data is Exists or Not
              (courseFeeData.selection === FLAGS.ENABLED || // Student is ( SELECTED ) for Admission
                parseInt(getUserDetail('admissionYear')) > 1) && // Else Admission Year  > 1
              courseFeeData.courseFee === FLAGS.DISABLED && // Parent Flag of ( Course Fee )
              courseFeeData.sem1 === FLAGS.DISABLED && // Fees of ( Period 1 ) Is Not PAID
              courseFeeData.status === FLAGS.ENABLED && // PARENTAL "kw_course_fee_flags" - status
              courseFeeData.fee_one === FLAGS.ENABLED ? ( // Admin Flag for ( Period 1 )
                <div className="center">
                  <form
                    id="paymentform"
                    method="post"
                    action={config.PAYMENTAPI}
                    encType="application/x-www-form-urlencoded"
                  >
                    <input hidden name="msg" value={checksumVal} />
                  </form>
                  {getUserDetail('admissionYear') === '1' ? (
                    <CustomText upperCase bold>
                      Congratulations ! You're selected.
                    </CustomText>
                  ) : (
                    <CustomText upperCase bold>
                      Please do the course payment to complete your
                      registration.
                    </CustomText>
                  )}
                  <CustomText>
                    You have to pay the course fees :{' '}
                    <b>
                      ₹
                      {
                        getFeeDetails(
                          courseFeeData.fees,
                          courseFeeData.majorSubjects,
                          '1'
                        ).amount
                      }
                    </b>
                  </CustomText>
                  <RegularButton
                    color="primary"
                    onClick={() => this.handleMakePayment('1')}
                  >
                    Make Payment
                  </RegularButton>
                </div>
              ) : courseFeeData && // PERIOD 2
                courseFeeData.fees.filter((item) => item.semester === '2')
                  .length > 0 && // Check for Fee Data is Exists or Not
                (courseFeeData.selection === FLAGS.ENABLED || // Student is ( SELECTED ) for Admission
                  parseInt(getUserDetail('admissionYear')) > 1) && // Else Admission Year  > 1
                courseFeeData.courseFee === FLAGS.DISABLED && // Parent Flag of ( Course Fee )
                courseFeeData.sem1 === FLAGS.ENABLED && // Fees of ( Period 1 ) Is Must PAID
                courseFeeData.status === FLAGS.ENABLED && // PARENTAL "kw_course_fee_flags" - status
                courseFeeData.fee_two === FLAGS.ENABLED ? ( // Admin Flag for ( Period 2 )
                <div className="center">
                  <form
                    id="paymentform"
                    method="post"
                    action={config.PAYMENTAPI}
                    encType="application/x-www-form-urlencoded"
                  >
                    <input hidden name="msg" value={checksumVal} />
                  </form>
                  <CustomText upperCase bold>
                    Please do the course payment to complete your registration.
                  </CustomText>
                  <CustomText>
                    You have to pay the course fees :{' '}
                    <b>
                      ₹
                      {
                        getFeeDetails(
                          courseFeeData.fees,
                          courseFeeData.majorSubjects,
                          '2'
                        ).amount
                      }
                    </b>
                  </CustomText>
                  <RegularButton
                    color="primary"
                    onClick={() => this.handleMakePayment('2')}
                  >
                    Make Payment
                  </RegularButton>
                </div>
              ) : null}
            </Grid>
          </Grid>
        </CardContainer>
      </div>
    )
  }
}

export default withRouter(FormSubmitted)
