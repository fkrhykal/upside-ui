<script setup lang="ts">
import type { Post } from '@/handler/post'
import { since } from '@/helpers/time'

defineProps<{ post: Post }>()
</script>

<template>
  <div class="bg-white border rounded-md">
    <div class="flex p-4 border-b gap-x-2">
      <div
        class="grid font-semibold capitalize border rounded-full size-10 bg-slate-200 place-items-center"
      >
        {{ post.side.nick.charAt(0) }}
      </div>
      <div>
        <div class="flex items-center gap-x-2">
          <div class="font-semibold">
            {{ post.side.nick }}
          </div>
          <div class="text-sm text-slate-500">{{ since(post.createdAt) }}</div>
        </div>
        <div class="text-sm text-slate-500">Posted by {{ post.author.username }}</div>
      </div>
    </div>
    <div class="p-4">{{ post.body }}</div>
  </div>
</template>
