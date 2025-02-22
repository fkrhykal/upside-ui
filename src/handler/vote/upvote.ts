import api from '@/helpers/api'
import type { Credential } from '@/helpers/credential'
import type { Data, Error, Handler } from '../types'

type UpVoteArgs = { postId: string; credential: Credential }

type UpVoteSuccess = Data<200, { id: string }>

type UpVoteError = Error<500, string>

export const upVoteHandler: Handler<UpVoteArgs, UpVoteSuccess, UpVoteError> = async ({
  postId,
  credential,
}) => {
  const response = await fetch(api('/posts/' + postId + '/_upvote'), {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + credential.token,
    },
  })

  if (response.ok) {
    const result = (await response.json()) as UpVoteSuccess
    return {
      success: true,
      code: result.code,
      data: result.data,
    }
  }
  const result = (await response.json()) as UpVoteError
  return {
    success: false,
    code: result.code,
    error: result.error,
  }
}
