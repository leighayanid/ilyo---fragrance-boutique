<script setup lang="ts">
const { cart, subtotal, total } = useCart()
const { formatPrice } = useRegions()

const shipping = computed(() => {
  if (!cart.value) return null
  return cart.value.shipping_total || 0
})

const discount = computed(() => {
  if (!cart.value) return null
  return cart.value.discount_total || 0
})

const tax = computed(() => {
  if (!cart.value) return null
  return cart.value.tax_total || 0
})
</script>

<template>
  <div class="space-y-2 text-sm">
    <div class="flex justify-between">
      <span class="text-muted-foreground">Subtotal</span>
      <span>{{ formatPrice(subtotal) }}</span>
    </div>

    <div v-if="shipping && shipping > 0" class="flex justify-between">
      <span class="text-muted-foreground">Shipping</span>
      <span>{{ formatPrice(shipping) }}</span>
    </div>

    <div v-if="discount && discount > 0" class="flex justify-between text-green-600">
      <span>Discount</span>
      <span>-{{ formatPrice(discount) }}</span>
    </div>

    <div v-if="tax && tax > 0" class="flex justify-between">
      <span class="text-muted-foreground">Tax</span>
      <span>{{ formatPrice(tax) }}</span>
    </div>

    <div class="flex justify-between font-medium text-base pt-2 border-t">
      <span>Total</span>
      <span>{{ formatPrice(total) }}</span>
    </div>
  </div>
</template>
