export function shortenAddress(address: string) {
  return address?.substring(0, 6) + '...' + address?.substring(address.length - 5, address.length)
}

export function shortenNumber(num: number) {
  const smallNumbers = [
    '₀',
    '₁',
    '₂',
    '₃',
    '₄',
    '₅',
    '₆',
    '₇',
    '₈',
    '₉',
    '₁₀',
    '₁₁',
    '₁₂',
    '₁₃',
    '₁₄',
    '₁₅',
    '₁₆',
    '₁₇',
    '₁₈',
    '₁₉',
    '₂₀',
  ]
  let formattedNum = num?.toString()
  for (var i = 18; i > 4; i--) {
    if (num < Number(`1e-${i}`)) {
      formattedNum = num?.toString().replace('0.0' + '0'.repeat(i - 2), '0.0' + smallNumbers[i - 2])
      break
    }
  }
  return formattedNum || num
}
