import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { AuthParams, AuthResult } from './types/authTypes'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { result, cookieHeader } = await apiPostHandler(req.body)
    const { id, username } = result.user

    res.setHeader('Set-Cookie', cookieHeader)
    res.status(200).json({ id, username })
  }
}

const apiPostHandler = async (params: AuthParams) => {
  const url = 'http://localhost:8080/api/auth/login'
  const response = await axios.post<AuthResult>(url, params)
  const result = response.data

  const cookieHeader = response.headers['set-cookie']
  if (!cookieHeader || cookieHeader?.length === 0) {
    throw new Error('No cookie header')
  }

  return { result, cookieHeader }
}
