import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    console.log('Verify')
    const token = req.cookies.get('token')?.value
    if (!token) {
        return NextResponse.redirect(new URL('/auth/sign-up', req.url))
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY!)
        return NextResponse.next()
    } catch (error: any) {
        return NextResponse.redirect(new URL('/auth/sign-up', req.url))
    }
}

export const config = {
    matcher: '/cart/test'
}