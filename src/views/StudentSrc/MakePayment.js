import { Box, Divider, Grid, Typography } from '@material-ui/core'
import config from 'myconfig'
import React from 'react'
import { withRouter } from 'react-router-dom'
import FormApi from '../../apis/FormApi'
import CardContainer from '../../common/CardContainer'
import LocalStorage from '../../common/LocalStorage'
import RegularButton from '../../components/CustomButtons/Button'
import Success from '../../components/Typography/Success'
import {
  downloadPdf,
  errorDialog,
  getUserDetail,
  validateUser,
} from '../../utils/Utils'
import PaymentHistory from './PaymentHistory'
import accountsStaticData from '../../StaticData/accounts.json'
import CustomText from '../../components/CustomText/Customtext'
import coursesStaticData from '../../StaticData/courses.json'
import activatedCourses from '../../StaticData/manageCourse.json'

class MakePayment extends React.Component {
  constructor() {
    super()
    this.state = {
      checksumVal: null,
    }
  }

  handleMakePayment = () => {
    if (validateUser()) {
      const user = LocalStorage.getUser()
      // Admission Open Check
      if (
        activatedCourses[user.course].includes(parseInt(user.admissionYear))
      ) {
        const f = new FormData()
        f.append('extraFee', 'S_2022')
        f.append('userId', user.user_id)
        f.append('account', accountsStaticData[user.course].prospectusFee)
        f.append('amount', '252.00')
        f.append('responseUrl', config.RESPONSEURL)
        f.append('courseFee', '0')
        f.append('feesType', 'PROSPECTUS')
        f.append('semType', 'NA')
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
        errorDialog('Admissions are closed for this course and year.')
      }
    } else {
      errorDialog('Kindly refresh the page and try again')
    }
  }

  downloadRegId = () => {
    downloadPdf('registrationNoSlip', 'ID')
  }

  render() {
    const { checksumVal } = this.state
    return (
      <div className="childContainer">
        <CardContainer heading="Payment">
          <Grid container spacing={2}>
            <Grid
              container
              item
              xs={12}
              direction="column"
              alignContent="center"
            >
              <div id="registrationNoSlip" className="center">
                <Box py={2}>
                  <img alt="logo" src="agracollege.png" className="logo" />
                  <CustomText> Your Registration ID</CustomText>
                  <Success>{LocalStorage.getUser().user_id}</Success>
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
              <Typography variant="body1" component="div">
                Kindly copy or download your registration id before making the
                payment.
              </Typography>
              <Box pt={2}>
                <RegularButton
                  round
                  color="primary"
                  fullWidth
                  onClick={this.downloadRegId}
                >
                  Download Registration No
                </RegularButton>
              </Box>
            </Grid>
            <Grid
              container
              item
              xs={12}
              direction="column"
              alignContent="center"
            >
              <Typography variant="h6">
                Read instructions carefully before making any payment
              </Typography>
              <Divider />
              <Typography component="span" variant="body1">
                <ul>
                  <li>
                    You can login by entering registration id and date of birth
                    on home page.
                  </li>
                  <li>
                    Prospectus and Application form fees is Rs. 250 and
                    registration fees is Rs. 2 which is non-refundable.
                  </li>
                  <li>
                    Download prospectus and application form after making
                    payment
                  </li>
                  <li>
                    Read prospectus before submitting application form online.
                  </li>
                  <li>
                    Follow admission guidelines before submitting application
                    form
                  </li>
                  <li>
                    Once application form is submitted, it cannot be edited or
                    changed
                  </li>
                  <li>
                    Any form related issue kindly email at
                    admissionagracollege@gmail.com
                  </li>
                </ul>
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={12}
              direction="column"
              alignContent="center"
            >
              <Typography variant="h6" component="div">
                Online application form fees is <b>Rs. 252</b> only.
              </Typography>
            </Grid>
            <Grid container item xs={12} justifyContent="center">
              <form
                id="paymentform"
                method="post"
                action={config.PAYMENTAPI}
                encType="application/x-www-form-urlencoded"
              >
                <input hidden name="msg" value={checksumVal} />
              </form>
              <RegularButton
                type="submit"
                round
                color="primary"
                onClick={this.handleMakePayment}
                disabled={checksumVal ? true : false}
              >
                Make Payment
              </RegularButton>
            </Grid>
          </Grid>
        </CardContainer>
        <PaymentHistory />
      </div>
    )
  }
}

export default withRouter(MakePayment)
