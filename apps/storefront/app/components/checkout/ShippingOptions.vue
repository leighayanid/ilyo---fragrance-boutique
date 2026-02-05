<script setup lang="ts">
import type { HttpTypes } from '@medusajs/types'
import { Button } from '~/components/ui/button'
import { Skeleton } from '~/components/ui/skeleton'

interface Props {
  options: HttpTypes.StoreCartShippingOption[]
  selectedId: string | null
  loading?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'select', optionId: string): void
  (e: 'continue'): void
}>()

const { formatPrice } = useRegions()

function getPrice(option: HttpTypes.StoreCartShippingOption): string {
  const amount = option.amount || 0
  return amount === 0 ? 'Free' : formatPrice(amount)
}
</script>

<template>
  <div class="space-y-4">
    <h3 class="font-medium text-lg">Shipping Method</h3>

    <div v-if="loading" class="space-y-3">
      <Skeleton v-for="i in 2" :key="i" class="h-16" />
    </div>

    <div v-else-if="options.length === 0" class="text-center py-8 text-muted-foreground">
      No shipping options available for your address.
    </div>

    <div v-else class="space-y-3">
      <button
        v-for="option in options"
        :key="option.id"
        :class="[
          'w-full flex items-center justify-between p-4 border rounded-lg text-left transition-colors',
          selectedId === option.id
            ? 'border-gold-600 bg-gold-50'
            : 'hover:border-muted-foreground/50'
        ]"
        @click="emit('select', option.id)"
      >
        <div>
          <p class="font-medium">{{ option.name }}</p>
          <p v-if="option.data?.estimated_days" class="text-sm text-muted-foreground">
            {{ option.data.estimated_days }} business days
          </p>
        </div>
        <p class="font-medium">
          {{ getPrice(option) }}
        </p>
      </button>
    </div>

    <Button
      class="w-full"
      :disabled="!selectedId || loading"
      @click="emit('continue')"
    >
      Continue to Payment
    </Button>
  </div>
</template>
