import api from '@/helpers/api'
import type { Credential } from '@/helpers/credential'
import type { Data, Error, Handler } from '../types'

type RevokeVoteArgs = { postId: string; credential: Credential }

type RevokeVoteSuccess = Data<200, string>

type RevokeVoteError = Error<500, string>

export const revokeVoteHandler: Handler<
  RevokeVoteArgs,
  RevokeVoteSuccess,
  RevokeVoteError
> = async ({ postId, credential }) => {
  const response = await fetch(api('/posts/' + postId + '/_revoke-vote'), {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + credential.token,
    },
  })

  if (response.ok) {
    const result = (await response.json()) as RevokeVoteSuccess
    return {
      success: true,
      code: result.code,
      data: result.data,
    }
  }
  const result = (await response.json()) as RevokeVoteError
  return {
    success: false,
    code: result.code,
    error: result.error,
  }
}
