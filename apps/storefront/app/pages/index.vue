<script setup lang="ts">
import { ArrowRight, ArrowUpRight, Play, Sparkles, Star } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Badge } from '~/components/ui/badge'

useSeoMeta({
  title: 'Ilyo Fragrance Boutique - Luxury Fragrances',
  description: 'Discover luxury fragrances at Ilyo Fragrance Boutique. Curating the finest scents from around the world.',
})

const { fetchProducts, products, loading } = useProducts()
const { fetchRegions } = useRegions()

const email = ref('')
const isSubscribed = ref(false)

async function handleSubscribe() {
  if (!email.value) return
  isSubscribed.value = true
  email.value = ''
}

const fragranceFamilies = [
  { name: 'Floral', accent: 'bg-pink-500', description: 'Rose, Jasmine, Lily', count: 24 },
  { name: 'Woody', accent: 'bg-amber-700', description: 'Sandalwood, Cedar, Oud', count: 18 },
  { name: 'Oriental', accent: 'bg-red-600', description: 'Amber, Vanilla, Spice', count: 31 },
  { name: 'Fresh', accent: 'bg-cyan-500', description: 'Aquatic, Green, Clean', count: 15 },
  { name: 'Citrus', accent: 'bg-yellow-500', description: 'Bergamot, Lemon, Orange', count: 12 },
  { name: 'Aromatic', accent: 'bg-emerald-600', description: 'Lavender, Herbs, Fougere', count: 9 },
]

const features = [
  { title: 'Authentic Only', description: 'Every bottle verified genuine' },
  { title: 'Free Shipping', description: 'Orders over $150' },
  { title: 'Expert Curation', description: 'Hand-selected by perfumers' },
]

onMounted(async () => {
  await fetchRegions()
  await fetchProducts()
})
</script>

<template>
  <div class="overflow-x-hidden">
    <!-- Hero Section - Asymmetric Editorial Layout -->
    <section class="relative min-h-screen bg-gradient-to-br from-stone-100 via-champagne-50 to-amber-50/30">
      <!-- Decorative Elements -->
      <div class="absolute top-20 left-10 w-72 h-72 bg-gold-400/20 rounded-full blur-3xl" />
      <div class="absolute bottom-20 right-20 w-96 h-96 bg-champagne-300/30 rounded-full blur-3xl" />

      <div class="container mx-auto px-4 pt-8 pb-20">
        <!-- Top Bar -->
        <div class="flex items-center justify-between mb-16">
          <div class="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles class="w-4 h-4 text-gold-500" />
            <span>New Collection Available</span>
          </div>
          <div class="hidden md:flex items-center gap-6 text-sm">
            <span v-for="feature in features" :key="feature.title" class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-gold-500" />
              {{ feature.title }}
            </span>
          </div>
        </div>

        <!-- Main Hero Grid -->
        <div class="grid lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-[70vh]">
          <!-- Left Column - Typography -->
          <div class="lg:col-span-5 space-y-8">
            <div class="space-y-4">
              <Badge variant="outline" class="text-gold-600 border-gold-300 bg-gold-50 px-4 py-1.5">
                Est. 2024 · Paris
              </Badge>
              <h1 class="text-6xl md:text-7xl xl:text-8xl font-serif leading-[0.9] tracking-tight">
                <span class="block">Scent</span>
                <span class="block text-gold-600">Is</span>
                <span class="block">Memory</span>
              </h1>
            </div>
            <p class="text-lg text-muted-foreground max-w-sm leading-relaxed">
              We don't just sell perfumes. We curate experiences, bottle emotions, and preserve the moments that define you.
            </p>
            <div class="flex flex-wrap gap-4">
              <Button as-child size="lg" class="group bg-primary hover:bg-primary/90 px-8">
                <NuxtLink to="/products" class="flex items-center">
                  Explore Collection
                  <ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </NuxtLink>
              </Button>
              <Button as-child variant="ghost" size="lg" class="group">
                <NuxtLink to="/about" class="flex items-center gap-2">
                  <span class="w-10 h-10 rounded-full border border-current flex items-center justify-center">
                    <Play class="w-4 h-4 ml-0.5" />
                  </span>
                  Watch Film
                </NuxtLink>
              </Button>
            </div>
          </div>

          <!-- Center Column - Featured Image -->
          <div class="lg:col-span-4 relative">
            <div class="relative aspect-[3/4] bg-gradient-to-b from-champagne-100 to-champagne-200 rounded-[2rem] overflow-hidden shadow-2xl shadow-champagne-200/50">
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center text-champagne-400">
                  <div class="w-32 h-48 mx-auto border-2 border-dashed border-champagne-300 rounded-lg flex items-center justify-center">
                    <span class="text-sm">Hero Image</span>
                  </div>
                </div>
              </div>
              <!-- Floating Badge -->
              <div class="absolute -right-4 top-1/4 bg-white rounded-2xl shadow-xl p-4 transform rotate-3">
                <div class="flex items-center gap-2">
                  <Star class="w-5 h-5 fill-gold-400 text-gold-400" />
                  <span class="font-medium">4.9</span>
                </div>
                <span class="text-xs text-muted-foreground">2,400+ Reviews</span>
              </div>
            </div>
          </div>

          <!-- Right Column - Stats & Quick Links -->
          <div class="lg:col-span-3 space-y-8">
            <!-- Stats -->
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-white/80 backdrop-blur rounded-2xl p-5 text-center">
                <span class="block text-3xl font-serif text-gold-600">150+</span>
                <span class="text-sm text-muted-foreground">Fragrances</span>
              </div>
              <div class="bg-white/80 backdrop-blur rounded-2xl p-5 text-center">
                <span class="block text-3xl font-serif text-gold-600">40+</span>
                <span class="text-sm text-muted-foreground">Brands</span>
              </div>
            </div>
            <!-- Quick Family Links -->
            <div class="bg-white/60 backdrop-blur rounded-2xl p-5">
              <span class="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">Popular Families</span>
              <div class="space-y-2">
                <NuxtLink
                  v-for="family in fragranceFamilies.slice(0, 3)"
                  :key="family.name"
                  :to="`/products?family=${family.name}`"
                  class="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-white/80 transition-colors group"
                >
                  <span :class="[family.accent, 'w-2 h-8 rounded-full']" />
                  <span class="flex-1 font-medium">{{ family.name }}</span>
                  <ArrowUpRight class="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Marquee Banner -->
    <div class="bg-primary text-primary-foreground py-3 overflow-hidden">
      <div class="flex animate-marquee whitespace-nowrap">
        <span v-for="i in 4" :key="i" class="mx-8 flex items-center gap-8 text-sm tracking-wider">
          <span>FREE SHIPPING OVER $150</span>
          <span class="text-gold-400">✦</span>
          <span>AUTHENTIC GUARANTEED</span>
          <span class="text-gold-400">✦</span>
          <span>EXPERT CURATION</span>
          <span class="text-gold-400">✦</span>
          <span>LUXURY PACKAGING</span>
          <span class="text-gold-400">✦</span>
        </span>
      </div>
    </div>

    <!-- Featured Products - Bento Grid -->
    <section class="py-24 bg-white">
      <div class="container mx-auto px-4">
        <!-- Section Header with Offset -->
        <div class="grid lg:grid-cols-12 gap-8 mb-16">
          <div class="lg:col-span-8">
            <span class="text-gold-600 text-sm font-medium tracking-wider uppercase mb-4 block">Featured Selection</span>
            <h2 class="text-4xl md:text-5xl font-serif">
              This Season's<br>
              <span class="text-muted-foreground">Most Coveted</span>
            </h2>
          </div>
          <div class="lg:col-span-4 flex items-end justify-start lg:justify-end">
            <Button as-child variant="outline" size="lg" class="group">
              <NuxtLink to="/products" class="flex items-center">
                View All
                <ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </NuxtLink>
            </Button>
          </div>
        </div>

        <!-- Product Grid -->
        <ProductGrid
          :products="products.slice(0, 4)"
          :loading="loading"
        />
      </div>
    </section>

    <!-- Fragrance Families - Editorial Grid -->
    <section class="py-24 bg-stone-50">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-16 items-start">
          <!-- Left - Sticky Header -->
          <div class="lg:sticky lg:top-32">
            <span class="text-gold-600 text-sm font-medium tracking-wider uppercase mb-4 block">Explore by Scent</span>
            <h2 class="text-4xl md:text-5xl font-serif mb-6">
              Find Your<br>
              <span class="text-gold-600">Signature Family</span>
            </h2>
            <p class="text-muted-foreground leading-relaxed max-w-md mb-8">
              Every fragrance tells a story. Discover the olfactory family that speaks to your soul and explore curated selections within each category.
            </p>
            <div class="hidden lg:block">
              <div class="aspect-square max-w-sm bg-gradient-to-br from-champagne-100 to-champagne-200 rounded-3xl flex items-center justify-center">
                <span class="text-champagne-400">Featured Image</span>
              </div>
            </div>
          </div>

          <!-- Right - Staggered Cards -->
          <div class="space-y-4">
            <NuxtLink
              v-for="(family, index) in fragranceFamilies"
              :key="family.name"
              :to="`/products?family=${family.name}`"
              class="group block"
              :class="index % 2 === 1 ? 'lg:translate-x-8' : ''"
            >
              <div class="bg-white rounded-2xl p-6 flex items-center gap-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-transparent hover:border-gold-200">
                <div :class="[family.accent, 'w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0']">
                  <span class="text-white text-2xl font-serif">{{ family.name.charAt(0) }}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between mb-1">
                    <h3 class="text-xl font-serif group-hover:text-gold-600 transition-colors">{{ family.name }}</h3>
                    <Badge variant="secondary" class="text-xs">{{ family.count }} scents</Badge>
                  </div>
                  <p class="text-muted-foreground text-sm truncate">{{ family.description }}</p>
                </div>
                <ArrowUpRight class="w-5 h-5 text-muted-foreground group-hover:text-gold-600 transition-colors flex-shrink-0" />
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Brand Story - Split Screen -->
    <section class="min-h-screen grid lg:grid-cols-2">
      <!-- Left - Image -->
      <div class="relative bg-gradient-to-br from-stone-200 to-champagne-200 flex items-center justify-center min-h-[50vh] lg:min-h-full">
        <div class="absolute inset-0 bg-[url('/images/noise.png')] opacity-30 mix-blend-overlay" />
        <div class="text-center text-stone-400 p-8">
          <div class="w-48 h-64 mx-auto border-2 border-dashed border-stone-300 rounded-lg flex items-center justify-center mb-4">
            <span>Brand Image</span>
          </div>
        </div>
        <!-- Overlay Quote -->
        <div class="absolute bottom-8 left-8 right-8 lg:bottom-16 lg:left-16 lg:right-16">
          <blockquote class="text-2xl md:text-3xl font-serif text-stone-700 leading-snug">
            "Perfume is the most intense form of memory."
          </blockquote>
          <cite class="mt-4 block text-sm text-stone-500 not-italic">— Jean Paul Guerlain</cite>
        </div>
      </div>

      <!-- Right - Content -->
      <div class="bg-primary text-primary-foreground flex items-center">
        <div class="p-8 md:p-16 lg:p-24 space-y-8">
          <span class="text-gold-400 text-sm font-medium tracking-wider uppercase">Our Philosophy</span>
          <h2 class="text-4xl md:text-5xl font-serif">
            Crafted for the<br>
            <span class="text-gold-400">Connoisseur</span>
          </h2>
          <div class="space-y-4 text-primary-foreground/80 leading-relaxed">
            <p>
              At Ilyo, we believe fragrance is more than a scent—it's an expression of identity,
              a memory captured in a bottle, a journey of the senses.
            </p>
            <p>
              We curate only the finest perfumes from master perfumers around the world,
              each chosen for its exceptional quality, unique character, and ability to
              transform the everyday into the extraordinary.
            </p>
          </div>
          <div class="flex flex-wrap gap-8 pt-4">
            <div>
              <span class="block text-4xl font-serif text-gold-400">12+</span>
              <span class="text-sm text-primary-foreground/60">Years Experience</span>
            </div>
            <div>
              <span class="block text-4xl font-serif text-gold-400">40+</span>
              <span class="text-sm text-primary-foreground/60">Partner Houses</span>
            </div>
            <div>
              <span class="block text-4xl font-serif text-gold-400">10K+</span>
              <span class="text-sm text-primary-foreground/60">Happy Clients</span>
            </div>
          </div>
          <Button as-child variant="outline" class="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
            <NuxtLink to="/about" class="flex items-center gap-2">
              Our Story
              <ArrowRight class="w-4 h-4" />
            </NuxtLink>
          </Button>
        </div>
      </div>
    </section>

    <!-- Testimonials - Horizontal Scroll -->
    <section class="py-24 bg-champagne-50">
      <div class="container mx-auto px-4 mb-12">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span class="text-gold-600 text-sm font-medium tracking-wider uppercase mb-4 block">Testimonials</span>
            <h2 class="text-4xl md:text-5xl font-serif">
              What Our<br>
              <span class="text-muted-foreground">Clients Say</span>
            </h2>
          </div>
          <div class="flex gap-2">
            <Star v-for="i in 5" :key="i" class="w-6 h-6 fill-gold-400 text-gold-400" />
            <span class="ml-2 text-muted-foreground">4.9 avg rating</span>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto pb-8 scrollbar-hide">
        <div class="flex gap-6 px-4 w-max">
          <div
            v-for="i in 4"
            :key="i"
            class="w-[360px] bg-white rounded-2xl p-8 shadow-sm border border-champagne-100"
          >
            <div class="flex gap-1 mb-4">
              <Star v-for="j in 5" :key="j" class="w-4 h-4 fill-gold-400 text-gold-400" />
            </div>
            <p class="text-muted-foreground mb-6 leading-relaxed">
              "The curation at Ilyo is exceptional. Every fragrance feels personally selected, and the service is unparalleled. My go-to destination for luxury scents."
            </p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-champagne-200" />
              <div>
                <span class="block font-medium">Sarah M.</span>
                <span class="text-sm text-muted-foreground">Verified Buyer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter - Bold Full Width -->
    <section class="relative py-32 overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 bg-gradient-to-br from-gold-500 via-gold-600 to-amber-600" />
      <div class="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay" />

      <!-- Decorative Circles -->
      <div class="absolute -top-24 -right-24 w-96 h-96 border border-white/10 rounded-full" />
      <div class="absolute -bottom-32 -left-32 w-[500px] h-[500px] border border-white/10 rounded-full" />

      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-2xl mx-auto text-center">
          <span class="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 text-sm text-white mb-8">
            <Sparkles class="w-4 h-4" />
            Join 15,000+ fragrance lovers
          </span>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">
            Enter the<br>Inner Circle
          </h2>
          <p class="text-white/80 text-lg mb-10 max-w-md mx-auto">
            Exclusive access to new arrivals, special offers, and the world of luxury fragrance.
          </p>

          <form
            v-if="!isSubscribed"
            class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            @submit.prevent="handleSubscribe"
          >
            <Input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              required
              class="bg-white/10 backdrop-blur border-white/20 text-white placeholder:text-white/50 h-14 px-6"
            />
            <Button type="submit" class="bg-white text-gold-600 hover:bg-white/90 h-14 px-8 font-medium">
              Subscribe
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
          </form>
          <div v-else class="bg-white/10 backdrop-blur rounded-2xl p-6 max-w-md mx-auto">
            <Sparkles class="w-8 h-8 text-white mx-auto mb-3" />
            <p class="text-white font-medium">Welcome to the inner circle!</p>
            <p class="text-white/70 text-sm">Check your inbox for a special surprise.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Instagram Feed Placeholder -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 text-center mb-8">
        <span class="text-muted-foreground text-sm">Follow us @ilyofragrance</span>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1">
        <div v-for="i in 6" :key="i" class="aspect-square bg-stone-100 hover:opacity-75 transition-opacity cursor-pointer">
          <div class="w-full h-full flex items-center justify-center text-stone-300 text-xs">
            IG {{ i }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
