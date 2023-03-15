import { checkIsLoggedIn } from '@/lib/protectRoute'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function writeHandler(req: NextApiRequest, res: NextApiResponse) {
  console.log('!@#', req)

  // const isLoggedIn = await checkIsLoggedIn(req)
  // console.log(isLoggedIn)
  // return isLoggedIn
}
