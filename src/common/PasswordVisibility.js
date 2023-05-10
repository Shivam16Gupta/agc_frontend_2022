import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import PropTypes from 'prop-types'
import React from 'react'
import RegularButton from '../components/CustomButtons/Button'

function PasswordVisibility(props) {
  return (
    <div>
      {props.hidden ? (
        <RegularButton
          justIcon
          color="transparent"
          size="sm"
          onClick={props.handleViewPassword}
        >
          <VisibilityOffIcon />
        </RegularButton>
      ) : (
        <RegularButton
          justIcon
          color="transparent"
          size="sm"
          onClick={props.handleViewPassword}
        >
          <VisibilityIcon />
        </RegularButton>
      )}
    </div>
  )
}

PasswordVisibility.propTypes = {
  hidden: PropTypes.bool,
  handleViewPassword: PropTypes.func,
}

export default PasswordVisibility
