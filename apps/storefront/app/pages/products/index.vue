<script setup lang="ts">
import { SlidersHorizontal, X } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '~/components/ui/sheet'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'

useSeoMeta({
  title: 'Shop All Fragrances - Ilyo Fragrance Boutique',
  description: 'Browse our complete collection of luxury fragrances. Filter by scent family, concentration, and more.',
})

const route = useRoute()
const router = useRouter()

const { fetchProducts, products, loading, count, setFilters, clearFilters, setSort, sort, page, totalPages, setPage } = useProducts()
const { fetchRegions } = useRegions()

const selectedFilters = ref<{
  fragranceFamily?: string[]
  concentration?: string[]
  gender?: string[]
}>({})

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'name-asc', label: 'Name A-Z' },
  { value: 'name-desc', label: 'Name Z-A' },
]

const selectedSort = ref('newest')

function handleSortChange(value: string) {
  selectedSort.value = value

  switch (value) {
    case 'newest':
      setSort({ field: 'created_at', direction: 'desc' })
      break
    case 'oldest':
      setSort({ field: 'created_at', direction: 'asc' })
      break
    case 'name-asc':
      setSort({ field: 'title', direction: 'asc' })
      break
    case 'name-desc':
      setSort({ field: 'title', direction: 'desc' })
      break
  }

  fetchProducts()
}

function handleFilterUpdate(filters: typeof selectedFilters.value) {
  selectedFilters.value = filters
  fetchProducts()
}

function handleClearFilters() {
  selectedFilters.value = {}
  clearFilters()
  fetchProducts()
}

function handlePageChange(newPage: number) {
  setPage(newPage)
  fetchProducts()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(async () => {
  await fetchRegions()

  const familyQuery = route.query.family
  if (familyQuery) {
    selectedFilters.value.fragranceFamily = [familyQuery as string]
  }

  await fetchProducts()
})

watch(() => route.query, async () => {
  const familyQuery = route.query.family
  if (familyQuery) {
    selectedFilters.value.fragranceFamily = [familyQuery as string]
  }
  await fetchProducts()
})
</script>

<template>
  <div class="py-8">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl md:text-4xl font-serif mb-2">All Fragrances</h1>
        <p class="text-muted-foreground">
          {{ count }} products
        </p>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Desktop Filters Sidebar -->
        <aside class="hidden lg:block w-64 flex-shrink-0">
          <div class="sticky top-24">
            <ProductFilters
              :selected-filters="selectedFilters"
              @update:filters="handleFilterUpdate"
              @clear="handleClearFilters"
            />
          </div>
        </aside>

        <!-- Main Content -->
        <div class="flex-1">
          <!-- Toolbar -->
          <div class="flex items-center justify-between mb-6">
            <!-- Mobile Filter Button -->
            <Sheet>
              <SheetTrigger as-child>
                <Button variant="outline" class="lg:hidden">
                  <SlidersHorizontal class="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" class="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div class="mt-6">
                  <ProductFilters
                    :selected-filters="selectedFilters"
                    @update:filters="handleFilterUpdate"
                    @clear="handleClearFilters"
                  />
                </div>
              </SheetContent>
            </Sheet>

            <div class="hidden lg:block" />

            <!-- Sort -->
            <Select :model-value="selectedSort" @update:model-value="handleSortChange">
              <SelectTrigger class="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="option in sortOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Product Grid -->
          <ProductGrid :products="products" :loading="loading" />

          <!-- Empty State -->
          <div
            v-if="!loading && products.length === 0"
            class="text-center py-20"
          >
            <h3 class="text-xl font-serif mb-2">No products found</h3>
            <p class="text-muted-foreground mb-6">
              Try adjusting your filters or search terms.
            </p>
            <Button variant="outline" @click="handleClearFilters">
              Clear Filters
            </Button>
          </div>

          <!-- Pagination -->
          <div
            v-if="totalPages > 1"
            class="flex items-center justify-center gap-2 mt-12"
          >
            <Button
              variant="outline"
              size="sm"
              :disabled="page === 1"
              @click="handlePageChange(page - 1)"
            >
              Previous
            </Button>
            <div class="flex items-center gap-1">
              <template v-for="p in totalPages" :key="p">
                <Button
                  v-if="p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1)"
                  :variant="p === page ? 'default' : 'ghost'"
                  size="sm"
                  @click="handlePageChange(p)"
                >
                  {{ p }}
                </Button>
                <span
                  v-else-if="p === page - 2 || p === page + 2"
                  class="px-2 text-muted-foreground"
                >
                  ...
                </span>
              </template>
            </div>
            <Button
              variant="outline"
              size="sm"
              :disabled="page === totalPages"
              @click="handlePageChange(page + 1)"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
