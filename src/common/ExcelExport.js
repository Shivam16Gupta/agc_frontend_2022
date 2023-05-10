import * as FileSaver from 'file-saver'
import React from 'react'
import * as XLSX from 'xlsx'
import RegularButton from '../components/CustomButtons/Button'

export const ExcelExport = ({ csvData, fileName }) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtension = '.xlsx'

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData)
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(data, fileName + fileExtension)
  }

  return (
    <RegularButton
      disabled={csvData && csvData.length == 0}
      color={csvData && csvData.length == 0 ? '' : 'primary'}
      onClick={() => exportToCSV(csvData, fileName)}
    >
      Download in Excel
    </RegularButton>
  )
}
