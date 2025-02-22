import type { Handler, HasCode } from '@/handler/types'
import type { QueryKey } from '@/helpers/query'
import { useQueryStore } from '@/stores/query'
import { computed, onMounted, onUnmounted, ref, watch, type Ref } from 'vue'

export type Query<D> = {
  data: Ref<D | undefined>
}

export type QueryData<D> = { data: D } & HasCode

export type QueryError<E> = { error: E } & HasCode

export type QueryOptions<T, D, E> = {
  queryKey: QueryKey
  queryFn: Handler<T, QueryData<D>, QueryError<E>>
  onSuccess?: (success: QueryData<D>) => void | Promise<void>
  onFailure?: (failure: QueryError<E>) => void | Promise<void>
  onReset?: (success: QueryData<D>) => void | Promise<void>
} & (T extends void ? { reactiveArgs?: T } : { reactiveArgs: T })

export type QueryClient = ReturnType<typeof useQueryClient>

type ProcessQueryFn<T> = (reset: boolean) => Promise<void>

export function useQuery<T, D, E>(opt: QueryOptions<T, D, E>) {
  const queryStore = useQueryStore()
  const data = ref<D>()
  const initialArgs = { ...opt.reactiveArgs }
  const isLoading = ref(false)
  const isSuccess = ref(false)
  const queryFn = computed(() => {
    const processQuery = async (reset: boolean, args?: T) => {
      isLoading.value = true
      const result = await opt.queryFn(args as T)
      if (result.success) {
        data.value = result.data
        isSuccess.value = true
        if (opt.onSuccess) {
          await opt.onSuccess(result)
        }
        if (reset && opt.onReset) {
          await opt.onReset(result)
        }
        return
      }
      isLoading.value = false
      if (opt.onFailure) {
        await opt.onFailure(result as QueryError<E>)
      }
    }
    return processQuery
  })
  if (opt.reactiveArgs) {
    watch(opt.reactiveArgs, async () => await queryFn.value(false, opt.reactiveArgs))
  }
  onMounted(async () => {
    queryStore.set(opt.queryKey, (reset: boolean) => queryFn.value(reset, opt.reactiveArgs))
    await queryFn.value(false, opt.reactiveArgs)
  })
  onUnmounted(() => {
    queryStore.delete(opt.queryKey)
  })
  return { data, isLoading, isSuccess }
}

export function useQueryClient() {
  const queryStore = useQueryStore()

  const refetch = async <T extends {}>(keys: QueryKey[]) => {
    for (const key of keys) {
      const handler = queryStore.get<ProcessQueryFn<T>>(key)
      if (handler) {
        await handler(true)
      }
    }
  }
  return { refetch, queryStore }
}
