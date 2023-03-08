import {
  createAuthorizedRoute,
  requireAuthPlugin,
} from './../../../plugins/requireAuthPlugin.js'
import { WriteItemRoute, writeItemSchema } from './schema.js'
import { FastifyPluginAsync } from 'fastify'
import ItemService from '../../../services/item.service.js'

const itemsRoute: FastifyPluginAsync = async (fastify) => {
  fastify.register(authorizedItemRoute)
  fastify.get('/', async () => {
    return 'holalal'
  })
}

const authorizedItemRoute = createAuthorizedRoute(async (fastify) => {
  const itemService = ItemService.getInstance()
  fastify.post<WriteItemRoute>(
    '/',
    { schema: writeItemSchema },
    async (request) => {
      const item = itemService.createItem(request.user!.id, request.body)
      return item
    },
  )
})

export default itemsRoute
