import {
  blackColor,
  hexToRgb,
  whiteColor,
} from 'assets/jss/material-dashboard-react.js'

const cardStyle = {
  card: {
    border: '0',
    marginBottom: '2px',
    borderRadius: '20px',
    color: 'rgba(' + hexToRgb(blackColor) + ', 0.87)',
    background: whiteColor,
    width: '100%',
    boxShadow: '0 1px 4px 0 rgba(' + hexToRgb(blackColor) + ', 0.14)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '0',
    wordWrap: 'break-word',
    fontSize: '.875rem',
  },
  cardNoSpace: {
    marginBottom: '0',
    marginTop: '0',
  },
  cardPlain: {
    background: 'transparent',
    boxShadow: 'none',
  },
  cardProfile: {
    marginTop: '30px',
    textAlign: 'center',
  },
  cardChart: {
    '& p': {
      marginTop: '0px',
      paddingTop: '0px',
    },
  },
  cardFullHeight: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
}

export default cardStyle
