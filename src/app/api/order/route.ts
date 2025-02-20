import { validate } from '@/config/message'
import DBConnect from '@/lib/db'
import OrderModel from '@/lib/models/order.model'
import { verifyJWT } from '@/utils/auth'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
    try {
        await DBConnect()
        const cookie = await cookies()
        const token = cookie.get('token')?.value
        if (!token) {
            return NextResponse.json({ message: validate.user_notfound }, { status: 401 })
        }
        const userId = verifyJWT(token)
        const body = await req.json()

        const order = await OrderModel.create({ ...body, userId })
        
        return NextResponse.json({ message: 'success', data: order }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 })
    }
}
