<script setup lang="ts">
import WatchLifeCycle from './WatchLifeCycle.vue'

defineProps<{ show: boolean }>()

const handleMounted = () => {
  document.body.style.overflow = 'hidden'
}

const handleUnmounted = () => {
  document.body.style.overflow = 'auto'
}
</script>

<template>
  <Teleport to="body" v-if="show">
    <WatchLifeCycle>
      <div
        class="modal fixed top-0 left-0 z-[99] grid w-screen h-screen bg-slate-900/20 place-items-center backdrop-blur-sm"
      >
        <slot></slot>
      </div>
    </WatchLifeCycle>
  </Teleport>
</template>
