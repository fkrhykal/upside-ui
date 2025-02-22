import api from '@/helpers/api'
import type { Credential } from '@/helpers/credential'
import type { Reactive } from 'vue'
import type { Post } from '.'
import type { CursorMetadata, Data, Error, Handler } from '../types'

type GetPostDataQueryParams = Reactive<{ limit: number; cursor?: string | null }>

type GetPostsData = Data<200, { posts: Post[]; metadata: CursorMetadata }>

type GetPostsError = Error<500, string>

export const getLatestPostsHandler: (
  credential?: Credential,
) => Handler<GetPostDataQueryParams, GetPostsData, GetPostsError> =
  (credential) => async (params) => {
    const query: Record<string, string> = { limit: params.limit.toString(), filter: 'latests' }
    if (params.cursor) {
      query['cursor'] = params.cursor
    }

    const headers: HeadersInit = {}
    if (credential) {
      headers['Authorization'] = 'Bearer ' + credential.token
    }
    const response = await fetch(api('/posts', query), {
      method: 'GET',
      headers,
    })

    if (response.ok) {
      const result = (await response.json()) as GetPostsData
      return { success: true, code: result.code, data: result.data }
    }

    const result = (await response.json()) as GetPostsError
    return {
      success: false,
      code: result.code,
      error: result.error,
    }
  }
