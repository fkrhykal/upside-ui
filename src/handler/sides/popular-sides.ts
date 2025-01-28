import type { Data, Error, Handler } from '../types'

type CursorPaginated<T> = {
  data: T[]
  meta: {
    current: string
    next: string | null
    prev: string | null
  }
}

type Side = {
  id: string
  nick: string
  name: string
  description: string
  userMembership?: {
    id: string
    role: string
  }
}

type PopularSidesData = Data<200, Side[]>

type PopularSidesError = Error<500, string>

export const getPopularSides: Handler<void, PopularSidesData, PopularSidesError> = async () => {
  const url = new URL('/sides', import.meta.env.VITE_API_URL)
  url.searchParams.append('filter', 'popular')
  url.searchParams.append('limit', '5')

  const response = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (response.ok) {
    const result = (await response.json()) as PopularSidesData
    return {
      code: result.code,
      data: result.data,
      success: true,
    }
  }

  const result = (await response.json()) as PopularSidesError
  return {
    code: result.code,
    error: result.error,
    success: false,
  }
}
