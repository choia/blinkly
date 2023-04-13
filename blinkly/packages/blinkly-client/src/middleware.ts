import { NextRequest, NextResponse } from 'next/server'
import { checkIsLoggedIn } from './lib/protectRoute'

export function middleware(req: NextRequest, res: NextResponse) {
  // console.log('middle11111', req)
  // console.log('middle22222', res)
}
