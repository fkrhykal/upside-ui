<script setup lang="ts">
import type { Post } from '@/handler/post'
import { getSubscribedPostsHandler } from '@/handler/post/subscribed-posts'
import type { Credential } from '@/helpers/credential'
import { useQuery } from '@/hooks/useQuery'
import { Loader2Icon } from 'lucide-vue-next'
import { reactive } from 'vue'
import WatchPosition from '../WatchPosition.vue'
import PostList from './PostList.vue'

const props = defineProps<{ credential: Credential }>()
const args = reactive<{ limit: number; cursor?: string | null; credential: Credential }>({
  limit: 5,
  cursor: undefined,
  credential: props.credential,
})
const posts = reactive<Post[]>([])

const { data, isLoading } = useQuery({
  queryKey: 'subscribedPosts',
  queryFn: getSubscribedPostsHandler,
  reactiveArgs: args,
  onSuccess: (result) => {
    posts.push(...result.data.posts)
  },
  onReset: (result) => {
    result.data.posts.forEach((post, i) => {
      posts[i] = post
    })
  },
})
</script>

<template>
  <div>
    <PostList :posts="posts" class="mb-2" />
    <WatchPosition
      v-if="data?.metadata.next"
      :y="600"
      @visible="args.cursor = data.metadata.next"
      class="grid place-items-center"
    >
      <Loader2Icon v-if="isLoading" class="animate-spin" />
    </WatchPosition>
  </div>
</template>
