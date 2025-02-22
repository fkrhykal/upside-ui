<script setup lang="ts">
import { getJoinedSideHandler } from '@/handler/sides/joined-sides'
import type { Credential } from '@/helpers/credential'
import { useQuery } from '@/hooks/useQuery'
import { reactive } from 'vue'
import SideItem from './SideItem.vue'

const props = defineProps<{ credential: Credential }>()

const args = reactive({ credential: props.credential })

const { data } = useQuery({
  queryKey: 'joinedSides',
  queryFn: getJoinedSideHandler,
  reactiveArgs: args,
})
</script>

<template>
  <div v-if="data">
    <ul class="flex flex-col">
      <li class="group" v-for="side in data.sides" :key="side.id">
        <SideItem :credential="credential" :side />
      </li>
    </ul>
  </div>
</template>
