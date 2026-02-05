<script setup lang="ts">
import { AspectRatio } from '~/components/ui/aspect-ratio'
import { Skeleton } from '~/components/ui/skeleton'
</script>

<template>
  <div>
    <div class="overflow-hidden mb-4">
      <AspectRatio :ratio="3 / 4">
        <Skeleton class="w-full h-full" />
      </AspectRatio>
    </div>
    <div class="space-y-2">
      <Skeleton class="h-5 w-3/4" />
      <Skeleton class="h-4 w-1/2" />
      <Skeleton class="h-4 w-1/4" />
    </div>
  </div>
</template>
