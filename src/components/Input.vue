<script setup lang="ts">
import { useTemplateRef } from 'vue'

const model = defineModel()
const input = useTemplateRef<HTMLInputElement>('inputRef')

const focus = () => {
  input.value?.focus()
}

defineExpose({
  focus,
})
</script>

<template>
  <input
    ref="inputRef"
    class="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm"
    v-model="model"
    type="text"
    id="username"
    required
  />
</template>

<style lang="postcss">
input[aria-invalid='true'] {
  @apply focus:ring focus:ring-red-200 focus:outline-none border border-red-300;
}
input {
  @apply focus:ring focus:ring-slate-200 focus:outline-none;
}
</style>
