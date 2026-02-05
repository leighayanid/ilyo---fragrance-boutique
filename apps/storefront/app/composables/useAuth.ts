import type { HttpTypes } from '@medusajs/types'

interface AuthState {
  customer: HttpTypes.StoreCustomer | null
  loading: boolean
  error: Error | null
}

const state = reactive<AuthState>({
  customer: null,
  loading: false,
  error: null,
})

export function useAuth() {
  const medusa = useMedusa()
  const router = useRouter()

  const authToken = useCookie<string | null>('auth_token', {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
  })

  const isAuthenticated = computed(() => !!state.customer)

  async function register(data: {
    email: string
    password: string
    first_name: string
    last_name: string
  }) {
    state.loading = true
    state.error = null

    try {
      const token = await medusa.auth.register('customer', 'emailpass', {
        email: data.email,
        password: data.password,
      })

      if (typeof token === 'string') {
        authToken.value = token
      }

      await medusa.store.customer.update({
        first_name: data.first_name,
        last_name: data.last_name,
      })

      await getCurrentCustomer()
    } catch (err) {
      state.error = err as Error
      console.error('Failed to register:', err)
      throw err
    } finally {
      state.loading = false
    }
  }

  async function login(email: string, password: string) {
    state.loading = true
    state.error = null

    try {
      const token = await medusa.auth.login('customer', 'emailpass', {
        email,
        password,
      })

      if (typeof token === 'string') {
        authToken.value = token
      }

      await getCurrentCustomer()
    } catch (err) {
      state.error = err as Error
      console.error('Failed to login:', err)
      throw err
    } finally {
      state.loading = false
    }
  }

  async function logout() {
    state.loading = true
    state.error = null

    try {
      await medusa.auth.logout()
      state.customer = null
      authToken.value = null
      router.push('/')
    } catch (err) {
      state.error = err as Error
      console.error('Failed to logout:', err)
      state.customer = null
      authToken.value = null
    } finally {
      state.loading = false
    }
  }

  async function getCurrentCustomer() {
    if (!authToken.value) {
      state.customer = null
      return null
    }

    state.loading = true
    state.error = null

    try {
      const { customer } = await medusa.store.customer.retrieve()
      state.customer = customer
      return customer
    } catch (err) {
      state.error = err as Error
      state.customer = null
      authToken.value = null
      console.error('Failed to get customer:', err)
      return null
    } finally {
      state.loading = false
    }
  }

  async function updateCustomer(data: {
    first_name?: string
    last_name?: string
    phone?: string
  }) {
    if (!state.customer) return

    state.loading = true
    state.error = null

    try {
      const { customer } = await medusa.store.customer.update(data)
      state.customer = customer
      return customer
    } catch (err) {
      state.error = err as Error
      console.error('Failed to update customer:', err)
      throw err
    } finally {
      state.loading = false
    }
  }

  async function getOrders() {
    if (!state.customer) return []

    try {
      const { orders } = await medusa.store.order.list()
      return orders
    } catch (err) {
      console.error('Failed to get orders:', err)
      return []
    }
  }

  return {
    customer: computed(() => state.customer),
    loading: computed(() => state.loading),
    error: computed(() => state.error),
    isAuthenticated,
    register,
    login,
    logout,
    getCurrentCustomer,
    updateCustomer,
    getOrders,
  }
}
