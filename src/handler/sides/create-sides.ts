import api from '@/helpers/api'
import type { Credential } from '@/helpers/credential'
import type { Data, Error, Failure, Handler } from '../types'

export type CreateSidePayload = {
  nick: string
  name: string
  description: string
}

export type CreateSideData = Data<201, { id: string }>

export type CreateSideError = Error<500 | 401, string> | Error<400, Partial<CreateSidePayload>>

export const createSide: (
  credential: Credential,
) => Handler<CreateSidePayload, CreateSideData, CreateSideError> =
  (credential) => async (payload) => {
    const response = await fetch(api('/sides'), {
      body: JSON.stringify(payload),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credential.token,
      },
    })

    if (response.ok) {
      const result = (await response.json()) as CreateSideData
      return {
        success: true,
        code: result.code,
        data: result.data,
      }
    }

    const result = (await response.json()) as CreateSideError
    return {
      success: false,
      code: result.code,
      error: result.error,
    } as Failure<CreateSideError>
  }
