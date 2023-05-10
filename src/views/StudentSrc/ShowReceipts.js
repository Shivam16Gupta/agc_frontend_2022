import { Box, Grid } from '@material-ui/core'
import React from 'react'
import CardContainer from '../../common/CardContainer'
import CustomTable from '../../components/Table/PrintTable'
import categoryStaticData from '../../StaticData/category.json'
import courseStaticData from '../../StaticData/courses.json'

const successCode = '0300'
class ShowReceipts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      paymentDetails: props.paymentDetails,
      heading: props.heading,
    }
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({
      paymentDetails: props.paymentDetails,
      heading: props.heading,
    })
  }

  formatPaymentData = (data) => {
    var formatted = data.map((item) => {
      return [
        item.registrationNo ? item.registrationNo : '',
        item.name,
        item.fatherName,
        item.gender.toUpperCase(),
        item.dob,
        categoryStaticData.find((itm) => itm.categoryId === item.category)
          .category,
        item.aadharNo,
        courseStaticData.find((itm) => item.course === itm.courseId).courseName,
        item.admissionYear,
        'Online PG',
        item.TxnReferenceNo,
        '₹' + item.TxnAmount,
        item.AuthMsg,
        'Admission Fees',
        item.TxnDate,
        item.AuthStatusCode != successCode ? item.errorDescription : '',
      ]
    })
    return formatted
  }

  render() {
    const { paymentDetails, heading } = this.state
    return (
      <div className="childContainer">
        <CardContainer
          noSpace
          plainHeader
          darkHeading
          heading={heading}
          buttons={[]}
        >
          <Grid container item xs={12} justifyContent="center">
            <Box p={1}></Box>
            {paymentDetails && (
              <Grid item xs={12}>
                <CustomTable
                  boldHeading
                  isColumn={true}
                  tableHead={[
                    'Registration No',
                    'Name',
                    'Father Name',
                    'Gender',
                    'DOB',
                    'Category',
                    'Aadhar No.',
                    'Course',
                    'Course Year',
                    'Payment Mode',
                    'Transaction Reference No',
                    'Transaction Amount',
                    'Payment Status',
                    'Purpose of Payment',
                    'Payment Date',
                    paymentDetails.AuthStatusCode != successCode
                      ? 'Failure Description'
                      : '',
                  ]}
                  tableData={this.formatPaymentData([paymentDetails])}
                />
              </Grid>
            )}
          </Grid>
        </CardContainer>
      </div>
    )
  }
}

export default ShowReceipts
