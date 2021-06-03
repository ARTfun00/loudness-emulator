import Button from '@material-ui/core/Button'
import React from 'react'
const {
  Form,
  FormGenerator,
  FormButtons
} = require('mui-form-generator-fractal-band-2')

const config = [
  {
    inlineLayout: [
      {
        type: 'number',
        label: 'Ширина',
        name: 'width',
        placeholder: 'Введіть ширину',
        rules: {
          required: 'Введіть ширину'
        }
      },
      {
        type: 'number',
        label: 'Довжина',
        name: 'height',
        placeholder: 'Введіть довжину',
        rules: {
          required: 'Введіть довжину'
        }
      }
    ]
  }
]
interface SizeFormProps {
  onSubmit: any
  form: any
  buttonProps?: any
  show: Array<string>
}
const SizeForm = (props: SizeFormProps) => {
  const { show, buttonProps, onSubmit, form } = props
  return (
    <Form form={form} onSubmit={onSubmit}>
      <FormGenerator config={config} show={show} />
      <FormButtons
        Button={Button}
        {...buttonProps}
        submitText={'Застосувати'}
      />
    </Form>
  )
}

export default SizeForm
