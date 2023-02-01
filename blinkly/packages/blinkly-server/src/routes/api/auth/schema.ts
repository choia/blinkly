import { FastifySchema } from 'fastify'

export const registerSchema: FastifySchema = {
  body: {
    type: 'object',
    properties: {
      username: { type: 'string' },
      password: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        token: { type: 'string' },
      },
      example: {
        token: 'hellowolrd',
      },
    },
  },
}

export const loginSchema: FastifySchema = {
  body: {
    type: 'object',
    properties: {
      login_username: { type: 'string' },
      login_password: { type: 'string' },
    },
  },
}
