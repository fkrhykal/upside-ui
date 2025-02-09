<script setup lang="ts">
import { getPopularSideHandler } from '@/handler/sides/popular-sides'
import type { Credential } from '@/helpers/credential'
import { useQuery } from '@/hooks/useQuery'
import SideItem from './SideItem.vue'

const props = defineProps<{ credential?: Credential }>()

const { data } = useQuery({
  queryKey: 'popularSides',
  queryFn: getPopularSideHandler(props.credential),
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
