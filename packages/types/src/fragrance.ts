export type FragranceFamily = 'Floral' | 'Woody' | 'Oriental' | 'Fresh' | 'Citrus' | 'Aromatic'

export type FragranceConcentration = 'Parfum' | 'EDP' | 'EDT' | 'EDC' | 'Cologne'

export type Gender = 'Men' | 'Women' | 'Unisex'

export type Season = 'Spring' | 'Summer' | 'Fall' | 'Winter' | 'All Season'

export type Occasion = 'Day' | 'Night' | 'Office' | 'Date' | 'Casual' | 'Formal' | 'Sport'

export interface FragranceMetadata {
  fragrance_family?: FragranceFamily
  concentration?: FragranceConcentration
  gender?: Gender
  top_notes?: string[]
  middle_notes?: string[]
  base_notes?: string[]
  longevity?: number // 1-10 scale
  sillage?: number // 1-10 scale
  seasons?: Season[]
  occasions?: Occasion[]
  year_released?: number
  perfumer?: string
  brand?: string
}

export interface FragranceProduct {
  id: string
  title: string
  handle: string
  description?: string
  thumbnail?: string
  metadata?: FragranceMetadata
  variants?: ProductVariant[]
  images?: ProductImage[]
}

export interface ProductVariant {
  id: string
  title: string
  sku?: string
  prices?: ProductPrice[]
  inventory_quantity?: number
  options?: Record<string, string>
}

export interface ProductPrice {
  id: string
  amount: number
  currency_code: string
}

export interface ProductImage {
  id: string
  url: string
  alt?: string
}
