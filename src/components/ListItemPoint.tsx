import { Col, Row } from '@qonsoll/react-design'
import { ListItemText, IconButton, Paper, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { useStoreContext } from '../context'
import React from 'react'
interface ListItemProps {
  pointName: string
  start: string
  end: string
  value: number
  id: any
}
const ListItemPoint = (props: ListItemProps) => {
  const { pointName, start, end, value, id } = props
  const pointNameLabel = `Name: ${pointName}`
  const rangeDate = `From: ${start} To: ${end}`
  const valueLabel = `Value: ${value}`
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
              <IconButton
                style={{ padding: '0px' }}
                aria-label="delete"
                color="secondary"
                onClick={() => dispatch({ type: 'DELETE_POINT', payload: id })}>
                <DeleteIcon />
              </IconButton>
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
