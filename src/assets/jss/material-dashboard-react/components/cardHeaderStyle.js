import {
  dangerCardHeader,
  infoCardHeader,
  roseCardHeader,
  successCardHeader,
  warningCardHeader,
  whiteColor,
} from 'assets/jss/material-dashboard-react.js'

const cardHeaderStyle = {
  cardHeader: {
    borderRadius: '3px',
    padding: '0.75rem 1.25rem',
    marginBottom: '0',
    borderBottom: 'none',
    background: 'transparent',
    zIndex: '3 !important',
    '&$cardHeaderPlain,&$cardHeaderIcon,&$cardHeaderStats,&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader':
      {
        margin: '0 0px',
        padding: '0',
        position: 'relative',
        color: whiteColor,
      },
    '&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader':
      {
        '&:not($cardHeaderIcon)': {
          marginTop: '0px',
          padding: '15px',
        },
      },
    '&$cardHeaderStats svg': {
      fontSize: '36px',
      lineHeight: '56px',
      textAlign: 'center',
      width: '36px',
      height: '36px',
      margin: '10px 10px 4px',
    },
    '&$cardHeaderStats i,&$cardHeaderStats .material-icons': {
      fontSize: '36px',
      lineHeight: '56px',
      width: '56px',
      height: '56px',
      textAlign: 'center',
      overflow: 'unset',
      marginBottom: '1px',
    },
    '&$cardHeaderStats$cardHeaderIcon': {
      textAlign: 'right',
    },
  },
  cardHeaderPlain: {
    marginLeft: '0px !important',
    marginRight: '0px !important',
  },
  cardHeaderStats: {
    '& $cardHeaderIcon': {
      textAlign: 'right',
    },
    '& h1,& h2,& h3,& h4,& h5,& h6': {
      margin: '0 !important',
    },
  },
  cardHeaderIcon: {
    '&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader':
      {
        background: 'transparent',
        boxShadow: 'none',
      },
    '& i,& .material-icons': {
      width: '33px',
      height: '33px',
      textAlign: 'center',
      lineHeight: '33px',
    },
    '& svg': {
      width: '24px',
      height: '24px',
      textAlign: 'center',
      lineHeight: '33px',
      margin: '5px 4px 0px',
    },
  },
  warningCardHeader: {
    color: whiteColor,
    '&:not($cardHeaderIcon)': {
      ...warningCardHeader,
    },
  },
  successCardHeader: {
    color: whiteColor,
    '&:not($cardHeaderIcon)': {
      ...successCardHeader,
    },
  },
  dangerCardHeader: {
    color: whiteColor,
    '&:not($cardHeaderIcon)': {
      ...dangerCardHeader,
    },
  },
  infoCardHeader: {
    color: whiteColor,
    '&:not($cardHeaderIcon)': {
      ...infoCardHeader,
    },
  },
  primaryCardHeader: {
    color: 'white',
    background: 'linear-gradient(to bottom, #000099 0%, #6699ff 100%);',
  },
  secondaryCardHeader: {
    color: 'black',
    background: 'lightblue',
  },
  roseCardHeader: {
    color: whiteColor,
    '&:not($cardHeaderIcon)': {
      ...roseCardHeader,
    },
  },
}

export default cardHeaderStyle
