<script setup lang="ts">
import type { HttpTypes } from '@medusajs/types'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion'
import { ShoppingBag, Check } from 'lucide-vue-next'

interface Props {
  product: HttpTypes.StoreProduct
  selectedVariant: HttpTypes.StoreProductVariant | null
  price: { amount: number; originalAmount?: number; currencyCode: string } | null
  inStock: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'select-variant', variantId: string): void
  (e: 'add-to-cart'): void
}>()

const { formatPrice } = useRegions()
const { loading: cartLoading } = useCart()

const isAdding = ref(false)
const addedToCart = ref(false)

const metadata = computed(() => props.product.metadata as {
  fragrance_family?: string
  concentration?: string
  gender?: string
  brand?: string
  perfumer?: string
  year_released?: number
  top_notes?: string[]
  middle_notes?: string[]
  base_notes?: string[]
  longevity?: number
  sillage?: number
  seasons?: string[]
  occasions?: string[]
} | undefined)

async function handleAddToCart() {
  if (isAdding.value || !props.inStock) return

  isAdding.value = true
  try {
    emit('add-to-cart')
    addedToCart.value = true
    setTimeout(() => {
      addedToCart.value = false
    }, 2000)
  } finally {
    isAdding.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Brand & Title -->
    <div>
      <p v-if="metadata?.brand" class="text-sm text-muted-foreground uppercase tracking-wider mb-2">
        {{ metadata.brand }}
      </p>
      <h1 class="text-3xl md:text-4xl font-serif">{{ product.title }}</h1>
      <div v-if="metadata?.concentration || metadata?.fragrance_family" class="flex gap-2 mt-3">
        <Badge v-if="metadata?.concentration" variant="outline">
          {{ metadata.concentration }}
        </Badge>
        <Badge v-if="metadata?.fragrance_family" variant="gold">
          {{ metadata.fragrance_family }}
        </Badge>
      </div>
    </div>

    <!-- Price -->
    <div v-if="price" class="flex items-baseline gap-3">
      <span class="text-2xl font-medium">
        {{ formatPrice(price.amount) }}
      </span>
      <span
        v-if="price.originalAmount && price.originalAmount !== price.amount"
        class="text-lg text-muted-foreground line-through"
      >
        {{ formatPrice(price.originalAmount) }}
      </span>
    </div>

    <Separator />

    <!-- Variants -->
    <ProductVariants
      v-if="product.variants && product.variants.length > 1"
      :variants="product.variants"
      :selected-variant="selectedVariant"
      @select="emit('select-variant', $event)"
    />

    <!-- Add to Cart -->
    <div class="space-y-3">
      <Button
        :disabled="!inStock || cartLoading"
        class="w-full h-12"
        :variant="addedToCart ? 'outline' : 'default'"
        @click="handleAddToCart"
      >
        <Check v-if="addedToCart" class="w-5 h-5 mr-2" />
        <ShoppingBag v-else class="w-5 h-5 mr-2" />
        {{ addedToCart ? 'Added to Cart' : inStock ? 'Add to Cart' : 'Out of Stock' }}
      </Button>
      <p v-if="!inStock" class="text-sm text-destructive text-center">
        This item is currently out of stock
      </p>
    </div>

    <Separator />

    <!-- Description -->
    <div v-if="product.description" class="prose prose-sm max-w-none">
      <p class="text-muted-foreground leading-relaxed">{{ product.description }}</p>
    </div>

    <!-- Fragrance Notes -->
    <FragranceNotes
      v-if="metadata?.top_notes || metadata?.middle_notes || metadata?.base_notes"
      :top-notes="metadata?.top_notes"
      :middle-notes="metadata?.middle_notes"
      :base-notes="metadata?.base_notes"
    />

    <!-- Accordion Details -->
    <Accordion type="single" collapsible class="w-full">
      <AccordionItem value="details">
        <AccordionTrigger>Product Details</AccordionTrigger>
        <AccordionContent>
          <dl class="space-y-2 text-sm">
            <div v-if="metadata?.gender" class="flex justify-between">
              <dt class="text-muted-foreground">For</dt>
              <dd>{{ metadata.gender }}</dd>
            </div>
            <div v-if="metadata?.perfumer" class="flex justify-between">
              <dt class="text-muted-foreground">Perfumer</dt>
              <dd>{{ metadata.perfumer }}</dd>
            </div>
            <div v-if="metadata?.year_released" class="flex justify-between">
              <dt class="text-muted-foreground">Year</dt>
              <dd>{{ metadata.year_released }}</dd>
            </div>
            <div v-if="metadata?.longevity" class="flex justify-between">
              <dt class="text-muted-foreground">Longevity</dt>
              <dd>{{ metadata.longevity }}/10</dd>
            </div>
            <div v-if="metadata?.sillage" class="flex justify-between">
              <dt class="text-muted-foreground">Sillage</dt>
              <dd>{{ metadata.sillage }}/10</dd>
            </div>
            <div v-if="metadata?.seasons?.length" class="flex justify-between">
              <dt class="text-muted-foreground">Best Seasons</dt>
              <dd>{{ metadata.seasons.join(', ') }}</dd>
            </div>
            <div v-if="metadata?.occasions?.length" class="flex justify-between">
              <dt class="text-muted-foreground">Occasions</dt>
              <dd>{{ metadata.occasions.join(', ') }}</dd>
            </div>
          </dl>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="shipping">
        <AccordionTrigger>Shipping & Returns</AccordionTrigger>
        <AccordionContent>
          <div class="space-y-4 text-sm text-muted-foreground">
            <p>
              Free standard shipping on orders over $100.
              Express shipping available at checkout.
            </p>
            <p>
              Returns accepted within 30 days of delivery for unopened items.
              See our return policy for details.
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>
