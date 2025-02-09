<script setup lang="ts">
import { useClickOutside } from '@/hooks/useClickOutside'
import { ref, useTemplateRef } from 'vue'
import Button from './Button.vue'
import Modal from './Modal.vue'

const props = defineProps<{ message: string; onCancel: () => void; onContinue: () => void }>()

const isOpen = ref(false)

const handleCancel = () => {
  props.onCancel()
  isOpen.value = false
}

const handleContinue = () => {
  props.onContinue()
}

const modal = useTemplateRef<HTMLDivElement>('modalRef')

useClickOutside(modal, () => {
  if (isOpen.value) handleCancel()
})
</script>

<template>
  <div @click="isOpen = true" ref="modalRef">
    <slot />
  </div>
  <Modal v-if="isOpen">
    <div
      class="w-full sm:h-fit p-6 pt-12 bg-white rounded-md shadow-sm max-w-[24rem] transition-transform"
    >
      <p class="text-xl font-semibold tracking-tighter text-center">Are you sure?</p>
      <div class="flex justify-end mt-8 gap-x-2">
        <Button @click="handleCancel" variant="outline">Cancel</Button>
        <Button @click="handleContinue">Continue</Button>
      </div>
    </div>
  </Modal>
</template>
