import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface Props {
  id: string
  username: string
}
export function useAuthRedirect(user: Props) {
  const router = useRouter()
  console.log('r111', router)
  useEffect(() => {
    if (!user) return
  }, [user])
}
