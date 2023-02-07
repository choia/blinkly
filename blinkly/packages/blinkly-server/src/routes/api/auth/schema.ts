import { FastifySchema } from 'fastify'
import {
  appErrorSchema,
  createAppErrorSchema,
} from './../../../lib/AppError.js'

const authBodySchema = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
  },
}

// const authResultSchemaTest = {
//   type: 'object',
//   properties: {
//     tokens: {
//       type: 'object',
//       properties: {
//         accessToken: { type: 'string' },
//         refreshToken: { type: 'string' },
//       },
//     },
//     user: userSchema,
//   },
// }

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

export const registerSchema = {
  body: authBodySchema,
  response: {
    200: AuthResultSchema,
    409: createAppErrorSchema({
      name: 'UserExistsError',
      message: 'User already exists',
      statusCode: 409,
    }),
  },
}

export const loginSchema = {
  body: authBodySchema,
  response: {
    200: AuthResultSchema,
    401: createAppErrorSchema({
      name: 'AuthenticationError',
      message: 'Invalid username or password',
      statusCode: 401,
    }),
  },
}
