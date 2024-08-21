export const formatNumber = (number: number): string => 'C$ ' + number.toLocaleString('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})