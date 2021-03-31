const SoundPressureLevel = (pointValue: string, width: number): number => {
  const value: number = parseFloat(pointValue)
  const p0: number = 2 * Math.pow(10, -5)
  let result = 0
  // width from Graph D3
  if (width <= 30) result = 20 * Math.log10(value / p0)
  else if (width > 30) result = 20 * Math.log10(value / p0) - 8
  return result
}
export default SoundPressureLevel
