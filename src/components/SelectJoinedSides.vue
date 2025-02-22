<script setup lang="ts">
import { getJoinedSideHandler, type Side } from '@/handler/sides/joined-sides'
import type { Credential } from '@/helpers/credential'
import { useQuery } from '@/hooks/useQuery'
import { reactive, ref } from 'vue'

const props = defineProps<{ credential: Credential }>()

const isOpen = ref(false)

const model = defineModel<string>()

const selectedSide = ref<Side>()
const args = reactive({
  credential: props.credential,
})

const { data } = useQuery({
  queryKey: 'joinedSides',
  queryFn: getJoinedSideHandler,
  onSuccess: ({ data: { sides } }) => {
    const firstSide = sides[0]
    model.value = firstSide.id
    selectedSide.value = firstSide
  },
  reactiveArgs: args,
})

const selectSide = (side: Side) => {
  selectedSide.value = side
  model.value = side.id
}
</script>

<template>
  <div v-if="data" @click="isOpen = !isOpen" class="p-2 border rounded-md">
    <ul>
      <div v-if="!isOpen">
        {{ selectedSide?.nick }}
      </div>
      <li :key="side.id" @click="selectSide(side)" v-if="isOpen" v-for="side in data.sides">
        {{ side.nick }}
      </li>
    </ul>
  </div>
</template>

<style lang="postcss" scoped>
ul {
  @apply flex flex-col gap-1;
}
li {
  @apply py-1 px-2 rounded-md hover:bg-slate-100 cursor-pointer;
}
</style>
