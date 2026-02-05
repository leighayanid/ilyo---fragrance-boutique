<script setup lang="ts">
import { User, Package, Settings, LogOut } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

const { customer, logout, loading } = useAuth()

const customerName = computed(() => {
  if (!customer.value) return ''
  return `${customer.value.first_name || ''} ${customer.value.last_name || ''}`.trim() || customer.value.email
})

async function handleLogout() {
  await logout()
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon" aria-label="Account">
        <User class="h-5 w-5" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-56">
      <DropdownMenuLabel>
        <div class="flex flex-col space-y-1">
          <p class="text-sm font-medium leading-none">{{ customerName }}</p>
          <p class="text-xs leading-none text-muted-foreground">{{ customer?.email }}</p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem as-child>
        <NuxtLink to="/account" class="flex items-center cursor-pointer">
          <User class="mr-2 h-4 w-4" />
          <span>Account</span>
        </NuxtLink>
      </DropdownMenuItem>
      <DropdownMenuItem as-child>
        <NuxtLink to="/account/orders" class="flex items-center cursor-pointer">
          <Package class="mr-2 h-4 w-4" />
          <span>Orders</span>
        </NuxtLink>
      </DropdownMenuItem>
      <DropdownMenuItem as-child>
        <NuxtLink to="/account/settings" class="flex items-center cursor-pointer">
          <Settings class="mr-2 h-4 w-4" />
          <span>Settings</span>
        </NuxtLink>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        class="cursor-pointer text-red-600 focus:text-red-600"
        :disabled="loading"
        @click="handleLogout"
      >
        <LogOut class="mr-2 h-4 w-4" />
        <span>{{ loading ? 'Signing out...' : 'Sign Out' }}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
