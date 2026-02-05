<script setup lang="ts">
import type { HttpTypes } from '@medusajs/types'
import { Package, ArrowLeft } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import { Skeleton } from '~/components/ui/skeleton'
import { Badge } from '~/components/ui/badge'

definePageMeta({
  middleware: ['auth'],
})

const { getOrders } = useAuth()
const { formatPrice } = useRegions()

const orders = ref<HttpTypes.StoreOrder[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    orders.value = await getOrders()
  } finally {
    loading.value = false
  }
})

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function getStatusVariant(status: string): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'completed':
      return 'default'
    case 'canceled':
      return 'destructive'
    case 'pending':
      return 'secondary'
    default:
      return 'outline'
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <div class="space-y-8">
      <div class="flex items-center gap-4">
        <Button variant="ghost" size="icon" as-child>
          <NuxtLink to="/account">
            <ArrowLeft class="h-5 w-5" />
          </NuxtLink>
        </Button>
        <div>
          <h1 class="text-3xl font-serif font-medium">Order History</h1>
          <p class="text-muted-foreground mt-1">
            View and track your orders
          </p>
        </div>
      </div>

      <div v-if="loading" class="space-y-4">
        <Skeleton class="h-24 w-full" />
        <Skeleton class="h-24 w-full" />
        <Skeleton class="h-24 w-full" />
      </div>

      <div v-else-if="orders.length === 0" class="text-center py-16">
        <Package class="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
        <h2 class="text-xl font-medium mb-2">No orders yet</h2>
        <p class="text-muted-foreground mb-6">
          When you place an order, it will appear here
        </p>
        <Button as-child>
          <NuxtLink to="/products">Start Shopping</NuxtLink>
        </Button>
      </div>

      <div v-else class="space-y-4">
        <NuxtLink
          v-for="order in orders"
          :key="order.id"
          :to="`/order/${order.id}`"
          class="block bg-card border rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="space-y-1">
              <div class="flex items-center gap-3">
                <h3 class="font-medium">Order #{{ order.display_id }}</h3>
                <Badge :variant="getStatusVariant(order.status || 'pending')">
                  {{ order.status || 'pending' }}
                </Badge>
              </div>
              <p class="text-sm text-muted-foreground">
                {{ formatDate(order.created_at) }}
              </p>
            </div>
            <div class="text-right">
              <p class="font-medium text-lg">{{ formatPrice(order.total) }}</p>
              <p class="text-sm text-muted-foreground">
                {{ order.items?.length || 0 }} {{ (order.items?.length || 0) === 1 ? 'item' : 'items' }}
              </p>
            </div>
          </div>

          <div v-if="order.items && order.items.length > 0" class="mt-4 pt-4 border-t">
            <div class="flex gap-2 overflow-x-auto">
              <div
                v-for="item in order.items.slice(0, 4)"
                :key="item.id"
                class="flex-shrink-0 w-16 h-16 bg-secondary/50 rounded overflow-hidden"
              >
                <img
                  v-if="item.thumbnail"
                  :src="item.thumbnail"
                  :alt="item.title"
                  class="w-full h-full object-cover"
                >
              </div>
              <div
                v-if="order.items.length > 4"
                class="flex-shrink-0 w-16 h-16 bg-secondary rounded flex items-center justify-center text-sm text-muted-foreground"
              >
                +{{ order.items.length - 4 }}
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
