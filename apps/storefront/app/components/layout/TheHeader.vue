<script setup lang="ts">
import { Search, User, ShoppingBag, Menu } from 'lucide-vue-next'
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet'
import { Button } from '~/components/ui/button'

const { cartCount } = useCart()
const { isAuthenticated, getCurrentCustomer } = useAuth()

const searchOpen = ref(false)
const isScrolled = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  getCurrentCustomer()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const navLinks = [
  { name: 'Shop', href: '/products' },
  { name: 'Collections', href: '/collections' },
  { name: 'About', href: '/about' },
]
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-background/95 backdrop-blur-md border-b' : 'bg-transparent'
    ]"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Mobile Menu -->
        <div class="flex items-center lg:hidden">
          <Sheet>
            <SheetTrigger as-child>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu class="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" class="w-80">
              <nav class="flex flex-col gap-6 mt-8">
                <NuxtLink
                  v-for="link in navLinks"
                  :key="link.href"
                  :to="link.href"
                  class="text-lg font-serif hover:text-gold-600 transition-colors"
                >
                  {{ link.name }}
                </NuxtLink>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <!-- Desktop Navigation (Left) -->
        <nav class="hidden lg:flex items-center gap-8">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.href"
            :to="link.href"
            class="text-sm uppercase tracking-wider hover:text-gold-600 transition-colors"
          >
            {{ link.name }}
          </NuxtLink>
        </nav>

        <!-- Logo (Center) -->
        <NuxtLink to="/" class="absolute left-1/2 -translate-x-1/2">
          <h1 class="text-2xl md:text-3xl font-serif font-medium tracking-tight">
            ILYO
          </h1>
        </NuxtLink>

        <!-- Right Actions -->
        <div class="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Search" @click="searchOpen = true">
            <Search class="h-5 w-5" />
          </Button>
          <AccountDropdown v-if="isAuthenticated" class="hidden sm:flex" />
          <Button v-else variant="ghost" size="icon" aria-label="Account" class="hidden sm:flex" as-child>
            <NuxtLink to="/login">
              <User class="h-5 w-5" />
            </NuxtLink>
          </Button>
          <Sheet>
            <SheetTrigger as-child>
              <Button variant="ghost" size="icon" aria-label="Cart" class="relative">
                <ShoppingBag class="h-5 w-5" />
                <span
                  v-if="cartCount > 0"
                  class="absolute -top-1 -right-1 bg-gold-600 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {{ cartCount }}
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" class="w-full sm:max-w-md">
              <CartSheet />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>

    <!-- Search Dialog -->
    <SearchDialog v-model:open="searchOpen" />
  </header>
</template>
