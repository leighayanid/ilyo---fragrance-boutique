<script setup lang="ts">
import type { HttpTypes } from '@medusajs/types'
import { CheckCircle, Package, ArrowRight } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'

const route = useRoute()
const medusa = useMedusa()
const { formatPrice, fetchRegions } = useRegions()

const order = ref<HttpTypes.StoreOrder | null>(null)
const loading = ref(true)
const error = ref<Error | null>(null)

useSeoMeta({
  title: 'Order Confirmation - Ilyo Fragrance Boutique',
  description: 'Thank you for your order at Ilyo Fragrance Boutique.',
})

async function fetchOrder() {
  const orderId = route.params.id as string
  if (!orderId) return

  loading.value = true
  error.value = null

  try {
    const { order: fetchedOrder } = await medusa.store.order.retrieve(orderId)
    order.value = fetchedOrder
  } catch (err) {
    error.value = err as Error
    console.error('Failed to fetch order:', err)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchRegions()
  await fetchOrder()
})
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-2xl mx-auto text-center">
        <!-- Loading -->
        <div v-if="loading" class="space-y-4">
          <div class="animate-pulse">
            <div class="w-16 h-16 bg-muted rounded-full mx-auto mb-4" />
            <div class="h-8 bg-muted rounded w-1/2 mx-auto mb-2" />
            <div class="h-4 bg-muted rounded w-3/4 mx-auto" />
          </div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="space-y-4">
          <h1 class="text-2xl font-serif">Order Not Found</h1>
          <p class="text-muted-foreground">
            We couldn't find the order you're looking for.
          </p>
          <Button as-child>
            <NuxtLink to="/products">
              Continue Shopping
            </NuxtLink>
          </Button>
        </div>

        <!-- Success -->
        <div v-else-if="order" class="space-y-8">
          <div>
            <CheckCircle class="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 class="text-3xl font-serif mb-2">Thank You!</h1>
            <p class="text-muted-foreground">
              Your order has been placed successfully.
            </p>
          </div>

          <div class="bg-secondary/30 rounded-lg p-6 text-left">
            <div class="flex items-center gap-3 mb-4">
              <Package class="w-5 h-5 text-muted-foreground" />
              <div>
                <p class="text-sm text-muted-foreground">Order Number</p>
                <p class="font-medium">{{ order.display_id || order.id }}</p>
              </div>
            </div>

            <Separator class="my-4" />

            <div class="space-y-3">
              <p class="text-sm text-muted-foreground">Order Summary</p>
              <div
                v-for="item in order.items"
                :key="item.id"
                class="flex justify-between text-sm"
              >
                <span>
                  {{ item.product_title }}
                  <span v-if="item.variant_title" class="text-muted-foreground">
                    ({{ item.variant_title }})
                  </span>
                  <span class="text-muted-foreground">x{{ item.quantity }}</span>
                </span>
                <span>{{ formatPrice(item.total || 0) }}</span>
              </div>
            </div>

            <Separator class="my-4" />

            <div class="flex justify-between font-medium">
              <span>Total</span>
              <span>{{ formatPrice(order.total || 0) }}</span>
            </div>
          </div>

          <div class="space-y-4">
            <p class="text-sm text-muted-foreground">
              A confirmation email has been sent to
              <span class="font-medium text-foreground">{{ order.email }}</span>
            </p>

            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <Button as-child variant="outline">
                <NuxtLink to="/products">
                  Continue Shopping
                  <ArrowRight class="ml-2 h-4 w-4" />
                </NuxtLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
