import { Dialog, Grid, Typography } from '@material-ui/core'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import PropTypes from 'prop-types'
import React from 'react'
import { HashRouter } from 'react-router-dom'
import { closeDialog } from '../utils/Utils'

const FormDialog = (props) => {
  const doAction = () => {
    closeDialog()
    props.action()
  }
  const { title, component, maxSize, action, fullScreen } = props
  return (
    <HashRouter>
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth={maxSize}
        open={true}
        onClose={() => (action ? doAction() : closeDialog())}
      >
        {title !== null && title && (
          <DialogTitle>
            <Grid container>
              <Grid item xs={11}>
                <Typography variant="subtitle1">{title}</Typography>
              </Grid>
              <Grid container item xs={1} justifyContent="flex-end">
                <IconButton
                  size="small"
                  aria-label="close"
                  onClick={() => closeDialog()}
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
          </DialogTitle>
        )}
        <DialogContent dividers>{component}</DialogContent>
      </Dialog>
    </HashRouter>
  )
}

FormDialog.propTypes = {
  title: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  fullScreen: PropTypes.bool,
  maxSize: PropTypes.string,
}

export default FormDialog
