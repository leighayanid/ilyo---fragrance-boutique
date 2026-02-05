<script setup lang="ts">
interface Props {
  topNotes?: string[]
  middleNotes?: string[]
  baseNotes?: string[]
}

const props = defineProps<Props>()

const hasNotes = computed(() =>
  props.topNotes?.length || props.middleNotes?.length || props.baseNotes?.length
)
</script>

<template>
  <div v-if="hasNotes" class="space-y-4">
    <h3 class="text-sm font-medium">Fragrance Notes</h3>

    <div class="relative">
      <!-- Pyramid visualization -->
      <div class="space-y-3">
        <!-- Top Notes -->
        <div v-if="topNotes?.length" class="animate-fade-up" style="animation-delay: 0ms">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center">
              <span class="text-xs font-medium text-gold-700">T</span>
            </div>
            <div>
              <p class="text-xs text-muted-foreground uppercase tracking-wider">Top Notes</p>
              <p class="text-sm">{{ topNotes.join(', ') }}</p>
            </div>
          </div>
        </div>

        <!-- Middle Notes -->
        <div v-if="middleNotes?.length" class="animate-fade-up" style="animation-delay: 100ms">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-8 h-8 rounded-full bg-champagne-100 flex items-center justify-center">
              <span class="text-xs font-medium text-champagne-700">M</span>
            </div>
            <div>
              <p class="text-xs text-muted-foreground uppercase tracking-wider">Heart Notes</p>
              <p class="text-sm">{{ middleNotes.join(', ') }}</p>
            </div>
          </div>
        </div>

        <!-- Base Notes -->
        <div v-if="baseNotes?.length" class="animate-fade-up" style="animation-delay: 200ms">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <span class="text-xs font-medium">B</span>
            </div>
            <div>
              <p class="text-xs text-muted-foreground uppercase tracking-wider">Base Notes</p>
              <p class="text-sm">{{ baseNotes.join(', ') }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Connecting line -->
      <div class="absolute left-4 top-8 bottom-8 w-px bg-border -z-10" />
    </div>
  </div>
</template>
