import { FastifySchema } from 'fastify'
import { createAppErrorSchema } from './../../../lib/AppError.js'
import { UserSchema } from '../../../schema/UserSchema.js'

export const getMeSchema: FastifySchema = {
  response: {
    200: UserSchema,
    401: createAppErrorSchema(
      {
        name: 'UnauthorizedError',
        message: 'Unauthorized',
        statusCode: 401,
        payload: {
          isExpiredToken: true,
        },
      },
      {
        type: 'object',
        properties: {
          isExpiredToken: {
            type: 'boolean',
          },
        },
      },
    ),
  },
}
