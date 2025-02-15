<script lang="ts">
const postType = {
  LATEST: 'latest',
  SUBSCRIBED: 'subscribed',
} as const

type PostType = (typeof postType)[keyof typeof postType]
</script>

<script setup lang="ts">
import type { Credential } from '@/helpers/credential'
import { ref } from 'vue'
import WatchLifeCycle from '../WatchLifeCycle.vue'
import LatestPosts from './LatestPosts.vue'
import SubscribedPosts from './SubscribedPosts.vue'

defineProps<{ credential?: Credential }>()

const selectedPosts = ref<PostType>(postType.LATEST)
</script>

<template>
  <div>
    <div class="flex p-2 my-2 bg-white border rounded-md">
      <div class="flex w-full">
        <button
          @click="selectedPosts = postType.LATEST"
          class="px-4 py-2 rounded-md"
          :class="{ 'text-white bg-slate-950': selectedPosts === postType.LATEST }"
        >
          Latest
        </button>
        <WatchLifeCycle v-if="credential" @vue:unmounted="selectedPosts = postType.LATEST">
          <button
            @click="selectedPosts = postType.SUBSCRIBED"
            class="px-4 py-2 rounded-md"
            :class="{ 'text-white bg-slate-950': selectedPosts === postType.SUBSCRIBED }"
          >
            Subscribed
          </button>
        </WatchLifeCycle>
      </div>
    </div>
    <LatestPosts v-if="selectedPosts === postType.LATEST" />
    <SubscribedPosts
      v-if="selectedPosts === postType.SUBSCRIBED && credential"
      :credential="credential"
    />
  </div>
</template>
