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
        label: 'Height',
        name: 'height',
        placeholder: 'Enter height',
        rules: {
          required: 'Enter height'
        }
      },
      {
        type: 'number',
        label: 'Width',
        name: 'width',
        placeholder: 'Enter width',
        rules: {
          required: 'Enter widths'
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
      <FormButtons Button={Button} {...buttonProps} />
    </Form>
  )
}

export default SizeForm
