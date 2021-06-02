import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { Modal, ResultView } from './index'

interface CombinedProps {
  title: string
  children?: JSX.Element
}
const CombinedShowResult: React.FC<CombinedProps> = (props) => {
  // [INTERFACES]
  const { title, children } = props
  // [COMPONENT_STATE_HOOKS]
  const [open, setOpen] = useState(false)

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
        buttonCancelProps={{
          text: 'Cancel',
          variant: 'contained',
          color: 'primary',
          onClick: handleClose
        }}
        withoutButtonSubmit={true}
        buttonCancelText={'Закрити'}>
        {<ResultView />}
      </Modal>
    </>
  )
}
export default CombinedShowResult
