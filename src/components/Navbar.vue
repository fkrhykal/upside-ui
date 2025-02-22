<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { HeartIcon, HomeIcon, PlusIcon, SearchIcon, UsersIcon } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import CreatePostModal from './post/CreatePostModal.vue'

const auth = useAuthStore()
</script>

<template>
  <nav>
    <div>
      <RouterLink to="/" activeClass="bg-slate-950 text-white hover:bg-slate-800">
        <HomeIcon />
      </RouterLink>
      <RouterLink to="search" activeClass="bg-slate-950 text-white hover:bg-slate-800">
        <SearchIcon />
      </RouterLink>
      <CreatePostModal v-if="auth.credential" :credential="auth.credential">
        <button class="p-2 mx-4 rounded-md md:mx-0 bg-slate-200">
          <PlusIcon class="size-6" />
        </button>
      </CreatePostModal>
      <RouterLink to="activity" activeClass="bg-slate-950 text-white hover:bg-slate-800">
        <HeartIcon />
      </RouterLink>
      <RouterLink to="sides" activeClass="bg-slate-950 text-white hover:bg-slate-800">
        <UsersIcon />
      </RouterLink>
    </div>
  </nav>
</template>

<style lang="postcss" scoped>
nav {
  @apply fixed w-full md:w-min h-min bottom-2 md:bottom-[15%] lg:bottom-[25%];
}

nav > div {
  @apply mx-4 flex items-center justify-between h-fit  border rounded-md shadow-sm bg-white
  md:flex-col md:w-fit md:min-h-[24rem] md:my-auto md:self-start;
}

a {
  @apply p-4 size-full grid place-items-center;
}

a:first-child {
  @apply rounded-l-md md:rounded-l-none md:rounded-t-md;
}

a:last-child {
  @apply rounded-r-md md:rounded-r-none md:rounded-b-md;
}
</style>
