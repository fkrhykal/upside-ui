import type { Credential } from '@/helpers/credential'
import type { Data, Error, Handler, OffsetMetadata } from '../types'

export type Side = {
  id: string
  nick: string
  name: string
  membershipDetail?: {
    id: string
    role: string
  }
}

type PopularSidesData = Data<200, { sides: Side[]; metadata: OffsetMetadata }>

type PopularSidesError = Error<500, string>

export const getPopularSideHandler: (
  credential?: Credential,
) => Handler<void, PopularSidesData, PopularSidesError> = (credential) => async () => {
  const url = new URL(import.meta.env.VITE_API_URL + '/sides')
  url.searchParams.append('filter', 'popular')
  url.searchParams.append('limit', '10')
  const headers = {} as Record<string, any>
  if (credential) {
    headers['Authorization'] = 'Bearer ' + credential.token
  }
  const response = await fetch(url, {
    method: 'GET',
    headers,
  })

  if (response.ok) {
    const result = (await response.json()) as PopularSidesData
    return {
      success: true,
      code: result.code,
      data: result.data,
    }
  }

  const result = (await response.json()) as PopularSidesError
  return {
    success: false,
    code: result.code,
    error: result.error,
  }
}
