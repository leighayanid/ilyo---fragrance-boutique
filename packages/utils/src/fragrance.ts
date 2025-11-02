import type { FragranceFamily } from '@ilyo/types'

/**
 * Get color scheme for fragrance family
 */
export function getFragranceFamilyColor(family: FragranceFamily): string {
  const colors: Record<FragranceFamily, string> = {
    Floral: 'pink',
    Woody: 'amber',
    Oriental: 'purple',
    Fresh: 'cyan',
    Citrus: 'yellow',
    Aromatic: 'green',
  }

  return colors[family] || 'gray'
}

/**
 * Format fragrance notes for display
 */
export function formatNotes(notes?: string[]): string {
  if (!notes || notes.length === 0) return 'N/A'
  return notes.join(', ')
}

/**
 * Get longevity label from numeric value
 */
export function getLongevityLabel(value: number): string {
  if (value >= 8) return 'Very Long Lasting'
  if (value >= 6) return 'Long Lasting'
  if (value >= 4) return 'Moderate'
  if (value >= 2) return 'Weak'
  return 'Very Weak'
}

/**
 * Get sillage label from numeric value
 */
export function getSillageLabel(value: number): string {
  if (value >= 8) return 'Enormous'
  if (value >= 6) return 'Strong'
  if (value >= 4) return 'Moderate'
  if (value >= 2) return 'Soft'
  return 'Intimate'
}
