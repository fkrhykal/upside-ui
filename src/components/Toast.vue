<script setup lang="ts">
import { toastType, type Toast } from '@/hooks/useToast'
import { AlertOctagonIcon } from 'lucide-vue-next'
import { watch } from 'vue'

const props = withDefaults(defineProps<{ toast: Toast; duration?: number }>(), { duration: 1_500 })

watch(props.toast, (_, current) => {
  if (current.showed()) {
    setTimeout(() => {
      props.toast.hide()
    }, props.duration)
  }
})
</script>

<template>
  <div
    :class="{
      'translate-y-[150%]': !toast.showed(),
      'translate-y-0': toast.showed(),
    }"
    @click="toast.hide()"
    class="fixed flex justify-between border rounded-md shadow min-w-[32rem] bottom-2 right-4 bg-white overflow-hidden transition-all duration-300 place-items-center cursor-pointer"
  >
    <div class="flex h-full gap-x-4">
      <div
        class="grid min-w-[4rem] place-items-center"
        :class="{
          'bg-red-500/90 text-white': toast.type === toastType.ERROR,
          'bg-yellow-500/90': toast.type === toastType.WARNING,
          'bg-blue-500/90': toast.type === toastType.INFO,
        }"
      >
        <AlertOctagonIcon class="size-6" />
      </div>
      <div v-if="toast.payload" class="max-w-[16rem] py-4 grid gap-y-1">
        <p class="font-semibold">
          {{ toast.payload.title }}
        </p>
        <p v-if="toast.payload.body" class="text-sm text-slate-700">{{ toast.payload.body }}</p>
      </div>
    </div>
  </div>
</template>
