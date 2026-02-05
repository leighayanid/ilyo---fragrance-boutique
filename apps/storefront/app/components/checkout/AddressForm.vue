<script setup lang="ts">
import type { HttpTypes } from '@medusajs/types'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'

interface Props {
  title?: string
  initialAddress?: HttpTypes.StoreCartAddress | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Address',
  loading: false,
})

const emit = defineEmits<{
  (e: 'submit', address: HttpTypes.StoreCartAddress): void
}>()

const form = reactive({
  first_name: props.initialAddress?.first_name || '',
  last_name: props.initialAddress?.last_name || '',
  address_1: props.initialAddress?.address_1 || '',
  address_2: props.initialAddress?.address_2 || '',
  city: props.initialAddress?.city || '',
  province: props.initialAddress?.province || '',
  postal_code: props.initialAddress?.postal_code || '',
  country_code: props.initialAddress?.country_code || 'us',
  phone: props.initialAddress?.phone || '',
})

const countries = [
  { code: 'us', name: 'United States' },
  { code: 'ca', name: 'Canada' },
  { code: 'gb', name: 'United Kingdom' },
  { code: 'au', name: 'Australia' },
  { code: 'de', name: 'Germany' },
  { code: 'fr', name: 'France' },
]

function handleSubmit() {
  emit('submit', {
    first_name: form.first_name,
    last_name: form.last_name,
    address_1: form.address_1,
    address_2: form.address_2 || undefined,
    city: form.city,
    province: form.province || undefined,
    postal_code: form.postal_code,
    country_code: form.country_code,
    phone: form.phone || undefined,
  })
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <h3 v-if="title" class="font-medium text-lg">{{ title }}</h3>

    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-2">
        <Label for="first_name">First Name</Label>
        <Input
          id="first_name"
          v-model="form.first_name"
          required
          autocomplete="given-name"
        />
      </div>
      <div class="space-y-2">
        <Label for="last_name">Last Name</Label>
        <Input
          id="last_name"
          v-model="form.last_name"
          required
          autocomplete="family-name"
        />
      </div>
    </div>

    <div class="space-y-2">
      <Label for="address_1">Address</Label>
      <Input
        id="address_1"
        v-model="form.address_1"
        required
        autocomplete="address-line1"
      />
    </div>

    <div class="space-y-2">
      <Label for="address_2">Apartment, suite, etc. (optional)</Label>
      <Input
        id="address_2"
        v-model="form.address_2"
        autocomplete="address-line2"
      />
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-2">
        <Label for="city">City</Label>
        <Input
          id="city"
          v-model="form.city"
          required
          autocomplete="address-level2"
        />
      </div>
      <div class="space-y-2">
        <Label for="province">State / Province</Label>
        <Input
          id="province"
          v-model="form.province"
          autocomplete="address-level1"
        />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-2">
        <Label for="postal_code">Postal Code</Label>
        <Input
          id="postal_code"
          v-model="form.postal_code"
          required
          autocomplete="postal-code"
        />
      </div>
      <div class="space-y-2">
        <Label for="country">Country</Label>
        <Select v-model="form.country_code">
          <SelectTrigger>
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="country in countries"
              :key="country.code"
              :value="country.code"
            >
              {{ country.name }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <div class="space-y-2">
      <Label for="phone">Phone (optional)</Label>
      <Input
        id="phone"
        v-model="form.phone"
        type="tel"
        autocomplete="tel"
      />
    </div>

    <Button type="submit" class="w-full" :disabled="loading">
      {{ loading ? 'Saving...' : 'Continue' }}
    </Button>
  </form>
</template>
