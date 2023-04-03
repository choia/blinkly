import { useCallback } from 'react'
import { useItemOverride } from '@/contexts/itemStatContext'
import produce from 'immer'
import { ItemStats } from '@/pages/api/types'
import { likeItem } from '@/pages/api/itemLike'

export function useLikeManager() {
  const { actions } = useItemOverride()
  const like = useCallback(
    async (id: number, initialState: ItemStats) => {
      try {
        actions.set(id, {
          itemStats: { ...initialState, likes: initialState.likes + 1 },
          isLiked: true,
        })
        const result = await likeItem(id)
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
    async (id: number, initialState: ItemStats) => {
      try {
        actions.set(id, {
          itemStats: { ...initialState, likes: initialState.likes - 1 },
          isLiked: true,
        })
        const result = await likeItem(id)
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
  return { like, unlike }
}
