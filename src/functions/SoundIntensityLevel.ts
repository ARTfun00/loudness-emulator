const SoundIntensity = (pointI: number): number => {
  const I0: number = Math.pow(10, -12)
  return 10 * Math.log10(pointI / I0)
}
export default SoundIntensity
