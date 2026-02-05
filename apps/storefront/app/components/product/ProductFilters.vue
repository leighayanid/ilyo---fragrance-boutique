<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import { Separator } from '~/components/ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion'

interface FilterOption {
  value: string
  label: string
  count?: number
}

interface Props {
  fragranceFamilies?: FilterOption[]
  concentrations?: FilterOption[]
  genders?: FilterOption[]
  selectedFilters: {
    fragranceFamily?: string[]
    concentration?: string[]
    gender?: string[]
  }
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:filters', filters: Props['selectedFilters']): void
  (e: 'clear'): void
}>()

const defaultFamilies: FilterOption[] = [
  { value: 'Floral', label: 'Floral' },
  { value: 'Woody', label: 'Woody' },
  { value: 'Oriental', label: 'Oriental' },
  { value: 'Fresh', label: 'Fresh' },
  { value: 'Citrus', label: 'Citrus' },
  { value: 'Aromatic', label: 'Aromatic' },
]

const defaultConcentrations: FilterOption[] = [
  { value: 'Parfum', label: 'Parfum' },
  { value: 'EDP', label: 'Eau de Parfum' },
  { value: 'EDT', label: 'Eau de Toilette' },
  { value: 'EDC', label: 'Eau de Cologne' },
  { value: 'Cologne', label: 'Cologne' },
]

const defaultGenders: FilterOption[] = [
  { value: 'Men', label: 'Men' },
  { value: 'Women', label: 'Women' },
  { value: 'Unisex', label: 'Unisex' },
]

const families = computed(() => props.fragranceFamilies || defaultFamilies)
const concentrations = computed(() => props.concentrations || defaultConcentrations)
const genders = computed(() => props.genders || defaultGenders)

const hasActiveFilters = computed(() =>
  Object.values(props.selectedFilters).some(arr => arr && arr.length > 0)
)

function toggleFilter(type: keyof Props['selectedFilters'], value: string) {
  const current = props.selectedFilters[type] || []
  const updated = current.includes(value)
    ? current.filter(v => v !== value)
    : [...current, value]

  emit('update:filters', {
    ...props.selectedFilters,
    [type]: updated,
  })
}

function isSelected(type: keyof Props['selectedFilters'], value: string): boolean {
  return props.selectedFilters[type]?.includes(value) || false
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="font-medium">Filters</h2>
      <Button
        v-if="hasActiveFilters"
        variant="ghost"
        size="sm"
        @click="emit('clear')"
      >
        Clear all
      </Button>
    </div>

    <!-- Active filters -->
    <div v-if="hasActiveFilters" class="flex flex-wrap gap-2">
      <template v-for="(values, key) in selectedFilters" :key="key">
        <Badge
          v-for="value in values"
          :key="`${key}-${value}`"
          variant="secondary"
          class="gap-1 pr-1"
        >
          {{ value }}
          <button
            class="ml-1 hover:bg-muted rounded-full p-0.5"
            @click="toggleFilter(key as keyof Props['selectedFilters'], value)"
          >
            <X class="h-3 w-3" />
          </button>
        </Badge>
      </template>
    </div>

    <Separator />

    <Accordion type="multiple" :default-value="['family', 'concentration']" class="w-full">
      <!-- Fragrance Family -->
      <AccordionItem value="family">
        <AccordionTrigger class="text-sm">Fragrance Family</AccordionTrigger>
        <AccordionContent>
          <div class="space-y-2">
            <button
              v-for="option in families"
              :key="option.value"
              :class="[
                'flex items-center justify-between w-full px-2 py-1.5 text-sm rounded-md transition-colors',
                isSelected('fragranceFamily', option.value)
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              ]"
              @click="toggleFilter('fragranceFamily', option.value)"
            >
              <span>{{ option.label }}</span>
              <span v-if="option.count !== undefined" class="text-xs opacity-70">
                {{ option.count }}
              </span>
            </button>
          </div>
        </AccordionContent>
      </AccordionItem>

      <!-- Concentration -->
      <AccordionItem value="concentration">
        <AccordionTrigger class="text-sm">Concentration</AccordionTrigger>
        <AccordionContent>
          <div class="space-y-2">
            <button
              v-for="option in concentrations"
              :key="option.value"
              :class="[
                'flex items-center justify-between w-full px-2 py-1.5 text-sm rounded-md transition-colors',
                isSelected('concentration', option.value)
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              ]"
              @click="toggleFilter('concentration', option.value)"
            >
              <span>{{ option.label }}</span>
              <span v-if="option.count !== undefined" class="text-xs opacity-70">
                {{ option.count }}
              </span>
            </button>
          </div>
        </AccordionContent>
      </AccordionItem>

      <!-- Gender -->
      <AccordionItem value="gender">
        <AccordionTrigger class="text-sm">Gender</AccordionTrigger>
        <AccordionContent>
          <div class="space-y-2">
            <button
              v-for="option in genders"
              :key="option.value"
              :class="[
                'flex items-center justify-between w-full px-2 py-1.5 text-sm rounded-md transition-colors',
                isSelected('gender', option.value)
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              ]"
              @click="toggleFilter('gender', option.value)"
            >
              <span>{{ option.label }}</span>
              <span v-if="option.count !== undefined" class="text-xs opacity-70">
                {{ option.count }}
              </span>
            </button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>
