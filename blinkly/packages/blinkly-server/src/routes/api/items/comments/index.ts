import { ItemParamType } from './../schema'
import { FastifyPluginAsync } from 'fastify'
import {
  createCommentSchema,
  deleteCommentSchema,
  getCommentSchema,
  getSubcommentSchema,
  likeCommentSchema,
  unlikeCommentSchema,
  updateCommentSchema,
} from './schema.js'
import { createAuthorizedRoute } from '../../../../plugins/requireAuthPlugin.js'
import CommentService from '../../../../services/comment.service.js'

export const commentsRoute: FastifyPluginAsync = async (fastify) => {
  const commentService = CommentService.getInstance()

  fastify.get('/', { schema: getCommentSchema }, async (request) => {
    return commentService.getComments(request.params.id)
  })

  fastify.get('/:commentId', { schema: getCommentSchema }, async (request) => {
    return commentService.getComment(request.params.commentId, true)
  })

  fastify.get(
    '/:commentId/subcomments',
    { schema: getSubcommentSchema },
    async (request) => {
      return commentService.getSubComments(request.params.id)
    },
  )

  fastify.register(authorizedCommentsRoute)
}

const authorizedCommentsRoute = createAuthorizedRoute(async (fastify) => {
  const commentService = CommentService.getInstance()

  fastify.post('/', { schema: createCommentSchema }, async (request) => {
    const { text, parentCommentId } = request.body
    const { id } = request.params
    const userId = request.user?.id!
    return commentService.createComment({
      text,
      itemId: id,
      userId,
      parentCommentId: parentCommentId ?? undefined,
    })
  })

  fastify.post(
    '/:commentId/likes',
    { schema: likeCommentSchema },
    async (request) => {
      const { id, commentId } = request.params
      const userId = request.user?.id!
      const likes = await commentService.likeComment({
        commentId,
        userId,
      })
      return {
        id: commentId,
        likes,
      }
    },
  )

  fastify.delete(
    '/:commentId/likes',
    { schema: unlikeCommentSchema },
    async (request) => {
      const { id, commentId } = request.params
      const userId = request.user?.id!
      const likes = await commentService.unlikeComment({
        commentId: id,
        userId,
      })
      return {
        id: commentId,
        likes,
      }
    },
  )

  fastify.delete(
    '/:commentId',
    { schema: deleteCommentSchema },
    async (request, response) => {
      const { id } = request.params
      const userId = request.user?.id!
      await commentService.deleteComment({
        commentId: id,
        userId,
      })
      response.status(204)
    },
  )

  fastify.patch(
    '/:commentId',
    { schema: updateCommentSchema },
    async (request) => {
      const { commentId } = request.params
      const userId = request.user?.id!
      const { text } = request.body
      await commentService.updateComment({
        commentId,
        userId,
        text,
      } as any)
    },
  )
})
