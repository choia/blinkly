import { client } from '@/lib/client'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { GetItemResult, Item } from './types'
import { applyAuth } from '@/lib/applyAuth'
import { extractError } from '@/lib/error'
import qs from 'qs'

export default async function itemHandler(req: NextApiRequest, res: NextApiResponse) {
  const applied = applyAuth(req)
  if (!applied) {
    throw new Error('Not logged in')
  }

  if (req.method === 'POST') {
    const cookie = req.body.headers['Authorization']
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
  } else if (req.method === 'GET') {
    const cursor = req.query['endCursor'] as string

    const parsedCursor = cursor !== undefined ? parseInt(cursor, 10) : undefined
    const data = await getItems(parsedCursor)

    res.status(200).json(data)
  }
}

export async function getItems(cursor: number | undefined) {
  const url = 'http://localhost:8080/api/items'

  const response = await axios.get<GetItemResult>(
    url.concat(
      qs.stringify(
        {
          cursor,
        },
        {
          addQueryPrefix: true,
        },
      ),
    ),
  )

  return response.data
}
