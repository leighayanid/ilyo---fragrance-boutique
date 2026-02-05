<script setup lang="ts">
definePageMeta({
  title: 'About Us'
})
</script>

<template>
  <div class="min-h-screen pt-24 pb-16">
    <div class="container mx-auto px-4 max-w-4xl">
      <header class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-serif font-medium mb-4">About Ilyo</h1>
        <p class="text-lg text-muted-foreground">
          Curating the finest fragrances from around the world
        </p>
      </header>

      <div class="prose prose-lg mx-auto">
        <section class="mb-16">
          <h2 class="text-2xl font-serif font-medium mb-6">Our Story</h2>
          <p class="text-muted-foreground leading-relaxed mb-4">
            Ilyo was born from a passion for the art of perfumery. We believe that fragrance is more than
            just a scent—it's an expression of identity, a memory captured in a bottle, and a journey
            through time and place.
          </p>
          <p class="text-muted-foreground leading-relaxed">
            Our curated collection brings together the most exceptional fragrances from renowned
            perfume houses and emerging artisan creators. Each scent in our boutique has been
            carefully selected for its quality, complexity, and ability to tell a unique story.
          </p>
        </section>

        <section class="mb-16">
          <h2 class="text-2xl font-serif font-medium mb-6">Our Philosophy</h2>
          <div class="grid gap-8 md:grid-cols-3">
            <div class="text-center">
              <div class="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl">✨</span>
              </div>
              <h3 class="font-medium mb-2">Quality</h3>
              <p class="text-sm text-muted-foreground">
                Only the finest ingredients and craftsmanship
              </p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl">🌿</span>
              </div>
              <h3 class="font-medium mb-2">Sustainability</h3>
              <p class="text-sm text-muted-foreground">
                Committed to ethical and sustainable practices
              </p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl">💫</span>
              </div>
              <h3 class="font-medium mb-2">Discovery</h3>
              <p class="text-sm text-muted-foreground">
                Helping you find your signature scent
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-serif font-medium mb-6">Visit Us</h2>
          <p class="text-muted-foreground leading-relaxed">
            Have questions or want to experience our fragrances in person?
            <NuxtLink to="/contact" class="text-gold-600 hover:underline">Contact us</NuxtLink>
            to schedule a private consultation.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
