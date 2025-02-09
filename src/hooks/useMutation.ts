import type { Handler, HasCode } from '@/handler/types'
import type { QueryKey } from '@/helpers/query'
import { ref } from 'vue'
import { useQueryClient } from './useQuery'

export type MutationData<D> = { data: D } & HasCode

export type MutationError<E> = { error: E } & HasCode

export type MutationOption<D, E> = {
  mutationFn: Handler<void, MutationData<D>, MutationError<E>>
  resetKeys: QueryKey[]
}

export function useMutation<D, E>({ mutationFn, resetKeys: reset }: MutationOption<D, E>) {
  const queryClient = useQueryClient()
  const isLoading = ref(false)

  const mutate = async () => {
    isLoading.value = true
    const result = await mutationFn()
    if (result.success) {
      queryClient.reset(reset)
    }
    isLoading.value = false
  }

  return { mutate, isLoading }
}
