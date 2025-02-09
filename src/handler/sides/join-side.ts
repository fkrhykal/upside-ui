import type { Credential } from '@/helpers/credential'
import type { Data, Error, Handler } from '../types'

type JoinSideData = Data<200, { sideId: string; membershipId: string }>

type JoinSideError = Error<500, string>

export const joinSideHandler: (
  credential: Credential,
  sideId: string,
) => Handler<void, JoinSideData, JoinSideError> =
  ({ token }, sideId) =>
  async () => {
    const url = new URL(import.meta.env.VITE_API_URL + '/sides/' + sideId + '/_join')
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    if (response.ok) {
      const result = (await response.json()) as JoinSideData
      return {
        success: true,
        code: result.code,
        data: result.data,
      }
    }
    const result = (await response.json()) as JoinSideError
    return {
      success: false,
      code: result.code,
      error: result.error,
    }
  }
