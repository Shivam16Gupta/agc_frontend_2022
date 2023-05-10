import { Box, Grid } from '@material-ui/core'
import React from 'react'
import FormApi from '../../apis/FormApi'
import { getUserDetail } from '../../utils/Utils'
import CustomText from '../../components/CustomText/Customtext'
import ShowReceipts from './ShowReceipts'
class FormPreview extends React.Component {
  constructor() {
    super()
    this.state = {
      receiptsData: '',
    }
  }

  componentDidMount() {
    const data = { registrationNo: getUserDetail('user_id'), receipt: '0' }
    FormApi.fetchPaymentReceipts(data).then((response) => {
      this.setState({ receiptsData: response.data })
    })
  }

  render() {
    const { receiptsData } = this.state

    return (
      <div className="childContainer">
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={6}>
            <Box py={2}>
              <CustomText large bold>
                PAYMENT RECEIPTS
              </CustomText>
            </Box>
          </Grid>
          <Grid container item xs={6} justifyContent="flex-end">
            <img alt="logo" src="agracollege.png" className="logo" />
          </Grid>
          {/* <Grid item xs={12}>
            {receiptsData && (
              <ShowReceipts
                paymentDetails={receiptsData.payment}
                heading="PROSPECTUS PAYMENT SLIP"
              />
            )}
          </Grid> */}

          {/* <Grid item xs={12}>
            {receiptsData && receiptsData.period_1 && (
              <ShowReceipts
                paymentDetails={receiptsData.period_1}
                heading="COURSE PAYMENT SLIP"
              />
            )}
          </Grid> */}
          {receiptsData &&
            Object.entries(receiptsData).map(([key, value]) => (
              <Grid item xs={12} key={key}>
                <ShowReceipts
                  paymentDetails={value}
                  heading={
                    key === 'payment'
                      ? 'PROSPECTUS PAYMENT SLIP'
                      : 'COURSE PAYMENT SLIP'
                  }
                />
              </Grid>
            ))}
        </Grid>
      </div>
    )
  }
}

export default FormPreview
