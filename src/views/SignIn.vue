<script setup lang="ts">
import Button from '@/components/Button.vue'
import Error from '@/components/Error.vue'
import Input from '@/components/Input.vue'
import Toast from '@/components/Toast.vue'
import { status } from '@/handler/types'
import { useToast } from '@/hooks/useToast'
import { useAuth } from '@/stores/auth'
import { Loader2Icon } from 'lucide-vue-next'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const auth = useAuth()
const router = useRouter()
const toast = useToast()

const payload = reactive({
  username: '',
  password: '',
})

const processing = ref(false)
const unauthorized = ref(false)

const reset = () => {
  unauthorized.value = false
}

const signIn = async () => {
  processing.value = true
  await auth.signIn(payload.username, payload.password, {
    onFailure: async ({ error, code }) => {
      processing.value = false
      if (code === status.UNAUTHORIZED) {
        unauthorized.value = true
        return
      }
      toast.error({ title: error })
    },
    onSuccess: async () => {
      processing.value = false
      router.push('/')
    },
  })
}
</script>

<template>
  <Toast :toast />
  <main class="grid min-h-screen md:grid-cols-2">
    <div class="hidden col-span-1 bg-slate-900 md:block"></div>
    <div class="col-span-1 px-8 pt-16">
      <div class="max-w-[22rem] mx-auto">
        <div class="mt-4 text-center">
          <p class="text-2xl font-bold">Sign in to your account</p>
          <p class="mx-4 mt-2 text-sm text-gray-500/90">
            Enter your username below to sign in to your account
          </p>
        </div>
        <form @submit.prevent="signIn" class="grid mt-2 gap-y-2">
          <Error v-if="unauthorized" message="wrong username or password" class="w-full mt-2" />
          <div class="">
            <label class="text-sm text-slate-700" for="username">Username</label>

            <Input
              :aria-invalid="unauthorized"
              @input="reset"
              v-model="payload.username"
              class="mt-1 text-gray-700"
            />
          </div>
          <div>
            <label class="text-sm text-slate-700" for="password">Password</label>
            <Input
              :aria-invalid="unauthorized"
              @input="reset"
              v-model="payload.password"
              class="mt-1 text-gray-700"
            />
          </div>

          <Button type="submit" class="mt-6">
            <div class="grid place-items-center" v-if="processing">
              <Loader2Icon class="animate-spin" />
            </div>
            <p v-else>Sign In</p>
          </Button>
        </form>
        <p class="mt-4 text-sm text-center text-gray-500/90">
          Don't have an account?
          <RouterLink class="font-semibold text-gray-900 underline fonts" to="sign-up"
            >Sign up</RouterLink
          >
        </p>
      </div>
    </div>
  </main>
</template>
