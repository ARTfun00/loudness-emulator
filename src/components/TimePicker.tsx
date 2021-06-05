import React from 'react'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from '@material-ui/pickers'

interface TimePickerProps {
  value: any
  onChange: any
}
const TimePickerDt = (props: TimePickerProps) => {
  const { value, onChange } = props
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardTimePicker
        margin="normal"
        label="Time picker"
        value={value || null}
        onChange={onChange}
        minutesStep={5}
        placeholder="__:__ _M"
        // defaultValue="2017-05-24T10:30"
        KeyboardButtonProps={{
          'aria-label': 'change time'
        }}
      />
    </MuiPickersUtilsProvider>
  )
}
export default TimePickerDt
