import db from '../lib/db.js'
import { CreateItemBodyType } from './../routes/api/items/schema.js'
import { createPagination, PaginationOptionType } from '../lib/pagination.js'
import AppError from '../lib/AppError.js'
class ItemService {
  private static instance: ItemService
  public static getInstance() {
    if (!ItemService.instance) {
      ItemService.instance = new ItemService()
    }
    return ItemService.instance
  }

  async createItem(
    userId: number,
    { title, body, link, tags }: CreateItemBodyType,
  ) {
    console.log('1212121212', userId, body)
    const item = await db.item.create({
      data: {
        title,
        body,
        link,
        userId,
      },
      include: {
        user: true,
      },
    })
    return item
  }

  async getItem(id: number) {
    const item = await db.item.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    })
    if (!item) {
      throw new AppError('NotFoundError')
    }
    return item
  }

  async getAllItems(
    params: GetAllItemsParams & PaginationOptionType = { mode: 'recent' },
  ) {
    const limit = params.limit ?? 20
    if (params.mode === 'recent') {
      const [totalCount, items] = await Promise.all([
        db.item.count(),
        db.item.findMany({
          where: {
            id: params.cursor
              ? {
                  lt: params.cursor,
                }
              : undefined,
          },
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            user: true,
          },
          take: limit,
        }),
      ])

      const endCursor = items.at(-1)?.id ?? null
      const hasNextPage = endCursor
        ? (await db.item.count({
            where: {
              id: {
                lt: endCursor,
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
          })) > 0
        : false

      return createPagination({
        list: items,
        totalCount: totalCount,
        pageInfo: {
          endCursor: endCursor,
          hasNextPage: hasNextPage,
        },
      })
    }
    return []
  }

  async updateItem({ itemId, userId, title, body }: UpdateItemParams) {
    const item = await this.getItem(itemId)
    if (item.userId !== userId) {
      throw new AppError('ForbiddenError')
    }
    const updatedItem = await db.item.update({
      where: {
        id: itemId,
      },
      data: {
        title,
        body,
      },
      include: {
        user: true,
      },
    })
    return updatedItem
  }

  async deleteItem({ userId, itemId }: DeleteItemParams) {
    const item = await this.getItem(itemId)
    if (item.userId !== userId) {
      throw new AppError('ForbiddenError')
    }
    await db.item.delete({
      where: {
        id: itemId,
      },
    })
  }
}

type GetAllItemsParams =
  | {
      mode: 'trending' | 'recent'
    }
  | {
      mode: 'past'
      date: string
    }

interface UpdateItemParams {
  itemId: number
  userId: number | undefined
  title: string
  body: string
}

interface DeleteItemParams {
  itemId: number
  userId: number | undefined
}

export default ItemService
