import { signIn, type SignInData, type SignInError } from '@/handler/auth/sign-in'
import type { Failure, Success } from '@/handler/types'
import { COOKIE } from '@/helpers/cookie'
import cookie from 'js-cookie'
import { defineStore } from 'pinia'

type AuthState = {
  credential: Credential | null
}

type User = {
  id: string
  username: string
}

type Credential = {
  token: string
  user: User
}

type SignInOption = {
  onSuccess: (success: Success<SignInData>) => Promise<void>
  onFailure: (failure: Failure<SignInError>) => Promise<void>
}

export const useAuth = defineStore('auth', {
  state: (): AuthState => {
    const base64Credential = cookie.get(COOKIE.CREDENTIAL)
    if (!base64Credential) {
      return { credential: null }
    }
    const credential = atob(base64Credential)
    return {
      credential: JSON.parse(credential) as Credential,
    }
  },
  actions: {
    async signIn(username: string, password: string, { onFailure, onSuccess }: SignInOption) {
      const result = await signIn({ username, password })
      if (!result.success) {
        return onFailure(result)
      }
      cookie.set(COOKIE.AUTH_TOKEN, result.data.token, {
        sameSite: 'strict',
      })
      cookie.set(COOKIE.CREDENTIAL, btoa(JSON.stringify(result.data)), {
        sameSite: 'strict',
      })
      this.credential = result.data
      onSuccess(result)
    },
    async signOut() {
      cookie.remove(COOKIE.AUTH_TOKEN)
      this.credential = null
    },
  },
})
