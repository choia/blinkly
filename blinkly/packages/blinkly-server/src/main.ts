import fastifySwagger from '@fastify/swagger'
import { swaggerConfig, swaggerConfigUI } from './swagger/swagger.js'
import Fastify from 'fastify'
import routes from './routes/index.js'
import fastifySwaggerUi from '@fastify/swagger-ui'
import db from './lib/db.js'
import AppError from './lib/AppError.js'

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
//     })
//   }
//   console.log({ name: error.name })
//   return error
// })

server.register(routes)

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
