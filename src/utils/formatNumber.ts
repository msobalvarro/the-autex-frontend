export const formatNumber = (number: number): string => 'C$ ' + number.toLocaleString('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

export const separateMiles = (number: number): string => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
