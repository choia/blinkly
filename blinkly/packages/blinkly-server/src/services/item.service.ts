import db from '../lib/db.js'
import { CreateItemBodyType } from './../routes/api/items/schema.js'
import { createPagination, PaginationOptionType } from '../lib/pagination.js'
import AppError from '../lib/AppError.js'
import { extractPageInfo } from '../lib/extractPageInfo.js'
import { Item, ItemLike, ItemStats } from '@prisma/client'
class ItemService {
  private static instance: ItemService
  public static getInstance() {
    if (!ItemService.instance) {
      ItemService.instance = new ItemService()
    }
    return ItemService.instance
  }

  private async getPublisher({ domain, name, favicon }: GetPublisherParams) {
    const exists = await db.publisher.findUnique({
      where: {
        domain,
      },
    })
    if (exists) {
      return exists
    }
    const publisher = await db.publisher.create({
      data: {
        domain,
        name,
        favicon,
      },
    })
    return publisher
  }

  async createItem(
    userId: number,
    { title, body, link, tags }: CreateItemBodyType,
  ) {
    const info = await extractPageInfo(link)
    const publisher = await this.getPublisher({
      domain: info.domain,
      name: info.publisher,
      favicon: info.favicon,
    })
    const item = await db.item.create({
      data: {
        title,
        body,
        link: info.url,
        userId,
        thumbnail: info.thumbnail,
        author: info.author ?? undefined,
        publisherId: publisher.id,
      },
      include: {
        user: true,
        publisher: true,
      },
    })

    const itemStats = await db.itemStats.create({
      data: {
        itemId: item.id,
      },
    })
    const itemWithItemStats = { ...item, itemStats }

    const itemLikedList = userId
      ? await this.getItemLikedList({ userId, itemIds: [item.id] })
      : null

    return this.mergeItemLiked(itemWithItemStats, itemLikedList?.[item.id])
  }

  async getItem(id: number, userId: number | null = null) {
    const item = await db.item.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        publisher: true,
        itemStats: true,
      },
    })
    if (!item) {
      throw new AppError('NotFoundError')
    }
    const itemLikedList = userId
      ? await this.getItemLikedList({ userId, itemIds: [id] })
      : null

    return this.mergeItemLiked(item, itemLikedList?.[id])
  }

  async getAllItems(
    params: GetAllItemsParams & PaginationOptionType & { userId?: number } = {
      mode: 'recent',
    },
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
            publisher: true,
            itemStats: true,
          },
          take: limit,
        }),
      ])

      const itemLikeList = params.userId
        ? await this.getItemLikedList({
            itemIds: items.map((item) => item.id),
            userId: params.userId,
          })
        : null
      const listWithLiked = items.map((item) =>
        this.mergeItemLiked(item, itemLikeList?.[item.id]),
      )

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
        list: listWithLiked,
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
        publisher: true,
        itemStats: true,
      },
    })
    const itemLikedList = userId
      ? await this.getItemLikedList({ userId, itemIds: [item.id] })
      : null

    return this.mergeItemLiked(updatedItem, itemLikedList?.[item.id])
  }

  async deleteItem({ userId, itemId }: ItemActionParams) {
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

  async countLikes(itemId: number) {
    const count = await db.itemLike.count({
      where: {
        itemId,
      },
    })
    return count
  }
  async updateItemsLike({ itemId, likes }: UpdateItemLikesParams) {
    return db.itemStats.update({
      data: {
        likes,
      },
      where: {
        itemId,
      },
    })
  }

  async likeItem({ userId, itemId }: ItemActionParams) {
    const alreadyLiked = await db.itemLike.findUnique({
      where: {
        itemId_userId: {
          itemId,
          userId,
        },
      },
    })
    if (!alreadyLiked) {
      try {
        await db.itemLike.create({
          data: {
            itemId,
            userId,
          },
        })
      } catch (e) {}
    }
    const likes = await this.countLikes(itemId)
    const itemStats = await this.updateItemsLike({ itemId, likes })
    return itemStats
  }

  async unlikeItem({ userId, itemId }: ItemActionParams) {
    await db.itemLike.delete({
      where: {
        itemId_userId: {
          itemId,
          userId,
        },
      },
    })
    const likes = await this.countLikes(itemId)
    const itemStats = await this.updateItemsLike({ itemId, likes })
    return itemStats
  }

  private async getItemLikedList(params: GetItemLikedParams) {
    const { userId, itemIds } = params
    const list = await db.itemLike.findMany({
      where: {
        userId,
        itemId: {
          in: itemIds,
        },
      },
    })
    return list.reduce((acc, current) => {
      acc[current.itemId] = current
      return acc
    }, {} as Record<number, ItemLike>)
  }

  private mergeItemLiked<T extends Item>(item: T, itemLike?: ItemLike) {
    return {
      ...item,
      isLiked: !!itemLike,
    }
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
  userId: number
  title: string
  body: string
}

interface ItemActionParams {
  itemId: number
  userId: number
}

interface UpdateItemLikesParams {
  itemId: number
  likes: number
}

interface GetPublisherParams {
  domain: string
  name: string
  favicon: string | null
}

interface GetItemLikedParams {
  userId: number
  itemIds: number[]
}

export default ItemService
