import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import jwt from 'jsonwebtoken'
import AppError from '../lib/AppError.js'
import { AccessTokenPayload } from './../lib/tokens'
import { validateToken } from '../lib/tokens.js'

const { JsonWebTokenError } = jwt

const authPluginAsync: FastifyPluginAsync = async (fastify) => {
  fastify.decorateRequest('user', null)
  fastify.decorateRequest('isExpiredToken', false)

  fastify.addHook('preHandler', async (request) => {
    console.log('000000000', request)
    console.log('111111111', request.headers.authorization)

    const token =
      request.headers.authorization?.split('Bearer ')[1] ??
      request.cookies.access_token

    console.log('2222', token)

    if (request.cookies.refresh_token && !token) {
      request.isExpiredToken = true
      return
    }

    if (!token) return

    try {
      const decoded = await validateToken<AccessTokenPayload>(token)

      request.user = {
        id: decoded.userId,
        username: decoded.username,
      }
    } catch (e: any) {
      if (e instanceof JsonWebTokenError) {
        if (e.name === 'TokenExpiredError') {
          request.isExpiredToken = true
        }
      }
    }
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
    isExpiredToken: boolean
  }
}
