<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { AccordionContent, type AccordionContentProps } from 'radix-vue'
import { cn } from '~/lib/utils'

const props = defineProps<AccordionContentProps & { class?: HTMLAttributes['class'] }>()
</script>

<template>
  <AccordionContent
    v-bind="props"
    :class="cn(
      'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      props.class,
    )"
  >
    <div class="pb-4 pt-0">
      <slot />
    </div>
  </AccordionContent>
</template>
