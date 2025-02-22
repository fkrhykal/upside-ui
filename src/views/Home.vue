<script setup lang="ts">
import Layout from '@/components/layout/Layout.vue'
import SelectedPosts from '@/components/post/SelectedPosts.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <Layout>
    <div class="grid min-h-screen bg-slate-50">
      <div class="mx-auto w-full max-w-[40rem] px-2 pb-12">
        <SelectedPosts :credential="auth.credential" />
      </div>
    </div>
  </Layout>
</template>
