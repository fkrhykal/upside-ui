<script setup lang="ts">
import Navbar from '../Navbar.vue'
import TopBar from '../TopBar.vue'
</script>

<template>
  <main class="relative grid">
    <TopBar />
    <div>
      <slot />
    </div>
    <Navbar />
  </main>
</template>
