import { NextRequest, NextResponse } from 'next/server'
import { checkIsLoggedIn } from './lib/protectRoute'

export function middleware(req: NextRequest, res: NextResponse) {}
