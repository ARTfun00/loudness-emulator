import React from 'react'
import SoundIntensity from '../functions/SoundIntensity'
import SoundIntensityLevel from '../functions/SoundIntensityLevel'
import SoundPressureLevel from '../functions/SoundPressureLevel'
import { useStore } from '../context'
import { Col, Row } from '@qonsoll/react-design'
import { Typography } from '@material-ui/core'
import TotalSoundLevel from '../functions/TotalSoundLevel'
import TotalSum from '../functions/TotalSum'
import moment from 'moment'

const ResultView = () => {
  const arrayI: Array<number> = []
  const arrayL0: Array<number> = []
  const arrayL: Array<number> = []
  const { points } = useStore()
  const pointsFormatted = points.map((point: any) => {
    let fromDayComputed = '01'
    let toDayComputed = '01'
    const isFromTimeStartsFromNextDay = `${point.start}`.split(':')[0] === '00'

    if (isFromTimeStartsFromNextDay) {
      fromDayComputed = '02'
      toDayComputed = '02'
    }
    if (isFromTimeStartsFromNextDay || `${point.end}`.split(':')[0] === '00') {
      toDayComputed = '02'
    }

    const fromValue = new Date(
      `1970-01-${fromDayComputed} ` + point.start
    ).getTime()
    const toValue = new Date(`1970-01-${toDayComputed} ` + point.end).getTime()

    return [fromValue, toValue, point]
  })
  console.log('pointsFormatted:', pointsFormatted)

  const sortedRangesTimePoints = pointsFormatted
    .reduce((prev: any, cur: any) => [...prev, ...cur.slice(0, 2)], [])
    .sort((a: any, b: any) => a - b)

  console.log(sortedRangesTimePoints)

  const sortedRanges: Array<any> = []
  sortedRangesTimePoints.forEach(
    (currentTimePointValue: number, index: number) => {
      const nextTimePointValue = sortedRangesTimePoints[index + 1]
      if (currentTimePointValue && nextTimePointValue) {
        sortedRanges.push([currentTimePointValue, nextTimePointValue])
      }
    }
  )

  console.log(sortedRanges)

  const resultFormatted = sortedRanges.map(([rangeTimeStart, rangeTimeEnd]) => {
    // creation of duration value
    const rangeStartInMoment = moment(rangeTimeStart)
    const rangeEndInMoment = moment(rangeTimeEnd)
    const intervalDurationRaw = moment
      .duration(rangeEndInMoment.diff(rangeStartInMoment))
      .asHours() // add rounding here
    const intervalDurationFormatted =
      Math.round((Number.EPSILON + intervalDurationRaw) * 100) / 100

    // creation of intervals (in the specific format)
    const pointsRelatedToInterval = pointsFormatted.filter(
      ([pointActivityTimeStart, pointActivityTimeEnd]: Array<any>) =>
        rangeTimeStart >= pointActivityTimeStart &&
        rangeTimeEnd <= pointActivityTimeEnd
    )
    const intervalFormatted = pointsRelatedToInterval.map(
      ([, , { name, L0 }]: Array<any>) => ({ name: name, L0: L0 })
    )
    return {
      interval: intervalFormatted,
      duration: intervalDurationFormatted
    }
  })

  console.log(resultFormatted)
  const arrayTotalSoundLevel: Array<any> = TotalSoundLevel(resultFormatted)
  const LA: number = TotalSum(arrayTotalSoundLevel)

  points?.map((item: any) => {
    const I: number = SoundIntensity(item.value)
    arrayI.push(I)
    const L0: number = SoundIntensityLevel(I)
    arrayL0.push(L0)
    // second param width from Graph D3
    const L: number = SoundPressureLevel(
      item.value,
      item.distanceInMetersToSource
    )
    arrayL.push(L)
  })
  return (
    <Row noGutters>
      <Typography>{'I:'}</Typography>
      <Col ml={2}>
        {arrayI.map((item: number, index: number) => (
          <Typography key={index}>{item.toFixed(3)}</Typography>
        ))}
      </Col>
      <Typography>{'L0:'}</Typography>
      <Col ml={2}>
        {arrayL0.map((item: number, index: number) => (
          <Typography key={index}>{item.toFixed(1)}</Typography>
        ))}
      </Col>
      <Typography>{'L:'}</Typography>
      <Col ml={2}>
        {arrayL.map((item: number, index: number) => (
          <Typography key={index}>{item.toFixed(2)}</Typography>
        ))}
      </Col>
      <Typography>{'L сумарне:'}</Typography>
      <Col cw={'auto'} ml={2}>
        {arrayTotalSoundLevel.map((item, index) => (
          <Row>
            <Typography key={index}>{item.totalValue.toFixed(2)}</Typography>
            <Col>
              <Typography key={index}>{item.pointsName}</Typography>
            </Col>
          </Row>
        ))}
      </Col>
      <Typography>{'LA = '}</Typography>
      <Col ml={2}>
        <Typography>{LA.toFixed(2)}</Typography>
      </Col>
    </Row>
  )
}
export default ResultView
