<script lang="ts" setup>
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  }>(),
  {
    variant: 'primary',
  },
)
</script>
<template>
  <button
    class="flex items-center justify-center w-full px-4 py-2 font-semibold transition-colors rounded-md"
    :class="{
      'bg-slate-900 hover:bg-slate-900/80 text-white shadow-sm': variant === 'primary',
      'text-slate-900 bg-slate-200 hover:bg-slate-300 shadow-sm': variant === 'secondary',
      'text-slate-900 border hover:bg-slate-100': variant === 'outline',
      'text-slate-900 bg-none hover:bg-slate-100 hover:shadow-sm shadow-none': variant === 'ghost',
    }"
  >
    <slot />
  </button>
</template>
