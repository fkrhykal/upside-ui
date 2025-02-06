<script setup lang="ts">
import Button from '@/components/Button.vue'
import UpsideIcon from '@/icons/UpsideIcon.vue'
import { useAuth } from '@/stores/auth'

const auth = useAuth()
</script>

<template>
  <div class="sticky top-0 w-full bg-white border-b h-fit">
    <div class="navbar">
      <div>
        <UpsideIcon class="h-10" />
      </div>

      <div>
        <div
          v-if="auth.credential"
          class="grid font-semibold border rounded-full size-12 bg-slate-200 place-items-center"
        >
          <div class="capitalize">
            {{ auth.credential.user.username.charAt(0) }}
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
  @apply flex py-2 px-4 items-center justify-between;
}

.avatar {
  @apply grid font-semibold text-center border rounded-full size-12 place-items-center bg-slate-100;
}
</style>
