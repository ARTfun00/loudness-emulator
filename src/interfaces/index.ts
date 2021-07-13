export interface ListItemProps {
  name: string
  start: string
  end: string
  value: number
  id: string
}
export interface CombinedProps {
  title: string
  children?: JSX.Element
}
export interface Point {
  id: string
  name: string
  x: number
  y: number
}
export interface Node extends Point {
  icon: string | null
  isUser: boolean
  id?: string
}
export interface Links {
  source: number
  target: number
}
export interface ModalProps {
  open: boolean
  dialogProps: any
  title: string
  children?: JSX.Element
  buttonSubmitProps?: any
  buttonCancelProps?: any
  buttonSubmitText?: string
  buttonCancelText?: string
  withoutButtonSubmit?: boolean
  withoutButtonCancel?: boolean
}
export interface TimePickerProps {
  value: any
  onChange: any
}
export interface SizeFormProps {
  onSubmit: any
  form: any
  buttonProps?: any
  show: Array<string>
}
export interface TimePointProps {
  onSubmit: any // Function
  form: any
  buttonProps?: any
  show: Array<string>
}
