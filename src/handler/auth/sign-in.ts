import type { Data, Error, Handler } from '../types'

export type SignInPayload = {
  username: string
  password: string
}

export type SignInData = Data<200, { token: string; user: { id: string; username: string } }>

export type SignInError = Error<401 | 500, string>

export const signIn: Handler<SignInPayload, SignInData, SignInError> = async (data) => {
  const response = await fetch(import.meta.env.VITE_API_URL + '/auth/_sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (response.ok) {
    const success = (await response.json()) as SignInData
    return {
      success: true,
      code: success.code,
      data: success.data,
    }
  }
  const failure = (await response.json()) as SignInError
  return {
    success: false,
    code: failure.code,
    error: failure.error,
  }
}
