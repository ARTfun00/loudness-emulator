import { Col, Row } from '@qonsoll/react-design'
import { ListItemText, Button, Paper, Typography } from '@material-ui/core'
import { useStoreContext } from '../context'
import { ListItemProps } from '../interfaces'

const ListItemPoint = (props: ListItemProps) => {
  const { name, start, end, value, id } = props
  const pointNameLabel = `Назва: ${name}`
  const rangeDate = `З: ${start} До: ${end}`
  const valueLabel = `Значення: ${value}`
  const { dispatch } = useStoreContext()

  return (
    <Row mb={2} noGutters>
      <Col>
        <Paper>
          <Row v={'center'} h={'between'}>
            <Col>
              <Typography
                style={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }}>
                {pointNameLabel}
              </Typography>
            </Col>
            <Col cw={'auto'}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => dispatch({ type: 'DELETE_POINT', payload: id })}>
                {'Видалити'}
              </Button>
            </Col>
          </Row>
          <Row v={'center'} display={'contents'}>
            <Col cw={'auto'}>
              <ListItemText primary={rangeDate} />
            </Col>
          </Row>
          <Row>
            <Col cw={'auto'}>
              <ListItemText primary={valueLabel} />
            </Col>
          </Row>
        </Paper>
      </Col>
    </Row>
  )
}
export default ListItemPoint
