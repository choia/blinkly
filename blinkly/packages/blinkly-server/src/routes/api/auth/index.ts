import { AuthBody } from './types.js'
import { loginSchema, registerSchema } from './schema.js'
import { FastifyPluginAsync } from 'fastify'
import UserService from '../../../services/user.service.js'

const authRoute: FastifyPluginAsync = async (fastify) => {
  const userService = UserService.getInstance()

  /** POST LOGIN */
  fastify.post<{ Body: AuthBody }>(
    '/login',
    { schema: loginSchema },
    async (request, reply) => {
      // const loginResult = await userService.login(request.body)
      return userService.login(request.body)
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
