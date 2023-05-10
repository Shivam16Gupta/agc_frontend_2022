import { Box } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import PropTypes from 'prop-types'
import React from 'react'
import RegularButton from '../components/CustomButtons/Button'

class CustomPagination extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      limit: props.limit,
      offset: 0,
    }
  }

  handleChangeFields = (event) => {
    this.setState(
      {
        limit: parseInt(event.target.value),
      },
      () => this.props.handleChange(this.state.limit, this.state.offset)
    )
  }

  handleLimit = (value) => () => {
    let { offset, limit } = this.state
    if (value === 1) {
      offset = offset + limit
    } else {
      offset = offset - limit
    }
    this.setState(
      {
        offset,
      },
      () => this.props.handleChange(limit, offset)
    )
  }

  render() {
    const { limit, offset } = this.state
    const { data } = this.props
    return (
      <div className="alignCenter">
        <Box p={2}>
          <RegularButton
            disabled={offset - limit < 0}
            color="primary"
            size="sm"
            fab
            onClick={this.handleLimit(0)}
          >
            <ArrowBackIcon />
          </RegularButton>
        </Box>
        {data.length > 0 && (
          <Box width="150px" p={2}>
            <TextField
              fullWidth
              select
              label="limit"
              value={limit}
              disabled={data.length !== limit}
              onChange={this.handleChangeFields}
              name="limit"
              size="small"
            >
              <MenuItem value="10">10</MenuItem>
              <MenuItem value="20">20</MenuItem>
              <MenuItem value="30">30</MenuItem>
              <MenuItem value="40">40</MenuItem>
              <MenuItem value="50">50</MenuItem>
              <MenuItem value="100">100</MenuItem>
            </TextField>
          </Box>
        )}
        <Box p={2}>
          <RegularButton
            disabled={data.length !== limit}
            color="primary"
            size="sm"
            fab
            onClick={this.handleLimit(1)}
          >
            <ArrowForwardIcon />
          </RegularButton>
        </Box>
      </div>
    )
  }
}

CustomPagination.propTypes = {
  limit: PropTypes.number,
  offset: PropTypes.number,
  data: PropTypes.array,
  handleChange: PropTypes.func,
}

export default CustomPagination
