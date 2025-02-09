import { signIn, type SignInData, type SignInError } from '@/handler/auth/sign-in'
import type { Failure, Success } from '@/handler/types'
import { COOKIE } from '@/helpers/cookie'
import type { AuthState, Credential } from '@/helpers/credential'
import cookie from 'js-cookie'
import { defineStore } from 'pinia'

type SignInOption = {
  onSuccess: (success: Success<SignInData>) => Promise<void>
  onFailure: (failure: Failure<SignInError>) => Promise<void>
}

export const useAuth = defineStore('auth', {
  state: (): AuthState => {
    const base64Credential = cookie.get(COOKIE.CREDENTIAL)
    if (!base64Credential) {
      return { credential: undefined }
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
        expires: 7,
      })
      cookie.set(COOKIE.CREDENTIAL, btoa(JSON.stringify(result.data)), {
        sameSite: 'strict',
        expires: 7,
      })
      this.credential = result.data
      onSuccess(result)
    },
    async signOut() {
      cookie.remove(COOKIE.AUTH_TOKEN)
      cookie.remove(COOKIE.CREDENTIAL)
      this.credential = undefined
    },
  },
})
