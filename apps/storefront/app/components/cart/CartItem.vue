<script setup lang="ts">
import type { HttpTypes } from '@medusajs/types'
import { Minus, Plus, Trash2 } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import { AspectRatio } from '~/components/ui/aspect-ratio'

interface Props {
  item: HttpTypes.StoreCartLineItem
}

const props = defineProps<Props>()

const { updateItem, removeItem, loading } = useCart()
const { formatPrice } = useRegions()

const isUpdating = ref(false)

const thumbnail = computed(() =>
  props.item.thumbnail || '/images/placeholder.svg'
)

const title = computed(() =>
  props.item.product_title || 'Product'
)

const variantTitle = computed(() =>
  props.item.variant_title || ''
)

const unitPrice = computed(() =>
  props.item.unit_price || 0
)

const totalPrice = computed(() =>
  props.item.total || 0
)

async function incrementQuantity() {
  isUpdating.value = true
  try {
    await updateItem(props.item.id, props.item.quantity + 1)
  } finally {
    isUpdating.value = false
  }
}

async function decrementQuantity() {
  if (props.item.quantity <= 1) return
  isUpdating.value = true
  try {
    await updateItem(props.item.id, props.item.quantity - 1)
  } finally {
    isUpdating.value = false
  }
}

async function handleRemove() {
  isUpdating.value = true
  try {
    await removeItem(props.item.id)
  } finally {
    isUpdating.value = false
  }
}
</script>

<template>
  <div class="flex gap-4">
    <!-- Image -->
    <div class="w-20 h-24 flex-shrink-0 bg-secondary/30 overflow-hidden">
      <img
        :src="thumbnail"
        :alt="title"
        class="w-full h-full object-cover"
        loading="lazy"
      >
    </div>

    <!-- Details -->
    <div class="flex-1 min-w-0">
      <div class="flex justify-between gap-2">
        <div>
          <h4 class="font-medium text-sm truncate">{{ title }}</h4>
          <p v-if="variantTitle" class="text-xs text-muted-foreground">
            {{ variantTitle }}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          class="h-8 w-8 text-muted-foreground hover:text-destructive"
          :disabled="isUpdating"
          @click="handleRemove"
        >
          <Trash2 class="h-4 w-4" />
        </Button>
      </div>

      <div class="flex items-center justify-between mt-2">
        <!-- Quantity Controls -->
        <div class="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            class="h-8 w-8 rounded-none"
            :disabled="item.quantity <= 1 || isUpdating"
            @click="decrementQuantity"
          >
            <Minus class="h-3 w-3" />
          </Button>
          <span class="w-8 text-center text-sm">
            {{ item.quantity }}
          </span>
          <Button
            variant="ghost"
            size="icon"
            class="h-8 w-8 rounded-none"
            :disabled="isUpdating"
            @click="incrementQuantity"
          >
            <Plus class="h-3 w-3" />
          </Button>
        </div>

        <!-- Price -->
        <p class="font-medium text-sm">
          {{ formatPrice(totalPrice) }}
        </p>
      </div>
    </div>
  </div>
</template>
