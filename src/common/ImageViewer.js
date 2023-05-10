import {
  Dialog,
  DialogContent,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core'
import { Close, NavigateBefore, NavigateNext } from '@material-ui/icons'
import RegularButton from 'components/CustomButtons/Button'
import PropTypes from 'prop-types'
import React from 'react'
import { ASSETS } from '../constants/Constants'

class ImageViewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageIndex: props.initialIndex ? props.initialIndex : 0,
    }
  }

  prevPage = () => {
    const { imageIndex } = this.state
    if (imageIndex !== 0) {
      this.setState({
        imageIndex: imageIndex - 1,
      })
    }
  }

  nextPage = () => {
    const { imageIndex } = this.state
    const { images } = this.props
    if (imageIndex < images.length - 1) {
      this.setState({
        imageIndex: imageIndex + 1,
      })
    }
  }

  render() {
    const { imageIndex } = this.state
    const { isOpen, images, handleClose } = this.props
    return (
      <Dialog
        fullWidth
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <center>
          <RegularButton
            size="sm"
            justIcon
            color="primary"
            variant="contained"
            onClick={this.prevPage}
          >
            <NavigateBefore />
          </RegularButton>
          <Typography className="pad10" component="span" variant="caption">
            Page {imageIndex + 1} of {images.length}
          </Typography>
          <RegularButton
            size="sm"
            justIcon
            color="primary"
            variant="contained"
            onClick={this.nextPage}
          >
            <NavigateNext />
          </RegularButton>
          <RegularButton
            size="sm"
            justIcon
            color="rose"
            variant="contained"
            onClick={this.props.handleClose}
          >
            <Close />
          </RegularButton>
        </center>
        <Divider />
        <DialogContent dividers>
          <Grid container>
            <Grid container item xs={12} justifyContent="center">
              {images.length > 0 &&
                images.map(
                  (item, i) =>
                    i === imageIndex && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        viewBox="0 0 800 600"
                      >
                        <image
                          width="100%"
                          height="100%"
                          href={
                            item.baseImage ? item.baseImage : ASSETS.url + item
                          }
                        />
                        {item.appendedImages &&
                          item.appendedImages.map((item) => (
                            <image
                              width="100px"
                              height="100px"
                              x={item.x}
                              y={item.y}
                              href={item.url}
                            />
                          ))}
                      </svg>
                    )
                )}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    )
  }
}

ImageViewer.propTypes = {
  isOpen: PropTypes.bool,
  images: PropTypes.array,
  initialIndex: PropTypes.any,
  handleClose: PropTypes.func,
}

export default ImageViewer
