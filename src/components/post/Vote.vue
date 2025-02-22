<script setup lang="ts">
import { voteKind, type VoteType } from '@/handler/post'
import { downVoteHandler } from '@/handler/vote/downvote'
import { revokeVoteHandler } from '@/handler/vote/revoke'
import { upVoteHandler } from '@/handler/vote/upvote'
import { useMutation } from '@/hooks/useMutation'
import { useAuthStore } from '@/stores/auth'
import { useAuthModalStore } from '@/stores/modal'
import { ArrowBigDownIcon, ArrowBigUpIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import Button from '../Button.vue'

const props = defineProps<{
  id: string
  score: number
  currentUserVote: null | { id: string; kind: VoteType }
  membershipDetail: null | { id: string; role: string }
}>()

const auth = useAuthStore()

const score = ref(props.score)
const previousScore = ref(props.score)
const currentVote = ref(props.currentUserVote?.kind)
const previousVote = ref(props.currentUserVote?.kind)
const authModal = useAuthModalStore()

const upVote =
  props.membershipDetail && auth.credential
    ? useMutation({
        mutationFn: upVoteHandler,
        onError() {
          score.value = previousScore.value
          currentVote.value = previousVote.value
        },
        args: {
          postId: props.id,
          credential: auth.credential,
        },
      })
    : undefined

const downVote =
  props.membershipDetail && auth.credential
    ? useMutation({
        mutationFn: downVoteHandler,
        onError() {
          score.value = previousScore.value
          currentVote.value = previousVote.value
        },
        args: {
          postId: props.id,
          credential: auth.credential!,
        },
      })
    : undefined

const revokeVote =
  props.membershipDetail && auth.credential
    ? useMutation({
        mutationFn: revokeVoteHandler,
        onError() {
          score.value = previousScore.value
          currentVote.value = previousVote.value
        },
        args: {
          postId: props.id,
          credential: auth.credential!,
        },
      })
    : undefined

const handleUpVote = () => {
  if (!auth.credential) {
    return authModal.show()
  }
  previousScore.value = score.value
  previousVote.value = currentVote.value
  switch (currentVote.value) {
    case undefined: {
      currentVote.value = voteKind.UpVote
      score.value++
      return upVote?.mutate()
    }
    case voteKind.UpVote: {
      currentVote.value = undefined
      score.value--
      return revokeVote?.mutate()
    }
    case voteKind.DownVote: {
      currentVote.value = voteKind.UpVote
      score.value = score.value + 2
      return upVote?.mutate()
    }
  }
}

const handleDownVote = () => {
  if (!auth.credential) {
    return authModal.show()
  }
  previousScore.value = score.value
  previousVote.value = currentVote.value
  switch (currentVote.value) {
    case undefined: {
      currentVote.value = voteKind.DownVote
      score.value--
      return downVote?.mutate()
    }
    case voteKind.DownVote: {
      currentVote.value = undefined
      score.value++
      return revokeVote?.mutate()
    }
    case voteKind.UpVote: {
      currentVote.value = voteKind.DownVote
      score.value = score.value - 2
      return downVote?.mutate()
    }
  }
}
</script>

<template>
  <div class="flex items-center p-2 w-min">
    <Button
      :disabled="membershipDetail === null"
      class="w-min"
      variant="ghost"
      @click="handleUpVote"
      :class="{
        'bg-slate-100': currentVote === voteKind.UpVote,
      }"
    >
      <ArrowBigUpIcon />
    </Button>
    <div class="px-4">
      {{ score }}
    </div>
    <Button
      :disabled="membershipDetail === null"
      class="w-min"
      variant="ghost"
      @click="handleDownVote"
      :class="{
        'bg-slate-100': currentVote === voteKind.DownVote,
      }"
    >
      <ArrowBigDownIcon />
    </Button>
  </div>
</template>
