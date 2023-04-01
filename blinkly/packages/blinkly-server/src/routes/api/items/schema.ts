import { FastifySchema } from 'fastify'
import { Static, Type } from '@sinclair/typebox'
import { PaginationSchema } from './../../../lib/pagination.js'
import { UserSchema } from './../../../schema/UserSchema.js'
import { Nullable } from './../../../lib/typebox.js'

export const CreateItemSchema = Type.Object({
  title: Type.String(),
  body: Type.String(),
  link: Type.String(),
  tags: Type.Optional(Type.Array(Type.String())),
})

export type CreateItemBodyType = Static<typeof CreateItemSchema>

const ItemStatsSchema = Type.Object({
  id: Type.String(),
  likes: Type.String(),
  isLiked: Type.Boolean(),
})

ItemStatsSchema.example = {
  id: 1,
  likes: 10,
  isLiked: true,
}

const ItemSchema = Type.Object({
  id: Type.String(),
  title: Type.String(),
  body: Type.String(),
  link: Type.String(),
  thumbnail: Nullable(Type.String()),
  createdAt: Type.String(),
  updatedAt: Type.String(),
  author: Type.String(),
  user: UserSchema,
  publisher: Type.Object({
    id: Type.Integer(),
    name: Type.String(),
    favicon: Type.String(),
    domain: Nullable(Type.String()),
  }),
  itemStats: ItemStatsSchema,
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
  itemStats: {
    id: 1,
    likes: 10,
    isLiked: true,
  },
}

const ItemParamSchema = Type.Object({
  id: Type.Integer(),
})

type ItemParamType = Static<typeof ItemParamSchema>

const UpdateItemBodySchema = Type.Object({
  title: Type.String(),
  body: Type.String(),
  tags: Type.Array(Type.String()),
})

type UpdateItemBodyType = Static<typeof UpdateItemBodySchema>

const ItemLikeSchema = Type.Object({
  id: Type.Integer(),
  itemStats: ItemStatsSchema,
})

ItemLikeSchema.example = {
  id: 1,
  itemStats: {
    id: 1,
    likes: 1,
  },
}

/* fastify schema */
export const WriteItemSchema: FastifySchema = {
  tags: ['item'],
  body: CreateItemSchema,
  response: {
    200: ItemSchema,
  },
}

export const GetItemSchema: FastifySchema = {
  tags: ['item'],
  params: ItemParamSchema,
  response: {
    200: ItemSchema,
  },
}

export const GetItemsSchema: FastifySchema = {
  response: {
    200: PaginationSchema(ItemSchema),
  },
}

export const UpdateItemsSchema: FastifySchema = {
  params: ItemParamSchema,
  body: UpdateItemBodySchema,
  response: {
    200: ItemSchema,
  },
}

export const DeleteItemSchema: FastifySchema = {
  params: ItemParamSchema,
  response: {
    204: Type.Null(),
  },
}

export const LikeItemSchema: FastifySchema = {
  params: ItemParamSchema,
  response: {
    200: ItemLikeSchema,
  },
}

export const UnLikeItemSchema: FastifySchema = {
  params: ItemParamSchema,
  response: {
    200: ItemLikeSchema,
  },
}

/* route interface */
export interface WriteItemRoute {
  Body: CreateItemBodyType
}

export interface GetItemRoute {
  Params: ItemParamType
}

export interface GetItemsRoute {
  Querystring: {
    cursor?: string
  }
}

export interface UpdateItemRoute {
  Params: ItemParamType
  Body: UpdateItemBodyType
}

export interface DeleteItemRoute {
  Params: ItemParamType
}

export interface LikeItemRoute {
  Params: ItemParamType
}

export interface UnLikeItemRoute {
  Params: ItemParamType
}
