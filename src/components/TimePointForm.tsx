import Button from '@material-ui/core/Button'
import React from 'react'
import TimePicker from './TimePicker'

const {
  Form,
  FormGenerator,
  FormButtons
} = require('mui-form-generator-fractal-band-2')

const config = [
  {
    inlineLayout: [
      {
        type: 'text',
        label: 'Ім’я точки',
        name: 'name',
        placeholder: 'Введіть ім’я',
        rules: {
          required: 'Введіть ім’я'
        }
      },
      {
        type: 'number',
        label: 'Значення',
        name: 'value',
        placeholder: 'Введіть значення',
        rules: {
          required: 'Введіть значення'
        }
      }
    ]
  },
  {
    inlineLayout: [
      {
        label: 'Початок',
        name: 'start',
        Component: TimePicker,
        rules: {
          required: 'Введіть початковий час'
        }
      },
      {
        label: 'Кінець',
        name: 'end',
        Component: TimePicker,
        rules: {
          required: 'Введіть кінцевий час'
        }
      }
    ]
  }
]
interface TimePointProps {
  onSubmit: any
  form: any
  buttonProps?: any
  show: Array<string>
}
const TimePointForm = (props: TimePointProps) => {
  const { show, buttonProps, onSubmit, form } = props
  return (
    <Form form={form} onSubmit={onSubmit}>
      <FormGenerator config={config} show={show} />
      <FormButtons Button={Button} {...buttonProps} />
    </Form>
  )
}

export default TimePointForm
