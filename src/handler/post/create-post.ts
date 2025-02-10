import api from '@/helpers/api'
import type { Credential } from '@/helpers/credential'
import type { Data, Error, Failure, Handler } from '../types'

export type CreatePostPayload = {
  sideId: string
  body: string
}

export type CreatePostData = Data<201, { id: string }>

export type CreatePostError =
  | Error<500 | 401, string>
  | Error<400, Partial<Pick<CreatePostPayload, 'body'>>>

export const createPostHandler: (
  credential: Credential,
) => Handler<CreatePostPayload, CreatePostData, CreatePostError> =
  ({ token }) =>
  async (payload) => {
    const response = await fetch(api('/sides/' + payload.sideId + '/posts'), {
      method: 'POST',
      body: JSON.stringify({ body: payload.body }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })

    if (response.ok) {
      const result = (await response.json()) as CreatePostData
      return {
        success: true,
        code: 201,
        data: result.data,
      }
    }
    const result = (await response.json()) as CreatePostError
    return {
      success: false,
      code: result.code,
      error: result.error,
    } as Failure<CreatePostError>
  }
