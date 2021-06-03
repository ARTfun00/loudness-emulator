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
* const exampleIntervals = [[P1],[P1,P2],[P2,P3],[P2,P3,P4],[P3,P4],[P4]]
*
* This function returned array with calculate value for this intervals
* */

const TotalSoundLevel = (arrayWithIntervals: Array<any>): Array<any> => {
  const result: Array<any> = []
  let LArrayBuffer: Array<number> = []
  arrayWithIntervals.forEach((interval: Array<any>) => {
    if (interval.length === 1) {
      const LOnePoint: Array<number> = interval.map((point) => point.L0)
      result.push(LOnePoint[0])
    }
    if (interval.length !== 0 && interval.length > 1) {
      LArrayBuffer = interval.map((point) => Math.pow(10, 0.1 * point.L0))
      const sum: number = LArrayBuffer.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      )
      const LTotalManyPoints = 10 * Math.log10(sum)
      result.push(LTotalManyPoints)
    }
  })

  return result
}
export default TotalSoundLevel
