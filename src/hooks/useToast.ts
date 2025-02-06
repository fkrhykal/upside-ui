import { reactive } from 'vue'

export function useToast(): Toast {
  const toast = reactive<Toast & { _showed: boolean }>({
    _showed: false,
    type: undefined,
    showed() {
      return this._showed
    },
    payload: undefined,
    error(payload) {
      this.type = toastType.ERROR
      this.payload = payload
      this._showed = true
    },
    info(payload) {
      this.type = toastType.INFO
      this.payload = payload
      this._showed = true
    },
    warn(payload) {
      this.type = toastType.WARNING
      this.payload = payload
      this._showed = true
    },
    success(payload) {
      this.type = toastType.SUCCESS
      this.payload = payload
      this._showed = true
    },
    hide() {
      this._showed = false
    },
  })
  return toast
}

export const toastType = {
  INFO: 'info',
  ERROR: 'error',
  WARNING: 'warning',
  SUCCESS: 'success',
} as const

export type ToastType = (typeof toastType)[keyof typeof toastType]

export type ToastPayload = {
  title: string
  body?: string
}

export type Toast = {
  type: ToastType | undefined
  payload: ToastPayload | undefined
  showed(): boolean
  hide(): void
  error: (payload: ToastPayload) => void
  info: (payload: ToastPayload) => void
  warn: (payload: ToastPayload) => void
  success: (payload: ToastPayload) => void
}
