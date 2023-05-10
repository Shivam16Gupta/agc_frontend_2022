const tableStyle = () => ({
  table: {
    marginBottom: '0',
    width: '100%',
    maxWidth: '100%',
    backgroundColor: 'transparent',
    borderSpacing: '0',
    borderCollapse: 'collapse',
    fontFamily: 'inherit',
  },
  tableHeadCell: {
    color: 'inherit',
    '&, &$tableCell': {
      fontFamily: 'inherit',
    },
  },
  boldHeadCell: {
    padding: '2px 6px',
    fontWeight: 'bold',
  },
  tableCell: {
    verticalAlign: 'middle',
    fontSize: '0.8125rem',
  },
  tableResponsive: {
    width: '100%',
    overflowX: 'auto',
  },
  tableHeadRow: {
    height: '56px',
    color: 'inherit',
    display: 'table-row',
    outline: 'none',
    verticalAlign: 'middle',
  },
  tableBodyRow: {
    height: '48px',
    color: 'inherit',
    display: 'table-row',
    outline: 'none',
    verticalAlign: 'middle',
  },
})

export default tableStyle
