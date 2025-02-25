import { validate } from '@/config/message'
import DBConnect from '@/lib/db'
import ReviewModel from '@/lib/models/review.model'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
    try {
        await DBConnect()
        const cookie = await cookies()
        const token = cookie.get('token')?.value
        if (!token) {
            return NextResponse.json({ message: validate.user_notfound }, { status: 401 })
        }
        const _id = req.nextUrl.pathname.split('/').pop()
        const reviews = await ReviewModel.find({productId: _id}).populate('user', 'name avatar')

        return NextResponse.json({ message: 'succcess', reviews }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 })
    }
}
