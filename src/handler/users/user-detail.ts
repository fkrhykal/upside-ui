import type { Failure, Handler, Success } from '../types'

export type UserDetailData = {
  id: string
  username: string
}

export type UserDetailError = string

export const getUserDetail: Handler<string, UserDetailData, UserDetailError> = async (
  id: string,
) => {
  const url = new URL('/users/' + id, import.meta.env.VITE_API_URL)
  const response = await fetch(url, { method: 'GET' })

  if (response.ok) {
    const result = (await response.json()) as Success<UserDetailData>
    console.log({ result })
    return {
      code: result.code,
      data: result.data,
      success: true,
    }
  }

  const result = (await response.json()) as Failure<UserDetailError>
  console.log({ result })
  return {
    success: false,
    code: result.code,
    error: result.error,
  }
}
