import type { HttpTypes } from '@medusajs/types'

interface RegionState {
  regions: HttpTypes.StoreRegion[]
  selectedRegion: HttpTypes.StoreRegion | null
  loading: boolean
  error: Error | null
}

const state = reactive<RegionState>({
  regions: [],
  selectedRegion: null,
  loading: false,
  error: null,
})

export function useRegions() {
  const medusa = useMedusa()

  async function fetchRegions() {
    if (state.regions.length > 0) return

    state.loading = true
    state.error = null

    try {
      const { regions } = await medusa.store.region.list()
      state.regions = regions || []

      if (state.regions.length > 0 && !state.selectedRegion) {
        const savedRegionId = useCookie('region_id').value
        const savedRegion = savedRegionId
          ? state.regions.find(r => r.id === savedRegionId)
          : null
        state.selectedRegion = savedRegion || state.regions[0]
      }
    } catch (err) {
      state.error = err as Error
      console.error('Failed to fetch regions:', err)
    } finally {
      state.loading = false
    }
  }

  function selectRegion(regionId: string) {
    const region = state.regions.find(r => r.id === regionId)
    if (region) {
      state.selectedRegion = region
      useCookie('region_id').value = regionId
    }
  }

  const currencyCode = computed(() =>
    state.selectedRegion?.currency_code?.toUpperCase() || 'USD'
  )

  function formatPrice(amount: number): string {
    const code = currencyCode.value
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: code,
    }).format(amount / 100)
  }

  return {
    regions: computed(() => state.regions),
    selectedRegion: computed(() => state.selectedRegion),
    loading: computed(() => state.loading),
    error: computed(() => state.error),
    currencyCode,
    fetchRegions,
    selectRegion,
    formatPrice,
  }
}
