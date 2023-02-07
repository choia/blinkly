type ErrorName =
  | 'UserExistsError'
  | 'AuthenticationError'
  | 'UnauthorizedError'
  | 'UnknownError'

type ErrorInfo = {
  message: string
  statusCode: number
}

const statusCodeMap: Record<ErrorName, ErrorInfo> = {
  UserExistsError: {
    message: 'User already exists',
    statusCode: 409,
  },
  AuthenticationError: {
    message: 'Authentication Error',
    statusCode: 401,
  },
  UnauthorizedError: {
    message: 'Unauthorized Error',
    statusCode: 403,
  },
  UnknownError: {
    message: 'Internal Server Error',
    statusCode: 500,
  },
}

export default class AppError extends Error {
  public statusCode: number

  constructor(public name: ErrorName) {
    const info = statusCodeMap[name]
    super(info.message)
    this.statusCode = info.statusCode
  }
}

export function isAppError(error: any): error is AppError {
  return error instanceof AppError
}

/** Error Schema */
export const appErrorSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    message: { type: 'string' },
    statusCode: { type: 'number' },
  },
}

export function createAppErrorSchema<T>(example: T) {
  return {
    ...appErrorSchema,
    example,
  }
}
