<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-secondary/30">
    <header class="bg-background border-b">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-center h-16">
          <NuxtLink to="/">
            <h1 class="text-2xl font-serif font-medium tracking-tight">ILYO</h1>
          </NuxtLink>
        </div>
      </div>
    </header>
    <main class="py-8">
      <slot />
    </main>
  </div>
</template>
