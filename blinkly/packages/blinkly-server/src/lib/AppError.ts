type ErrorName =
  | 'UserExistsError'
  | 'AuthenticationError'
  | 'UnauthorizedError'
  | 'UnknownError'
  | 'BadRequestError'
  | 'RefreshTokenError'
  | 'NotFoundError'

type ErrorInfo = {
  message: string
  statusCode: number
}

interface ErrorPayload {
  UserExistsError: undefined
  AuthenticationError: undefined
  UnknownError: undefined
  UnauthorizedError: {
    isExpiredToken: boolean
  }
  BadRequestError: undefined
  RefreshTokenError: undefined
  NotFoundError: undefined
}

const statusCodeMap: Record<ErrorName, ErrorInfo> = {
  UserExistsError: {
    message: 'User already exists',
    statusCode: 409,
  },
  AuthenticationError: {
    message: 'Not authenticated',
    statusCode: 401,
  },
  UnauthorizedError: {
    message: 'Unauthorized',
    statusCode: 401,
  },
  UnknownError: {
    message: 'Internal Server Error',
    statusCode: 500,
  },
  BadRequestError: {
    message: 'Bad Request',
    statusCode: 400,
  },
  RefreshTokenError: {
    message: 'Failed to refresh token',
    statusCode: 401,
  },
  NotFoundError: {
    message: 'Not Found',
    statusCode: 404,
  },
}

export default class AppError extends Error {
  public statusCode: number

  constructor(
    public name: ErrorName,
    public payload?: ErrorPayload[ErrorName],
  ) {
    let info = statusCodeMap[name]
    // console.log(name)
    // console.log(info)
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

export function createAppErrorSchema<T, P>(example: T, payloadSchema?: any) {
  return {
    type: 'object',
    properties: {
      ...appErrorSchema.properties,
      ...(payloadSchema ? { payload: payloadSchema } : {}),
    },
    example,
  }
}
