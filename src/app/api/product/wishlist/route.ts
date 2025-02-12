import { validate } from '@/config/message'
import DBConnect from '@/lib/db'
import UserModel from '@/lib/models/UserModel'
import { verifyJWT } from '@/utils/auth'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

export const PUT = async (req: NextRequest) => {
    try {
        await DBConnect()
        const cookie = await cookies()
        const token = cookie.get('token')?.value
        if (!token) {
            return NextResponse.json({ message: validate.user_notfound }, { status: 401 })
        }
        const userId = verifyJWT(token)
        if (!userId) {
            return NextResponse.json({ message: validate.user_notfound }, { status: 401 })
        }
        const user = await UserModel.findOne({ _id: userId })
        if (!user) {
            return NextResponse.json({ message: validate.user_notfound }, { status: 404 })
        }

        const { productId } = await req.json()
        if (!user.wishlist.find((item: mongoose.Types.ObjectId) => item.equals(new ObjectId(productId)))) {
            user.wishlist.push(new ObjectId(productId))
        }
        await user.save()

        return NextResponse.json({ message: 'success' }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 })
    }
}

export const DELETE = async (req: NextRequest) => {
    try {
        await DBConnect()
        const cookie = await cookies()
        const token = cookie.get('token')?.value
        if (!token) {
            return NextResponse.json({ message: validate.user_notfound }, { status: 401 })
        }
        const userId = verifyJWT(token)
        if (!userId) {
            return NextResponse.json({ message: validate.user_notfound }, { status: 401 })
        }
        const user = await UserModel.findOne({ _id: userId })
        if (!user) {
            return NextResponse.json({ message: validate.user_notfound }, { status: 404 })
        }

        const { productId } = await req.json()
        user.wishlist = user.wishlist.filter((_id: mongoose.Types.ObjectId) => !_id.equals(new ObjectId(productId)))
        await user.save()

        return NextResponse.json({ message: 'success' }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 })
    }
}
