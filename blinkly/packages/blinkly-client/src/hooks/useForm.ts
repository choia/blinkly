interface InputConfig {
  initialValue: string
  validate(value: string): boolean
}

type UseFormParam<T> = Record<T, InputConfig>

export function useForm() {}
