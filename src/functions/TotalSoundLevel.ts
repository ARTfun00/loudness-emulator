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
  const result = []
  arrayWithIntervals.forEach((interval: Array<any>) => {
    return interval
  })
  return arrayWithIntervals
}
export default TotalSoundLevel
