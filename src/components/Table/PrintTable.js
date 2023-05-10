// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import styles from 'assets/jss/material-dashboard-react/components/printTableStyle.js'
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles(styles)
export default function CustomPrintTable(props) {
  const classes = useStyles()
  const { tableHead, tableData } = props
  return (
    <div className={classes.tableResponsive}>
      {props.isColumn && tableData.length > 0 && (
        <Table padding="none" className={classes.table}>
          <TableBody>
            {tableHead.map((prop, index) => (
              <TableRow className={classes.customPadding} key={index}>
                <React.Fragment>
                  <TableCell className={classes.boldHeadCell} key={index}>
                    {prop}
                  </TableCell>
                  <TableCell key={index * 10 + new Date().getTime()}>
                    {tableData[0][index]}
                  </TableCell>
                </React.Fragment>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

CustomPrintTable.defaultProps = {
  tableHeaderColor: 'gray',
}

CustomPrintTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray',
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.any),
  boldHeading: PropTypes.bool,
  isColumn: PropTypes.bool,
}
