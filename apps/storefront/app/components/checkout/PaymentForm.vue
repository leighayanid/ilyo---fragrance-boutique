<script setup lang="ts">
import { CreditCard, ShieldCheck } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'

interface Props {
  loading?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'complete'): void
}>()

const isProcessing = ref(false)

async function handleSubmit() {
  isProcessing.value = true
  try {
    emit('complete')
  } finally {
    isProcessing.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <h3 class="font-medium text-lg">Payment</h3>

    <div class="border rounded-lg p-6 bg-secondary/30">
      <div class="flex items-center gap-3 mb-4">
        <CreditCard class="h-5 w-5 text-muted-foreground" />
        <p class="font-medium">System Payment</p>
      </div>
      <p class="text-sm text-muted-foreground">
        This is a demo checkout using Medusa's system payment provider.
        In production, integrate with Stripe or another payment gateway.
      </p>
    </div>

    <div class="flex items-center gap-2 text-sm text-muted-foreground">
      <ShieldCheck class="h-4 w-4" />
      <p>Your payment information is secure and encrypted.</p>
    </div>

    <Button
      class="w-full h-12"
      variant="gold"
      :disabled="loading || isProcessing"
      @click="handleSubmit"
    >
      {{ isProcessing ? 'Processing...' : 'Complete Order' }}
    </Button>
  </div>
</template>
