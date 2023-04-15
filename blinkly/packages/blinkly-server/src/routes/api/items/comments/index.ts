import { ItemParamType } from './../schema'
import { FastifyPluginAsync } from 'fastify'
import {
  CreateCommentSchema,
  GetCommentSchema,
  GetCommentsRoute,
} from './schema.js'
import { createAuthorizedRoute } from '../../../../plugins/requireAuthPlugin.js'

export const commentsRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get<GetCommentsRoute>(
    '/',
    { schema: GetCommentSchema },
    async (request) => {},
  )
  fastify.get('/:commentId/subcomments', async () => {})

  fastify.register(authorizedCommentsRoute)
}

const authorizedCommentsRoute = createAuthorizedRoute(async (fastify) => {
  fastify.post('/', { schema: CreateCommentSchema }, async (request) => {})

  fastify.post('/:commentId/likes', async () => {})

  fastify.delete('/:commentId/likes', async () => {})

  fastify.delete('/:commentId', async () => {})
  fastify.patch('/:commentId', async () => {})
})
