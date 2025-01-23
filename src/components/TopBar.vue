<script setup lang="ts">
import Button from '@/components/Button.vue'
import UpsideIcon from '@/icons/UpsideIcon.vue'
import { useAuth } from '@/stores/auth'

const auth = useAuth()
</script>

<template>
  <div class="border-b">
    <div class="navbar">
      <div>
        <UpsideIcon class="h-10" />
      </div>

      <div>
        <div v-if="auth.credential">
          <div class="avatar">
            {{ auth.credential.user.username.charAt(0).toUpperCase() }}
          </div>
        </div>
        <RouterLink to="sign-in" v-else>
          <Button variant="secondary"> Sign in </Button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.navbar {
  @apply container flex justify-between py-2 items-center;
}

.avatar {
  @apply grid font-semibold text-center border rounded-full size-12 place-items-center bg-slate-100;
}
</style>
