<script setup lang="ts">
import Button from '@/components/Button.vue'
import CreateSideModal from '@/components/CreateSideModal.vue'
import Layout from '@/components/layout/Layout.vue'
import { PlusCircleIcon } from 'lucide-vue-next'
</script>

<template>
  <Layout>
    <div class="mx-auto max-w-[32rem]">
      <div class="flex">
        <CreateSideModal>
          <Button class="flex items-center gap-2 w-min">
            <PlusCircleIcon />
            <p>New</p>
          </Button>
        </CreateSideModal>
      </div>
    </div>
  </Layout>
</template>
