<script setup lang="ts">
import { getSubscribedPostsHandler } from '@/handler/post/subscribed-posts'
import type { Credential } from '@/helpers/credential'
import { useQuery } from '@/hooks/useQuery'
import { reactive } from 'vue'
import PostList from './PostList.vue'

const props = defineProps<{ credential: Credential }>()
const params = reactive<{ limit: number; cursor?: string }>({ limit: 5, cursor: undefined })

const { data, previousData, isLoading } = useQuery({
  queryKey: 'subscribedPosts',
  queryFn: getSubscribedPostsHandler(props.credential),
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
