import { Nullable } from './../../../lib/typebox.js'
import { FastifySchema } from 'fastify'
import { Static, Type } from '@sinclair/typebox'
export const CreateItemBody = Type.Object({
  title: Type.String(),
  body: Type.String(),
  link: Type.String(),
  tags: Type.Array(Type.String()),
})

export type CreateItemBodyType = Static<typeof CreateItemBody>

const CreateItemResult = Type.Object({
  id: Type.String(),
  title: Type.String(),
  body: Type.String(),
  link: Type.String(),
  tags: Type.Array(Type.String()),
  thumbnail: Nullable(Type.String()),
  createdAt: Type.String(),
  updatedAt: Type.String(),
})

CreateItemResult.example = {
  id: 1,
  title: 'Hello',
  body: 'Hi, you are awesome!',
  link: 'https://google.com',
  thumbnail: null,
  createdAt: '2023-03-08T01:33:44.678Z',
  updatedAt: '2023-03-08T01:33:44.678Z',
}

export const writeItemSchema: FastifySchema = {
  tags: ['item'],
  body: CreateItemBody,
  response: {
    200: CreateItemResult,
  },
}

export interface WriteItemRoute {
  Body: CreateItemBodyType
}
