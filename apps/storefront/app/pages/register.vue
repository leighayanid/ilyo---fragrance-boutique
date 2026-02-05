<script setup lang="ts">
definePageMeta({
  middleware: ['guest'],
})

const route = useRoute()
const router = useRouter()

const redirect = computed(() => {
  const r = route.query.redirect
  return typeof r === 'string' ? r : '/account'
})

function handleSuccess() {
  router.push(redirect.value)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h1 class="text-3xl font-serif font-medium">Create Account</h1>
        <p class="mt-2 text-muted-foreground">
          Join us to discover your perfect fragrance
        </p>
      </div>

      <div class="bg-card border rounded-lg p-6 shadow-sm">
        <RegisterForm @success="handleSuccess" />
      </div>

      <p class="text-center text-sm text-muted-foreground">
        Already have an account?
        <NuxtLink
          :to="redirect !== '/account' ? `/login?redirect=${encodeURIComponent(redirect)}` : '/login'"
          class="text-gold-600 hover:text-gold-700 font-medium"
        >
          Sign in
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
