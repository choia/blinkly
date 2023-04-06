import axios from 'axios'
import { useCallback, useRef } from 'react'
import { useItemOverride } from '@/contexts/itemOverrideContext'
import { ItemStats, LikeItemResult } from '@/pages/api/types'
import { createClientApiConfig, createItemLikeApiData } from '@/lib/apiConfig'

export function useLikeManager() {
  const { actions } = useItemOverride()
  const abortControllers = useRef(new Map<number, AbortController>()).current
  const like = useCallback(
    async (id: number, initialState: ItemStats, cookies: any) => {
      const prevController = abortControllers.get(id)
      try {
        prevController?.abort()
        actions.set(id, {
          itemStats: { ...initialState, likes: initialState.likes + 1 },
          isLiked: true,
        })

        const cookie = cookies['access_token']
        const data = createItemLikeApiData(id, cookie)
        const config = createClientApiConfig('/api/itemLike', 'post', cookie, data)

        const controller = new AbortController()
        abortControllers.set(id, controller)

        const config2 = { ...config, controller }
        const resultData = await axios<LikeItemResult>(config2)

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
        const data = createItemLikeApiData(id, cookie)
        const config = createClientApiConfig('/api/itemLike', 'delete', cookie, data)

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
