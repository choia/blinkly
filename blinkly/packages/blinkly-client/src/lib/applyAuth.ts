import type { NextApiRequest } from 'next'
import { setClientCookie } from '@/lib/client'

export function applyAuth(req: NextApiRequest) {
  const cookie = req.cookies
  console.log('777777', cookie)
  // if (!cookie || !cookie.includes('token')) {
  if (!cookie || !cookie['access_token']) {
    console.log('no cookie', cookie)
    return false
  }

  setClientCookie(cookie['access_token'])
  return true
}
