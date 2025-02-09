<script setup lang="ts">
import type { Side } from '@/handler/sides/joined-sides'
import type { Credential } from '@/helpers/credential'
import JoinSideButton from './JoinSideButton.vue'

defineProps<{ side: Side; credential?: Credential }>()
</script>

<template>
  <div
    class="flex items-center justify-between p-4 bg-white border-t border-x group-first:rounded-t-md group-last:rounded-b-md group-last:border-b gap-x-2"
  >
    <div class="flex items-center gap-x-2">
      <div class="grid font-semibold border rounded-full size-10 bg-slate-200 place-items-center">
        <div class="capitalize">
          {{ side.nick.charAt(0) }}
        </div>
      </div>
      <p>{{ side.nick }}</p>
    </div>
    <JoinSideButton :side-id="side.id" v-if="credential && !side.membershipDetail" :credential />
  </div>
</template>
