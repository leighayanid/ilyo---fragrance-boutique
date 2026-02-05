import type { HttpTypes } from '@medusajs/types'

interface ProductState {
  product: HttpTypes.StoreProduct | null
  loading: boolean
  error: Error | null
}

export function useProduct(handle: MaybeRefOrGetter<string>) {
  const medusa = useMedusa()
  const { selectedRegion } = useRegions()

  const state = reactive<ProductState>({
    product: null,
    loading: false,
    error: null,
  })

  const selectedVariantId = ref<string | null>(null)

  async function fetchProduct() {
    const productHandle = toValue(handle)
    if (!productHandle) return

    state.loading = true
    state.error = null

    try {
      const params: Record<string, unknown> = {
        fields: '+variants.calculated_price,+variants.inventory_quantity',
      }

      if (selectedRegion.value?.id) {
        params.region_id = selectedRegion.value.id
      }

      const { products } = await medusa.store.product.list({
        handle: productHandle,
        ...params,
      })

      if (products && products.length > 0) {
        state.product = products[0]
        if (state.product.variants && state.product.variants.length > 0) {
          selectedVariantId.value = state.product.variants[0].id
        }
      } else {
        state.error = new Error('Product not found')
      }
    } catch (err) {
      state.error = err as Error
      console.error('Failed to fetch product:', err)
    } finally {
      state.loading = false
    }
  }

  const selectedVariant = computed(() => {
    if (!state.product?.variants || !selectedVariantId.value) return null
    return state.product.variants.find(v => v.id === selectedVariantId.value) || null
  })

  const price = computed(() => {
    const variant = selectedVariant.value
    if (!variant) return null

    const calculatedPrice = (variant as HttpTypes.StoreProductVariant & {
      calculated_price?: {
        calculated_amount?: number
        original_amount?: number
        currency_code?: string
      }
    }).calculated_price

    if (calculatedPrice) {
      return {
        amount: calculatedPrice.calculated_amount || 0,
        originalAmount: calculatedPrice.original_amount,
        currencyCode: calculatedPrice.currency_code || 'USD',
      }
    }

    return null
  })

  const images = computed(() => state.product?.images || [])

  const inStock = computed(() => {
    const variant = selectedVariant.value
    if (!variant) return false
    const qty = (variant as HttpTypes.StoreProductVariant & { inventory_quantity?: number }).inventory_quantity
    return qty === undefined || qty > 0
  })

  function selectVariant(variantId: string) {
    selectedVariantId.value = variantId
  }

  watch(() => toValue(handle), () => {
    fetchProduct()
  })

  return {
    product: computed(() => state.product),
    loading: computed(() => state.loading),
    error: computed(() => state.error),
    selectedVariant,
    selectedVariantId,
    price,
    images,
    inStock,
    fetchProduct,
    selectVariant,
  }
}
