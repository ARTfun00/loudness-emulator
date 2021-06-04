/*
 * Imagine we have 5 points(from photo)
P1= {
L0: 103.4145865271959
end: "02:16"
name: "point1"
start: "02:16"
value: "3"
  } and 4 more
Now after calculate we have 6 intervals
* and you need to create array with such structure
*
* const exampleIntervalsData = [{interval:[P1,P2],duration:0.5},{interval:[P3],duration:2.5},{interval:[P3,P4],duration:1}]
*
* This function returned array with calculate value for this intervals and duration for last functions for part 2
* const resultExample = [
* {pointsName:['Point1'],duration: 1.0, totalValue: 103.4},
* {pointsName:['Point1','Point2'],duration: 1.0, totalValue: 113.4},
* {pointsName:['Point2','Point3'],duration: 2.5, totalValue: 105.2}
* ]
* */

const TotalSoundLevel = (arrayWithIntervals: Array<any>): Array<any> => {
  const result: Array<any> = []

  arrayWithIntervals.forEach((interval: any) => {
    if (interval.interval.length === 1) {
      const LOnePoint: Array<number> = interval.interval.map(
        (point: any) => point.L0
      )
      const LOnePointName: Array<string> = interval.interval.map(
        (point: any) => point.name
      )
      result.push({
        pointsName: LOnePointName,
        totalValue: LOnePoint[0],
        duration: interval.duration
      })
    }
    if (interval.interval.length !== 0 && interval.interval.length > 1) {
      const LArrayBuffer: Array<number> = interval.interval.map((point: any) =>
        Math.pow(10, 0.1 * point.L0)
      )
      const LManyPointsName: Array<string> = interval.interval.map(
        (point: any) => point.name + ' '
      )
      const sum: number = LArrayBuffer.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      )
      const LTotalManyPoints = 10 * Math.log10(sum)
      result.push({
        pointsName: LManyPointsName,
        totalValue: LTotalManyPoints,
        duration: interval.duration
      })
    }
  })
  return result
}
export default TotalSoundLevel
