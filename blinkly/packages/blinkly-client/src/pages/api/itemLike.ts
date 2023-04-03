import { client } from '@/lib/client'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { GetItemResult, Item, LikeItemResult } from './types'
import { applyAuth } from '@/lib/applyAuth'
import { extractError } from '@/lib/error'
import qs from 'qs'

export default async function itemLikeHandler(req: NextApiRequest, res: NextApiResponse) {
  // const applied = applyAuth(req)
  // if (!applied) {
  //   throw new Error('Not logged in')
  // }

  if (req.method === 'POST') {
    const id = req.body['param']

    try {
      const response = await likeItem(id)

      res.status(200).json({ hello: 'hello' })
    } catch (e) {
      const error = extractError(e)
      res.status(error.statusCode).json(error)
    }
  } else if (req.method === 'GET') {
  }
}

export async function likeItem(itemId: string | number) {
  // const data = {
  //   method: 'post',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${cookie}`,
  //   },
  // }

  // const cookie = client.defaults.headers.common['Cookie']

  const parsedItemId = typeof itemId === 'string' ? itemId : itemId.toString()

  const config = {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${cookie}`,
    },
  }
  const response = await client.post<LikeItemResult>(
    `http://localhost:8080/api/items/${parsedItemId}/likes`,
    config,
  )
  return response.data
}

export async function unlikeItem(itemId: number) {
  const response = await client.delete<LikeItemResult>(`/api/items/${itemId}/likes`)
  return response.data
}
