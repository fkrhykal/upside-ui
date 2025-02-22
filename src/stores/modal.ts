import { defineStore } from 'pinia'

export const useAuthModalStore = defineStore('modal', {
  state() {
    return {
      isShowed: false,
    }
  },
  actions: {
    show() {
      this.isShowed = true
    },
    hide() {
      this.isShowed = false
    },
  },
})
