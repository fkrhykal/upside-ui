<script setup lang="ts">
import { joinSideHandler } from '@/handler/sides/join-side'
import type { Credential } from '@/helpers/credential'
import { useMutation } from '@/hooks/useMutation'
import { Loader2Icon } from 'lucide-vue-next'
import Button from './Button.vue'

const props = defineProps<{ sideId: string; credential: Credential }>()

const { mutate, isLoading } = useMutation({
  mutationFn: joinSideHandler(props.credential, props.sideId),
  resetKeys: ['joinedSides', 'popularSides'],
})
</script>

<template>
  <Button @click="mutate" variant="secondary" class="max-w-[5rem]">
    <Loader2Icon class="animate-spin" v-if="isLoading" />
    <p v-else>Join</p>
  </Button>
</template>
