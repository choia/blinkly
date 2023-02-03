type ErrorName = 'UserExistsError' | 'AuthenticationError' | 'UnknownError'
type ErrorInfo = {
  message: string
  statusCode: number
}

// interface ErrorInfo {
//   name: ErrorName
//   statusCode?: number
// }

const statusCodeMap: Record<ErrorName, ErrorInfo> = {
  UserExistsError: {
    message: 'User already exists',
    statusCode: 409,
  },
  AuthenticationError: {
    message: 'Authentication Error',
    statusCode: 401,
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

/** Error Schema */
export const appErrorSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    message: { type: 'string' },
    statusCode: { type: 'number' },
  },
}
