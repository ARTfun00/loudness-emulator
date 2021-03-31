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
          <Typography>Point List</Typography>
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
                pointName={item.pointName}
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
          <CombinedAddPoint title="Add points">
            <Button variant="contained" type="submit" color="primary">
              Add Point
            </Button>
          </CombinedAddPoint>
        </Col>
        <Col cw="auto">
          <CombinedShowResult title="Result">
            <Button variant="contained" color="primary">
              Show result
            </Button>
          </CombinedShowResult>
        </Col>
      </Row>
    </Container>
  )
}
export default ListPoint
