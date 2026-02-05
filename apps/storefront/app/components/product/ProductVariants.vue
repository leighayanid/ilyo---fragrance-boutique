<script setup lang="ts">
import type { HttpTypes } from '@medusajs/types'
import { Button } from '~/components/ui/button'

interface Props {
  variants: HttpTypes.StoreProductVariant[]
  selectedVariant: HttpTypes.StoreProductVariant | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'select', variantId: string): void
}>()

const { formatPrice } = useRegions()

function getVariantPrice(variant: HttpTypes.StoreProductVariant): string | null {
  const calc = (variant as HttpTypes.StoreProductVariant & {
    calculated_price?: { calculated_amount?: number }
  }).calculated_price
  if (calc?.calculated_amount !== undefined) {
    return formatPrice(calc.calculated_amount)
  }
  return null
}

function isSelected(variant: HttpTypes.StoreProductVariant): boolean {
  return props.selectedVariant?.id === variant.id
}
</script>

<template>
  <div class="space-y-3">
    <h3 class="text-sm font-medium">Size</h3>
    <div class="flex flex-wrap gap-2">
      <Button
        v-for="variant in variants"
        :key="variant.id"
        :variant="isSelected(variant) ? 'default' : 'outline'"
        size="sm"
        class="min-w-[80px]"
        @click="emit('select', variant.id)"
      >
        <span>{{ variant.title }}</span>
        <span v-if="getVariantPrice(variant)" class="ml-2 text-xs opacity-80">
          {{ getVariantPrice(variant) }}
        </span>
      </Button>
    </div>
  </div>
</template>
