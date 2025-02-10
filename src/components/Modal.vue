<script setup lang="ts">
defineProps<{ show: boolean }>()
</script>

<template>
  <Teleport to="body" v-if="show">
    <div
      class="modal fixed top-0 left-0 z-[99] grid w-screen h-screen bg-slate-900/20 place-items-center backdrop-blur-sm"
    >
      <slot></slot>
    </div>
  </Teleport>
</template>
