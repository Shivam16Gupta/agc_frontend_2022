import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// nodejs library that concatenates classes
import classNames from 'classnames'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
import React from 'react'

const styles = {
  crossed: {
    textDecoration: 'line-through',
  },
  discount: {
    background: '#2d4eab',
    color: 'white',
    padding: '5px',
    marginTop: '6px',
  },
  bold: {
    fontWeight: 'bold',
  },
  blue: {
    color: '#2d4eab',
  },
  skyBlue: {
    color: '#1a8dff',
  },
  yellow: {
    color: '#FBAF21',
  },
  darkGrey: {
    color: '#646d82',
  },
  green: {
    color: '#2cd889',
  },
  red: {
    color: '#ff0000',
  },
  lightRed: {
    color: '#f46363',
  },
  white: {
    color: '#ffffff',
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  verySmall: {
    fontSize: '10px',
  },
  small: {
    fontSize: '12px',
  },
  medium: {
    fontSize: '14px',
  },
  responsiveXL: {
    fontSize: '2vw',
  },
  responsiveL: {
    fontSize: '1.5vw',
  },
  responsiveM: {
    fontSize: '1vw',
  },
  responsiveS: {
    fontSize: '0.8vw',
  },
  large: {
    fontSize: '20px',
  },
  xLarge: {
    fontSize: '30px',
  },
  marginBottom: {
    marginBottom: '10px',
  },
  padding: {
    padding: '5px',
  },
  link: {
    cursor: 'pointer',
    '&:hover': {
      color: 'darkgrey',
    },
  },
  pointer: {
    cursor: 'pointer',
  },
  silver: {
    color: '#D6D6D6',
  },
  upperCase: {
    textTransform: 'uppercase',
  },
  underline: {
    textDecoration: 'underline',
  },
  textAlignLeft: {
    textAlign: 'left',
  },
  justifyText: {
    textAlign: 'justify',
    textJustify: 'inter-word',
  },
  breakWord: {
    wordBreak: 'break-word',
  },
}
const useStyles = makeStyles(styles)

function CustomText(props) {
  const classes = useStyles()
  const {
    justify,
    crossed,
    discount,
    medium,
    darkGrey,
    silver,
    large,
    xLarge,
    link,
    pointer,
    spacing,
    downSpace,
    verySmall,
    small,
    responsiveXL,
    responsiveL,
    responsiveM,
    responsiveS,
    bold,
    blue,
    skyBlue,
    white,
    yellow,
    green,
    lightRed,
    red,
    center,
    upperCase,
    underline,
    alignLeft,
    breakWord,
    children,
    className,
    ...rest
  } = props

  const btnClasses = classNames({
    [classes.justifyText]: justify,
    [classes.crossed]: crossed,
    [classes.discount]: discount,
    [classes.silver]: silver,
    [classes.responsiveXL]: responsiveXL,
    [classes.responsiveL]: responsiveL,
    [classes.responsiveM]: responsiveM,
    [classes.responsiveS]: responsiveS,
    [classes.medium]: medium,
    [classes.lightRed]: lightRed,
    [classes.darkGrey]: darkGrey,
    [classes.large]: large,
    [classes.xLarge]: xLarge,
    [classes.link]: link,
    [classes.pointer]: pointer,
    [classes.padding]: spacing,
    [classes.marginBottom]: downSpace,
    [classes.small]: small,
    [classes.verySmall]: verySmall,
    [classes.yellow]: yellow,
    [classes.blue]: blue,
    [classes.skyBlue]: skyBlue,
    [classes.white]: white,
    [classes.green]: green,
    [classes.red]: red,
    [classes.bold]: bold,
    [classes.upperCase]: upperCase,
    [classes.underline]: underline,
    [classes.alignLeft]: alignLeft,
    [classes.alignCenter]: center,
    [classes.breakWord]: breakWord,
    [className]: className,
  })
  return (
    <React.Fragment>
      <Typography {...rest} className={btnClasses}>
        {children}
      </Typography>
    </React.Fragment>
  )
}

export default CustomText

CustomText.propTypes = {
  justify: PropTypes.bool,
  alignCenter: PropTypes.bool,
  alignLeft: PropTypes.bool,
  underline: PropTypes.bool,
  link: PropTypes.bool,
  discount: PropTypes.bool,
  crossed: PropTypes.bool,
  medium: PropTypes.bool,
  darkGrey: PropTypes.bool,
  pointer: PropTypes.bool,
  responsiveXL: PropTypes.bool,
  responsiveL: PropTypes.bool,
  responsiveM: PropTypes.bool,
  responsiveS: PropTypes.bool,
  large: PropTypes.bool,
  xLarge: PropTypes.bool,
  spacing: PropTypes.bool,
  upperCase: PropTypes.bool,
  downSpace: PropTypes.bool,
  small: PropTypes.bool,
  verySmall: PropTypes.bool,
  center: PropTypes.bool,
  bold: PropTypes.bool,
  silver: PropTypes.bool,
  white: PropTypes.bool,
  yellow: PropTypes.bool,
  blue: PropTypes.bool,
  skyBlue: PropTypes.bool,
  green: PropTypes.bool,
  red: PropTypes.bool,
  breakWord: PropTypes.bool,
  lightRed: PropTypes.bool,
  variant: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
    'caption',
    'button',
    'overline',
  ]),
  className: PropTypes.string,
  children: PropTypes.node,
}
