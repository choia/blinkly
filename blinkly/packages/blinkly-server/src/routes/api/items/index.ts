import { FastifyPluginAsync } from 'fastify'
import {
  createAuthorizedRoute,
  requireAuthPlugin,
} from './../../../plugins/requireAuthPlugin.js'
import {
  GetItemRoute,
  GetItemSchema,
  GetItemsRoute,
  GetItemsSchema,
  WriteItemRoute,
  WriteItemSchema,
} from './schema.js'
import ItemService from '../../../services/item.service.js'

const itemsRoute: FastifyPluginAsync = async (fastify) => {
  const itemService = ItemService.getInstance()
  fastify.register(authorizedItemRoute)
  fastify.get<GetItemRoute>(
    '/:id',
    { schema: GetItemSchema },
    async (request) => {
      const { id } = request.params
      const item = await itemService.getItem(id)
      return item
    },
  )

  fastify.get<GetItemsRoute>(
    '/',
    { schema: GetItemsSchema },
    async (request) => {
      const { cursor } = request.query
      return await itemService.getAllItems({
        mode: 'recent',
        cursor: cursor ? parseInt(cursor, 10) : null,
      })
    },
  )
}

const authorizedItemRoute = createAuthorizedRoute(async (fastify) => {
  const itemService = ItemService.getInstance()
  fastify.post<WriteItemRoute>(
    '/',
    { schema: WriteItemSchema },
    async (request) => {
      const item = itemService.createItem(request.user!.id, request.body)
      return item
    },
  )
})

export default itemsRoute
