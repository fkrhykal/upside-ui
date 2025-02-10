<script setup lang="ts">
import { toastType, type Toast } from '@/hooks/useToast'
import { AlertCircleIcon, CheckIcon } from 'lucide-vue-next'
import { watch } from 'vue'

const props = withDefaults(defineProps<{ toast: Toast; duration?: number }>(), { duration: 5000 })

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
    @click="toast.hide()"
    class="bg-white fixed min-h-[6rem] flex z-50 justify-between border rounded-md shadow min-w-[32rem] bottom-4 right-4 overflow-hidden transition-all duration-300 place-items-center cursor-pointer"
    :class="{
      'translate-y-[150%]': !toast.showed(),
      'translate-y-0': toast.showed(),
    }"
  >
    <div class="flex h-full gap-x-3">
      <div class="grid ml-6 place-items-center">
        <div
          class="p-2 rounded-md"
          :class="{
            'bg-red-200/90 ': toast.type === toastType.ERROR,
            'bg-yellow-200/90': toast.type === toastType.WARNING,
            'bg-blue-200/90': toast.type === toastType.INFO,
            'bg-green-200/90 text-white': toast.type === toastType.SUCCESS,
          }"
        >
          <CheckIcon class="text-green-700/90 size-5" v-if="toast.type === toastType.SUCCESS" />
          <AlertCircleIcon
            v-else
            :class="{
              'text-red-200/90 text-white': toast.type === toastType.ERROR,
              'text-yellow-500/90': toast.type === toastType.WARNING,
              'text-blue-500/90': toast.type === toastType.INFO,
            }"
            class="size-5"
          />
        </div>
      </div>
      <div
        v-if="toast.payload"
        class="max-w-[16rem] py-4 grid gap-y-1"
        :class="{
          'text-red-900/90 text-white': toast.type === toastType.ERROR,
          'text-yellow-900/90': toast.type === toastType.WARNING,
          'text-blue-900/90': toast.type === toastType.INFO,
          'text-green-900/90 ': toast.type === toastType.SUCCESS,
        }"
      >
        <p class="font-semibold">
          {{ toast.payload.title }}
        </p>
        <p v-if="toast.payload.body" class="text-sm text-slate-700">{{ toast.payload.body }}</p>
      </div>
    </div>
  </div>
</template>
