import fastifySwagger from '@fastify/swagger'
import { swaggerConfig, swaggerConfigUI } from './swagger/swagger.js'
import Fastify from 'fastify'
import routes from './routes/index.js'
import fastifySwaggerUi from '@fastify/swagger-ui'

const server = Fastify({
  logger: true,
})

await server.register(fastifySwagger, swaggerConfig)
await server.register(fastifySwaggerUi, swaggerConfigUI)
server.register(routes)

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
