import { Grid, Hidden, IconButton, Menu, MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ArrowBack from '@material-ui/icons/ArrowBack'
import MenuIcon from '@material-ui/icons/Menu'
import PropTypes from 'prop-types'
import React from 'react'
import Card from './../components/Card/Card'
import CardBody from './../components/Card/CardBody'
import CardHeader from './../components/Card/CardHeader'

const style = {
  noSpaceRequired: {
    padding: '0px 0px 2px 0px',
  },
  cardTitleDark: {
    fontSize: '14px',
    color: 'black',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: 'bold',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '0',
    textDecoration: 'underline',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
}

const CardContainer = (props) => {
  const {
    heading,
    subTitle,
    children,
    classes,
    buttons,
    isBack,
    onBack,
    plain,
    noSpace,
    darkHeading,
    plainHeader,
    autoHeight,
  } = props

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Card cardFullHeight={autoHeight} plain={plain}>
      <CardHeader color={plainHeader ? 'secondary' : 'primary'}>
        <Grid spacing={2} container alignItems="center">
          {isBack && (
            <Grid item>
              <IconButton size="small" aria-label="close" onClick={onBack}>
                <ArrowBack />
              </IconButton>
            </Grid>
          )}
          <Grid item className="flex">
            <h4
              className={
                darkHeading ? classes.cardTitleDark : classes.cardTitleWhite
              }
            >
              {heading}
            </h4>
            {subTitle && (
              <p className={classes.cardCategoryWhite}>{subTitle}</p>
            )}
          </Grid>
          {buttons && buttons.length > 0 ? (
            <Grid item>
              {buttons.length == 1 ? (
                <React.Fragment>
                  {buttons.map((item, key) => (
                    <div key={key}>{item}</div>
                  ))}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Hidden only={['xs']}>{buttons.map((item) => item)}</Hidden>
                  <Hidden only={['sm', 'md', 'lg']}>
                    <IconButton
                      size="small"
                      aria-label="close"
                      onClick={handleClick}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      {buttons.map((item) => {
                        return <MenuItem>{item}</MenuItem>
                      })}
                    </Menu>
                  </Hidden>
                </React.Fragment>
              )}
            </Grid>
          ) : null}
        </Grid>
      </CardHeader>
      <CardBody className={noSpace && classes.noSpaceRequired}>
        {children}
      </CardBody>
    </Card>
  )
}

CardContainer.propTypes = {
  heading: PropTypes.string.isRequired,
  children: PropTypes.node,
  buttons: PropTypes.array,
  subTitle: PropTypes.string,
  isBack: PropTypes.bool,
  plainHeader: PropTypes.bool,
  darkHeading: PropTypes.bool,
  noSpace: PropTypes.bool,
  onBack: PropTypes.func,
  autoHeight: PropTypes.bool,
}

export default withStyles(style)(CardContainer)
