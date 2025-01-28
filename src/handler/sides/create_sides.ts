import type { Data, Error, Failure, Handler } from '../types'

export type CreateSidePayload = {
  nick: string
  name: string
  description: string
}

export type CreateSideData = Data<201, { id: string }>

export type CreateSideError = Error<500 | 401, string> | Error<400, Partial<CreateSidePayload>>

export const createSide: Handler<CreateSidePayload, CreateSideData, CreateSideError> = async (
  payload,
) => {
  const url = new URL('/sides', import.meta.env.VITE_API_URL)
  const response = await fetch(url, {
    body: JSON.stringify(payload),
    method: 'POST',
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
