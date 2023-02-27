import { useCallback, useMemo, useState } from 'react'
import { validate } from './../lib/validate'

interface FormInputConfig {
  name?: string
  validate?: (text: string) => boolean
  initialValue?: string
  validateErrorMessage?: string
}

interface UseFormParams<T extends string> {
  mode?: 'change' | 'submit' | 'onblur'
  config: Record<T, FormInputConfig>
  initialValues?: Record<T, string>
  shouldPreventDefault?: boolean
}

type InputTypeRecord<T extends string> = Record<T, InputProps>
type CustomSubmitFn<T extends string> = (
  values: Record<T, string>,
  e: React.FormEvent<HTMLFormElement>,
) => void
type HandleSubmitFn<T extends string> = (
  onSubmit: CustomSubmitFn<T>,
) => (e: React.FormEvent<HTMLFormElement>) => void

interface InputProps {
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
}

interface UseFormResult<T extends string> {
  inputProps: InputTypeRecord<T>
  handleSubmit: HandleSubmitFn<T>
  error: Record<T, string | undefined | null>
  formError: string | undefined | null
  setError: (name: T, error: string) => void
  setFormError: (error: string | null) => void
}

const DEFAULT_VALIDATE_MESSAFGE = 'Validation Error'

export function useAuthForm<T extends string>(params: UseFormParams<T>) {
  const initialErrors = useMemo(() => {
    const errors: Record<string, string | undefined | null> = {}
    Object.keys(params.config).forEach((name) => {
      errors[name] = undefined
    })
    return errors as Record<T, string | undefined | null>
  }, [params.config])
  const [errors, setErrors] = useState(initialErrors)
  const setError = useCallback((key: T, error: string | undefined | null) => {
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        [key]: error,
      }
    })
  }, [])

  const inputProps = useMemo(() => {
    const partialInputProps: Partial<InputTypeRecord<T>> = {}
    const keys = Object.keys(params.config) as T[]
    keys.forEach((key) => {
      partialInputProps[key] = {
        name: key,
        onChange: (e) => {},
        onBlur: (e) => {},
      }
    })
    return partialInputProps
  }, [params])

  const handleSubmit: HandleSubmitFn<T> = useCallback(
    (onSubmit) => {
      return (e) => {
        const formData = new FormData(e.currentTarget)
        const formDataJSON = Object.fromEntries(formData) as Record<T, string>
        const keys = Object.keys(params.config) as T[]
        let errorCounter = 0
        keys.forEach((key) => {
          if (params.config[key].validate?.(formDataJSON[key]) === false) {
            setError(key, params.config[key].validateErrorMessage ?? DEFAULT_VALIDATE_MESSAFGE)
            errorCounter += 1
          }
        })

        if (errorCounter > 0) {
          e.preventDefault()
          return
        }

        if (params.shouldPreventDefault) {
          e.preventDefault()
        }
        onSubmit(formDataJSON, e)
      }
    },
    [params, setError],
  )

  return { inputProps, errors }
}

export function useSample() {
  const result = useAuthForm({
    config: {
      username: {
        validate: validate.username,
      },
    },
  })
}
