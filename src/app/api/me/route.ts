import notifications, { validate } from '@/config/message'
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
            return NextResponse.json({ message: validate.user_notfound }, { status: 404 })
        }

        const body = await req.json()
        const updateData = lodash.cloneDeep(user)
        let errors: Record<string, string> = {} 

        // Update only if provided in the request body
        if (body.firstName) updateData.firstName = body.firstName
        if (body.lastName) updateData.lastName = body.lastName

        const email = await UserModel.findOne({ email: body?.email })
        if (email && user.email !== body.email) {
            errors.email = validate.email_already_taken
        } else {
            updateData.email = body?.email
        }

        // Handle password change only if a new password is provided
        if (body?.currentPassword && body?.newPassword) {
            const isMatch = await bcrypt.compare(body.currentPassword, user.password)
            if (!isMatch) {
                errors.password = validate.wrong_password
            }
            updateData.password = await bcrypt.hash(body.newPassword, 10)
        }

        if (Object.keys(errors).length > 0) {
            return NextResponse.json({ errors }, { status: 400 })
        }

        // Save updates to database
        const updatedUser = await UserModel.findOneAndUpdate({ _id: userId }, updateData, {new: true})
            
        return NextResponse.json({ message: notifications.account.successToChangeAccountDetail, data: updatedUser }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
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
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}
