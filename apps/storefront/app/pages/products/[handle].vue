<script setup lang="ts">
import { Skeleton } from '~/components/ui/skeleton'

const route = useRoute()
const handle = computed(() => route.params.handle as string)

const {
  product,
  loading,
  error,
  selectedVariant,
  selectedVariantId,
  price,
  images,
  inStock,
  fetchProduct,
  selectVariant,
} = useProduct(handle)

const { fetchRegions } = useRegions()
const { addItem } = useCart()

useSeoMeta({
  title: () => product.value ? `${product.value.title} - Ilyo Fragrance Boutique` : 'Loading...',
  description: () => product.value?.description || 'Discover this luxury fragrance at Ilyo Fragrance Boutique.',
})

async function handleAddToCart() {
  if (!selectedVariantId.value) return
  await addItem(selectedVariantId.value, 1)
}

onMounted(async () => {
  await fetchRegions()
  await fetchProduct()
})
</script>

<template>
  <div class="py-8">
    <div class="container mx-auto px-4">
      <!-- Loading State -->
      <div v-if="loading" class="grid lg:grid-cols-2 gap-8 lg:gap-16">
        <Skeleton class="aspect-[3/4]" />
        <div class="space-y-6">
          <Skeleton class="h-8 w-1/3" />
          <Skeleton class="h-12 w-2/3" />
          <Skeleton class="h-6 w-1/4" />
          <Skeleton class="h-px w-full" />
          <Skeleton class="h-24 w-full" />
          <Skeleton class="h-12 w-full" />
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20">
        <h1 class="text-2xl font-serif mb-4">Product Not Found</h1>
        <p class="text-muted-foreground mb-6">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Button as-child>
          <NuxtLink to="/products">
            Browse Products
          </NuxtLink>
        </Button>
      </div>

      <!-- Product Content -->
      <div v-else-if="product" class="grid lg:grid-cols-2 gap-8 lg:gap-16">
        <!-- Gallery -->
        <div class="lg:sticky lg:top-24 lg:self-start">
          <ProductGallery
            :images="images"
            :product-title="product.title"
          />
        </div>

        <!-- Info -->
        <ProductInfo
          :product="product"
          :selected-variant="selectedVariant"
          :price="price"
          :in-stock="inStock"
          @select-variant="selectVariant"
          @add-to-cart="handleAddToCart"
        />
      </div>
    </div>
  </div>
</template>
