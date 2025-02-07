<script lang="ts">
const sideType = {
  JOINED: 'joined',
  POPULAR: 'popular',
} as const

type SideType = (typeof sideType)[keyof typeof sideType]
</script>

<script setup lang="ts">
import Button from '@/components/Button.vue'
import CreateSideModal from '@/components/CreateSideModal.vue'
import JoinedSideList from '@/components/JoinedSideList.vue'
import Layout from '@/components/layout/Layout.vue'
import { useAuth } from '@/stores/auth'
import { PlusCircleIcon } from 'lucide-vue-next'
import { ref } from 'vue'

const auth = useAuth()

const selectedSides = ref<SideType>(sideType.JOINED)
</script>

<template>
  <Layout>
    <div class="bg-slate-50">
      <div class="bg-slate-50 sticky top-[4.05rem] py-1">
        <div class="flex p-2 my-2 border rounded-md bg-white mx-auto max-w-[42rem]">
          <div class="flex w-full">
            <button
              @click="selectedSides = sideType.JOINED"
              class="px-4 py-2 rounded-md"
              :class="{ 'text-white bg-slate-950': selectedSides === sideType.JOINED }"
            >
              Joined
            </button>
            <button
              @click="selectedSides = sideType.POPULAR"
              class="px-4 py-2 rounded-md"
              :class="{ 'text-white bg-slate-950': selectedSides === sideType.POPULAR }"
            >
              Popular
            </button>
          </div>
          <CreateSideModal v-if="auth.credential" :credential="auth.credential">
            <Button class="flex items-center gap-2 w-min">
              <PlusCircleIcon />
              <p>New</p>
            </Button>
          </CreateSideModal>
        </div>
      </div>
      <div class="mx-auto max-w-[42rem]" v-if="selectedSides === sideType.JOINED">
        <JoinedSideList v-if="auth.credential" :credential="auth.credential" />
      </div>
    </div>
  </Layout>
</template>
