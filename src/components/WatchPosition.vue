<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef } from 'vue'

type Handler = () => void | Promise<void>

const props = defineProps<{ onVisible: Handler; y: number }>()

const div = useTemplateRef<HTMLElement>('divRef')

const handleVisible = () => {
  if (div.value) {
    const { y } = div.value.getBoundingClientRect()
    if (y <= props.y) {
      props.onVisible()
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleVisible)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleVisible)
})
</script>

<template>
  <div ref="divRef">
    <slot></slot>
  </div>
</template>
