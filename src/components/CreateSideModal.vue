<script setup lang="ts">
import { createSide } from '@/handler/sides/create-sides'
import type { Credential } from '@/helpers/credential'
import { useForm } from '@/hooks/useForm'
import { useQueryClient } from '@/hooks/useQuery'
import { useToast } from '@/hooks/useToast'
import { Loader2Icon } from 'lucide-vue-next'
import { nextTick, ref, Transition, useTemplateRef } from 'vue'
import type { ComponentExposed } from 'vue-component-type-helpers'
import Button from './Button.vue'
import Error from './Error.vue'
import Input from './Input.vue'
import Label from './Label.vue'
import Modal from './Modal.vue'
import Toast from './Toast.vue'

const isOpen = ref(false)
const nickInput = useTemplateRef<ComponentExposed<typeof Input>>('nickInputRef')
const toast = useToast()

const props = defineProps<{ credential: Credential }>()
const queryClient = useQueryClient()

const open = () => {
  isOpen.value = true
  nextTick(() => {
    nickInput.value?.focus()
  })
}

const close = () => {
  createSideForm.reset()
  isOpen.value = false
}

const createSideForm = useForm(
  {
    description: '',
    name: '',
    nick: '',
  },
  {
    formFn: createSide(props.credential),
    async onFailure(failure) {
      switch (failure.code) {
        case 401:
          return
      }
    },
    async onSuccess() {
      close()
      toast.success({ title: 'Side created successfully' })
      await queryClient.refetch(['joinedSides', 'popularSides'])
    },
  },
)
</script>

<template>
  <div @click="open">
    <slot />
  </div>
  <Toast :toast />
  <Modal :show="isOpen">
    <div
      class="w-full h-full sm:h-fit py-10 px-12 bg-white rounded-md shadow-sm max-w-[28rem] transition-transform"
    >
      <h1 class="text-xl font-semibold tracking-tight">Create new side</h1>
      <form @submit.prevent="createSideForm.submit" class="flex flex-col w-full gap-4 mt-4">
        <div>
          <Label for="input-nick">Nick</Label>
          <Input
            class="mt-1"
            ref="nickInputRef"
            id="input-nick"
            v-model="createSideForm.nick"
            @input="createSideForm.clearError('nick')"
          />
          <Transition name="slide-fade">
            <Error
              class="mt-1"
              v-if="createSideForm.errors.nick"
              :message="createSideForm.errors.nick"
            />
          </Transition>
        </div>
        <div>
          <Label for="input-name">Name</Label>
          <Input
            class="mt-1"
            id="input-name"
            v-model="createSideForm.name"
            @input="createSideForm.clearError('name')"
          />
          <Transition name="slide-fade">
            <Error
              class="mt-1"
              v-if="createSideForm.errors.name"
              :message="createSideForm.errors.name"
            />
          </Transition>
        </div>
        <div class="flex flex-col">
          <Label for="input-description">Description</Label>
          <textarea
            id="input-description"
            @input="createSideForm.clearError('description')"
            class="p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-slate-200"
            v-model="createSideForm.description"
          ></textarea>
          <Transition name="slide-fade">
            <Error
              class="mt-1"
              v-if="createSideForm.errors.description"
              :message="createSideForm.errors.description"
            />
          </Transition>
        </div>
        <div class="flex gap-4">
          <Button class="w-min" @click="isOpen = false" type="reset" variant="ghost">
            Cancel
          </Button>
          <Button type="submit">
            <Loader2Icon v-if="createSideForm.processing" />
            <p v-else>Create</p>
          </Button>
        </div>
      </form>
    </div>
  </Modal>
</template>

<style lang="postcss" scoped>
.slide-fade-enter-active {
  transition: all 0.05s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.05s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
