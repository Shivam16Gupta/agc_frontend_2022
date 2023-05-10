// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import styles from 'assets/jss/material-dashboard-react/components/tableStyle.js'
import PropTypes from 'prop-types'
import React from 'react'
import { NoDataFound } from '../../utils/Utils'

const useStyles = makeStyles(styles)
export default function CustomTable(props) {
  const classes = useStyles()
  const { tableHead, tableData, tableHeaderColor, boldHeading } = props
  return (
    <div className={classes.tableResponsive}>
      {props.isColumn && tableData.length > 0 ? (
        <Table className={classes.table}>
          <TableBody>
            {tableHead.map((prop, index) => (
              <TableRow key={index + new Date().getTime()}>
                <React.Fragment>
                  <TableCell
                    className={
                      !boldHeading
                        ? classes.tableHeadCell
                        : classes.boldHeadCell
                    }
                    key={index}
                  >
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
      ) : (
        <div>
          {tableData.length > 0 ? (
            <Table className={classes.table}>
              {tableHead !== undefined ? (
                <TableHead
                  className={classes[tableHeaderColor + 'TableHeader']}
                >
                  <TableRow className={classes.tableHeadRow}>
                    {tableHead.map((prop, key) => {
                      return (
                        <TableCell
                          className={
                            !boldHeading
                              ? classes.tableHeadCell
                              : classes.boldHeadCell
                          }
                          key={key + new Date().getTime()}
                        >
                          {prop}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                </TableHead>
              ) : null}
              <TableBody>
                {tableData.map((prop, key) => {
                  return (
                    <TableRow
                      key={key + new Date().getTime()}
                      className={classes.tableBodyRow}
                    >
                      {prop.map((prop, key) => {
                        return (
                          <TableCell className={classes.tableCell} key={key}>
                            {prop}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          ) : (
            NoDataFound()
          )}
        </div>
      )}
    </div>
  )
}

CustomTable.defaultProps = {
  tableHeaderColor: 'gray',
}

CustomTable.propTypes = {
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
