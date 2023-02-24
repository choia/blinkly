import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { extractError } from '@/lib/error'
import { AuthParams, AuthResult } from './types/authTypes'
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary'
import useSWR from 'swr'
import { resourceUsage } from 'process'

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  console.log('@@@@Heloooooooooooo')
  if (req.method === 'POST') {
    const { username, password } = req.body
    if (typeof username !== 'string' || typeof password !== 'string') return

    try {
      const { result, cookieHeader } = await apiPostHandler(req.body)
      const data = result.user

      res.setHeader('Set-Cookie', cookieHeader)
      // return res.status(200).send(data)
      return res.status(200).json(data)
    } catch (e) {
      const error = extractError(e)

      const statusCode = error.statusCode
      // return res.status(statusCode).send({ error, data: { username, password } })
      // return res.status(statusCode).send(error.message)
      return res.status(statusCode).json({ error, data: { username, password } })
    }
  }
}

export const apiPostHandler = async (params: AuthParams) => {
  console.log('helloooooooooooooooo')
  const url = 'http://localhost:8080/api/auth/register'
  const response = await axios.post<AuthResult>(url, params)
  const result = response.data

  const cookieHeader = response.headers['set-cookie']
  if (!cookieHeader || cookieHeader?.length === 0) {
    throw new Error('No cookie header')
  }

  return { result, cookieHeader }
}

export function RegisterSWR() {
  const { data, error } = useSWR('register', apiPostHandler)

  if (error) return 'error has occrrrrrrrrr'
}
