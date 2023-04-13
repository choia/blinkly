import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useAuthRedirect } from './useAuthRedirect'
import { useRouter } from 'next/router'

interface FormInputConfig {
  name?: string
  validate?(text: string): boolean
  initialValue?: string
  validateErrorMessage?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

type ValidateMode = 'all' | 'change' | 'submit' | 'blur'

interface PostApiConfig<T extends string> {
  method: string
  url: string
  headers: Record<string, string>
  data?: Record<T, string>
}
interface UseFormParams<T extends string> {
  mode?: ValidateMode
  form: Record<T, FormInputConfig>
  initialValues?: Record<T, string>
  shouldPreventDefault?: boolean
  config: PostApiConfig<T>
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
  ref?: (ref: HTMLInputElement) => void
}

const DEFAULT_VALIDATE_MESSAGE = 'Validation Error'

export function useAuthForm<T extends string>({
  form,
  initialValues,
  mode = 'submit',
  shouldPreventDefault,
  config,
}: UseFormParams<T>) {
  const router = useRouter()
  const [data, setData] = useState<AxiosResponse<any, any>>()
  const [errors, setErrors] = useState<Partial<Record<T, string | null>>>({})
  const errorRef = useRef(errors)
  const setError = useCallback((key: T, error: string | undefined | null) => {
    if (errorRef.current[key] === error) return
    errorRef.current[key] = error
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        [key]: error,
      }
    })
  }, [])

  const inputRefs = useRef<Partial<Record<T, HTMLInputElement>>>({})

  const inputProps = useMemo(() => {
    const partialInputProps: Partial<InputTypeRecord<T>> = {}
    const keys = Object.keys(form) as T[]
    keys.forEach((key) => {
      const validate = form[key].validate
      const handleValidation = (text: string) => {
        if (!validate) return
        const isValid = validate(text)
        if (isValid) {
          setError(key, null)
        } else {
          const errorMessage = form[key].validateErrorMessage ?? DEFAULT_VALIDATE_MESSAGE
          setError(key, errorMessage)
        }
      }
      partialInputProps[key] = {
        name: key,
        onChange: (e) => {
          form[key].onChange?.(e)
          const modes: ValidateMode[] = ['change', 'all']
          if (!modes.includes(mode)) return
          handleValidation(e.target.value)
        },
        onBlur: (e) => {
          form[key].onBlur?.(e)
          const modes: ValidateMode[] = ['blur', 'all']
          if (!modes.includes(mode)) return
          handleValidation(e.target.value)
        },
        ref: (ref: HTMLInputElement) => {
          inputRefs.current[key] = ref
        },
      }
    })
    return partialInputProps
  }, [mode, form, setError])

  const handleSubmit: HandleSubmitFn<T> = useCallback(
    (onSubmit) => {
      return async (e) => {
        const formData = new FormData(e.currentTarget)
        const formDataJSON = Object.fromEntries(formData) as Record<T, string>
        const keys = Object.keys(form) as T[]
        let errorCounter = 0
        keys.forEach((key) => {
          if (form[key].validate?.(formDataJSON[key]) === false) {
            setError(key, form[key].validateErrorMessage ?? DEFAULT_VALIDATE_MESSAGE)
            errorCounter += 1
          }
        })

        if (errorCounter > 0) {
          e.preventDefault()
          return
        }

        if (shouldPreventDefault ?? true) {
          e.preventDefault()
        }

        config.data = formDataJSON

        try {
          const response = await axios(config)
          setData(response.data)
          // console.log('d12', response)
          if (response.status === 200) {
            console.log('rrr1', router)
            router.push('/')
          }
        } catch (e: any) {
          // console.log(e.response.data.name, e.response.data.error.message)
        }

        onSubmit(formDataJSON, e)
      }
    },
    [form, shouldPreventDefault, setError, config],
  )

  useEffect(() => {
    const keys = Object.keys(form) as T[]
    keys.forEach((key) => {
      const initialValue = initialValues?.[key] ?? form[key].initialValue
      const el = inputRefs.current[key]
      if (initialValue !== undefined && el) {
        el.value = initialValue
      }
    })
  }, [form, initialValues])

  return { inputProps, handleSubmit, errors, setError, data }
}
