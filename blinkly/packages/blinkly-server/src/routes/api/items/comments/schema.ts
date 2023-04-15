import { Static, Type } from '@sinclair/typebox'
import { FastifySchema } from 'fastify'
import { Nullable } from './../../../../lib/typebox.js'
import { ItemParamSchema, ItemParamType } from '../schema.js'

const CreateCommentBodySchema = Type.Object({
  text: Type.String(),
  parentCommentId: Nullable(Type.Integer()),
})

type CreateCommentBodyType = Static<typeof CreateCommentBodySchema>

const CommentParamsSchema = Type.Object({
  id: Type.Integer(),
  commentId: Type.Integer(),
})

type GetSubCommentsParamsType = Static<typeof CommentParamsSchema>

export const GetCommentSchema: FastifySchema = {
  params: ItemParamSchema,
}

export type GetCommentsRoute = {
  Params: ItemParamType
}

export const CreateCommentSchema: FastifySchema = {
  params: ItemParamSchema,
  body: CreateCommentBodySchema,
}

// export type CreateCommentRoute = {
//   Params: ItemParamType
//   Body: CreateCommentBodyType
// }

export type CommentsRoute = {
  CreateComment: {
    Param: ItemParamType
    Body: CreateCommentBodyType
  }
  Getcomments: {}
  GetSubcomments: {}
}
