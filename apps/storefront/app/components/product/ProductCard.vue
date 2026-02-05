<script setup lang="ts">
import type { HttpTypes } from '@medusajs/types'
import { AspectRatio } from '~/components/ui/aspect-ratio'
import { Skeleton } from '~/components/ui/skeleton'
import { Badge } from '~/components/ui/badge'

interface Props {
  product: HttpTypes.StoreProduct
}

const props = defineProps<Props>()

const { formatPrice } = useRegions()

const thumbnail = computed(() => props.product.thumbnail || '/images/placeholder.svg')

const priceRange = computed(() => {
  const variants = props.product.variants || []
  if (variants.length === 0) return null

  const prices = variants
    .map(v => {
      const calc = (v as HttpTypes.StoreProductVariant & {
        calculated_price?: { calculated_amount?: number }
      }).calculated_price
      return calc?.calculated_amount
    })
    .filter((p): p is number => p !== undefined && p !== null)

  if (prices.length === 0) return null

  const min = Math.min(...prices)
  const max = Math.max(...prices)

  if (min === max) {
    return formatPrice(min)
  }

  return `${formatPrice(min)} - ${formatPrice(max)}`
})

const metadata = computed(() => props.product.metadata as {
  fragrance_family?: string
  concentration?: string
} | undefined)
</script>

<template>
  <NuxtLink
    :to="`/products/${product.handle}`"
    class="group block"
  >
    <div class="relative overflow-hidden bg-secondary/30 mb-4">
      <AspectRatio :ratio="3 / 4">
        <img
          :src="thumbnail"
          :alt="product.title"
          class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        >
      </AspectRatio>
      <div
        v-if="metadata?.fragrance_family"
        class="absolute top-3 left-3"
      >
        <Badge variant="gold" class="text-xs">
          {{ metadata.fragrance_family }}
        </Badge>
      </div>
    </div>

    <div class="space-y-1">
      <h3 class="font-serif text-lg group-hover:text-gold-600 transition-colors">
        {{ product.title }}
      </h3>
      <p v-if="metadata?.concentration" class="text-sm text-muted-foreground">
        {{ metadata.concentration }}
      </p>
      <p v-if="priceRange" class="text-sm font-medium">
        {{ priceRange }}
      </p>
    </div>
  </NuxtLink>
</template>
