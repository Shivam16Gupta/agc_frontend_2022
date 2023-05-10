import { withStyles } from '@material-ui/core/styles'
import PublishIcon from '@material-ui/icons/Publish'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import RegularButton from '../../components/CustomButtons/Button'
import { ASSETS } from '../../constants/Constants'
import { addErrorMsg, addWarningMsg } from '../../utils/Utils'

const styles = {
  parentDiv: {
    backgroundColor: 'silver',
    display: 'inline-block',
    position: 'relative',
    height: '100px',
    width: '100%',
  },
  borderDiv: {
    border: 'dashed grey 2px',
    backgroundColor: 'rgba(255,255,255,.8)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  childDiv: {
    position: 'absolute',
    top: '40%',
    right: 0,
    left: 0,
    textAlign: 'center',
    color: 'grey',
    fontSize: 15,
  },
}
class FileUploader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      drag: false,
      filesCount: props.filesCount,
    }
    this.dropRef = React.createRef()
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({
      filesCount: props.filesCount,
    })
  }

  handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  handleDragIn = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.dragCounter++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ drag: true })
    }
  }

  handleDragOut = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.dragCounter--
    if (this.dragCounter === 0) {
      this.setState({ drag: false })
    }
  }

  handleCheckSize = (uploadedFiles) => {
    const { maxSize } = this.props
    let largeFiles = null
    if (maxSize) {
      var fileSize = maxSize
    } else {
      var fileSize = 3
    }
    for (let i in uploadedFiles) {
      if (
        typeof uploadedFiles === 'object' &&
        Math.round(uploadedFiles[i].size / 1024) > fileSize * 1024
      ) {
        largeFiles = uploadedFiles[i]
        break
      }
    }
    return largeFiles
  }

  handleUploadFile = (event) => {
    const { multiple, limit, isDragDrop, handleChange, maxSize } = this.props
    let filesData
    if (limit) {
      var uploadLimit = limit
    } else {
      var uploadLimit = 3
    }
    if (isDragDrop && !event.target.files) {
      if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
        event.preventDefault()
        event.stopPropagation()
        filesData = event.dataTransfer.files
      }
    } else {
      filesData = event.target.files
    }
    if (filesData.length > 0) {
      let largeFiles = this.handleCheckSize(filesData)
      if (filesData.length <= uploadLimit) {
        if (!largeFiles) {
          if (multiple) {
            for (var v = 0; v < filesData.length; v++) {
              if (this.state.filesCount + 1 <= uploadLimit) {
                handleChange(filesData[v], this.props.index, this.props.name)
              } else {
                addWarningMsg(
                  'Limit reached, You can only select ' + uploadLimit + ' files'
                )
                break
              }
            }
          } else {
            handleChange(filesData[0], this.props.index, this.props.name)
          }
          if (isDragDrop && !event.target.files) {
            event.dataTransfer.clearData()
            this.dragCounter = 0
          }
        } else {
          addErrorMsg(`${largeFiles.name} must be less than ${maxSize}MB`)
          largeFiles = null
        }
      } else {
        addWarningMsg('You can select files only up to ' + uploadLimit)
      }
    }
  }

  componentDidMount() {
    let div = this.dropRef.current
    div.addEventListener('dragenter', this.handleDragIn)
    div.addEventListener('dragleave', this.handleDragOut)
    div.addEventListener('dragover', this.handleDrag)
    div.addEventListener('drop', this.handleUploadFile)
  }

  UNSAFE_componentWillReceiveProps() {
    let div = this.dropRef.current
    div.removeEventListener('dragenter', this.handleDragIn)
    div.removeEventListener('dragleave', this.handleDragOut)
    div.removeEventListener('dragover', this.handleDrag)
    div.removeEventListener('drop', this.handleUploadFile)
  }

  render() {
    const { classes, buttonLabel, accept, multiple, isDragDrop, isCard, id } =
      this.props
    return (
      <div
        className={classNames(isDragDrop && classes.parentDiv)}
        ref={this.dropRef}
      >
        <div className={classNames(isDragDrop && classes.borderDiv)}>
          <div className={classNames(isDragDrop && classes.childDiv)}>
            {!multiple ? (
              <input
                accept={accept}
                style={{ display: 'none' }}
                id={id}
                type="file"
                onChange={this.handleUploadFile}
              />
            ) : (
              <input
                multiple
                accept={accept}
                style={{ display: 'none' }}
                id={id}
                type="file"
                onChange={this.handleUploadFile}
              />
            )}
            <label htmlFor={id}>
              {isDragDrop ? (
                <span>Drag & drop your files here to upload</span>
              ) : isCard ? (
                <div className="center">
                  <img className="pointer" src={ASSETS.url + 'camera.svg'} />
                </div>
              ) : (
                <RegularButton round color="primary" component="span">
                  <PublishIcon />
                  {buttonLabel}
                </RegularButton>
              )}
            </label>
          </div>
        </div>
      </div>
    )
  }
}

FileUploader.propTypes = {
  accept: PropTypes.string,
  buttonLabel: PropTypes.string,
  id: PropTypes.string,
  isDragDrop: PropTypes.bool,
  isCard: PropTypes.bool,
  multiple: PropTypes.bool,
  limit: PropTypes.number,
  maxSize: PropTypes.number,
  filesCount: PropTypes.number,
  name: PropTypes.string,
  index: PropTypes.number,
}

export default withStyles(styles)(FileUploader)
