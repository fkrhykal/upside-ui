import type { Handler, HasCode } from '@/handler/types'
import type { QueryKey } from '@/helpers/query'
import { useQueryStore } from '@/stores/query'
import { onMounted, ref, type Ref } from 'vue'

export type Query<T> = {
  data: Ref<T | undefined>
}

export type QueryData<D> = { data: D } & HasCode

export type QueryError<E> = { error: E } & HasCode

export type QueryOptions<D, E> = {
  queryKey: QueryKey
  queryFn: Handler<void, QueryData<D>, QueryError<E>>
  onSuccess?: (success: QueryData<D>) => void | Promise<void>
  onFailure?: (failure: QueryError<E>) => void | Promise<void>
}
export type QueryClient = ReturnType<typeof useQueryClient>

type ProcessQueryFn = () => Promise<void>

export function useQuery<D, E>(opt: QueryOptions<D, E>) {
  const queryStore = useQueryStore()
  const data = ref<D>()
  const isLoading = ref(false)
  const isSuccess = ref(false)
  const processQuery: ProcessQueryFn = async () => {
    isLoading.value = true
    const result = await opt.queryFn()
    if (result.success) {
      data.value = result.data
      isSuccess.value = true
      if (opt.onSuccess) {
        opt.onSuccess(result)
      }
    }
    isLoading.value = false
    if (opt.onFailure) {
      opt.onFailure(result as QueryError<E>)
    }
  }

  queryStore.set(opt.queryKey, processQuery)
  onMounted(processQuery)

  return { data, isLoading, isSuccess }
}

export function useQueryClient() {
  const queryStore = useQueryStore()
  const reset = async (keys: QueryKey[]) => {
    for (const key of keys) {
      const handler = queryStore.get<ProcessQueryFn>(key)
      if (handler) {
        await handler()
      }
    }
  }
  return { reset, queryStore }
}
