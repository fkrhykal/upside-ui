<script setup lang="ts">
import { getLatestPostsHandler } from '@/handler/post/latest-posts'
import { useQuery } from '@/hooks/useQuery'
import { Loader2Icon } from 'lucide-vue-next'
import { reactive } from 'vue'
import WatchPosition from '../WatchPosition.vue'
import PostList from './PostList.vue'

const params = reactive<{ limit: number; cursor: undefined | string }>({
  limit: 5,
  cursor: undefined,
})

const { data, previousData, isLoading } = useQuery({
  queryKey: 'subscribedPosts',
  queryFn: getLatestPostsHandler,
  queryParams: params,
  keepPreviousData: true,
})
</script>

<template>
  <div>
    <PostList :posts="data.posts" v-for="data in previousData" class="mb-2" />
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
