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
import PopularSideList from '@/components/PopularSideList.vue'
import { useAuthStore } from '@/stores/auth'
import { PlusCircleIcon } from 'lucide-vue-next'
import { ref } from 'vue'

const auth = useAuthStore()

const selectedSides = ref<SideType>(sideType.JOINED)
</script>

<template>
  <Layout>
    <div class="relative min-h-screen pb-12 bg-slate-50">
      <div class="sticky top-0 py-1 bg-slate-50">
        <div class="mx-auto max-w-[40rem] px-2">
          <div class="flex p-2 my-2 bg-white border rounded-md">
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
              <Button class="flex col-span-2 gap-2">
                <PlusCircleIcon class="hidden md:block" />
                <p>New</p>
              </Button>
            </CreateSideModal>
          </div>
        </div>
      </div>
      <div class="mx-auto max-w-[40rem] px-2">
        <JoinedSideList
          v-if="auth.credential && selectedSides === sideType.JOINED"
          :credential="auth.credential"
        />
        <PopularSideList v-if="selectedSides === sideType.POPULAR" :credential="auth.credential" />
      </div>
    </div>
  </Layout>
</template>
