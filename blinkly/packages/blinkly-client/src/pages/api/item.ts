import { client } from '@/lib/client'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { GetItemResult, Item } from './types'
import { applyAuth } from '@/lib/applyAuth'
import { extractError } from '@/lib/error'

export default async function itemHandler(req: NextApiRequest, res: NextApiResponse) {
  const applied = applyAuth(req)
  if (!applied) {
    throw new Error('Not logged in')
  }

  const cookie = req.body.headers['Authorization']

  if (req.method === 'POST') {
    const config = {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: cookie,
      },
    }
    const url = 'http://localhost:8080/api/items'
    const body = JSON.stringify(req.body)

    try {
      const response = await axios.post<Item>(url, body, config)
      res.status(200).json(response.data)
    } catch (e) {
      const error = extractError(e)
      res.status(error.statusCode).json(error)
    }
  }
}
