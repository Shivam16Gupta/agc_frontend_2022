import { Dialog } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import FileReader from './FileReader'

const DocumentView = (props) => {
  let fileRef = React.createRef()
  const handleClose = () => {
    if (fileRef) {
      fileRef.setInitial()
    }
    props.handleClose()
  }

  const onRef = (ref) => {
    fileRef = ref
  }

  return (
    <Dialog
      fullWidth="md"
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.isOpen}
    >
      <FileReader onRef={onRef} {...props} handleClose={handleClose} />
    </Dialog>
  )
}

DocumentView.propTypes = {
  isOpen: PropTypes.bool,
  fileLink: PropTypes.string,
  withDownload: PropTypes.bool,
  handleClose: PropTypes.func,
}

export default DocumentView
