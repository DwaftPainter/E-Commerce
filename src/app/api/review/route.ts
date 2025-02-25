import { validate } from '@/config/message'
import DBConnect from '@/lib/db'
import ReviewModel from '@/lib/models/review.model'
import UserModel from '@/lib/models/user.model'
import { verifyJWT } from '@/utils/auth'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'

export const POST = async (req: NextRequest) => {
    try {
        await DBConnect()
        const cookie = await cookies()
        const token = cookie.get('token')?.value
        if (!token) {
            return NextResponse.json({ message: validate.user_notfound }, { status: 401 })
        }
        const userId = verifyJWT(token)
        const user = await UserModel.findOne({ _id: userId })
        const body = await req.json()
        const review = await ReviewModel.create({ user: new ObjectId(userId), ...body })

        return NextResponse.json(
            { message: 'succcess', data: { ...review._doc, user: { name: user.name, avatar: user?.avatar } } },
            { status: 200 }
        )
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 })
    }
}
