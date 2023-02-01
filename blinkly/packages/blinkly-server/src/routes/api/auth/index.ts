import { loginSchema, registerSchema } from './schema.js'
import { FastifyPluginAsync } from 'fastify'
import UserService from '../../../services/user.service.js'

const authRoute: FastifyPluginAsync = async (fastify) => {
  const userService = UserService.getInstance()
  fastify.post('/login', { schema: loginSchema }, async () => {
    return userService.login()
  })

  fastify.post(
    '/register',
    {
      schema: registerSchema,
    },
    async () => {
      return userService.register()
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
