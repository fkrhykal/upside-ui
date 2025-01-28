<script setup lang="ts">
import { createSide } from '@/handler/sides/create_sides'
import { useForm } from '@/hooks/useForm'
import { ref } from 'vue'
import Button from './Button.vue'
import Input from './Input.vue'
import Label from './Label.vue'
import Modal from './Modal.vue'

const open = ref(false)

const createSideForm = useForm(
  {
    description: '',
    name: '',
    nick: '',
  },
  {
    formFn: createSide,
    async onFailure(failure) {},
    async onSuccess(success) {},
  },
)
</script>

<template>
  <div @click="open = true">
    <slot />
  </div>
  <Modal v-if="open">
    <div class="w-full py-10 px-12 bg-white rounded-md shadow-sm max-w-[28rem]">
      <h1 class="text-xl font-semibold tracking-tight">Create new side</h1>
      <form @submit.prevent="createSideForm.submit" class="flex flex-col w-full gap-4 mt-4">
        <div>
          <Label for="">Nick</Label>
          <Input v-model="createSideForm.nick" />
        </div>
        <div>
          <Label for="">Name</Label>
          <Input v-model="createSideForm.name" />
        </div>
        <div class="flex flex-col">
          <Label for="">Description</Label>
          <textarea
            class="p-2 border rounded-md focus:outline-none focus:ring focus:ring-slate-200"
            v-model="createSideForm.description"
          />
        </div>
        <div class="flex gap-4">
          <Button class="w-min" @click="open = false" type="reset" variant="ghost"> Cancel </Button>
          <Button type="submit"> Create </Button>
        </div>
      </form>
    </div>
  </Modal>
</template>
