import { FastifySchema } from 'fastify'
import { Static, Type } from '@sinclair/typebox'
import { UserSchema } from './../../../schema/UserSchema.js'
import { Nullable } from './../../../lib/typebox.js'

export const CreateItemSchema = Type.Object({
  title: Type.String(),
  body: Type.String(),
  link: Type.String(),
  tags: Type.Array(Type.String()),
})

export type CreateItemBodyType = Static<typeof CreateItemSchema>

const ItemSchema = Type.Object({
  id: Type.String(),
  title: Type.String(),
  body: Type.String(),
  link: Type.String(),
  // tags: Type.Array(Type.String()),
  thumbnail: Nullable(Type.String()),
  createdAt: Type.String(),
  updatedAt: Type.String(),
  user: UserSchema,
})

ItemSchema.example = {
  id: 1,
  title: 'Hello',
  body: 'Hi, you are awesome!',
  link: 'https://google.com',
  thumbnail: null,
  createdAt: '2023-03-08T01:33:44.678Z',
  updatedAt: '2023-03-08T01:33:44.678Z',
  user: {
    id: 1,
    username: 'hello',
  },
}

export const WriteItemSchema: FastifySchema = {
  tags: ['item'],
  body: CreateItemSchema,
  response: {
    200: ItemSchema,
  },
}

export interface WriteItemRoute {
  Body: CreateItemBodyType
}

const ReadItemParamSchema = Type.Object({
  id: Type.Integer(),
})

type ReadItemParamsType = Static<typeof ReadItemParamSchema>

export const GetItemSchema: FastifySchema = {
  tags: ['item'],
  params: ReadItemParamSchema,
  response: {
    200: ItemSchema,
  },
}

export interface GetItemRoute {
  Params: ReadItemParamsType
}

export interface GetItemsRoute {
  Querystring: {
    cursor?: string
  }
}
