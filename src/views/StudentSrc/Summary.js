import { Divider, Grid, Hidden, Typography } from '@material-ui/core'
import GetAppIcon from '@material-ui/icons/GetApp'
import React from 'react'
import { withRouter } from 'react-router-dom'
import CardContainer from '../../common/CardContainer'
import RegularButton from '../../components/CustomButtons/Button'
import { ASSETS } from '../../constants/Constants'
import { redirectUrl } from '../../utils/Utils'

class Summary extends React.Component {
  handleNext = (value) => () => {
    redirectUrl(value, 1)
  }

  render() {
    return (
      <div className="childContainer">
        <CardContainer
          heading={'Read the Instructions Below'}
          buttons={[
            <Hidden xsDown>
              <RegularButton
                round
                size="sm"
                color="danger"
                target="_blank"
                href={`./${ASSETS.PROSPECTUS}`}
              >
                Download Prospectus &nbsp;&nbsp; <GetAppIcon />
              </RegularButton>
            </Hidden>,
          ]}
        >
          <Grid container spacing={2} alignItems="center" id="form1234">
            <Hidden smUp>
              <Grid container item xs={12} justifyContent="center">
                <RegularButton
                  round
                  size="sm"
                  color="danger"
                  target="_blank"
                  href={`./${ASSETS.PROSPECTUS}`}
                >
                  Download Prospectus &nbsp;&nbsp; <GetAppIcon />
                </RegularButton>
              </Grid>
            </Hidden>
            <Grid item xs={12}>
              <Typography variant="h6">
                Please read all the instructions
              </Typography>
              <Divider />
              <Typography component="div" variant="body1">
                <ul>
                  <li>Download prospectus before proceeding further.</li>
                  <li>
                    Read all the guidelines carefully from the prospectus.
                  </li>
                  <li>
                    Any form related issue kindly email at :{' '}
                    <b>admissionagracollege@gmail.com</b>
                  </li>
                  <li>
                    डॉ.भीमराव आम्बेडकर वि.वि. आगरा द्वारा सत्र 2022—23 हेतु
                    अधिसूचित प्रवेश नियमावली एवं संशोधित शुल्क का विवरण यथाशीघ्र
                    अपलोड किया जाएगा। — प्राचार्य
                  </li>
                </ul>
              </Typography>
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <Grid container item xs={6} justifyContent="flex-end">
                <RegularButton
                  round
                  color="info"
                  onClick={this.handleNext('sPaymentHistory')}
                >
                  Payment History
                </RegularButton>
              </Grid>
              <Grid container item xs={6} justifyContent="flex-start">
                <RegularButton
                  round
                  onClick={this.handleNext('sForm')}
                  color="primary"
                >
                  Next
                </RegularButton>
              </Grid>
            </Grid>
          </Grid>
        </CardContainer>
      </div>
    )
  }
}

export default withRouter(Summary)
