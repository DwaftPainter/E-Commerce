import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value
    if (!token) {
        console.log('🚀 ~ middleware ~ redirect:', token)
        return NextResponse.redirect(new URL('/auth/sign-up', req.url))
    }

    console.log('🚀 ~ middleware ~ token:', token)
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/checkout/:path*',
        '/my-account/:path*',
        '/contact/:path*',
        '/wishlist',
        '/cart',
    ]
}
