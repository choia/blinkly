import type { NextApiRequest } from 'next'
import { applyAuth } from './applyAuth'

export const checkIsLoggedIn = (req) => {
  const applied = applyAuth(req)
  console.log('applied', applied)
  if (!applied) return false
}
