<script setup lang="ts">
import Navbar from '../Navbar.vue'
import TopBar from '../TopBar.vue'
</script>

<template>
  <main class="relative grid bg-slate-50">
    <TopBar />

    <div class="mt-[3.5rem]">
      <slot />
    </div>

    <Navbar />
  </main>
</template>
