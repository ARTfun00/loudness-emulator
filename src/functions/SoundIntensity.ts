const SoundIntensity = (pointValue: string): number => {
  const value: number = parseFloat(pointValue)
  const pC = 410
  const result: number = Math.pow(value, 2) / pC
  return result
}
export default SoundIntensity
