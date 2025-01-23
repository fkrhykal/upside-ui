<script lang="ts" setup>
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary'
  }>(),
  {
    variant: 'primary',
  },
)
</script>
<template>
  <button
    class="w-full px-4 py-2 font-semibold transition-colors rounded-md shadow-sm"
    :class="{
      'bg-slate-900 hover:bg-slate-900/80 text-white': variant === 'primary',
      'text-slate-900 bg-slate-200 hover:bg-slate-300': variant === 'secondary',
    }"
  >
    <slot />
  </button>
</template>
