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
  const cookie = client.defaults.headers.common['Cookie']
  console.log('000000', cookie)

  if (req.method === 'POST') {
    const id = req.body['param']
    console.log('1111111', id)

    try {
      const response = await likeItem(id)
      console.log('2222222', response)
      res.status(200).json({ hello: 'hello' })
    } catch (e) {
      const error = extractError(e)
      res.status(error.statusCode).json(error)
    }
  } else if (req.method === 'GET') {
  }
}

export async function likeItem(itemId: string) {
  // const data = {
  //   method: 'post',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${cookie}`,
  //   },
  // }

  // const cookie = client.defaults.headers.common['Cookie']
  // console.log('000000', cookie)
  const config = {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${cookie}`,
    },
  }
  const response = await client.post<LikeItemResult>(
    `http://localhost:8080/api/items/${itemId}/likes`,
    config,
  )
  return response.data
}

export async function unlikeItem(itemId: number) {
  const response = await client.delete<LikeItemResult>(`/api/items/${itemId}/likes`)
  return response.data
}
