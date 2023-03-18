import { User } from '../pages/api/types'
import { createContext, useContext, useState } from 'react'

interface Props {
  children: React.ReactNode
}

export const UserContext = createContext<User | null | undefined>(undefined)

export function useUser() {
  const user = useContext(UserContext)
  // if (user === undefined) {
  //   throw new Error('UserContext.Provider is not used')
  // }
  return user
}
