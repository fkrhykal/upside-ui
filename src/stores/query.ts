import { defineStore } from 'pinia'

export const useQueryStore = defineStore('query', {
  state() {
    return {
      registry: new Map<string, any>(),
    }
  },
  actions: {
    set<T>(key: string, data: T) {
      this.registry.set(key, data)
    },
    get<T>(key: string): T | undefined {
      return this.registry.get(key)
    },
    delete(key: string) {
      this.registry.delete(key)
    },
  },
})
