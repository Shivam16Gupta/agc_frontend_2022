import { Box, Divider, Grid, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { isMobile } from 'mobile-device-detect'
import React from 'react'
import RegularButton from '../components/CustomButtons/Button'

const monthsName = [
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER',
]
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const styles = (theme) => ({
  currentDate: {
    backgroundColor: 'green',
    borderRadius: '50%',
    width: '24px',
    color: '#fff',
  },
})

class ViewCalendar extends React.Component {
  constructor() {
    super()
    this.state = {
      date: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      weekDay: new Date(
        new Date().getFullYear(),
        new Date().getMonth()
      ).getDay(),
      dateValue: null,
    }
  }

  handleMonthYear = (value) => () => {
    var yearValue = this.props.year
    var monthValue = this.props.month
    var weekDifference = this.props.weekDifference
    if (value === 0) {
      if (monthValue === 0) {
        yearValue = yearValue - 1
        monthValue = 11
      } else {
        monthValue = monthValue - 1
      }
    } else {
      if (monthValue === 11) {
        yearValue = yearValue + 1
        monthValue = 0
      } else {
        monthValue = monthValue + 1
      }
    }
    weekDifference = new Date(yearValue, monthValue).getDay()
    this.setState({
      month: monthValue,
      year: yearValue,
      weekDay: weekDifference,
    })
    this.props.handleUpdateState(monthValue, yearValue, weekDifference)
  }

  handlePrintDays = (noOfDays) => {
    const { weekDay } = this.state
    var numberOfDays = []
    if (weekDay !== 0) {
      for (let i = 0; i < weekDay; i++) {
        numberOfDays.push(null)
      }
    }
    for (let i = 1; i <= noOfDays; i++) {
      numberOfDays.push(i)
    }
    return numberOfDays
  }

  handleDateClick = (dateValue) => () => {
    this.setState({ dateValue })
  }

  render() {
    const { calenderData, withNextPrevButton, classes } = this.props
    const { date, year, month, dateValue } = this.state
    return (
      <div>
        <center>
          <Typography variant="h5">
            <b>{year}</b>
          </Typography>
          <Grid container alignItems="baseline">
            {withNextPrevButton ? (
              <Grid item xs={3}>
                <RegularButton
                  size="sm"
                  color="transparent"
                  onClick={this.handleMonthYear(0)}
                >
                  <ArrowBackIcon />
                </RegularButton>
              </Grid>
            ) : null}
            <Grid item xs={6}>
              <Typography variant="h6">{monthsName[month]}</Typography>
            </Grid>
            {withNextPrevButton ? (
              <Grid item xs={3}>
                <RegularButton
                  size="sm"
                  color="transparent"
                  onClick={this.handleMonthYear(1)}
                >
                  <ArrowForwardIcon />
                </RegularButton>
              </Grid>
            ) : null}
          </Grid>
        </center>
        <Divider />
        <div className="calendar">
          <center>
            <div className="WeekDays">
              {days.map((day) => (
                <b>{day}</b>
              ))}
            </div>
            <Divider />
            <div className={isMobile ? 'datesMobile' : 'datesWeb'}>
              {this.handlePrintDays(new Date(year, month + 1, 0).getDate()).map(
                (days) => {
                  let dateValue = calenderData.find(
                    (item) => item.date === `${days}-${month + 1}-${year}`
                  )

                  return (
                    <div className={isMobile ? 'dateBlockMobile' : 'dateBlock'}>
                      <Typography onClick={this.handleDateClick(dateValue)}>
                        {days === date &&
                        month === new Date().getMonth() &&
                        year === new Date().getFullYear() ? (
                          <div className={classes.currentDate}>
                            <b>{days}</b>
                          </div>
                        ) : (
                          days
                        )}
                      </Typography>
                      <div>
                        {isMobile ? null : dateValue ? dateValue.data : null}
                      </div>
                    </div>
                  )
                }
              )}
            </div>
          </center>
        </div>

        {isMobile && (
          <div>
            {dateValue ? (
              <Box p={1}>
                <Typography> {dateValue.date}</Typography>
                <Divider />
                <Typography>{dateValue.data}</Typography>
              </Box>
            ) : null}
          </div>
        )}
      </div>
    )
  }
}
export default withStyles(styles)(ViewCalendar)
