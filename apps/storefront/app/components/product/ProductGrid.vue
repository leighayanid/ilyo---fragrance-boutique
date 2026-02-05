<script setup lang="ts">
import type { HttpTypes } from '@medusajs/types'

interface Props {
  products: HttpTypes.StoreProduct[]
  loading?: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
    <template v-if="loading">
      <ProductCardSkeleton v-for="i in 8" :key="i" />
    </template>
    <template v-else>
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </template>
  </div>
</template>
