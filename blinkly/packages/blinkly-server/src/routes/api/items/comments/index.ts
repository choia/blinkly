import { ItemParamType } from './../schema'
import { FastifyPluginAsync } from 'fastify'
import {
  CreateCommentSchema,
  GetCommentSchema,
  GetCommentsRoute,
} from './schema.js'
import { createAuthorizedRoute } from '../../../../plugins/requireAuthPlugin.js'
import CommentService from '../../../../services/comment.service.js'

export const commentsRoute: FastifyPluginAsync = async (fastify) => {
  const commentService = CommentService.getInstance()

  fastify.get('/', { schema: GetCommentSchema }, async (request) => {
    return commentService.getComments(request.params.id)
  })
  fastify.get('/:commentId/subcomments', async (request) => {
    return commentService.getSubComments(request.params.id)
  })

  fastify.register(authorizedCommentsRoute)
}

const authorizedCommentsRoute = createAuthorizedRoute(async (fastify) => {
  const commentService = CommentService.getInstance()

  fastify.post('/', { schema: CreateCommentSchema }, async (request) => {
    const { text, parentCommentId } = request.body
    const { id } = request.params
    const userId = request.user?.id
    return commentService.createCommment({
      text,
      itemId: id,
      userId,
      parentCommentId: parentCommentId ?? undefined,
    })
  })

  fastify.post('/:commentId/likes', async (request) => {
    const { id } = request.params
    const userId = request.user?.id
    return commentService.likeComment({
      commentId: id,
      userId,
    })
  })

  fastify.delete('/:commentId/likes', async (request) => {
    const { id } = request.params
    const userId = request.user?.id
    return commentService.unlikeComment({
      commentId: id,
      userId,
    })
  })

  fastify.delete('/:commentId', async (request) => {
    const { id } = request.params
    const userId = request.user?.id
    await commentService.deleteComment({
      commentId: id,
      userId,
    })
  })

  fastify.patch('/:commentId', async (request) => {
    const { id } = request.params
    const userId = request.user?.id
    const { text } = request.body
    await commentService.updateComment({
      commentId: id,
      userId,
      text,
    })
  })
})
