import axios from 'axios'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { validate } from './../lib/validate'

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
  config?: PostApiConfig<T>
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

interface UseFormResult<T extends string> {
  inputProps: InputTypeRecord<T>
  handleSubmit: HandleSubmitFn<T>
  error: Record<T, string | undefined | null>
  formError: string | undefined | null
  setError: (name: T, error: string) => void
  setFormError: (error: string | null) => void
}

const DEFAULT_VALIDATE_MESSAGE = 'Validation Error'

export function useAuthForm<T extends string>(params: UseFormParams<T>) {
  const initialErrors = useMemo(() => {
    const errors: Record<string, string | undefined | null> = {}
    Object.keys(params.form).forEach((name) => {
      errors[name] = undefined
    })
    return errors as Record<T, string | undefined | null>
  }, [params.form])
  const [errors, setErrors] = useState(initialErrors)
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
    const keys = Object.keys(params.form) as T[]
    keys.forEach((key) => {
      const validate = params.form[key].validate
      const mode = params.mode as ValidateMode
      const handleValidation = (text: string) => {
        if (!validate) return
        const isValid = validate(text)
        if (isValid) {
          setError(key, null)
        } else {
          const errorMessage = params.form[key].validateErrorMessage ?? DEFAULT_VALIDATE_MESSAGE
          setError(key, errorMessage)
        }
      }
      partialInputProps[key] = {
        name: key,
        onChange: (e) => {
          params.form[key].onChange?.(e)
          const modes: ValidateMode[] = ['change', 'all']
          if (!modes.includes(mode)) return
          handleValidation(e.target.value)
        },
        onBlur: (e) => {
          params.form[key].onBlur?.(e)
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
  }, [params, setError])

  const handleSubmit: HandleSubmitFn<T> = useCallback(
    (onSubmit) => {
      return async (e) => {
        const formData = new FormData(e.currentTarget)
        const formDataJSON = Object.fromEntries(formData) as Record<T, string>
        console.log('formdatajson', formDataJSON)
        const keys = Object.keys(params.form) as T[]
        let errorCounter = 0
        keys.forEach((key) => {
          if (params.form[key].validate?.(formDataJSON[key]) === false) {
            setError(key, params.form[key].validateErrorMessage ?? DEFAULT_VALIDATE_MESSAGE)
            errorCounter += 1
          }
        })

        if (errorCounter > 0) {
          e.preventDefault()
          return
        }

        if (params.shouldPreventDefault ?? true) {
          e.preventDefault()
        }
        const config = params.config as PostApiConfig<T>
        config.data = formDataJSON

        try {
          const response = await axios(config)
          console.log(response)
        } catch (e: any) {
          console.log(e.response.data.name, e.response.data.error.message)
        }

        onSubmit(formDataJSON, e)
      }
    },
    [params, setError],
  )

  useEffect(() => {
    const keys = Object.keys(params.form) as T[]
    keys.forEach((key) => {
      const initialValue = params.initialValues?.[key] ?? params.form[key].initialValue
      const el = inputRefs.current[key]
      if (initialValue !== undefined && el) {
        el.value = initialValue
      }
    })
  }, [params.form, params.initialValues])

  return { inputProps, handleSubmit, errors, setError }
}
