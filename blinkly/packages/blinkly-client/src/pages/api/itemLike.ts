import { client } from '@/lib/client'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { GetItemResult, Item, LikeItemResult } from './types'
import { applyAuth } from '@/lib/applyAuth'
import { extractError } from '@/lib/error'
import { createServerApiConfig } from '@/lib/apiConfig'

export default async function itemLikeHandler(req: NextApiRequest, res: NextApiResponse) {
  // const applied = applyAuth(req)
  // if (!applied) {
  //   throw new Error('Not logged in')
  // }

  const id = req.body['id']
  const cookie = req.body.headers['Authorization']
  const controller = req.body.controller

  if (req.method === 'POST') {
    try {
      const response = await likeItem(id, cookie, controller)

      res.status(200).json(response)
    } catch (e) {
      const error = extractError(e)
      res.status(error.statusCode).json(error)
    }
  } else if (req.method === 'DELETE') {
    try {
      const response = await unlikeItem(id, cookie, controller)

      res.status(200).json(response)
    } catch (e) {
      const error = extractError(e)
      res.status(error.statusCode).json(error)
    }
  }
}

export async function likeItem(itemId: number, cookie: any, controller?: AbortController) {
  const config = createServerApiConfig('post', cookie, controller)

  const response = await client.post<LikeItemResult>(
    `http://localhost:8080/api/items/${itemId}/likes`,
    {},
    config,
  )
  return response.data
}

export async function unlikeItem(itemId: number, cookie: any, controller?: AbortController) {
  const config = createServerApiConfig('delete', cookie, controller)

  const response = await client.delete<LikeItemResult>(
    `http://localhost:8080/api/items/${itemId}/likes`,
    config,
  )
  return response.data
}
