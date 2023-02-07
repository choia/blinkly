import { FastifyPluginAsync } from 'fastify'
import { AuthBody } from './types.js'
import UserService from '../../../services/user.service.js'
import { loginSchema, registerSchema } from './schema.js'

const authRoute: FastifyPluginAsync = async (fastify) => {
  const userService = UserService.getInstance()

  /** POST LOGIN */
  fastify.post<{ Body: AuthBody }>(
    '/login',
    { schema: loginSchema },
    async (request, reply) => {
      const loginResult = await userService.login(request.body)
      reply.setCookie('access_token', loginResult.tokens.accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60),
        path: '/',
      })
      reply.setCookie('refresh_token', loginResult.tokens.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        path: '/',
      })
      return loginResult
    },
  )

  /** POST REGISTER */
  fastify.post<{ Body: AuthBody }>(
    '/register',
    {
      schema: registerSchema,
    },
    async (request, reply) => {
      // const authResult = await userService.register(request.body)
      return userService.register(request.body)
    },
  )
}
export default authRoute
