import { NextRequest, NextResponse } from 'next/server'
import { jwt } from '@/utils/auth'
import DBConnect from '@/lib/db'
import UserModel from '@/lib/models/user.model'
import { validate } from '@/config/message'

export const POST = async (req: NextRequest) => {
    try {
        await DBConnect()
        const body = await req.json()
        const user = await UserModel.findOne({ email: body.email })
        if (user) {
            throw new Error(validate.email_already_taken)
        }

        const newUser = await UserModel.create(body)
        const token = jwt(newUser._id)

        const response = NextResponse.json({ message: 'success', token: token }, { status: 200 })
        response.cookies.set('token', token, {
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60,
            path: "/"
        })

        return response
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 })
    }
}
