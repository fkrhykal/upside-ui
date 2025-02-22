<script setup lang="ts">
import Button from '@/components/Button.vue'
import UpsideIcon from '@/icons/UpsideIcon.vue'
import { useAuthStore } from '@/stores/auth'
import Avatar from './Avatar.vue'

const auth = useAuthStore()
</script>

<template>
  <div class="sticky top-0 z-50 w-full bg-white border-b h-fit">
    <div class="navbar">
      <div>
        <UpsideIcon class="h-10" />
      </div>

      <div>
        <Avatar v-if="auth.credential" :user="auth.credential.user" />
        <RouterLink to="sign-in" v-else>
          <Button variant="secondary"> Sign in </Button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.navbar {
  @apply flex py-2 px-4 items-center justify-between;
}

.avatar {
  @apply grid font-semibold text-center border rounded-full size-12 place-items-center bg-slate-100;
}
</style>
