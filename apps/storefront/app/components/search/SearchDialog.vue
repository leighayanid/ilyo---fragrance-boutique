<script setup lang="ts">
import type { HttpTypes } from '@medusajs/types'
import { Search, X, Loader2 } from 'lucide-vue-next'
import { Dialog, DialogContent } from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { AspectRatio } from '~/components/ui/aspect-ratio'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const medusa = useMedusa()
const router = useRouter()
const { selectedRegion } = useRegions()
const { formatPrice } = useRegions()

const query = ref('')
const results = ref<HttpTypes.StoreProduct[]>([])
const loading = ref(false)
const searchInput = ref<HTMLInputElement | null>(null)

let debounceTimeout: ReturnType<typeof setTimeout> | null = null

watch(query, (value) => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout)
  }

  if (!value.trim()) {
    results.value = []
    return
  }

  loading.value = true
  debounceTimeout = setTimeout(() => {
    performSearch(value)
  }, 300)
})

async function performSearch(searchQuery: string) {
  if (!searchQuery.trim()) {
    results.value = []
    loading.value = false
    return
  }

  try {
    const params: Record<string, unknown> = {
      q: searchQuery,
      limit: 8,
      fields: '+variants.calculated_price',
    }

    if (selectedRegion.value?.id) {
      params.region_id = selectedRegion.value.id
    }

    const { products } = await medusa.store.product.list(params)
    results.value = products || []
  } catch (err) {
    console.error('Search failed:', err)
    results.value = []
  } finally {
    loading.value = false
  }
}

function getPrice(product: HttpTypes.StoreProduct): string | null {
  const variants = product.variants || []
  if (variants.length === 0) return null

  const prices = variants
    .map(v => {
      const calc = (v as HttpTypes.StoreProductVariant & {
        calculated_price?: { calculated_amount?: number }
      }).calculated_price
      return calc?.calculated_amount
    })
    .filter((p): p is number => p !== undefined && p !== null)

  if (prices.length === 0) return null
  return formatPrice(Math.min(...prices))
}

function selectProduct(product: HttpTypes.StoreProduct) {
  emit('update:open', false)
  query.value = ''
  results.value = []
  router.push(`/products/${product.handle}`)
}

function close() {
  emit('update:open', false)
  query.value = ''
  results.value = []
}

watch(() => props.open, (open) => {
  if (open) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
})
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-2xl p-0 gap-0 overflow-hidden">
      <div class="flex items-center border-b px-4">
        <Search class="h-5 w-5 text-muted-foreground mr-3" />
        <input
          ref="searchInput"
          v-model="query"
          type="text"
          placeholder="Search fragrances..."
          class="flex-1 py-4 text-lg bg-transparent border-0 outline-none placeholder:text-muted-foreground"
        >
        <button
          v-if="query"
          type="button"
          class="p-1 hover:bg-secondary rounded"
          @click="query = ''"
        >
          <X class="h-4 w-4" />
        </button>
      </div>

      <div class="max-h-[60vh] overflow-y-auto">
        <div v-if="loading" class="flex items-center justify-center py-12">
          <Loader2 class="h-6 w-6 animate-spin text-muted-foreground" />
        </div>

        <div v-else-if="query && results.length === 0" class="text-center py-12">
          <p class="text-muted-foreground">No results found for "{{ query }}"</p>
        </div>

        <div v-else-if="results.length > 0" class="p-2">
          <button
            v-for="product in results"
            :key="product.id"
            type="button"
            class="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-secondary transition-colors text-left"
            @click="selectProduct(product)"
          >
            <div class="flex-shrink-0 w-16 h-16 bg-secondary/50 rounded overflow-hidden">
              <AspectRatio :ratio="1">
                <img
                  v-if="product.thumbnail"
                  :src="product.thumbnail"
                  :alt="product.title"
                  class="w-full h-full object-cover"
                >
              </AspectRatio>
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="font-medium truncate">{{ product.title }}</h4>
              <p v-if="product.subtitle" class="text-sm text-muted-foreground truncate">
                {{ product.subtitle }}
              </p>
              <p v-if="getPrice(product)" class="text-sm font-medium mt-1">
                {{ getPrice(product) }}
              </p>
            </div>
          </button>
        </div>

        <div v-else class="text-center py-12 text-muted-foreground">
          <p>Start typing to search fragrances</p>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
