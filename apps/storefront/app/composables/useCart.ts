import type { HttpTypes } from '@medusajs/types'

interface CartState {
  cart: HttpTypes.StoreCart | null
  loading: boolean
  error: Error | null
}

const state = reactive<CartState>({
  cart: null,
  loading: false,
  error: null,
})

export function useCart() {
  const medusa = useMedusa()
  const { selectedRegion } = useRegions()

  const cartId = useCookie<string | null>('cart_id', {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
  })

  async function getOrCreateCart(): Promise<HttpTypes.StoreCart | null> {
    if (state.cart) return state.cart

    if (cartId.value) {
      try {
        const { cart } = await medusa.store.cart.retrieve(cartId.value)
        state.cart = cart
        return cart
      } catch {
        cartId.value = null
      }
    }

    try {
      const regionId = selectedRegion.value?.id
      const { cart } = await medusa.store.cart.create({
        region_id: regionId,
      })
      state.cart = cart
      cartId.value = cart.id
      return cart
    } catch (err) {
      state.error = err as Error
      console.error('Failed to create cart:', err)
      return null
    }
  }

  async function fetchCart() {
    if (!cartId.value) return

    state.loading = true
    state.error = null

    try {
      const { cart } = await medusa.store.cart.retrieve(cartId.value)
      state.cart = cart
    } catch (err) {
      state.error = err as Error
      cartId.value = null
      console.error('Failed to fetch cart:', err)
    } finally {
      state.loading = false
    }
  }

  async function addItem(variantId: string, quantity: number = 1) {
    state.loading = true
    state.error = null

    try {
      const cart = await getOrCreateCart()
      if (!cart) throw new Error('Failed to get cart')

      const { cart: updatedCart } = await medusa.store.cart.createLineItem(cart.id, {
        variant_id: variantId,
        quantity,
      })
      state.cart = updatedCart
    } catch (err) {
      state.error = err as Error
      console.error('Failed to add item to cart:', err)
      throw err
    } finally {
      state.loading = false
    }
  }

  async function updateItem(lineItemId: string, quantity: number) {
    if (!state.cart) return

    state.loading = true
    state.error = null

    try {
      const { cart } = await medusa.store.cart.updateLineItem(
        state.cart.id,
        lineItemId,
        { quantity }
      )
      state.cart = cart
    } catch (err) {
      state.error = err as Error
      console.error('Failed to update item:', err)
      throw err
    } finally {
      state.loading = false
    }
  }

  async function removeItem(lineItemId: string) {
    if (!state.cart) return

    state.loading = true
    state.error = null

    try {
      const { parent: cart } = await medusa.store.cart.deleteLineItem(
        state.cart.id,
        lineItemId
      )
      state.cart = cart as HttpTypes.StoreCart
    } catch (err) {
      state.error = err as Error
      console.error('Failed to remove item:', err)
      throw err
    } finally {
      state.loading = false
    }
  }

  const items = computed(() => state.cart?.items || [])

  const cartCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const subtotal = computed(() => state.cart?.subtotal || 0)

  const total = computed(() => state.cart?.total || 0)

  const isEmpty = computed(() => items.value.length === 0)

  return {
    cart: computed(() => state.cart),
    loading: computed(() => state.loading),
    error: computed(() => state.error),
    items,
    cartCount,
    subtotal,
    total,
    isEmpty,
    fetchCart,
    getOrCreateCart,
    addItem,
    updateItem,
    removeItem,
  }
}
