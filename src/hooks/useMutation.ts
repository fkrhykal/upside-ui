import type { Handler, HasCode } from '@/handler/types'
import { ref } from 'vue'

export type MutationData<D> = { data: D } & HasCode

export type MutationError<E> = { error: E } & HasCode

export type MutationOption<T, D, E> = {
  mutationFn: Handler<T, MutationData<D>, MutationError<E>>
  onSuccess?: (data: MutationData<D>) => void
  onError?: (error: MutationError<E>) => void
} & (T extends void ? { args?: T } : { args: T })

export function useMutation<T, D, E>(opt: MutationOption<T, D, E>) {
  const isLoading = ref(false)
  const mutate = async () => {
    isLoading.value = true
    const result = await opt.mutationFn(opt.args as T)
    isLoading.value = false
    if (result.success && opt.onSuccess) {
      return opt.onSuccess(result)
    }
    if (!result.success && opt.onError) {
      return opt.onError(result)
    }
  }
  return { mutate, isLoading }
}
