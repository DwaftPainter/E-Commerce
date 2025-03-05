import DBConnect from '@/lib/db'
import UserModel from '@/lib/models/user.model'
import { validate } from '@/config/message'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { mailSender } from '@/lib/mailsender'
import { otpEmailTemplate } from '@/utils/otpMailTemplate'

export const POST = async (req: NextRequest) => {
    try {
        await DBConnect()

        const { email } = await req.json()
        const user = await UserModel.findOne({ email: email })
        console.log(user)
        if (!user) {
            return NextResponse.json({ message: validate.user_notfound }, { status: 404 })
        }

        const otp = crypto.randomInt(100000, 999999).toString()
        const hashOpt = await bcrypt.hash(otp, 10)

        const expiredDate = Date.now() + 5 * 60 * 1000
        user.otp = hashOpt
        user.otpExpire = expiredDate
        await user.save()
        console.log("tracker 1")
        mailSender(email, 'Reset Password', undefined, otpEmailTemplate(otp))
        console.log("tracker 2")
        return NextResponse.json({ message: 'success' }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 })
    }
}
