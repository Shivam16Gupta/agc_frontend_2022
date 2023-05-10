import { DialogContent, Divider, Typography } from '@material-ui/core'
import {
  Close,
  NavigateBefore,
  NavigateNext,
  ZoomIn,
  ZoomOut,
} from '@material-ui/icons'
import GetAppIcon from '@material-ui/icons/GetApp'
import PrintIcon from '@material-ui/icons/Print'
import RegularButton from 'components/CustomButtons/Button'
import { saveAs } from 'file-saver'
import PropTypes from 'prop-types'
import React from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import '../ResumePage.css'
import { checkExtension } from '../utils/Utils'
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
var uuidv4 = require('uuidv4')

class FileReader extends React.Component {
  constructor() {
    super()
    this.state = {
      numPages: null,
      pageNumber: 1,
      scale: 0.5,
    }
  }

  componentDidMount() {
    const { onRef } = this.props
    onRef ? onRef(this) : null
  }

  setScale = (scale) => {
    this.setState({ scale })
  }

  setPageNum = (pageNumber) => {
    this.setState({ pageNumber })
  }

  setNumPages = (numPages) => {
    this.setState({ numPages })
  }

  setInitial = () => {
    this.setScale(0.5)
    this.setPageNum(1)
    this.setNumPages(null)
  }

  download = () => {
    if (checkExtension(this.props.fileLink) === 'pdf') {
      saveAs(this.props.fileLink, uuidv4() + '.pdf')
    } else {
      saveAs(this.props.fileLink, uuidv4() + '.jpg')
    }
  }

  setZoomIn = () => {
    const { scale } = this.state
    this.setScale(scale + 0.2)
  }

  setZoomOut = () => {
    const { scale } = this.state
    if (scale - 0.2 > 0) {
      this.setScale(scale - 0.2)
    }
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setNumPages(numPages)
  }

  goToPrevPage = () => {
    const { pageNumber } = this.state
    if (pageNumber > 1) {
      this.setPageNum(pageNumber - 1)
    }
  }

  goToNextPage = () => {
    const { pageNumber, numPages } = this.state
    if (pageNumber <= numPages - 1) {
      this.setPageNum(pageNumber + 1)
    }
  }

  render() {
    const { pageNumber, numPages, scale } = this.state
    const { fileLink, withDownload, handleClose } = this.props
    return (
      <React.Fragment>
        <center>
          {withDownload && (
            <RegularButton
              size="sm"
              justIcon
              color="primary"
              variant="contained"
              onClick={this.download}
            >
              <GetAppIcon />
            </RegularButton>
          )}
          <RegularButton
            size="sm"
            justIcon
            color="primary"
            variant="contained"
            onClick={this.setZoomIn}
          >
            <ZoomIn />
          </RegularButton>
          <RegularButton
            size="sm"
            justIcon
            color="primary"
            variant="contained"
            onClick={this.setZoomOut}
          >
            <ZoomOut />
          </RegularButton>
          {checkExtension(fileLink) === 'pdf' ? (
            <React.Fragment>
              <RegularButton
                size="sm"
                justIcon
                color="primary"
                variant="contained"
                onClick={() => window.print()}
              >
                <PrintIcon />
              </RegularButton>
              <RegularButton
                size="sm"
                justIcon
                color="primary"
                variant="contained"
                onClick={this.goToPrevPage}
              >
                <NavigateBefore />
              </RegularButton>
              <Typography component="span" variant="caption">
                Page {pageNumber} of {numPages}
              </Typography>
              <RegularButton
                size="sm"
                justIcon
                color="primary"
                variant="contained"
                onClick={this.goToNextPage}
              >
                <NavigateNext />
              </RegularButton>
              <RegularButton
                size="sm"
                justIcon
                color="rose"
                variant="contained"
                onClick={handleClose}
              >
                <Close />
              </RegularButton>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <RegularButton
                size="sm"
                justIcon
                color="primary"
                variant="contained"
                onClick={this.download}
              >
                <GetAppIcon />
              </RegularButton>
              <RegularButton
                size="sm"
                justIcon
                color="rose"
                variant="contained"
                onClick={handleClose}
              >
                <Close />
              </RegularButton>
            </React.Fragment>
          )}
        </center>
        <Divider />
        <DialogContent dividers>
          {checkExtension(fileLink) === 'pdf' ? (
            <Document
              renderMode="svg"
              className={'PDFDocument'}
              file={fileLink}
              onLoadSuccess={this.onDocumentLoadSuccess}
            >
              <Page
                scale={scale}
                className={'PDFPage'}
                pageNumber={pageNumber}
              />
            </Document>
          ) : (
            <img
              src={fileLink}
              style={{
                width: '500px',
                zoom: scale == 0.5 ? 1 : parseFloat(1 + scale),
              }}
            />
          )}
        </DialogContent>
      </React.Fragment>
    )
  }
}

FileReader.propTypes = {
  fileLink: PropTypes.string,
  withDownload: PropTypes.bool,
}
export default FileReader
