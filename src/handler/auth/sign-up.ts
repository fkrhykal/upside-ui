import type { Failure, Handler, Success } from '../types'

export type SignUpPayload = {
  username: string
  password: string
}

export type SignUpData = {
  id: string
}

export type SignUpError = {
  message: string
}

export const signUp: Handler<SignUpPayload, SignUpData, SignUpError> = async (data) => {
  try {
    console.log({ data })
    const response = await fetch(import.meta.env.VITE_API_URL + '/auth/_sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      const result = (await response.json()) as Success<SignUpData>
      return {
        success: true,
        code: result.code,
        data: result.data,
      }
    }

    const result = (await response.json()) as Failure<SignUpError>
    return {
      success: false,
      code: result.code,
      error: result.error,
    }
  } catch (err) {
    return {
      success: false,
      code: 500,
      error: err as any,
    }
  }
}
