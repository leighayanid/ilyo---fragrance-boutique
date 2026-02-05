<script setup lang="ts">
import { AspectRatio } from '~/components/ui/aspect-ratio'
import { Separator } from '~/components/ui/separator'

const { items, subtotal, total, cart } = useCart()
const { formatPrice } = useRegions()

const shipping = computed(() => cart.value?.shipping_total || 0)
const discount = computed(() => cart.value?.discount_total || 0)
const tax = computed(() => cart.value?.tax_total || 0)
</script>

<template>
  <div class="bg-secondary/30 rounded-lg p-6">
    <h3 class="font-medium text-lg mb-4">Order Summary</h3>

    <!-- Items -->
    <div class="space-y-4 mb-6">
      <div
        v-for="item in items"
        :key="item.id"
        class="flex gap-3"
      >
        <div class="relative w-16 h-20 flex-shrink-0 bg-background rounded overflow-hidden">
          <img
            :src="item.thumbnail || '/images/placeholder.svg'"
            :alt="item.product_title || 'Product'"
            class="w-full h-full object-cover"
          >
          <span class="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
            {{ item.quantity }}
          </span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-medium text-sm truncate">{{ item.product_title }}</p>
          <p v-if="item.variant_title" class="text-xs text-muted-foreground">
            {{ item.variant_title }}
          </p>
          <p class="text-sm mt-1">{{ formatPrice(item.total || 0) }}</p>
        </div>
      </div>
    </div>

    <Separator class="my-4" />

    <!-- Totals -->
    <div class="space-y-2 text-sm">
      <div class="flex justify-between">
        <span class="text-muted-foreground">Subtotal</span>
        <span>{{ formatPrice(subtotal) }}</span>
      </div>

      <div class="flex justify-between">
        <span class="text-muted-foreground">Shipping</span>
        <span>{{ shipping === 0 ? 'Calculated next step' : formatPrice(shipping) }}</span>
      </div>

      <div v-if="discount > 0" class="flex justify-between text-green-600">
        <span>Discount</span>
        <span>-{{ formatPrice(discount) }}</span>
      </div>

      <div v-if="tax > 0" class="flex justify-between">
        <span class="text-muted-foreground">Tax</span>
        <span>{{ formatPrice(tax) }}</span>
      </div>
    </div>

    <Separator class="my-4" />

    <div class="flex justify-between font-medium text-lg">
      <span>Total</span>
      <span>{{ formatPrice(total) }}</span>
    </div>
  </div>
</template>
