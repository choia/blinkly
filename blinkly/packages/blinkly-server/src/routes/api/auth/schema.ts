import { FastifySchema } from 'fastify'

const authBodySchema = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
  },
}

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
    id: { type: 'string ' },
    username: { type: 'string' },
  },
  example: {
    id: 'myname',
  },
}

export const registerSchema: FastifySchema = {
  body: authBodySchema,
  response: {
    200: tokenResultSchema,
  },
}

export const loginSchema: FastifySchema = {
  body: authBodySchema,
  response: {
    200: tokenResultSchema,
  },
}
