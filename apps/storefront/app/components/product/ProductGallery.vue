<script setup lang="ts">
import type { HttpTypes } from '@medusajs/types'
import { AspectRatio } from '~/components/ui/aspect-ratio'

interface Props {
  images: HttpTypes.StoreProductImage[]
  productTitle: string
}

const props = defineProps<Props>()

const selectedIndex = ref(0)

const selectedImage = computed(() =>
  props.images[selectedIndex.value]?.url || '/images/placeholder.svg'
)

function selectImage(index: number) {
  selectedIndex.value = index
}

function nextImage() {
  selectedIndex.value = (selectedIndex.value + 1) % props.images.length
}

function prevImage() {
  selectedIndex.value = selectedIndex.value === 0
    ? props.images.length - 1
    : selectedIndex.value - 1
}
</script>

<template>
  <div class="space-y-4">
    <!-- Main Image -->
    <div class="relative overflow-hidden bg-secondary/30">
      <AspectRatio :ratio="3 / 4">
        <img
          :src="selectedImage"
          :alt="productTitle"
          class="object-cover w-full h-full"
        >
      </AspectRatio>

      <!-- Navigation arrows for multiple images -->
      <template v-if="images.length > 1">
        <button
          class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center hover:bg-background transition-colors"
          aria-label="Previous image"
          @click="prevImage"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center hover:bg-background transition-colors"
          aria-label="Next image"
          @click="nextImage"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </template>
    </div>

    <!-- Thumbnails -->
    <div v-if="images.length > 1" class="grid grid-cols-4 gap-3">
      <button
        v-for="(image, index) in images"
        :key="image.id"
        :class="[
          'relative overflow-hidden bg-secondary/30 aspect-square',
          selectedIndex === index ? 'ring-2 ring-gold-600' : 'hover:opacity-80'
        ]"
        @click="selectImage(index)"
      >
        <img
          :src="image.url"
          :alt="`${productTitle} - Image ${index + 1}`"
          class="object-cover w-full h-full"
          loading="lazy"
        >
      </button>
    </div>
  </div>
</template>
