import { Type } from '@sinclair/typebox'
import { Nullable } from './../../../../lib/typebox.js'
import { ItemParamSchema } from '../schema.js'
import { UserSchema } from '../../../../schema/UserSchema.js'
import { routeSchema } from '../../../../lib/routeSchema.js'

const CreateCommentBodySchema = Type.Object({
  text: Type.String(),
  parentCommentId: Type.Optional(Nullable(Type.Integer())),
})

const CommentParamsSchema = Type.Object({
  id: Type.Integer(),
  commentId: Type.Integer(),
})

const UpdateCommentBodySchema = Type.Object({
  text: Type.String(),
})

export let CommentSchema = Type.Object({
  id: Type.Integer(),
  text: Type.String(),
  createdAt: Type.String(),
  updatedAt: Type.String(),
  likeCount: Type.Number(),
  subcommentsCount: Type.Number(),
  user: UserSchema,
  mentionUser: Type.Optional(Nullable(UserSchema)),
})

const CommentLikeSchema = Type.Object({
  id: Type.Integer(),
  likes: Type.Number(),
})

CommentSchema = Type.Object({
  id: Type.Integer(),
  text: Type.String(),
  createdAt: Type.String(),
  updatedAt: Type.String(),
  likeCount: Type.Number(),
  subcommentsCount: Type.Number(),
  user: UserSchema,
  mentionUser: Type.Optional(Nullable(UserSchema)),
  subcomments: Type.Optional(Type.Array(CommentSchema)),
})

export const getCommentSchema = routeSchema({
  params: ItemParamSchema,
  response: {
    200: Type.Array(CommentSchema),
  },
})
export const getSubcommentSchema = routeSchema({
  params: CommentParamsSchema,
  response: {
    200: Type.Array(CommentSchema),
  },
})
export const createCommentSchema = routeSchema({
  params: ItemParamSchema,
  body: CreateCommentBodySchema,
  response: {
    200: CommentSchema,
  },
})
export const updateCommentSchema = routeSchema({
  params: CommentParamsSchema,
  body: UpdateCommentBodySchema,
  response: {
    200: CommentSchema,
  },
})
export const likeCommentSchema = routeSchema({
  params: CommentParamsSchema,
  response: {
    200: CommentLikeSchema,
  },
})
export const unlikeCommentSchema = routeSchema({
  params: CommentParamsSchema,
  response: {
    200: CommentLikeSchema,
  },
})
export const deleteCommentSchema = routeSchema({
  params: CommentParamsSchema,
  response: {
    204: {},
  },
})
