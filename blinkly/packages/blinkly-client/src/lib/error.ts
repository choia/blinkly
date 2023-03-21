import axios from 'axios'

type ErrorName =
  | 'UserExistsError'
  | 'AuthenticationError'
  | 'UnauthorizedError'
  | 'UnknownError'
  | 'BadRequestError'
  | 'RefreshTokenError'
  | 'WrongCredentials'

interface ErrorPayload {
  UserExistsError: undefined
  AuthenticationError: undefined
  UnknownError: undefined
  UnauthorizedError: {
    isExpiredToken: boolean
  }
  BadRequestError: undefined
  RefreshTokenError: undefined
  WrongCredentials: undefined
}

export interface AppError {
  name: ErrorName
  message: string
  statusCode: number
  payload?: ErrorPayload[ErrorName]
}

export function isAppError(error: any): error is AppError {
  return (
    error?.name !== undefined && error?.message !== undefined && error?.statusCode !== undefined
  )
}

export function extractError(error: any): AppError {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data
    if (isAppError(data)) {
      return data
    }
  }

  return {
    name: 'UnknownError',
    message: 'Unknown Error',
    statusCode: 500,
  }
}
