export function kFormatter(num: number) {
  return Math.abs(num) > 999
    ? (Math.sign(num) * (Math.abs(num) / 1000)).toFixed(1) + 'k'
    : Math.sign(num) * Math.abs(num)
}

export function toHumanRead(num: number, fixed: number = 2) {
  const units = ['', 'K', 'M', 'B', 'T', 'Q']
  let count = 0
  num = +num
  if (Number.isNaN(num)) {
    return '0'
  }
  while (num >= 1000) {
    num /= 1000
    count++
  }
  for (let i = 0; i < fixed; i++) {
    if (num === +num.toFixed(i)) return num.toFixed(i) + units[count]
  }
  return num.toFixed(2) + units[count]
}

export const numberFormat = (number: number) => {
  return Intl.NumberFormat(undefined).format(number)
}
