import { authPlugin } from './plugins/authPlugin.js'
import fastifySwagger from '@fastify/swagger'
import { swaggerConfig, swaggerConfigUI } from './swagger/swagger.js'
import Fastify from 'fastify'
import routes from './routes/index.js'
import fastifySwaggerUi from '@fastify/swagger-ui'
import AppError from './lib/AppError.js'
import 'dotenv/config'

const server = Fastify({
  logger: true,
})

await server.register(fastifySwagger, swaggerConfig)
await server.register(fastifySwaggerUi, swaggerConfigUI)

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

// server.listen({ port: 8080 }, (err, address) => {
//   if (err) {
//     console.error(err)
//     process.exit(1)
//   }
//   console.log(`Server listening at ${address}`)
// })
