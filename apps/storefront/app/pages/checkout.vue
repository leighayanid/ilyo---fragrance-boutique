<script setup lang="ts">
import type { HttpTypes } from '@medusajs/types'
import { ArrowLeft, Check } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Separator } from '~/components/ui/separator'

definePageMeta({
  layout: 'checkout',
})

useSeoMeta({
  title: 'Checkout - Ilyo Fragrance Boutique',
  description: 'Complete your order at Ilyo Fragrance Boutique.',
})

const router = useRouter()

const { fetchCart, isEmpty, cart } = useCart()
const { fetchRegions } = useRegions()
const {
  step,
  email,
  shippingAddress,
  shippingOptions,
  shippingMethodId,
  loading,
  setStep,
  nextStep,
  prevStep,
  updateEmail,
  updateShippingAddress,
  fetchShippingOptions,
  selectShippingOption,
  initializePayment,
  completeCheckout,
} = useCheckout()

const emailInput = ref('')
const completedOrder = ref<HttpTypes.StoreOrder | null>(null)

const steps = [
  { id: 'information', label: 'Information' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
]

async function handleEmailSubmit(event: Event) {
  event.preventDefault()
  if (!emailInput.value) return
  await updateEmail(emailInput.value)
}

async function handleAddressSubmit(address: HttpTypes.StoreCartAddress) {
  await updateShippingAddress(address)
  await fetchShippingOptions()
  nextStep()
}

async function handleShippingSelect(optionId: string) {
  await selectShippingOption(optionId)
}

async function handleShippingContinue() {
  await initializePayment()
  nextStep()
}

async function handlePaymentComplete() {
  const order = await completeCheckout()
  if (order) {
    completedOrder.value = order
    router.push(`/order/${order.id}`)
  }
}

function isStepComplete(stepId: string): boolean {
  const stepOrder = ['information', 'shipping', 'payment', 'confirmation']
  return stepOrder.indexOf(stepId) < stepOrder.indexOf(step.value)
}

function isStepActive(stepId: string): boolean {
  return step.value === stepId
}

onMounted(async () => {
  await fetchRegions()
  await fetchCart()

  if (isEmpty.value) {
    router.push('/products')
  }

  if (cart.value?.email) {
    emailInput.value = cart.value.email
  }
})

watch(isEmpty, (empty) => {
  if (empty && step.value !== 'confirmation') {
    router.push('/products')
  }
})
</script>

<template>
  <div class="container mx-auto px-4">
    <div class="max-w-5xl mx-auto">
      <!-- Progress Steps -->
      <nav class="mb-8">
        <ol class="flex items-center justify-center gap-4">
          <template v-for="(s, index) in steps" :key="s.id">
            <li class="flex items-center gap-2">
              <span
                :class="[
                  'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors',
                  isStepComplete(s.id)
                    ? 'bg-gold-600 text-white'
                    : isStepActive(s.id)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                ]"
              >
                <Check v-if="isStepComplete(s.id)" class="h-4 w-4" />
                <span v-else>{{ index + 1 }}</span>
              </span>
              <span
                :class="[
                  'text-sm font-medium',
                  isStepActive(s.id) ? 'text-foreground' : 'text-muted-foreground'
                ]"
              >
                {{ s.label }}
              </span>
            </li>
            <li v-if="index < steps.length - 1" class="w-12 h-px bg-border" />
          </template>
        </ol>
      </nav>

      <div class="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <!-- Main Content -->
        <div class="order-2 lg:order-1">
          <!-- Back Button -->
          <Button
            v-if="step !== 'information'"
            variant="ghost"
            size="sm"
            class="mb-4"
            @click="prevStep"
          >
            <ArrowLeft class="h-4 w-4 mr-2" />
            Back
          </Button>

          <!-- Information Step -->
          <div v-if="step === 'information'" class="space-y-6">
            <!-- Email -->
            <div class="space-y-4">
              <h3 class="font-medium text-lg">Contact Information</h3>
              <form @submit="handleEmailSubmit">
                <div class="space-y-2">
                  <Label for="email">Email</Label>
                  <Input
                    id="email"
                    v-model="emailInput"
                    type="email"
                    required
                    autocomplete="email"
                    placeholder="your@email.com"
                  />
                </div>
              </form>
            </div>

            <Separator />

            <!-- Shipping Address -->
            <AddressForm
              title="Shipping Address"
              :initial-address="shippingAddress"
              :loading="loading"
              @submit="handleAddressSubmit"
            />
          </div>

          <!-- Shipping Step -->
          <div v-else-if="step === 'shipping'">
            <ShippingOptions
              :options="shippingOptions"
              :selected-id="shippingMethodId"
              :loading="loading"
              @select="handleShippingSelect"
              @continue="handleShippingContinue"
            />
          </div>

          <!-- Payment Step -->
          <div v-else-if="step === 'payment'">
            <PaymentForm
              :loading="loading"
              @complete="handlePaymentComplete"
            />
          </div>
        </div>

        <!-- Order Summary -->
        <div class="order-1 lg:order-2">
          <div class="lg:sticky lg:top-24">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
