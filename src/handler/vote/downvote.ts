import api from '@/helpers/api'
import type { Credential } from '@/helpers/credential'
import type { Data, Error, Handler } from '../types'

type DownVoteArgs = { postId: string; credential: Credential }

type DownVoteSuccess = Data<200, { id: string }>

type DownVoteError = Error<500, string>

export const downVoteHandler: Handler<DownVoteArgs, DownVoteSuccess, DownVoteError> = async ({
  postId,
  credential,
}) => {
  const response = await fetch(api('/posts/' + postId + '/_downvote'), {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + credential.token,
    },
  })

  if (response.ok) {
    const result = (await response.json()) as DownVoteSuccess
    return {
      success: true,
      code: result.code,
      data: result.data,
    }
  }
  const result = (await response.json()) as DownVoteError
  return {
    success: false,
    code: result.code,
    error: result.error,
  }
}
