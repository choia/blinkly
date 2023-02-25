interface InputConfig {
  initialValue: string
  validate(value: string): boolean
}

interface InputProps {
  name: string
  onBlur(e: React.FocusEvent<HTMLInputElement>): void
}

type UseFormParam<T extends string> = Record<T, InputConfig>
type UseFormResult<T extends string> = Record<T, InputProps>

export function useform<T extends string>(param: UseFormParam<T>) {
  const result: Partial<UseFormResult<T>> = {}
  return result
}

function sample() {
  const result = useform({
    username: {
      initialValue: 'asdf',
      validate: () => true,
    },
  })
  result
}
