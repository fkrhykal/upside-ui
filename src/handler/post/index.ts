export const voteKind = {
  UpVote: 1,
  DownVote: -1,
} as const

export type VoteType = (typeof voteKind)[keyof typeof voteKind]

export type Post = {
  id: string
  body: string
  createdAt: number
  updatedAt: number
  side: {
    id: string
    nick: string
    membershipDetail: {
      id: string
      role: string
    } | null
  }
  author: {
    id: string
    username: string
  }
  score: number
  currentUserVote: {
    id: string
    kind: VoteType
  } | null
}
