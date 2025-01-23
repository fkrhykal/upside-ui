<script setup lang="ts">
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import { useAuth } from '@/stores/auth'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const auth = useAuth()
const router = useRouter()

const payload = reactive({
  username: '',
  password: '',
})

const signIn = async () => {
  await auth.signIn(payload.username, payload.password)
  router.push('/')
}
</script>

<template>
  <main class="grid min-h-screen md:grid-cols-2">
    <div class="hidden col-span-1 bg-slate-900 md:block"></div>
    <div class="col-span-1 pt-24">
      <div class="max-w-[22rem] mx-auto">
        <div class="mt-4 text-center">
          <p class="text-2xl font-bold">Sign in to your account</p>
          <p class="mx-4 mt-2 text-sm text-gray-500/90">
            Enter your username below to sign in to your account
          </p>
        </div>
        <form @submit.prevent="signIn" class="grid mt-2 gap-y-2">
          <div class="">
            <label class="text-sm text-slate-700" for="username">Username</label>
            <Input v-model="payload.username" class="mt-1 text-gray-700" />
          </div>
          <div>
            <label class="text-sm text-slate-700" for="password">Password</label>
            <Input v-model="payload.password" class="mt-1 text-gray-700" />
          </div>
          <Button type="submit" class="mt-6">
            <p v-if="1 + 1 == 4">Processing</p>
            <p v-else>Sign In</p>
          </Button>
        </form>
        <p class="mt-4 text-sm text-center text-gray-500/90">
          Don't have an account?
          <RouterLink class="text-gray-900 underline" to="sign-up">Sign up</RouterLink>
        </p>
      </div>
    </div>
  </main>
</template>
