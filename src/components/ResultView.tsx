import React, { useState, useEffect } from 'react'
import SoundIntensity from '../functions/SoundIntensity'
import SoundIntensityLevel from '../functions/SoundIntensityLevel'
import SoundPressureLevel from '../functions/SoundPressureLevel'
import { useStoreContext } from '../context'
import { Col, Row } from '@qonsoll/react-design'
import { Typography } from '@material-ui/core'

const mockDataForPart2: Array<Array<any>> = [
  [
    {
      name: 'Point1',
      L0: 103.4
    }
  ],
  [
    {
      name: 'Point1',
      L0: 103.4
    },
    { name: 'Point3', L0: 115.4 }
  ],
  [
    {
      name: 'Point2',
      L0: 110.0
    },
    { name: 'Point3', L0: 115.4 }
  ],
  [
    {
      name: 'Point2',
      L0: 110.0
    },
    { name: 'Point3', L0: 115.4 },
    {
      name: 'Point4',
      L0: 115.91
    }
  ],
  [
    { name: 'Point3', L0: 115.4 },
    {
      name: 'Point4',
      L0: 115.91
    }
  ],
  [
    {
      name: 'Point4',
      L0: 115.91
    }
  ]
]

const ResultView = () => {
  const arrayI: Array<number> = []
  const arrayL0: Array<number> = []
  const arrayL: Array<number> = []
  const { store } = useStoreContext()
  const [points, setPoints] = useState(store)
  useEffect(() => {
    setPoints(store)
  }, [store])

  points?.points?.map((item: any) => {
    const I: number = SoundIntensity(item.value)
    arrayI.push(I)
    const L0: number = SoundIntensityLevel(I)
    arrayL0.push(L0)
    // second param width from Graph D3
    const L: number = SoundPressureLevel(item.value, 30)
    arrayL.push(L)
  })
  return (
    <>
      <Row>
        <Col>
          <Row>
            <Typography>I:</Typography>
            <Col>
              {arrayI.map((item: number, index: number) => (
                <Typography key={index}>{item.toFixed(3)}</Typography>
              ))}
            </Col>
            <Typography>L0:</Typography>
            <Col>
              {arrayL0.map((item: number, index: number) => (
                <Typography key={index}>{item.toFixed(1)}</Typography>
              ))}
            </Col>
            <Typography>L:</Typography>
            <Col>
              {arrayL.map((item: number, index: number) => (
                <Typography key={index}>{item.toFixed(2)}</Typography>
              ))}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}
export default ResultView
