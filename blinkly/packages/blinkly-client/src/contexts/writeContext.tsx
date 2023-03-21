import { AppError } from '@/lib/error'
import { createContext, useContext, useMemo, useState } from 'react'

interface WriteContextState {
  form: {
    link: string
    title: string
    body: string
  }
  error?: AppError
}
interface WriteContextActions {
  change(key: keyof WriteContextState['form'], value: string): void
  reset(): void
  setError(error?: AppError): void
}
interface WriteContextType {
  state: WriteContextState
  actions: WriteContextActions
}

interface Props {
  children: React.ReactNode
}

const WriteContext = createContext<WriteContextType | null>(null)

const initialState = {
  form: {
    link: '',
    title: '',
    body: '',
  },
  error: undefined,
}

export function WriteProvider({ children }: Props) {
  const [state, setState] = useState<WriteContextState>(initialState)

  const actions: WriteContextActions = useMemo(
    () => ({
      reset() {
        setState(initialState)
      },
      change(key, value) {
        setState((prev) => ({
          ...prev,
          form: {
            ...prev.form,
            [key]: value,
          },
        }))
      },
      setError(error) {
        setState((prev) => ({
          ...prev,
          error,
        }))
      },
    }),
    [],
  )

  const value = useMemo(() => ({ state, actions }), [state, actions])

  return <WriteContext.Provider value={value}>{children}</WriteContext.Provider>
}

export function useWriteContext() {
  const context = useContext(WriteContext)
  if (context === null) {
    throw new Error('useWriteContext must be used with WriteContextProvider')
  }
  return context
}
