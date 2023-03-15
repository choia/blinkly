import { NextRequest, NextResponse } from 'next/server'
import { checkIsLoggedIn } from './lib/protectRoute'

export function middleware(request: NextRequest) {
  // console.log('@@request', request)
  const isLoggedIn = checkIsLoggedIn(request)
  console.log('middleware', isLoggedIn)
  console.log('url', request.url)
  if (!isLoggedIn) return
  // return NextResponse.redirect(new URL('/login?next=/write', request.url))

  // const allCookies = request.cookies.getAll()
  // console.log(allCookies)
}
