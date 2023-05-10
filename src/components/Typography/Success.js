// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
// core components
import styles from 'assets/jss/material-dashboard-react/components/typographyStyle.js'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles(styles)

export default function Success(props) {
  const classes = useStyles()
  const { children, linkable, ...rest } = props
  const styles = classNames({
    [classes.defaultFontStyle + ' ' + classes.successText]: true,
    ['linkable']: linkable,
  })
  return (
    <div {...rest} className={styles}>
      {children}
    </div>
  )
}

Success.propTypes = {
  children: PropTypes.node,
  linkable: PropTypes.string,
}
