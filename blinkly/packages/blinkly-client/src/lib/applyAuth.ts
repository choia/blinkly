import type { NextApiRequest } from 'next'
import { setClientCookie } from '@/lib/client'

export function applyAuth(request: NextApiRequest) {
  // const cookie = request.headers.get('cookie')
  const cookie = request.headers.cookie
  console.log('@@COOKIE', cookie)
  if (!cookie || !cookie.includes('token')) {
    return false
  }

  setClientCookie(cookie)
  return true
}
