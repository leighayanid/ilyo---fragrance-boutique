import type { HttpTypes } from '@medusajs/types'

export interface ProductFilters {
  category_id?: string[]
  collection_id?: string[]
  tags?: string[]
  q?: string
}

export interface ProductSort {
  field: 'created_at' | 'title' | 'price'
  direction: 'asc' | 'desc'
}

interface ProductsState {
  products: HttpTypes.StoreProduct[]
  count: number
  loading: boolean
  error: Error | null
}

export function useProducts() {
  const medusa = useMedusa()
  const { selectedRegion } = useRegions()

  const state = reactive<ProductsState>({
    products: [],
    count: 0,
    loading: false,
    error: null,
  })

  const filters = ref<ProductFilters>({})
  const sort = ref<ProductSort>({ field: 'created_at', direction: 'desc' })
  const page = ref(1)
  const limit = ref(12)

  async function fetchProducts() {
    state.loading = true
    state.error = null

    try {
      const params: Record<string, unknown> = {
        limit: limit.value,
        offset: (page.value - 1) * limit.value,
        fields: '+variants.calculated_price',
      }

      if (selectedRegion.value?.id) {
        params.region_id = selectedRegion.value.id
      }

      if (filters.value.q) {
        params.q = filters.value.q
      }

      if (filters.value.category_id?.length) {
        params.category_id = filters.value.category_id
      }

      if (filters.value.collection_id?.length) {
        params.collection_id = filters.value.collection_id
      }

      if (sort.value.field === 'created_at') {
        params.order = sort.value.direction === 'desc' ? '-created_at' : 'created_at'
      } else if (sort.value.field === 'title') {
        params.order = sort.value.direction === 'desc' ? '-title' : 'title'
      }

      const { products, count } = await medusa.store.product.list(params)
      state.products = products || []
      state.count = count || 0
    } catch (err) {
      state.error = err as Error
      console.error('Failed to fetch products:', err)
    } finally {
      state.loading = false
    }
  }

  function setFilters(newFilters: ProductFilters) {
    filters.value = { ...filters.value, ...newFilters }
    page.value = 1
  }

  function clearFilters() {
    filters.value = {}
    page.value = 1
  }

  function setSort(newSort: ProductSort) {
    sort.value = newSort
    page.value = 1
  }

  function setPage(newPage: number) {
    page.value = newPage
  }

  const totalPages = computed(() => Math.ceil(state.count / limit.value))

  const hasNextPage = computed(() => page.value < totalPages.value)
  const hasPrevPage = computed(() => page.value > 1)

  return {
    products: computed(() => state.products),
    count: computed(() => state.count),
    loading: computed(() => state.loading),
    error: computed(() => state.error),
    filters,
    sort,
    page,
    limit,
    totalPages,
    hasNextPage,
    hasPrevPage,
    fetchProducts,
    setFilters,
    clearFilters,
    setSort,
    setPage,
  }
}
