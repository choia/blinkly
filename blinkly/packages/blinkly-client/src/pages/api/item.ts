import { applyAuth } from '@/lib/applyAuth'
import { checkIsLoggedIn } from '@/lib/protectRoute'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { Item } from './types'

export default async function itemHandler(req: NextApiRequest, res: NextApiResponse) {
  const applied = applyAuth(req)
  if (!applied) {
    throw new Error('Not logged in')
  }

  const cookie = req.body.headers['Authorization']
  // console.log('33333', cookie)

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
    const response = await axios.post<Item>(url, body, config)
    // console.log(response.data)

    res.status(200).json(response.data)
  }
}
