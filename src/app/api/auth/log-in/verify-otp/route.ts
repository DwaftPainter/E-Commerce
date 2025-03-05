import DBConnect from '@/lib/db'
import UserModel from '@/lib/models/user.model'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
    try {
        await DBConnect()
        const { email, pin } = await req.json()

        const user = await UserModel.findOne({ email: email })

        if (!user || !user.otp || !user.otpExpire) return NextResponse.json({ message: "Invalid OTP request" }, {status: 400});

        if (Date.now() > user.otpExpire) return NextResponse.json({ message: "OTP expire" }, {status: 400});

        const isValidOtp = bcrypt.compare(pin, user.otp)
        if (!isValidOtp) return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 })

        user.otp = undefined
        user.otpExpire = undefined
        await user.save()

        return NextResponse.json({ message: 'Success' }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 })
    }
}
