export interface Success<T> {
  success: true
  code: number
  data: T
}

export interface Failure<T> {
  success: false
  code: number
  error: T
}

export type Result<D, E> = Success<D> | Failure<E>

export type Handler<T, D, E> = (data: T) => Promise<Result<D, E>>
