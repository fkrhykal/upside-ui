<script setup lang="ts">
import { useAuthModalStore } from '@/stores/modal'
import Button from './Button.vue'
import Error from './Error.vue'
import Input from './Input.vue'
import Modal from './Modal.vue'

const authModal = useAuthModalStore()
</script>

<template>
  <Modal :show="authModal.isShowed">
    <div class="py-12 bg-white rounded-md px-14">
      <div class="mt-4 text-center">
        <p class="text-2xl font-bold">Sign in to your account</p>
        <p class="mx-4 mt-2 text-sm text-gray-500/90">
          Enter your username below to sign in to your account
        </p>
      </div>
      <form class="grid mt-2 gap-y-2">
        <Error message="wrong username or password" class="w-full mt-2" />
        <div class="">
          <label class="text-sm text-slate-700" for="username">Username</label>

          <Input class="mt-1 text-gray-700" />
        </div>
        <div>
          <label class="text-sm text-slate-700" for="password">Password</label>
          <Input class="mt-1 text-gray-700" />
        </div>
        <Button type="submit" class="mt-6">
          <p>Sign In</p>
        </Button>
      </form>
      <p class="mt-4 text-sm text-center text-gray-500/90">
        Don't have an account?
        <RouterLink class="font-semibold text-gray-900 underline fonts" to="sign-up"
          >Sign up</RouterLink
        >
      </p>
    </div>
  </Modal>
</template>
