<script setup lang="ts">
const model = defineModel()
</script>

<template>
  <input
    class="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm"
    v-model="model"
    type="text"
    id="username"
    required
  />
</template>
