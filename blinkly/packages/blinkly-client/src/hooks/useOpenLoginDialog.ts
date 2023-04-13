import { useCallback } from 'react'
import { useDialog } from '@/contexts/dialogContext'
import { useRouter } from 'next/router'

const descriptionMap = {
  like: 'Sign in or Sign up to interact!',
}
export function useOpenLoginDialog() {
  const router = useRouter()
  const { open } = useDialog()

  const openLoginDialog = useCallback(
    (type: keyof typeof descriptionMap) => {
      const description = descriptionMap[type]
      open({
        title: 'Sign in with blinkly',
        description,
        onConfirm: () => router.push(`/login?next=${router.pathname}`),
      })
    },
    [open, router],
  )

  return openLoginDialog
}
