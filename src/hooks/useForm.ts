import { status, type Failure, type Handler, type Success } from '@/handler/types'
import { reactive, type Reactive } from 'vue'

export type Form<T extends Payload> = T & {
  processing: boolean
  submit: () => Promise<void>
  errors: Partial<Record<keyof T | string, string | undefined>>
  data: () => T
  setError: (key: keyof T | string, error: string) => void
  clearError: (key: keyof T | string) => void
}

export type ReactiveForm<T extends Payload> = Reactive<Form<T>>

export type Field = string | number | boolean | Field[]

export type Payload = { [key: string]: Field }

export type ValidationError<T extends Payload> = Partial<{ [K in keyof T]: string | undefined }>

export type Validator<T extends Payload> = (value: T) => Promise<ValidationError<T>>

export type FormFunction<T extends Payload, D, E> = Handler<T, D, E>

export function useForm<T extends Payload, D, E>(
  value: T,
  opt: {
    formFn: FormFunction<T, D, E>
    onSuccess?: (success: Success<D>) => Promise<void>
    onFailure?: (failure: Failure<E>) => Promise<void>
    validator?: Validator<T>
  },
) {
  const keys = Object.keys(value) as Array<keyof T>
  const form = reactive<Form<T>>({
    ...value,
    processing: false,
    errors: {},

    data() {
      return keys.reduce((data, key) => {
        data[key] = (this as Form<T>)[key]
        return data
      }, {} as T)
    },

    setError(key: keyof T | string, error: string) {
      this.errors[key] = error
    },

    clearError(key: keyof T | string) {
      this.errors[key] = undefined
    },

    async submit() {
      this.processing = true
      if (opt?.validator) {
        const errors = await opt.validator(this.data())
        this.errors = errors
        if (Object.keys(errors).length) {
          this.processing = false
          return
        }
      }
      const result = await opt.formFn(this.data())
      if (result.success) {
        this.processing = false
        if (opt.onSuccess) {
          await opt.onSuccess(result)
        }
        return
      }
      this.processing = false
      if (result.code === status.BAD_REQUEST) {
        const error = result.error as { [key: string]: string }
        for (const key in error) {
          this.setError(key, error[key])
        }
        return
      }
      if (opt.onFailure) {
        await opt.onFailure(result)
      }
    },
  })

  return form
}
