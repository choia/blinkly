import { client, setClientCookie } from '@/lib/client'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from './types/authTypes'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const cookie = req.cookies['Cookie']
    if (!cookie) return null

    setClientCookie(cookie)
    const result = await apiGetHandler()
    res.status(200).json(result)
  }
}

const apiGetHandler = async () => {
  const url = 'http://localhost:8080/api/me'
  const response = await client.get<User>(url)
  return response.data
}
