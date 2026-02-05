<script setup lang="ts">
import { Instagram, Facebook, Twitter } from 'lucide-vue-next'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'

const email = ref('')
const isSubscribed = ref(false)

async function handleSubscribe() {
  if (!email.value) return
  isSubscribed.value = true
  email.value = ''
}

const shopLinks = [
  { name: 'All Fragrances', href: '/products' },
  { name: 'New Arrivals', href: '/products?sort=newest' },
  { name: 'Bestsellers', href: '/products?sort=popular' },
  { name: 'Gift Sets', href: '/collections/gift-sets' },
]

const helpLinks = [
  { name: 'Contact Us', href: '/contact' },
  { name: 'FAQs', href: '/faq' },
  { name: 'Shipping', href: '/shipping' },
  { name: 'Returns', href: '/returns' },
]

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Cookie Policy', href: '/cookies' },
]

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
]
</script>

<template>
  <footer class="bg-secondary/50 mt-20">
    <div class="container mx-auto px-4 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        <!-- Brand Column -->
        <div class="lg:col-span-2">
          <h2 class="text-2xl font-serif font-medium tracking-tight mb-4">ILYO</h2>
          <p class="text-muted-foreground mb-6 max-w-sm">
            Curating the finest fragrances from around the world.
            Discover your signature scent.
          </p>
          <div class="flex gap-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              class="text-muted-foreground hover:text-gold-600 transition-colors"
              :aria-label="social.name"
            >
              <component :is="social.icon" class="h-5 w-5" />
            </a>
          </div>
        </div>

        <!-- Shop Column -->
        <div>
          <h3 class="font-medium mb-4">Shop</h3>
          <nav class="flex flex-col gap-3">
            <NuxtLink
              v-for="link in shopLinks"
              :key="link.href"
              :to="link.href"
              class="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {{ link.name }}
            </NuxtLink>
          </nav>
        </div>

        <!-- Help Column -->
        <div>
          <h3 class="font-medium mb-4">Help</h3>
          <nav class="flex flex-col gap-3">
            <NuxtLink
              v-for="link in helpLinks"
              :key="link.href"
              :to="link.href"
              class="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {{ link.name }}
            </NuxtLink>
          </nav>
        </div>

        <!-- Newsletter Column -->
        <div class="md:col-span-2 lg:col-span-1">
          <h3 class="font-medium mb-4">Newsletter</h3>
          <p class="text-sm text-muted-foreground mb-4">
            Subscribe for exclusive offers and new arrivals.
          </p>
          <form v-if="!isSubscribed" class="flex flex-col gap-3" @submit.prevent="handleSubscribe">
            <Input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              required
            />
            <Button type="submit" class="w-full">
              Subscribe
            </Button>
          </form>
          <p v-else class="text-sm text-gold-600">
            Thank you for subscribing!
          </p>
        </div>
      </div>

      <Separator class="my-12" />

      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-sm text-muted-foreground">
          &copy; {{ new Date().getFullYear() }} Ilyo Fragrance Boutique. All rights reserved.
        </p>
        <nav class="flex gap-6">
          <NuxtLink
            v-for="link in legalLinks"
            :key="link.href"
            :to="link.href"
            class="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {{ link.name }}
          </NuxtLink>
        </nav>
      </div>
    </div>
  </footer>
</template>
