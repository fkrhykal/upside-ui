<script setup lang="ts">
import Button from '@/components/Button.vue'
import Error from '@/components/Error.vue'
import Input from '@/components/Input.vue'
import Toast from '@/components/Toast.vue'
import { signUp } from '@/handler/auth/sign-up'
import { useForm } from '@/hooks/useForm'
import { useToast } from '@/hooks/useToast'
import { useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast()

const signUpForm = useForm(
  {
    username: '',
    password: '',
  },
  {
    formFn: signUp,
    onSuccess: async () => {
      router.push('sign-in')
    },
    onFailure: async ({ error }) => {
      toast.error({ title: error as string })
    },
  },
)
</script>

<template>
  <Toast :toast />
  <main class="grid min-h-screen md:grid-cols-2">
    <div class="hidden col-span-1 bg-slate-900 md:block"></div>
    <div class="col-span-1 px-8 pt-16">
      <div class="max-w-[22rem] mx-auto">
        <div class="mt-4 text-center">
          <p class="text-2xl font-bold">Sign up for an account</p>
          <p class="mx-4 mt-2 text-sm text-gray-500/90">
            Enter your username and password to create an account
          </p>
        </div>
        <form @submit.prevent="signUpForm.submit" class="grid mt-2 gap-y-2">
          <div class="">
            <label class="text-sm text-slate-700" for="username">Username</label>
            <Input v-model="signUpForm.username" class="mt-1 text-gray-700" />
            <Error
              class="mt-1"
              v-if="signUpForm.errors['username']"
              :message="signUpForm.errors['username']"
            />
          </div>
          <div>
            <label class="text-sm text-slate-700" for="password">Password</label>
            <Input v-model="signUpForm.password" class="mt-1 text-gray-700" />
            <Error
              class="mt-1"
              v-if="signUpForm.errors['password']"
              :message="signUpForm.errors['password']"
            />
          </div>
          <Button type="submit" class="mt-6">
            <p v-if="signUpForm.processing">Processing</p>
            <p v-else>Sign Up</p>
          </Button>
        </form>
        <p class="mt-4 text-sm text-center text-gray-500/90">
          Already have an account?
          <RouterLink class="font-semibold text-gray-900 underline" to="sign-in"
            >Sign in</RouterLink
          >
        </p>
      </div>
    </div>
  </main>
</template>
