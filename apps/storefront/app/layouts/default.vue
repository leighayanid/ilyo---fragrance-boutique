<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <TheHeader />
    <main class="flex-1 pt-16 md:pt-20">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>
