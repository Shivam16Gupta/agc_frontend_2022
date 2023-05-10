const customInputStyle = {
  disabled: {
    color: 'black',
  },
  underline: {
    '&:hover:not($disabled):before,&:before': {
      borderColor: 'grey' + ' !important',
      borderWidth: '1px !important',
    },
  },
  underlineError: {
    '&:after': {
      borderColor: 'darkred',
    },
  },
  underlineSuccess: {
    '&:after': {
      borderColor: 'darkgreen',
    },
  },
  labelRoot: {
    fontSize: '10px',
  },
  darkLabel: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  feedback: {
    position: 'absolute',
    top: '18px',
    right: '0',
    zIndex: '2',
    display: 'block',
    width: '24px',
    height: '24px',
    textAlign: 'center',
    pointerEvents: 'none',
  },
  formControl: {
    paddingBottom: '10px',
    margin: '27px 0 0 0',
    position: 'relative',
    verticalAlign: 'center',
  },
}

export default customInputStyle
