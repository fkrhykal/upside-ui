<script setup lang="ts">
import type { User } from '@/helpers/credential'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useAuth } from '@/stores/auth'
import { ref, useTemplateRef } from 'vue'
import Alert from './Alert.vue'

const props = defineProps<{ user: User }>()
const auth = useAuth()
const isOpen = ref(false)

const avatar = useTemplateRef<HTMLDivElement>('avatarRef')

useClickOutside(avatar, () => {
  if (isOpen.value) isOpen.value = false
})
</script>

<template>
  <div class="relative" v-if="auth.credential" ref="avatarRef">
    <div
      @click="isOpen = !isOpen"
      class="grid font-semibold border rounded-full cursor-pointer size-12 bg-slate-200 place-items-center"
    >
      <div class="capitalize">
        {{ props.user.username.charAt(0) }}
      </div>
    </div>
    <div class="absolute top-[75%] right-[75%] w-fit" :class="{ hidden: !isOpen }">
      <div class="p-4 bg-white border rounded-md">
        <Alert message="Are u sure?" @cancel="isOpen = false" @continue="auth.signOut">
          <button class="text-nowrap">Sign out</button>
        </Alert>
      </div>
    </div>
  </div>
</template>
