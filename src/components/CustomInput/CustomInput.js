import { TextField } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Check from '@material-ui/icons/Check'
// @material-ui/icons
import Clear from '@material-ui/icons/Clear'
// core components
import styles from 'assets/jss/material-dashboard-react/components/customInputStyle.js'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import Danger from './../Typography/Danger'
import InputAdornment from '@material-ui/core/InputAdornment'

const useStyles = makeStyles(styles)

export default function CustomInput(props) {
  const classes = useStyles()
  const [isError, setError] = React.useState(false)
  const [emptyMessage, setMessage] = React.useState()
  const {
    adorment,
    formControlProps,
    labelText,
    id,
    inputProps,
    error,
    success,
    errorMsg,
    maxLength,
    minLength,
    isHttp,
    isMandatory,
    handleChange,
    isNumber,
    smallLabel,
    darkLabel,
  } = props

  const underlineClasses = classNames({
    [classes.underlineSuccess]: success && (!error || !isError),
    [classes.underline]: true,
    [classes.labelRoot]: smallLabel,
    [classes.darkLabel]: darkLabel,
  })

  const formControlClasses = classNames({
    [classes.formControl]: true,
  })

  const onChange = (event) => {
    if (isNumber) {
      if (isNaN(event.target.value)) {
        return
      }
    }
    if (minLength || maxLength) {
      let isErrorExist = false
      if (minLength) {
        if (event.target.value.length < minLength) {
          isErrorExist = true
          setError(true)
          setMessage(errorMsg)
          handleChange(event, true)
        } else {
          handleInput(event)
        }
      }
      if (maxLength) {
        if (event.target.value.length > maxLength) {
          setError(true)
          setMessage(errorMsg)
          handleChange(event, true)
        } else {
          handleInput(event, isErrorExist)
        }
      }
    } else {
      if (handleChange) {
        handleChange(event, false)
      }
    }
    if (isHttp) {
      var link = event.target.value
      var check = link.substring(0, 4)
      if (check === 'http' || check === 'HTTP') {
      } else {
        setError(true)
        setMessage(
          'Please Add (http) else (https) before the URL, For Ex:- http://google.com'
        )
      }
    }
  }

  const handleInput = (event, isErrorExist) => {
    if (isMandatory && event.target.value.length === 0) {
      setError(true)
      setMessage(errorMsg)
      handleChange(event, true)
    } else {
      setError(isErrorExist)
      handleChange(event, isErrorExist)
    }
  }

  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + formControlClasses}
    >
      <TextField
        error={error || isError}
        InputLabelProps={{
          classes: {
            root: underlineClasses,
          },
        }}
        InputProps={{
          startAdornment: adorment && (
            <InputAdornment position="start">{adorment}</InputAdornment>
          ),
          classes: {
            disabled: classes.disabled,
          },
        }}
        label={labelText}
        variant={inputProps.disabled ? 'standard' : 'outlined'}
        margin="dense"
        id={id}
        {...inputProps}
        onChange={onChange}
      />
      {error || isError ? (
        <React.Fragment>
          <Clear className={classes.feedback + ' ' + classes.labelRootError} />
          <Danger>{emptyMessage}</Danger>
        </React.Fragment>
      ) : success ? (
        <Check className={classes.feedback + ' ' + classes.labelRootSuccess} />
      ) : null}
    </FormControl>
  )
}

CustomInput.propTypes = {
  adorment: PropTypes.object,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object.isRequired,
  error: PropTypes.bool,
  success: PropTypes.bool,
  errorMsg: PropTypes.string,
  isMandatory: PropTypes.bool,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  handleChange: PropTypes.func,
  isNumber: PropTypes.bool,
  smallLabel: PropTypes.bool,
  darkLabel: PropTypes.bool,
}
