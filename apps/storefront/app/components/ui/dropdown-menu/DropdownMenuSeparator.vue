<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DropdownMenuSeparator, type DropdownMenuSeparatorProps } from 'radix-vue'
import { cn } from '~/lib/utils'

interface DropdownMenuSeparatorPropsExtended extends DropdownMenuSeparatorProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<DropdownMenuSeparatorPropsExtended>()
</script>

<template>
  <DropdownMenuSeparator
    v-bind="props"
    :class="cn('-mx-1 my-1 h-px bg-muted', props.class)"
  />
</template>
