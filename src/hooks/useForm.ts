import { status, type Failure, type Handler, type HasCode, type Success } from '@/handler/types'
import { nextTick, reactive, type Reactive } from 'vue'

export type Form<T extends Payload> = T & {
  processing: boolean
  submit: () => Promise<void>
  errors: Partial<{ [K in keyof T]: string | undefined }>
  data: () => T
  setError: (key: string & keyof T, error: string) => void
  clearError: (key: string & keyof T) => void
  reset: () => void
}

export type ReactiveForm<T extends Payload> = Reactive<Form<T>>

export type Field = string | number | boolean | Field[]

export type Payload = { [key: string]: Field }

export type ValidationError<T extends Payload> = Partial<{ [K in keyof T]: string }>

export type Validator<T extends Payload> = (value: T) => Promise<ValidationError<T>>

export type FormFunction<T extends Payload, D extends HasCode, E extends HasCode> = Handler<T, D, E>

export type FormData<T> = { data: T } & HasCode
export type FormError<T> = { error: T } & HasCode

export function useForm<
  T extends Payload,
  D,
  Data extends FormData<D>,
  E,
  Error extends FormError<E>,
>(
  value: T,
  opt: {
    formFn: FormFunction<T, Data, Error>
    onSuccess?: (success: Success<Data>) => Promise<void>
    onFailure?: (failure: Failure<Error>) => Promise<void>
    validator?: Validator<T>
  },
) {
  const keys = Object.keys(value) as Array<keyof T>
  const initialData = value
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

    setError(key: string & keyof T, error: string) {
      this.errors[key] = error
    },

    clearError(key: string & keyof T) {
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
        const validationErrorDetail = result.error as { [key: string]: string }
        for (const fieldName in validationErrorDetail) {
          this.setError(fieldName, validationErrorDetail[fieldName])
        }
        return
      }
      if (opt.onFailure) {
        await opt.onFailure(result)
      }
    },

    reset() {
      nextTick(() => {
        keys.forEach((key, _) => ((this as Record<keyof T, Field>)[key] = initialData[key]))
        this.errors = {}
      })
    },
  })

  return form
}
