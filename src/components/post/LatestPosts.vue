<script setup lang="ts">
import type { Post } from '@/handler/post'
import { getLatestPostsHandler } from '@/handler/post/latest-posts'
import { useQuery } from '@/hooks/useQuery'
import { useAuthStore } from '@/stores/auth'
import { Loader2Icon } from 'lucide-vue-next'
import { reactive } from 'vue'
import WatchPosition from '../WatchPosition.vue'
import PostList from './PostList.vue'

const params = reactive<{ limit: number; cursor: null | string }>({
  limit: 10,
  cursor: null,
})

const posts = reactive<Post[]>([])
const auth = useAuthStore()

const { data, isLoading } = useQuery({
  queryKey: 'latestPost',
  queryFn: getLatestPostsHandler(auth.credential),
  reactiveArgs: params,
  onSuccess: (result) => {
    posts.push(...result.data.posts)
  },
  onReset: (result) => {
    if (posts[0].id === result.data.posts[1].id) {
      posts.unshift(result.data.posts[0])
    }
  },
})
</script>

<template>
  <div>
    <PostList :posts="posts" class="mb-2" />
    <WatchPosition
      v-if="data?.metadata.next"
      :y="600"
      @visible="params.cursor = data.metadata.next"
      class="grid place-items-center"
    >
      <Loader2Icon v-if="isLoading" class="animate-spin" />
    </WatchPosition>
  </div>
</template>
