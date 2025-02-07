import type { Credential } from '@/helpers/credential'
import type { Data, Error, Handler } from '../types'

type Side = {
  id: string
  nick: string
  name: string
  membershipDetail?: {
    id: string
    role: string
  }
}

type JoinedSidesData = Data<200, Side[]>

type JoinedSidesError = Error<500, string>

export const getJoinedSideHandler: (
  credential: Credential,
) => Handler<void, JoinedSidesData, JoinedSidesError> =
  ({ token }) =>
  async () => {
    const url = new URL('/sides', import.meta.env.VITE_API_URL)
    url.searchParams.append('filter', 'joined')
    const response = await fetch(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })

    if (response.ok) {
      const result = (await response.json()) as JoinedSidesData
      return {
        success: true,
        code: result.code,
        data: result.data,
      }
    }

    const result = (await response.json()) as JoinedSidesError
    return {
      success: false,
      code: result.code,
      error: result.error,
    }
  }
