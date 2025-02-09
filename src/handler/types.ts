export type Success<T extends HasCode> = {
  success: true
} & T

export type HasCode = {
  code: StatusCode
}

export type Failure<T extends HasCode> = {
  success: false
} & T

export type Data<C extends StatusCode, D> = {
  code: C
  data: D
}

export type Error<C extends StatusCode, D> = {
  code: C
  error: D
}

export type Result<D extends HasCode, E extends HasCode> = Success<D> | Failure<E>

export type Handler<T, D extends HasCode, E extends HasCode> = (data: T) => Promise<Result<D, E>>

export const status = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
} as const

export type StatusCode = (typeof status)[keyof typeof status]

export type OffsetMetadata = {
  page: number
  perPage: number
  totalPage: number
}
