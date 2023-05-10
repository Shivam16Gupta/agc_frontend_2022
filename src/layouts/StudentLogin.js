import { Box, Divider } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CakeIcon from '@material-ui/icons/Cake'
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber'
import { saveAs } from 'file-saver'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import LoginApi from '../apis/LoginApi'
import AnnouncementApi from '../apis/AnnouncementApi'
import LocalStorage from '../common/LocalStorage'
import Card from '../components/Card/Card'
import CardBody from '../components/Card/CardBody'
import RegularButton from '../components/CustomButtons/Button'
import CustomInput from '../components/CustomInput/CustomInput'
import Danger from '../components/Typography/Danger'
import { ASSETS } from '../constants/Constants'
import { addErrorMsg } from '../utils/Utils'


const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  logo: {
    marginTop: 20,
    width: '100px',
    height: '100px',
  },
})

class Login extends Component {
  constructor() {
    super()
    this.state = {
      registrationNo: null,
      dob: null,
      announcements: [],
    }
  }

  componentDidMount() {
    this.handleFetchAnnouncements()
  }

  handleFetchAnnouncements() {
    // AnnouncementApi.fetchAllAnnouncements().then((res) => {
    //   this.setState({
    //     ...this.state,
    //     announcements: res.data,
    //   })
    // })
    // this.setState({
    //   ...this.state,
    //   announcements: announcements.announcements,
    // })

    
      fetch('https://agc.eduguruji.com/2023/announcement.json')
    .then(response => response.json())
    .then(data =>  this.setState({
      ...this.state,
      announcements: data.announcements,
      
    }))
    .catch(error => console.error(error));
    
  }

  handleSubmit = () => {
    this.handleLogin()
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.handleLogin()
    }
  }

  handleLogin = () => {
    const { registrationNo, dob } = this.state
    const data = {
      username: registrationNo,
      password: dob,
    }
    if (registrationNo && dob) {
      
      LoginApi.userLogin(data).then((response) => {
        if (
          response !== undefined &&
          response.data &&
          response.status === 200
        ) {
          LocalStorage.setUser(response.data)
          this.props.history.push('/student')
        }
      })
    } else {
      addErrorMsg('Fill all the fields')
    }
  }

  handleChangeFields = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    })
  }

  handleDownload = () => {
    saveAs(`./${ASSETS.STUDENTPERFORMA}`, 'STUDENTPERFORMA')
  }

  render() {
    const { classes } = this.props
    const { announcements } = this.state
    return (
      <div>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <div className="center">
            <img alt="logo" src="agracollege.png" className={classes.logo} />
            <Typography variant="h4">
              SESSION <b>2023-24</b>
            </Typography>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card cardFullHeight>
                <CardBody>
                  <Typography variant="h6">Important Instructions</Typography>
                  <Typography component="span">
                    <ul>
                      <li>
                        <Danger className="alignCenter">
                          Web registration on university website is compulsory
                          for taking admission in college. For web registration
                          applicants must visit this link -{' '}
                          <label
                            className="link"
                            onClick={() => window.open('http://dbrau.org.in')}
                          >
                            http://dbrau.org.in
                          </label>
                        </Danger>
                      </li>
                      {announcements.map((announcement, index) => {
                        return (
                          <div>
                            <li key={index}>
                              {announcement.txt}
                              <a href={announcement.link}>
                                {announcement.link}
                              </a>
                            </li>
                          </div>
                        )
                      })}
                    </ul>
                  </Typography>
                </CardBody>
              </Card>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Card cardFullHeight>
                <CardBody className={classes.paper}>
                  <Typography component="h1" variant="h6">
                    For Registered Users
                  </Typography>
                  <div className={classes.form} noValidate>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12}>
                        <CustomInput
                          adorment={<ConfirmationNumberIcon />}
                          labelText="Registration No"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            name: 'registrationNo',
                            onKeyDown: this.handleKeyDown,
                          }}
                          handleChange={this.handleChangeFields}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomInput
                          adorment={<CakeIcon />}
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: 'date',
                            name: 'dob',
                            onKeyDown: this.handleKeyDown,
                            helperText: 'Date of Birth',
                          }}
                          handleChange={this.handleChangeFields}
                        />
                      </Grid>
                      <Grid container item xs={12} justifyContent="center">
                        <Box pb={2}>
                          <RegularButton
                            round
                            color="primary"
                            onClick={this.handleSubmit}
                          >
                            SIGN IN
                          </RegularButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </div>
                </CardBody>
              </Card>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Card cardFullHeight>
                <CardBody className={classes.paper}>
                  <Grid container spacing={2}>
                    <Grid container item xs={12} justifyContent="center">
                      <Typography component="h1" variant="h6">
                        New User Registration for Admission
                      </Typography>
                    </Grid>
                    <Grid container item xs={12} justifyContent="center">
                      <RegularButton
                        round
                        color="primary"
                        onClick={() => this.props.history.push('/register')}
                      >
                        New Registration
                      </RegularButton>
                      {/* <RegularButton
                        round
                        color="primary"
                        onClick={() => this.props.history.push('/re_ex_register')}
                      >
                        Re/Ex Registration
                      </RegularButton> */}
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid container item xs={12} justifyContent="center">
                      <Typography component="h1" variant="h6">
                        Forgot Registration Details ?
                      </Typography>
                    </Grid>
                    <Grid container item xs={12} justifyContent="center">
                      <RegularButton
                        round
                        color="primary"
                        onClick={() =>
                          this.props.history.push('/forgotpassword')
                        }
                      >
                        Forgot Registration No.
                      </RegularButton>
                    </Grid>
                  </Grid>
                </CardBody>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    )
  }
}

export default withRouter(withStyles(useStyles)(Login))
