import { Grid } from '@material-ui/core'
import React from 'react'
import { withRouter } from 'react-router-dom'
import FormApi from '../../apis/FormApi'
import CardContainer from '../../common/CardContainer'
import LocalStorage from '../../common/LocalStorage'
import CustomText from '../../components/CustomText/Customtext'
import CustomTable from '../../components/Table/Table'
import { getUserDetail } from '../../utils/Utils'

class PaymentHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      paymentSummary: [],
    }
  }

  componentDidMount() {
    this.fetchPayment(this.props.userId)
  }

  componentWillReceiveProps(props) {
    if (this.props.userId !== props.userId && props.userId) {
      this.fetchPayment(props.userId)
    }
  }

  fetchPayment = (userId) => {
    const data = {
      registrationNo: userId
        ? userId
        : LocalStorage.getUser() && LocalStorage.getUser().user_id,
      receipt: '0',
    }
    FormApi.fetchPaymentDetails(data).then((payResponse) => {
      if (payResponse.data) {
        this.setState({
          paymentSummary: payResponse.data,
        })
      }
    })
  }

  formatData = (data) => {
    var formatted = data.map((item) => {
      return [
        item.paymentId,
        item.TxnReferenceNo,
        item.BankReferenceNo,
        item.BankID,
        item.TxnAmount,
        item.TxnType,
        item.TxnDate,
        item.AuthMsg,
        // item.RefundStatus,
        // item.TotalRefundAmount,
        // item.LastRefundDate,
        // item.LastRefundRefNo,
      ]
    })
    return formatted
  }

  render() {
    const { paymentSummary } = this.state
    return (
      <div className="childContainer">
        {paymentSummary && paymentSummary.length > 0 && (
          <CardContainer heading="Payment Summary">
            <Grid container spacing={2}>
              <Grid
                container
                item
                xs={12}
                direction="column"
                alignContent="center"
              >
                <CustomTable
                  boldHeading
                  tableHead={[
                    'Payment Id',
                    'TxnReferenceNo',
                    'BankReferenceNo',
                    'BankID',
                    'Amount',
                    'TxnType',
                    'TxnDate',
                    'Status',
                  ]}
                  tableData={this.formatData(paymentSummary)}
                />
              </Grid>
              {getUserDetail('payment') === '1' && (
                <Grid container item xs={12} justifyContent="flex-end">
                  <CustomText
                    underline
                    blue
                    bold
                    link
                    onClick={() => this.props.history.goBack()}
                  >
                    Go Back ?
                  </CustomText>
                </Grid>
              )}
            </Grid>
          </CardContainer>
        )}
      </div>
    )
  }
}

export default withRouter(PaymentHistory)
