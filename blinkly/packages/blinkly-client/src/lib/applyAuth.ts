import type { NextApiRequest } from 'next'
import { setClientCookie } from '@/lib/client'

export function applyAuth(req) {
  const cookie = req.headers.get('Cookie')
  console.log('cookie', cookie)

  if (!cookie || !cookie.includes('token')) {
    return false
  }

  setClientCookie(cookie)
  return true
}
