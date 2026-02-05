export default defineNuxtRouteMiddleware(async () => {
  const { isAuthenticated, getCurrentCustomer } = useAuth()

  if (!isAuthenticated.value) {
    await getCurrentCustomer()
  }

  if (isAuthenticated.value) {
    return navigateTo('/account')
  }
})
