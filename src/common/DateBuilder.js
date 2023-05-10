import React from 'react'
import DatePicker from 'react-datepicker'
import { createdDateTime } from '../utils/Utils'
import './datePicker.css'

const DateBuilder = ({ name, handleChange, isString, ...props }) => {
  const onChange = (date) => {
    let event = {
      target: {
        name: name,
        value: isString
          ? createdDateTime(date.getTime(), 1, 'yyyy-MM-dd')
          : date,
      },
    }
    handleChange(event)
  }

  return <DatePicker {...props} onChange={onChange} />
}

export default DateBuilder
