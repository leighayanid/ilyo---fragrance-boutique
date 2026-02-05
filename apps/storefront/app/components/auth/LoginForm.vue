<script setup lang="ts">
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'

const emit = defineEmits<{
  (e: 'success'): void
}>()

const { login, loading, error } = useAuth()

const form = reactive({
  email: '',
  password: '',
})

const formError = ref<string | null>(null)

async function handleSubmit() {
  formError.value = null

  try {
    await login(form.email, form.password)
    emit('success')
  } catch (err) {
    formError.value = 'Invalid email or password. Please try again.'
  }
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div v-if="formError" class="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
      {{ formError }}
    </div>

    <div class="space-y-2">
      <Label for="email">Email</Label>
      <Input
        id="email"
        v-model="form.email"
        type="email"
        required
        autocomplete="email"
        placeholder="your@email.com"
      />
    </div>

    <div class="space-y-2">
      <Label for="password">Password</Label>
      <Input
        id="password"
        v-model="form.password"
        type="password"
        required
        autocomplete="current-password"
        placeholder="Enter your password"
      />
    </div>

    <Button type="submit" class="w-full" :disabled="loading">
      {{ loading ? 'Signing in...' : 'Sign In' }}
    </Button>
  </form>
</template>
