import { Fab } from '@material-ui/core'
import Button from '@material-ui/core/Button'
// material-ui components
import { makeStyles } from '@material-ui/core/styles'
import styles from 'assets/jss/material-dashboard-react/components/buttonStyle.js'
// nodejs library that concatenates classes
import classNames from 'classnames'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles(styles)

export default function RegularButton(props) {
  const classes = useStyles()
  const {
    color,
    round,
    children,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    muiClasses,
    variant,
    fab,
    ...rest
  } = props
  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [classes.fab]: fab,
    [className]: className,
  })
  return (
    <React.Fragment>
      {fab ? (
        <Fab
          variant={variant}
          {...rest}
          classes={muiClasses}
          className={btnClasses}
        >
          {children}
        </Fab>
      ) : (
        <Button
          variant={variant}
          {...rest}
          classes={muiClasses}
          className={btnClasses}
        >
          {children}
        </Button>
      )}
    </React.Fragment>
  )
}

RegularButton.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'info',
    'success',
    'warning',
    'danger',
    'rose',
    'white',
    'transparent',
  ]),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  fullWidth: PropTypes.bool,
  simple: PropTypes.bool,
  round: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  link: PropTypes.bool,
  justIcon: PropTypes.bool,
  className: PropTypes.string,
  muiClasses: PropTypes.object,
  children: PropTypes.node,
  fab: PropTypes.bool,
}
