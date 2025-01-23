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

type Result<D, E> =
  | {
      success: true
      code: number
      data: D
    }
  | {
      success: false
      code: number
      error: E
    }

export type FormFunction<T extends Payload, D, E> = (data: T) => Promise<Result<D, E>>

export function useForm<T extends Payload, D, E>(
  value: T,
  opt: {
    formFn: FormFunction<T, D, E>
    onSuccess: (success: D) => Promise<void>
    onError: (error: E) => Promise<void>
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
        await opt.onSuccess(result.data)
        this.processing = false
        return
      }
      await opt.onError(result.error)
      this.processing = false
      return
    },
  })

  return form
}
