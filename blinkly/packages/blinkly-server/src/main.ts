import 'dotenv/config'
import Fastify from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastifyCookie from '@fastify/cookie'
import AppError from './lib/AppError.js'
import { authPlugin } from './plugins/authPlugin.js'
import routes from './routes/index.js'
import { swaggerConfig, swaggerConfigUI } from './swagger/swagger.js'

const server = Fastify({
  logger: true,
})

await server.register(fastifySwagger, swaggerConfig)
await server.register(fastifySwaggerUi, swaggerConfigUI)

server.register(fastifyCookie)

// server.setErrorHandler(async (error, request, reply) => {
//   reply.statusCode = error.statusCode || 500
//   if (error instanceof AppError) {
//     reply.send({
//       errorName: error.name,
//       message: error.message,
//       statusCode: error.statusCode,
//       payload: error.payload,
//     })
//   }
//   // console.log({ name: error.name })
//   return error
// })

server.register(authPlugin)
server.register(routes)

server.listen({ port: 8080 })
