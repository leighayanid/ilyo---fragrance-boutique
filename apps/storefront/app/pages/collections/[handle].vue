<script setup lang="ts">
const route = useRoute()
const handle = computed(() => route.params.handle as string)

const collectionData: Record<string, { title: string; description: string }> = {
  'gift-sets': {
    title: 'Gift Sets',
    description: 'Perfect fragrance gifts for every occasion. Our curated sets combine complementary scents and luxury packaging.'
  }
}

const collection = computed(() => collectionData[handle.value] || {
  title: handle.value.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
  description: 'Explore our curated collection'
})

definePageMeta({
  title: 'Collection'
})
</script>

<template>
  <div class="min-h-screen pt-24 pb-16">
    <div class="container mx-auto px-4">
      <header class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-serif font-medium mb-4">{{ collection.title }}</h1>
        <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
          {{ collection.description }}
        </p>
      </header>

      <div class="text-center py-16 border border-dashed rounded-lg">
        <p class="text-muted-foreground mb-4">Collection products coming soon</p>
        <NuxtLink to="/products" class="text-gold-600 hover:underline">
          Browse all products
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
