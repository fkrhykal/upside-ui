export const COOKIE = {
  AUTH_TOKEN: 'AUTH_TOKEN',
  CREDENTIAL: 'CREDENTIAL',
} as const

export type KEY = (typeof COOKIE)[keyof typeof COOKIE]
