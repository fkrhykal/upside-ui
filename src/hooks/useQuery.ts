import type { Handler, HasCode } from '@/handler/types'
import type { QueryKey } from '@/helpers/query'
import { useQueryStore } from '@/stores/query'
import { computed, onMounted, reactive, ref, toRef, watch, type Reactive, type Ref } from 'vue'

export type Query<D> = {
  data: Ref<D | undefined>
}

export type QueryData<D> = { data: D } & HasCode

export type QueryError<E> = { error: E } & HasCode

export type QueryOptions<T, D, E> = {
  queryParams: Reactive<T>
  queryKey: QueryKey
  keepPreviousData?: boolean
  queryFn: Handler<Reactive<T>, QueryData<D>, QueryError<E>>
  onSuccess?: (success: QueryData<D>) => void | Promise<void>
  onFailure?: (failure: QueryError<E>) => void | Promise<void>
}
export type QueryClient = ReturnType<typeof useQueryClient>

type ProcessQueryFn = () => Promise<void>

export function useQuery<T, D, E>(opt: QueryOptions<T, D, E>) {
  const queryStore = useQueryStore()
  const data = ref<D>()
  const isLoading = ref(false)
  const isSuccess = ref(false)
  const previousData = reactive<D[]>([])
  const queryFn = computed(() => {
    const processQueryFn = async () => {
      isLoading.value = true
      const result = await opt.queryFn(opt.queryParams)
      if (result.success) {
        data.value = result.data
        isSuccess.value = true
        if (opt.onSuccess) {
          opt.onSuccess(result)
        }
        if (opt.keepPreviousData) {
          previousData.push(toRef(result.data).value)
        }
      }
      isLoading.value = false
      if (opt.onFailure) {
        opt.onFailure(result as QueryError<E>)
      }
    }
    return processQueryFn satisfies ProcessQueryFn
  })

  queryStore.set(opt.queryKey, queryFn)
  watch(opt.queryParams, queryFn.value)
  onMounted(queryFn.value)
  return { data, isLoading, isSuccess, queryParams: opt.queryParams, previousData }
}

export function useQueryClient() {
  const queryStore = useQueryStore()

  const reset = async (keys: QueryKey[]) => {
    for (const key of keys) {
      const handler = queryStore.get<Ref<ProcessQueryFn>>(key)
      if (handler?.value) {
        await handler.value()
      }
    }
  }

  return { reset, queryStore }
}
