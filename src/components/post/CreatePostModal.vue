<script setup lang="ts">
import { createPostHandler } from '@/handler/post/create-post'
import type { Credential } from '@/helpers/credential'
import { useForm } from '@/hooks/useForm'
import { useQueryClient } from '@/hooks/useQuery'
import { useToast } from '@/hooks/useToast'
import { ref } from 'vue'
import Button from '../Button.vue'
import Error from '../Error.vue'
import Modal from '../Modal.vue'
import SelectJoinedSides from '../SelectJoinedSides.vue'
import Toast from '../Toast.vue'

const props = defineProps<{ credential: Credential }>()
const isOpen = ref(false)
const toast = useToast()
const queryClient = useQueryClient()

const createPostForm = useForm(
  { body: '', sideId: '' },
  {
    formFn: createPostHandler(props.credential),
    onSuccess: async () => {
      isOpen.value = false
      createPostForm.reset()
      queryClient.refetch(['latestPost', 'subscribedPosts'])
    },
  },
)

const reset = () => {
  isOpen.value = false
  createPostForm.reset()
}
</script>

<template>
  <div @click="isOpen = !isOpen">
    <slot />
  </div>
  <Toast :toast />
  <Modal :show="isOpen">
    <div
      class="w-full h-full sm:h-fit py-10 px-12 bg-white rounded-md shadow-sm max-w-[28rem] transition-transform"
    >
      <p>Post</p>
      <form @reset="reset" @submit.prevent="createPostForm.submit">
        <div>
          <textarea v-model="createPostForm.body" class="w-full p-2 border rounded-md"></textarea>
          <Error v-if="createPostForm.errors.body" :message="createPostForm.errors.body" />
        </div>
        <div>
          <p>Side</p>
          <SelectJoinedSides v-model="createPostForm.sideId" :credential />
        </div>
        <div class="flex mt-4 gap-x-2">
          <Button type="reset" variant="outline" class="w-min">Cancel</Button>
          <Button type="submit">Post</Button>
        </div>
      </form>
    </div>
  </Modal>
</template>

<style lang="postcss"></style>
