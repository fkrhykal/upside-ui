import { signIn } from '@/handler/auth/sign-in'
import { getUserDetail } from '@/handler/users/user-detail'
import { COOKIE } from '@/helpers/cookie'
import cookie from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { defineStore } from 'pinia'

interface AuthState {
  credential: Credential | null
}

interface User {
  id: string
  username: string
}

interface Credential {
  token: string
  user: User
}

interface JwtPayload {
  iss: 'upside'
  exp: number
  userCredential: {
    id: string
  }
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
    async signIn(username: string, password: string) {
      const signInResult = await signIn({ username, password })
      if (!signInResult.success) {
        return
      }
      const { token } = signInResult.data
      cookie.set(COOKIE.AUTH_TOKEN, token)

      const { userCredential } = jwtDecode<JwtPayload>(token)
      const userDetailResult = await getUserDetail(userCredential.id)
      if (!userDetailResult.success) {
        return
      }

      this.credential = {
        token,
        user: {
          id: userDetailResult.data.id,
          username: userDetailResult.data.username,
        },
      }
      const base64Credential = btoa(JSON.stringify(this.credential))
      cookie.set(COOKIE.CREDENTIAL, base64Credential)
    },
    async signOut() {
      cookie.remove(COOKIE.AUTH_TOKEN)
    },
  },
})
