import { AuthBody } from './types.js'
import { loginSchema, registerSchema } from './schema.js'
import { FastifyPluginAsync } from 'fastify'
import UserService from '../../../services/user.service.js'

const authRoute: FastifyPluginAsync = async (fastify) => {
  const userService = UserService.getInstance()

  /** POST LOGIN */
  fastify.post('/login', { schema: loginSchema }, async () => {
    return userService.login()
  })

  /** POST REGISTER */
  fastify.post<{ Body: AuthBody }>(
    '/register',
    {
      schema: registerSchema,
    },
    async (request, reply) => {
      const authResult = await userService.register(request.body)
      return authResult
    },
  )

  /** example of schema tags for swagger */
  // fastify.post(
  //   '/login',
  //   {
  //     schema: {
  //       tags: ['auth', 'user'],
  //     },
  //   },
  //   async () => {
  //     return userService.login()
  //   },
  // )
}
export default authRoute
