<script setup lang="ts">
import { getJoinedSideHandler } from '@/handler/sides/joined-sides'
import type { Credential } from '@/helpers/credential'
import { useQuery } from '@/hooks/useQuery'

const props = defineProps<{ credential: Credential }>()

const { data } = useQuery({ queryFn: getJoinedSideHandler(props.credential) })
</script>

<template>
  <div v-if="data">
    <ul class="flex flex-col">
      <li class="group" v-for="side in data" :key="side.id">
        <div
          class="flex items-center p-4 bg-white border-t border-x group-first:rounded-t-md gap-x-2"
        >
          <div
            class="grid font-semibold border rounded-full size-10 bg-slate-200 place-items-center"
          >
            <div class="capitalize">
              {{ side.nick.charAt(0) }}
            </div>
          </div>
          <p>{{ side.nick }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
