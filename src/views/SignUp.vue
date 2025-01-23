<script setup lang="ts">
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import signUpHandler from '@/handler/auth/sign-up'
import { useForm } from '@/hooks/useForm'
import { useRouter } from 'vue-router'

const router = useRouter()

const signUpForm = useForm(
  {
    username: '',
    password: '',
  },
  {
    formFn: signUpHandler,
    onSuccess: async (data) => {
      router.push('sign-in')
    },
    onError: async (error) => {
      console.log(error)
    },
  },
)
</script>

<template>
  <main class="grid min-h-screen md:grid-cols-2">
    <div class="hidden col-span-1 bg-slate-900 md:block"></div>
    <div class="col-span-1 pt-24">
      <div class="max-w-[22rem] mx-auto">
        <div class="mt-4 text-center">
          <p class="text-2xl font-bold">Sign up for an account</p>
          <p class="mx-4 mt-2 text-sm text-gray-500/90">
            Enter your username and password to create account
          </p>
        </div>
        <form @submit.prevent="signUpForm.submit" class="grid mt-2 gap-y-2">
          <div class="">
            <label class="text-sm text-slate-700" for="username">Username</label>
            <Input v-model="signUpForm.username" class="mt-1 text-gray-700" />
          </div>
          <div>
            <label class="text-sm text-slate-700" for="password">Password</label>
            <Input v-model="signUpForm.password" class="mt-1 text-gray-700" />
          </div>
          <Button type="submit" class="mt-6">
            <p v-if="signUpForm.processing">Processing</p>
            <p v-else>Sign Up</p>
          </Button>
        </form>
        <p class="mt-4 text-sm text-center text-gray-500/90">
          Already have an account?
          <RouterLink class="text-gray-900 underline" to="sign-in">Sign in</RouterLink>
        </p>
      </div>
    </div>
  </main>
</template>
