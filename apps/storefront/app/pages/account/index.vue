<script setup lang="ts">
import type { HttpTypes } from '@medusajs/types'
import { Package, ArrowRight } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import { Skeleton } from '~/components/ui/skeleton'

definePageMeta({
  middleware: ['auth'],
})

const { customer, getOrders } = useAuth()
const { formatPrice } = useRegions()

const orders = ref<HttpTypes.StoreOrder[]>([])
const loadingOrders = ref(true)

onMounted(async () => {
  try {
    orders.value = await getOrders()
  } finally {
    loadingOrders.value = false
  }
})

const recentOrders = computed(() => orders.value.slice(0, 3))

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-serif font-medium">
          Hello, {{ customer?.first_name || 'there' }}
        </h1>
        <p class="text-muted-foreground mt-1">
          Welcome to your account dashboard
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="bg-card border rounded-lg p-6">
          <h2 class="font-medium text-lg mb-4">Account Details</h2>
          <div class="space-y-2 text-sm">
            <p>
              <span class="text-muted-foreground">Name:</span>
              {{ customer?.first_name }} {{ customer?.last_name }}
            </p>
            <p>
              <span class="text-muted-foreground">Email:</span>
              {{ customer?.email }}
            </p>
            <p v-if="customer?.phone">
              <span class="text-muted-foreground">Phone:</span>
              {{ customer?.phone }}
            </p>
          </div>
          <Button variant="outline" as-child class="mt-4">
            <NuxtLink to="/account/settings">
              Edit Profile
            </NuxtLink>
          </Button>
        </div>

        <div class="bg-card border rounded-lg p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-medium text-lg">Recent Orders</h2>
            <NuxtLink
              v-if="orders.length > 0"
              to="/account/orders"
              class="text-sm text-gold-600 hover:text-gold-700 flex items-center gap-1"
            >
              View All
              <ArrowRight class="h-4 w-4" />
            </NuxtLink>
          </div>

          <div v-if="loadingOrders" class="space-y-3">
            <Skeleton class="h-16 w-full" />
            <Skeleton class="h-16 w-full" />
          </div>

          <div v-else-if="recentOrders.length === 0" class="text-center py-8">
            <Package class="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
            <p class="text-muted-foreground text-sm">No orders yet</p>
            <Button variant="outline" as-child class="mt-4">
              <NuxtLink to="/products">Start Shopping</NuxtLink>
            </Button>
          </div>

          <div v-else class="space-y-3">
            <NuxtLink
              v-for="order in recentOrders"
              :key="order.id"
              :to="`/order/${order.id}`"
              class="block p-3 border rounded-md hover:bg-secondary/50 transition-colors"
            >
              <div class="flex justify-between items-start">
                <div>
                  <p class="font-medium text-sm">Order #{{ order.display_id }}</p>
                  <p class="text-xs text-muted-foreground">
                    {{ formatDate(order.created_at) }}
                  </p>
                </div>
                <div class="text-right">
                  <p class="font-medium text-sm">{{ formatPrice(order.total) }}</p>
                  <p class="text-xs text-muted-foreground capitalize">
                    {{ order.status }}
                  </p>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
