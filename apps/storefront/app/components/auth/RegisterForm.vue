<script setup lang="ts">
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'

const emit = defineEmits<{
  (e: 'success'): void
}>()

const { register, loading } = useAuth()

const form = reactive({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
})

const formError = ref<string | null>(null)

async function handleSubmit() {
  formError.value = null

  if (form.password !== form.confirm_password) {
    formError.value = 'Passwords do not match.'
    return
  }

  if (form.password.length < 8) {
    formError.value = 'Password must be at least 8 characters.'
    return
  }

  try {
    await register({
      email: form.email,
      password: form.password,
      first_name: form.first_name,
      last_name: form.last_name,
    })
    emit('success')
  } catch (err) {
    formError.value = 'Registration failed. This email may already be registered.'
  }
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div v-if="formError" class="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
      {{ formError }}
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-2">
        <Label for="first_name">First Name</Label>
        <Input
          id="first_name"
          v-model="form.first_name"
          required
          autocomplete="given-name"
          placeholder="John"
        />
      </div>
      <div class="space-y-2">
        <Label for="last_name">Last Name</Label>
        <Input
          id="last_name"
          v-model="form.last_name"
          required
          autocomplete="family-name"
          placeholder="Doe"
        />
      </div>
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
        autocomplete="new-password"
        placeholder="At least 8 characters"
      />
    </div>

    <div class="space-y-2">
      <Label for="confirm_password">Confirm Password</Label>
      <Input
        id="confirm_password"
        v-model="form.confirm_password"
        type="password"
        required
        autocomplete="new-password"
        placeholder="Confirm your password"
      />
    </div>

    <Button type="submit" class="w-full" :disabled="loading">
      {{ loading ? 'Creating account...' : 'Create Account' }}
    </Button>
  </form>
</template>
