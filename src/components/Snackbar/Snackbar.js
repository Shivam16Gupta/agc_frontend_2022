import React from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import ReactDOM from 'react-dom'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

export default function CustomizedSnackbars(props) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    ReactDOM.unmountComponentAtNode(props.renderElement)
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={props.severity}>
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

CustomizedSnackbars.propTypes = {
  message: PropTypes.node.isRequired,
  severity: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
}
