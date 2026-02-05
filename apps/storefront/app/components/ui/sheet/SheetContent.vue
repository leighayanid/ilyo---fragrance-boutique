<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DialogClose, DialogContent, type DialogContentEmits, type DialogContentProps, useForwardPropsEmits } from 'radix-vue'
import { X } from 'lucide-vue-next'
import { type SheetVariants, sheetVariants } from '.'
import SheetOverlay from './SheetOverlay.vue'
import SheetPortal from './SheetPortal.vue'
import { cn } from '~/lib/utils'

interface SheetContentProps extends DialogContentProps {
  class?: HTMLAttributes['class']
  side?: SheetVariants['side']
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<SheetContentProps>()

const emits = defineEmits<DialogContentEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <SheetPortal>
    <SheetOverlay />
    <DialogContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="cn(sheetVariants({ side }), props.class)"
    >
      <slot />

      <DialogClose
        class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
      >
        <X class="w-4 h-4" />
      </DialogClose>
    </DialogContent>
  </SheetPortal>
</template>
