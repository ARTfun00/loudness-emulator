import { Container, Col, Row, Box } from '@qonsoll/react-design'
import { useStoreContext } from '../context'
import { CombinedAddPoint, ListItemPoint, CombinedShowResult } from './index'
import { useEffect, useState } from 'react'
import { Button, Typography } from '@material-ui/core'
import React from 'react'

const ListPoint = () => {
  const { store } = useStoreContext()
  const [points, setPoints] = useState(store)
  useEffect(() => {
    setPoints(store)
  }, [store])

  return (
    <Container mt={3}>
      <Row h="center" noGutters>
        <Col cw={'auto'}>
          <Typography>{'Список точок:'}</Typography>
        </Col>
      </Row>
      <Row noGutters>
        <Col>
          {points?.points?.length === 0 ? (
            <img
              src="noData.svg"
              alt="no data"
              style={{ width: '100%', height: '175px' }}
            />
          ) : (
            points?.points?.map((item: any, index: number) => (
              <ListItemPoint
                key={index}
                name={item.name}
                start={item.start}
                end={item.end}
                value={item.value}
                id={item.id}
              />
            ))
          )}
        </Col>
      </Row>
      <Row noGutters mt={2} v={'center'} h={'between'}>
        <Col cw="auto">
          <CombinedAddPoint title="Додати точку">
            <Button variant="contained" type="submit" color="primary">
              {'Додати точку'}
            </Button>
          </CombinedAddPoint>
        </Col>
        <Col cw="auto">
          <CombinedShowResult title="Результати">
            <Button variant="contained" color="primary">
              {'Результати'}
            </Button>
          </CombinedShowResult>
        </Col>
      </Row>
    </Container>
  )
}
export default ListPoint
