<script setup lang="ts">
import { ArrowLeft, Check } from 'lucide-vue-next'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'

definePageMeta({
  middleware: ['auth'],
})

const { customer, updateCustomer, loading } = useAuth()

const form = reactive({
  first_name: '',
  last_name: '',
  phone: '',
})

const success = ref(false)
const formError = ref<string | null>(null)

watch(customer, (c) => {
  if (c) {
    form.first_name = c.first_name || ''
    form.last_name = c.last_name || ''
    form.phone = c.phone || ''
  }
}, { immediate: true })

async function handleSubmit() {
  formError.value = null
  success.value = false

  try {
    await updateCustomer({
      first_name: form.first_name,
      last_name: form.last_name,
      phone: form.phone || undefined,
    })
    success.value = true
    setTimeout(() => {
      success.value = false
    }, 3000)
  } catch (err) {
    formError.value = 'Failed to update profile. Please try again.'
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-12 max-w-2xl">
    <div class="space-y-8">
      <div class="flex items-center gap-4">
        <Button variant="ghost" size="icon" as-child>
          <NuxtLink to="/account">
            <ArrowLeft class="h-5 w-5" />
          </NuxtLink>
        </Button>
        <div>
          <h1 class="text-3xl font-serif font-medium">Account Settings</h1>
          <p class="text-muted-foreground mt-1">
            Update your profile information
          </p>
        </div>
      </div>

      <div class="bg-card border rounded-lg p-6">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div v-if="formError" class="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {{ formError }}
          </div>

          <div v-if="success" class="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md flex items-center gap-2">
            <Check class="h-4 w-4" />
            Profile updated successfully
          </div>

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
            <Label for="email">Email</Label>
            <Input
              id="email"
              :value="customer?.email"
              type="email"
              disabled
              class="bg-muted"
            />
            <p class="text-xs text-muted-foreground">
              Email cannot be changed
            </p>
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

          <Button type="submit" :disabled="loading">
            {{ loading ? 'Saving...' : 'Save Changes' }}
          </Button>
        </form>
      </div>
    </div>
  </div>
</template>
