import type { NextApiRequest } from 'next'
import { applyAuth } from './applyAuth'

export const checkIsLoggedIn = async (request: NextApiRequest) => {
  const applied = applyAuth(request)
  if (!applied) return false
}
