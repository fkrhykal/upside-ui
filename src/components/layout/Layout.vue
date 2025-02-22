<script setup lang="ts">
import Navbar from '../Navbar.vue'
import RequiredAuthModal from '../RequiredAuthModal.vue'
import TopBar from '../TopBar.vue'
</script>

<template>
  <main class="relative grid pb-12">
    <TopBar />
    <slot />
    <Navbar />
    <RequiredAuthModal />
  </main>
</template>
