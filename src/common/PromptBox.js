import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import RegularButton from '../components/CustomButtons/Button'

const PromptBox = (props) => {
  const handleNo = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('error'))
  }
  const handleYes = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('error'))
    props.handleAction()
  }

  const {
    title,
    message,
    isYes,
    isNo,
    yesName,
    noName,
    disableBackdropClick,
    disableEscapeKeyDown,
  } = props

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleNo}
        disableBackdropClick={disableBackdropClick}
        disableEscapeKeyDown={disableEscapeKeyDown}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText component="div" id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {isYes && (
            <RegularButton onClick={handleYes} color="primary">
              {yesName}
            </RegularButton>
          )}
          {isNo && (
            <RegularButton onClick={handleNo} autoFocus color="info">
              {noName}
            </RegularButton>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}

PromptBox.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.any,
  isYes: PropTypes.bool,
  isNo: PropTypes.bool,
  yesName: PropTypes.string,
  noName: PropTypes.string,
  disableBackdropClick: PropTypes.bool,
  disableEscapeKeyDown: PropTypes.bool,
}

export default PromptBox
