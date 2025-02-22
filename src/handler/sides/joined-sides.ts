import api from '@/helpers/api'
import type { Credential } from '@/helpers/credential'
import type { Data, Error, Handler, OffsetMetadata } from '../types'

export type Side = {
  id: string
  nick: string
  name: string
  membershipDetail?: {
    id: string
    role: string
  }
}

type JoinedSideParams = {
  credential: Credential
}

type JoinedSidesData = Data<200, { sides: Side[]; metadata: OffsetMetadata }>

type JoinedSidesError = Error<500, string>

export const getJoinedSideHandler: Handler<
  JoinedSideParams,
  JoinedSidesData,
  JoinedSidesError
> = async (params) => {
  const response = await fetch(api('/sides', { filter: 'joined', limit: '10' }), {
    headers: {
      Authorization: 'Bearer ' + params.credential.token,
    },
  })

  if (response.ok) {
    const result = (await response.json()) as JoinedSidesData
    return {
      success: true,
      code: result.code,
      data: result.data,
    }
  }

  const result = (await response.json()) as JoinedSidesError
  return {
    success: false,
    code: result.code,
    error: result.error,
  }
}
