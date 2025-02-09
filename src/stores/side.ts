import type { getJoinedSideHandler, Side } from '@/handler/sides/joined-sides'
import type { getPopularSideHandler } from '@/handler/sides/popular-sides'
import { defineStore } from 'pinia'

export const useSideStore = defineStore('sides', {
  state() {
    return {
      joinedSides: [] as Side[],
      popularSides: [] as Side[],
    }
  },

  actions: {
    async loadJoinedSides(handler: ReturnType<typeof getJoinedSideHandler>) {
      const result = await handler()
      if (result.success) {
        this.joinedSides = result.data.sides
      }
    },
    async loadPopularSides(handler: ReturnType<typeof getPopularSideHandler>) {
      const result = await handler()
      if (result.success) {
        this.popularSides = result.data.sides
      }
    },
  },
})
