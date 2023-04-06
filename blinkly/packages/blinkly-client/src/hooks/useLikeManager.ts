import axios from 'axios'
import { useCallback } from 'react'
import { useItemOverride } from '@/contexts/itemOverrideContext'
import { ItemStats, LikeItemResult } from '@/pages/api/types'

export function useLikeManager() {
  const { actions } = useItemOverride()
  const like = useCallback(
    async (id: number, initialState: ItemStats, cookies: any) => {
      try {
        actions.set(id, {
          itemStats: { ...initialState, likes: initialState.likes + 1 },
          isLiked: true,
        })

        const cookie = cookies['access_token']

        const data = {
          id,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookie}`,
          },
        }
        const config = {
          url: '/api/itemLike',
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: cookie,
          },
          data,
        }
        const resultData = await axios<LikeItemResult>(config)

        const result = resultData.data
        actions.set(id, {
          itemStats: result.itemStats,
          isLiked: true,
        })
      } catch (e) {
        console.error(e)
      }
    },
    [actions],
  )
  const unlike = useCallback(
    async (id: number, initialState: ItemStats, cookies: any) => {
      try {
        actions.set(id, {
          itemStats: { ...initialState, likes: initialState.likes - 1 },
          isLiked: false,
        })

        const cookie = cookies['access_token']
        const data = {
          id,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookie}`,
          },
        }
        const config = {
          url: '/api/itemLike',
          method: 'delete',
          headers: {
            Authorization: cookie,
            'Content-Type': 'application/json',
          },
          data,
        }
        const resultData = await axios<LikeItemResult>(config)

        const result = resultData.data
        actions.set(id, {
          itemStats: result.itemStats,
          isLiked: false,
        })
      } catch (e) {
        console.error(e)
      }
    },
    [actions],
  )
  return { like, unlike }
}
