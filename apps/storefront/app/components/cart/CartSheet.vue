<script setup lang="ts">
import { ShoppingBag, ArrowRight } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { SheetHeader, SheetTitle, SheetDescription } from '~/components/ui/sheet'

const { items, isEmpty, subtotal, loading, fetchCart } = useCart()
const { formatPrice, fetchRegions } = useRegions()

onMounted(async () => {
  await fetchRegions()
  await fetchCart()
})
</script>

<template>
  <div class="flex flex-col h-full">
    <SheetHeader>
      <SheetTitle class="font-serif text-xl">Shopping Cart</SheetTitle>
      <SheetDescription>
        {{ items.length }} {{ items.length === 1 ? 'item' : 'items' }}
      </SheetDescription>
    </SheetHeader>

    <div class="flex-1 overflow-y-auto py-6">
      <!-- Empty State -->
      <div v-if="isEmpty" class="flex flex-col items-center justify-center h-full text-center">
        <ShoppingBag class="h-12 w-12 text-muted-foreground mb-4" />
        <h3 class="font-serif text-lg mb-2">Your cart is empty</h3>
        <p class="text-sm text-muted-foreground mb-6">
          Discover our collection of luxury fragrances.
        </p>
        <Button as-child>
          <NuxtLink to="/products">
            Shop Now
          </NuxtLink>
        </Button>
      </div>

      <!-- Cart Items -->
      <div v-else class="space-y-4">
        <CartItem
          v-for="item in items"
          :key="item.id"
          :item="item"
        />
      </div>
    </div>

    <!-- Footer -->
    <div v-if="!isEmpty" class="border-t pt-4 space-y-4">
      <CartSummary />
      <Button as-child class="w-full h-12" variant="gold">
        <NuxtLink to="/checkout">
          Checkout
          <ArrowRight class="ml-2 h-4 w-4" />
        </NuxtLink>
      </Button>
      <p class="text-xs text-center text-muted-foreground">
        Shipping & taxes calculated at checkout
      </p>
    </div>
  </div>
</template>
