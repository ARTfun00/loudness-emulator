const SoundIntensity = (pointValue: string): number => {
  const value: number = parseFloat(pointValue)
  const pC = 410
  return Math.pow(value, 2) / pC
}
export default SoundIntensity
