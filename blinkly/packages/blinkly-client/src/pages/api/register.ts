import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { extractError } from '@/lib/error'
import { AuthParams, AuthResult } from './types'

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body
    if (typeof username !== 'string' || typeof password !== 'string') return

    try {
      const { result, cookieHeader } = await apiPostHandler(req.body)
      const data = result.user

      res.setHeader('Set-Cookie', cookieHeader)

      return res.status(200).json(data)
    } catch (e) {
      const error = extractError(e)
      const statusCode = error.statusCode

      return res.status(statusCode).json({ error, formData: { username, password } })
    }
  }
}

export const apiPostHandler = async (params: AuthParams) => {
  const url = 'http://localhost:8080/api/auth/register'
  const response = await axios.post<AuthResult>(url, params)
  const result = response.data

  const cookieHeader = response.headers['set-cookie']
  if (!cookieHeader || cookieHeader?.length === 0) {
    throw new Error('No cookie header')
  }

  return { result, cookieHeader }
}
