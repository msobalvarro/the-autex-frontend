export const formatNumber = (number: number): string => number.toLocaleString('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})