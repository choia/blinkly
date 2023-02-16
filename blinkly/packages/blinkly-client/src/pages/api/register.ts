// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: string
// }

export default function RegisterHander(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { username, password } = req.body

  res.status(200).json({ username, password })
}
