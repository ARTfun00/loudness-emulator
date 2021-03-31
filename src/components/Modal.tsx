import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography
} from '@material-ui/core'
import React from 'react'

interface ModalProps {
  open: any
  dialogProps: any
  title: string
  children: any
  buttonSubmitProps?: any
  buttonCancelProps: any
  buttonSubmitText?: string
  buttonCancelText?: string
  withoutButtonSubmit?: boolean
  withoutButtonCancel?: boolean
}

const Modal = (props: ModalProps) => {
  const {
    open,
    dialogProps,
    title,
    children,
    buttonSubmitProps,
    buttonCancelProps,
    buttonSubmitText,
    buttonCancelText,
    withoutButtonCancel,
    withoutButtonSubmit
  } = props
  return (
    <Dialog open={open} onClose={buttonCancelProps.onClick} {...dialogProps}>
      <DialogTitle disableTypography>
        <Typography component="h2">{title}</Typography>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {!withoutButtonCancel && (
          <Button {...buttonCancelProps}>
            {buttonCancelText ? buttonCancelText : 'Cancel'}
          </Button>
        )}
        {!withoutButtonSubmit && (
          <Button {...buttonSubmitProps}>
            {buttonSubmitText ? buttonSubmitText : 'Submit'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
export default Modal
