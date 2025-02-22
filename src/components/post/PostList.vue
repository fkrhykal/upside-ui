<script setup lang="ts">
import type { Post } from '@/handler/post'
import PostItem from './PostItem.vue'

defineProps<{ posts: Post[] }>()
</script>

<template>
  <div>
    <ul class="flex flex-col gap-y-2">
      <li v-for="(post, i) in posts" :key="post.id">
        <div class="flex w-full gap-x-1">
          <PostItem class="w-full" :post />
        </div>
      </li>
    </ul>
  </div>
</template>
