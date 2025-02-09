<script setup lang="ts">
import Navbar from '../Navbar.vue'
import TopBar from '../TopBar.vue'
</script>

<template>
  <main class="relative grid">
    <TopBar />
    <slot />
    <Navbar />
  </main>
</template>
