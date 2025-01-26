<script setup lang="ts">
import { CircleAlertIcon } from 'lucide-vue-next'

defineProps<{ message: string }>()
</script>

<template>
  <div class="flex p-2 text-red-600 bg-red-100 rounded-md w-fit place-items-center gap-x-2">
    <div class="mt-0.5 place-self-start">
      <CircleAlertIcon class="size-4" />
    </div>
    <p class="text-sm">{{ message }}</p>
  </div>
</template>
