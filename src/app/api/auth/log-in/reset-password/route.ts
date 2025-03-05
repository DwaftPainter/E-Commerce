import DBConnect from '@/lib/db'
import UserModel from '@/lib/models/user.model'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
    try {
        await DBConnect()

        const { email, newPassword } = await req.json()
        
        if (!email || !newPassword) {
            return NextResponse.json({ message: "Invalid Request" }, { status: 400 })
        }

        const hashPassword = await bcrypt.hash(newPassword, 10)
        await UserModel.updateOne({ email: email }, { $set: { password: hashPassword } })

        return NextResponse.json({ message: "success" }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 })
    }
}
