import authRoute from './auth/index.js'
import meRoute from './me/index.js'
import { FastifyPluginAsync } from 'fastify'

const api: FastifyPluginAsync = async (fastify) => {
  fastify.register(authRoute, { prefix: '/auth' })
  fastify.register(meRoute, { prefix: '/me' })
}

export default api
