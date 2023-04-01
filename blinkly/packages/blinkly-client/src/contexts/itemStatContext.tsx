import { ItemStats } from '@/pages/api/types'
import { createContext, useContext, useMemo, useState } from 'react'

interface ItemStatContextState {
  [key: number]: ItemStats
}

interface ItemStatContextActions {
  set(itemId: number, itemStats: ItemStats): void
}

interface ItemStatContextType {
  state: ItemStatContextState
  actions: ItemStatContextActions
}

interface Props {
  children: React.ReactNode
}

const ItemStatContext = createContext<ItemStatContextType | null>(null)

export function ItemStatProvider({ children }: Props) {
  const [state, setState] = useState<ItemStatContextState>({})

  const actions: ItemStatContextActions = useMemo(
    () => ({
      set(itemId, itemStats) {
        setState((prev) => ({
          ...prev,
          [itemId]: itemStats,
        }))
      },
    }),
    [],
  )

  return <ItemStatContext.Provider value={{ state, actions }}>{children}</ItemStatContext.Provider>
}

export function useItemStatContext() {
  const context = useContext(ItemStatContext)
  if (context === null) {
    throw new Error('itemStatContext.Provider not provided')
  }
  return context
}

export function useItemStatById(itemId: number): ItemStats | undefined {
  const { state } = useItemStatContext()
  return state[itemId]
}
