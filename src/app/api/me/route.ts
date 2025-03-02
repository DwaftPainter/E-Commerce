import { validate } from '@/config/message'
import DBConnect from '@/lib/db'
import UserModel from '@/lib/models/user.model'
import { verifyJWT } from '@/utils/auth'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import lodash from 'lodash'

export const PUT = async (req: NextRequest) => {
    try {
        await DBConnect()
        const cookie = await cookies()
        const token = cookie.get('token')?.value

        if (!token) {
            return NextResponse.json({ message: validate.user_notfound }, { status: 401 })
        }

        const userId = verifyJWT(token)
        const user = await UserModel.findOne({ _id: userId })

        if (!user) {
            return NextResponse.json({ message: 'User not found!' }, { status: 404 })
        }

        const body = await req.json()
        const updateData = lodash.cloneDeep(user)

        // Update only if provided in the request body
        if (body.firstName) updateData.firstName = body.firstName
        if (body.lastName) updateData.lastName = body.lastName

        const email = await UserModel.findOne({ email: body?.email })
        if (email && user.email !== body.email) {
            return NextResponse.json({ message: validate.email_already_taken }, { status: 400 })
        } else {
            updateData.email = body?.email
        }

        // Handle password change only if a new password is provided
        if (body?.currentPassword && body?.newPassword) {
            const isMatch = await bcrypt.compare(body.currentPassword, user.password)
            if (!isMatch) {
                return NextResponse.json({ message: 'Wrong password!' }, { status: 400 })
            }
            updateData.password = await bcrypt.hash(body.newPassword, 10)
        }

        // Save updates to database
        const updateduUser = await UserModel.updateOne({ _id: userId }, updateData)
        
        console.log("🚀 ~ PUT ~ updateduUser:", updateduUser)
        return NextResponse.json({ message: 'Profile updated successfully!' }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 })
    }
}

export const GET = async (req: NextRequest) => {
    try {
        await DBConnect()
        const cookie = await cookies()
        const token = cookie.get('token')?.value
        if (!token) {
            return NextResponse.json({ message: validate.user_notfound }, { status: 401 })
        }
        const userId = verifyJWT(token)
        const user = await UserModel.findOne({ _id: userId })

        return NextResponse.json({ message: 'success', data: user }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 })
    }
}
