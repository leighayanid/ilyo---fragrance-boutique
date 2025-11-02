/**
 * Format price in cents to currency string
 */
export function formatPrice(amount: number, currencyCode: string = 'USD'): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  })

  return formatter.format(amount / 100)
}

/**
 * Format price range for product variants
 */
export function formatPriceRange(minAmount: number, maxAmount: number, currencyCode: string = 'USD'): string {
  if (minAmount === maxAmount) {
    return formatPrice(minAmount, currencyCode)
  }

  return `${formatPrice(minAmount, currencyCode)} - ${formatPrice(maxAmount, currencyCode)}`
}
