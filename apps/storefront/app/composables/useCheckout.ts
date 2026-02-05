import type { HttpTypes } from '@medusajs/types'

export type CheckoutStep = 'information' | 'shipping' | 'payment' | 'confirmation'

interface CheckoutState {
  step: CheckoutStep
  email: string
  shippingAddress: HttpTypes.StoreCartAddress | null
  billingAddress: HttpTypes.StoreCartAddress | null
  shippingMethodId: string | null
  shippingOptions: HttpTypes.StoreCartShippingOption[]
  paymentSession: HttpTypes.StorePaymentSession | null
  loading: boolean
  error: Error | null
}

const state = reactive<CheckoutState>({
  step: 'information',
  email: '',
  shippingAddress: null,
  billingAddress: null,
  shippingMethodId: null,
  shippingOptions: [],
  paymentSession: null,
  loading: false,
  error: null,
})

export function useCheckout() {
  const medusa = useMedusa()
  const { cart, getOrCreateCart } = useCart()

  function setStep(step: CheckoutStep) {
    state.step = step
  }

  function nextStep() {
    const steps: CheckoutStep[] = ['information', 'shipping', 'payment', 'confirmation']
    const currentIndex = steps.indexOf(state.step)
    if (currentIndex < steps.length - 1) {
      state.step = steps[currentIndex + 1]
    }
  }

  function prevStep() {
    const steps: CheckoutStep[] = ['information', 'shipping', 'payment', 'confirmation']
    const currentIndex = steps.indexOf(state.step)
    if (currentIndex > 0) {
      state.step = steps[currentIndex - 1]
    }
  }

  async function updateEmail(email: string) {
    const currentCart = await getOrCreateCart()
    if (!currentCart) return

    state.loading = true
    state.error = null

    try {
      await medusa.store.cart.update(currentCart.id, { email })
      state.email = email
    } catch (err) {
      state.error = err as Error
      console.error('Failed to update email:', err)
      throw err
    } finally {
      state.loading = false
    }
  }

  async function updateShippingAddress(address: HttpTypes.StoreCartAddress) {
    const currentCart = await getOrCreateCart()
    if (!currentCart) return

    state.loading = true
    state.error = null

    try {
      await medusa.store.cart.update(currentCart.id, {
        shipping_address: address,
      })
      state.shippingAddress = address
    } catch (err) {
      state.error = err as Error
      console.error('Failed to update shipping address:', err)
      throw err
    } finally {
      state.loading = false
    }
  }

  async function updateBillingAddress(address: HttpTypes.StoreCartAddress) {
    const currentCart = await getOrCreateCart()
    if (!currentCart) return

    state.loading = true
    state.error = null

    try {
      await medusa.store.cart.update(currentCart.id, {
        billing_address: address,
      })
      state.billingAddress = address
    } catch (err) {
      state.error = err as Error
      console.error('Failed to update billing address:', err)
      throw err
    } finally {
      state.loading = false
    }
  }

  async function fetchShippingOptions() {
    const currentCart = cart.value
    if (!currentCart) return

    state.loading = true
    state.error = null

    try {
      const { shipping_options } = await medusa.store.fulfillment.listCartOptions({
        cart_id: currentCart.id,
      })
      state.shippingOptions = shipping_options || []
    } catch (err) {
      state.error = err as Error
      console.error('Failed to fetch shipping options:', err)
    } finally {
      state.loading = false
    }
  }

  async function selectShippingOption(optionId: string) {
    const currentCart = cart.value
    if (!currentCart) return

    state.loading = true
    state.error = null

    try {
      await medusa.store.cart.addShippingMethod(currentCart.id, {
        option_id: optionId,
      })
      state.shippingMethodId = optionId
    } catch (err) {
      state.error = err as Error
      console.error('Failed to select shipping option:', err)
      throw err
    } finally {
      state.loading = false
    }
  }

  async function initializePayment() {
    const currentCart = cart.value
    if (!currentCart) return

    state.loading = true
    state.error = null

    try {
      const { payment_collection } = await medusa.store.payment.initiatePaymentSession(currentCart, {
        provider_id: 'pp_system_default',
      })
      if (payment_collection?.payment_sessions?.length) {
        state.paymentSession = payment_collection.payment_sessions[0]
      }
    } catch (err) {
      state.error = err as Error
      console.error('Failed to initialize payment:', err)
      throw err
    } finally {
      state.loading = false
    }
  }

  async function completeCheckout(): Promise<HttpTypes.StoreOrder | null> {
    const currentCart = cart.value
    if (!currentCart) return null

    state.loading = true
    state.error = null

    try {
      const { order } = await medusa.store.cart.complete(currentCart.id)
      state.step = 'confirmation'
      return order as HttpTypes.StoreOrder
    } catch (err) {
      state.error = err as Error
      console.error('Failed to complete checkout:', err)
      throw err
    } finally {
      state.loading = false
    }
  }

  function resetCheckout() {
    state.step = 'information'
    state.email = ''
    state.shippingAddress = null
    state.billingAddress = null
    state.shippingMethodId = null
    state.shippingOptions = []
    state.paymentSession = null
    state.error = null
  }

  return {
    step: computed(() => state.step),
    email: computed(() => state.email),
    shippingAddress: computed(() => state.shippingAddress),
    billingAddress: computed(() => state.billingAddress),
    shippingMethodId: computed(() => state.shippingMethodId),
    shippingOptions: computed(() => state.shippingOptions),
    paymentSession: computed(() => state.paymentSession),
    loading: computed(() => state.loading),
    error: computed(() => state.error),
    setStep,
    nextStep,
    prevStep,
    updateEmail,
    updateShippingAddress,
    updateBillingAddress,
    fetchShippingOptions,
    selectShippingOption,
    initializePayment,
    completeCheckout,
    resetCheckout,
  }
}
