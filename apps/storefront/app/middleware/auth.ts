export default defineNuxtRouteMiddleware(async (to) => {
  const { isAuthenticated, getCurrentCustomer } = useAuth()

  if (!isAuthenticated.value) {
    await getCurrentCustomer()
  }

  if (!isAuthenticated.value) {
    return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
})
