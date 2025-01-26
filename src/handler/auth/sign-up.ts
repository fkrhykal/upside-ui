import type { Data, Error, Failure, Handler } from '../types'

export type SignUpPayload = {
  username: string
  password: string
}

export type SignUpData = Data<201, { id: string }>

export type SignUpError =
  | Error<400, { username?: string; password?: string }>
  | Error<500 | 401, string>

export const signUp: Handler<SignUpPayload, SignUpData, SignUpError> = async (data) => {
  const response = await fetch(import.meta.env.VITE_API_URL + '/auth/_sign-up', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (response.ok) {
    const result = (await response.json()) as SignUpData
    return {
      success: true,
      code: result.code,
      data: result.data,
    }
  }
  const result = (await response.json()) as SignUpError
  return {
    success: false,
    code: result.code,
    error: result.error,
  } as Failure<SignUpError>
}
