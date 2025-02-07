import type { Handler, HasCode } from '@/handler/types'
import { onMounted, ref, type Ref } from 'vue'

export type Query<T> = {
  data: Ref<T | undefined>
}

export type QueryData<D> = { data: D } & HasCode

export type QueryError<E> = { error: E } & HasCode

export type QueryOptions<D, E> = {
  queryFn: Handler<void, QueryData<D>, QueryError<E>>
}

export function useQuery<D, E>(opt: QueryOptions<D, E>) {
  const data = ref<D>()
  const isLoading = ref(false)

  onMounted(async () => {
    isLoading.value = true
    const result = await opt.queryFn()
    if (result.success) {
      data.value = result.data
    }
    isLoading.value = false
  })

  return { data, isLoading }
}
