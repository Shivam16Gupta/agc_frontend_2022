import {
  dangerCardHeader,
  grayColor,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  successCardHeader,
  warningCardHeader,
} from 'assets/jss/material-dashboard-react.js'

const cardIconStyle = {
  cardIcon: {
    '&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader': {
      borderRadius: '3px',
      backgroundColor: grayColor[0],
      padding: '5px',
      margin: '10px 0',
      float: 'left',
    },
  },
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
}

export default cardIconStyle
