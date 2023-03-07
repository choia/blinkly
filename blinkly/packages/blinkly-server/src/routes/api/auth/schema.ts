import { FastifySchema } from 'fastify'
import { Static, Type } from '@sinclair/typebox'
import {
  appErrorSchema,
  createAppErrorSchema,
} from './../../../lib/AppError.js'

export const AuthBody = Type.Object({
  username: Type.String(),
  password: Type.String(),
})

export const AuthResult = Type.Object({})

export type AuthBodyType = Static<typeof AuthBody>

const tokenResultSchema = {
  type: 'object',
  properties: {
    accessToken: { type: 'string' },
    refreshToken: { type: 'string' },
  },
  example: {
    accessToken: 'helloworld',
  },
}

const userResultSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    username: { type: 'string' },
  },
  example: {
    id: 'myname',
  },
}

const AuthResultSchema = {
  tokens: tokenResultSchema,
  user: userResultSchema,
}

export const registerSchema: FastifySchema = {
  body: AuthBody,
  response: {
    200: AuthResultSchema,
    409: createAppErrorSchema({
      name: 'UserExistsError',
      message: 'User already exists',
      statusCode: 409,
    }),
  },
}

export const loginSchema: FastifySchema = {
  body: AuthBody,
  response: {
    200: AuthResultSchema,
    401: createAppErrorSchema({
      name: 'AuthenticationError',
      message: 'Invalid username or password',
      statusCode: 401,
    }),
  },
}

export const refreshTokenSchema: FastifySchema = {
  body: {
    type: 'object',
    properties: {
      refreshToken: { type: 'string' },
    },
  },
}
