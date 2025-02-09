export type AuthState = {
  credential: Credential | undefined
}

export type User = {
  id: string
  username: string
}

export type Credential = {
  token: string
  user: User
}
