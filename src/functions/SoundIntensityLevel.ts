const SoundIntensity = (pointI: number): number => {
  const I0: number = Math.pow(10, -12)
  const result: number = 10 * Math.log10(pointI / I0)
  return result
}
export default SoundIntensity
