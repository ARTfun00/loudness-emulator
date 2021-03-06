import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { Modal, TimePointForm } from './index'
import { useStoreContext, useStore } from '../context'
import SoundIntensity from '../functions/SoundIntensity'
import SoundIntensityLevel from '../functions/SoundIntensityLevel'
import { CombinedProps } from '../interfaces'
const { useForm } = require('mui-form-generator-fractal-band-2')

const getRandomTillNumber = (maxValue = 1) =>
  Math.floor(Math.random() * maxValue) + 1

const CombinedAddPoint: React.FC<CombinedProps> = (props) => {
  // [INTERFACES]
  const { title, children } = props

  // [COMPONENT_STATE_HOOKS]
  const [open, setOpen] = useState(false)

  // [ADDITIONAL_HOOKS]
  const form = useForm()
  const { dispatch } = useStoreContext()
  const { areaWidth, areaHeight } = useStore()

  // [HELPER_FUNCTIONS]
  const onAddPoint = (data: Record<string, any>): void => {
    const I: number = SoundIntensity(data?.value)
    const L0: number = SoundIntensityLevel(I)
    dispatch({
      type: 'ADD_POINT',
      payload: {
        ...data,
        L0: L0,
        x: getRandomTillNumber(areaWidth),
        y: getRandomTillNumber(areaHeight)
      }
    })
    setOpen(false)
    form.reset({})
  }
  const submitForm = (): void => form.submit()
  const handleClickOpen = (): void => setOpen(true)
  const handleClose = (): void => {
    setOpen(false)
  }

  // [TEMPLATE]
  return (
    <>
      {(children &&
        React.cloneElement(children, { onClick: handleClickOpen })) || (
        <Button onClick={handleClickOpen} />
      )}

      <Modal
        open={open}
        title={title}
        dialogProps={{
          maxWidth: 'sm',
          fullWidth: true
        }}
        buttonSubmitProps={{
          text: 'Submit',
          variant: 'contained',
          color: 'primary',
          onClick: submitForm
        }}
        buttonCancelProps={{
          text: 'Cancel',
          variant: 'contained',
          onClick: handleClose
        }}
        buttonSubmitText={'Додати точку'}
        buttonCancelText={'Закрити'}>
        <TimePointForm
          show={['name', 'value', 'start', 'end']}
          onSubmit={onAddPoint}
          form={form}
          buttonProps={{ visible: false }}
        />
      </Modal>
    </>
  )
}
export default CombinedAddPoint
