import { Button, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import styles from 'assets/jss/material-dashboard-react/layouts/adminStyle.js'
import React from 'react'
import { Redirect, Switch } from 'react-router-dom'
import LocalStorage from '../common/LocalStorage'
import { errorDialog, validateUser } from '../utils/Utils'

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      routesLink: props.routesLink,
      mobileOpen: false,
      user: LocalStorage.getUser(),
    }
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  handleLogout = () => {
    LocalStorage.getLogout()
    window.location.reload()
  }

  handleRedirects = () => {
    if (validateUser()) {
      const user = LocalStorage.getUser()
      if (user.payment == '0' && user.submitted === '0') {
        return <Redirect to="/student/payment"></Redirect>
      } else if (user.payment == '1' && user.submitted === '0') {
        return <Redirect to="/student/summary"></Redirect>
      } else if (user.payment === '1' && user.submitted === '1') {
        return <Redirect to="/student/formsubmitted"></Redirect>
      }
    } else {
      errorDialog('Kindly refresh the page and try again')
    }
  }

  render() {
    const { classes, role } = this.props
    const { mobileOpen, routesLink, user } = this.state
    return (
      <div className={classes.wrapper}>
        <div className={classes.studentPanel}>
          <div className="childContainer">
            <Grid container spacing={2} alignItems="center">
              <Grid container item xs={6} justifyContent="flex-start">
                <img alt="logo" src="agracollege.png" className="logo" />
              </Grid>
              <Grid container item xs={6} justifyContent="flex-end">
                <Button onClick={this.handleLogout} color="inherit">
                  <ExitToAppIcon /> &nbsp;&nbsp; Logout
                </Button>
              </Grid>
            </Grid>
          </div>
          <div className={classes.content}>
            <div className={classes.container}>
              <Switch>{routesLink}</Switch>
              {this.handleRedirects()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Admin)
