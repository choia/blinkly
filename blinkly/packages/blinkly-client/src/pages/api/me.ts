import { client, setClientCookie } from '@/lib/client'
import { extractError, isAppError } from '@/lib/error'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { AuthResult } from './types/authTypes'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const cookie = req.headers.cookie
      if (!cookie) return null
      setClientCookie(cookie)
      // console.log('@@cookie', cookie)

      const result = await apiGetHandler()
      const { user, tokens } = result
      console.log('result', user, 'tokens', tokens)
      res.status(200).json(user)
    } catch (e) {
      const error = extractError(e)
      if (error?.name === 'UnauthorizedError') {
        console.log('hi', error.payload)
      }
      return null
      // console.log('@CatchError', e)
    }
  }
}

const apiGetHandler = async () => {
  const url = 'http://localhost:8080/api/me'
  const response = await client.get<AuthResult>(url)
  console.log('@response', response.data)
  return response.data
}
