import { AccessTokenPayload } from './../lib/tokens'
import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'
import { validateToken } from '../lib/tokens.js'
import { JsonWebTokenError } from 'jsonwebtoken'

const authPluginAsync: FastifyPluginAsync = async (fastify) => {
  fastify.decorateRequest('user', null)
  fastify.addHook('preHandler', async (request) => {
    const { authorization } = request.headers
    if (!authorization || !authorization.includes('Bearer ')) {
      return
    }
    const token = authorization.split('Bearer ')[1]
    console.log('HI!! ' + token)
    try {
      const decoded = await validateToken<AccessTokenPayload>(token)
      console.log(decoded)
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        if (e.name === 'TokenExpiredError') {
          // handle token expired
        }
      }
    }

    console.log('helllooooooo')
  })
}

export const authPlugin = fp(authPluginAsync, {
  name: 'authPlugin',
})

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      id: number
      username: string
    } | null
  }
}
