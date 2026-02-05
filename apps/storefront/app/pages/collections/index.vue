<script setup lang="ts">
definePageMeta({
  title: 'Collections'
})

const collections = [
  {
    name: 'Gift Sets',
    description: 'Curated fragrance collections for every occasion',
    href: '/collections/gift-sets',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop'
  },
  {
    name: 'Women\'s Fragrances',
    description: 'Elegant scents for the modern woman',
    href: '/products?gender=women',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop'
  },
  {
    name: 'Men\'s Fragrances',
    description: 'Sophisticated scents for the distinguished gentleman',
    href: '/products?gender=men',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&auto=format&fit=crop'
  },
  {
    name: 'Unisex',
    description: 'Universal fragrances that transcend boundaries',
    href: '/products?gender=unisex',
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800&auto=format&fit=crop'
  },
]
</script>

<template>
  <div class="min-h-screen pt-24 pb-16">
    <div class="container mx-auto px-4">
      <header class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-serif font-medium mb-4">Collections</h1>
        <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our carefully curated fragrance collections
        </p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <NuxtLink
          v-for="collection in collections"
          :key="collection.name"
          :to="collection.href"
          class="group relative aspect-[4/3] overflow-hidden rounded-lg"
        >
          <img
            :src="collection.image"
            :alt="collection.name"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div class="absolute bottom-0 left-0 right-0 p-8">
            <h2 class="text-2xl font-serif text-white mb-2">{{ collection.name }}</h2>
            <p class="text-white/80">{{ collection.description }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
