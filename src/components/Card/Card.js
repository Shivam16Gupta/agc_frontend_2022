// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
// @material-ui/icons
// core components
import styles from 'assets/jss/material-dashboard-react/components/cardStyle.js'
// nodejs library that concatenates classes
import classNames from 'classnames'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles(styles)

export default function Card(props) {
  const classes = useStyles()
  const {
    className,
    children,
    plain,
    profile,
    chart,
    cardNoSpace,
    cardFullHeight,
    ...rest
  } = props
  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile,
    [classes.cardChart]: chart,
    [classes.cardNoSpace]: cardNoSpace,
    [classes.cardFullHeight]: cardFullHeight,
    [className]: className !== undefined,
  })
  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  )
}

Card.propTypes = {
  className: PropTypes.string,
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  chart: PropTypes.bool,
  cardNoSpace: PropTypes.bool,
  cardFullHeight: PropTypes.bool,
  children: PropTypes.node,
}
