/*
Functions for final calculate
* const inputData = [
* {pointsName:['Point1'],duration: 1.0, totalValue: 103.4},
* {pointsName:['Point1','Point2'],duration: 1.0, totalValue: 113.4},
* {pointsName:['Point2','Point3'],duration: 2.5, totalValue: 105.2}
* ]
const outputData = 112.2
* */

const TotalSoundLevel = (arrayWithTotalSoundLevel: Array<any>): number => {
  const denominatorArrBuffer: Array<number> = []
  const numeratorArrBuffer: Array<number> = []
  let numerator = 0
  let denominator = 0
  if (arrayWithTotalSoundLevel?.length > 1) {
    // push value to buffer for denominator and push value to buffer for numerator separate
    arrayWithTotalSoundLevel.forEach((interval: any) => {
      denominatorArrBuffer.push(interval.duration)
      const numeratorItem: number =
        interval.duration * Math.pow(10, 0.1 * interval.totalValue)
      numeratorArrBuffer.push(numeratorItem)
    })
    //calculate denominator
    denominator = denominatorArrBuffer.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    )
    //calculate numerator
    numerator = numeratorArrBuffer.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    )
  }
  return 10 * Math.log10(numerator / denominator)
}
export default TotalSoundLevel
