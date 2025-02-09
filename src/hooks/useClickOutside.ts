import { onMounted, type Ref } from 'vue'

export function useClickOutside(elementRef: Ref<HTMLElement | null>, handler: () => void) {
  onMounted(() => {
    document.body.addEventListener('click', (event) => {
      if (!elementRef.value) return
      const elementClicked = elementRef.value.contains(event.target as Node)
      if (!elementClicked) {
        handler()
      }
    })
  })
}
