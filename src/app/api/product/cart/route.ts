import { validate } from '@/config/message'
import DBConnect from '@/lib/db'
import UserModel from '@/lib/models/user.model'
import { verifyJWT } from '@/utils/auth'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { CartType } from '@/types/cart.type'

export const GET = async (req: NextRequest) => {
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
        const user = await UserModel.findOne({ _id: userId }).populate('cart.product')

        return NextResponse.json({ message: 'success', data: user.cart }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 })
    }
}

export const POST = async (req: NextRequest) => {
    try {
        await DBConnect()
        //Auth
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

        //Update Cart
        const body = await req.json()
        const { productId, quantity } = body
        const cartItem = user.cart.find((item: any) => item.product._id.equals(new ObjectId(productId)))

        if (cartItem) {
            cartItem.quantity = quantity
        } else {
            user.cart.push({ product: productId, quantity })
        }
        await user.save()

        return NextResponse.json({ message: 'success', data: user.cart }, { status: 200 })
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

        const body = await req.json()
        console.log('🚀 ~ DELETE ~ body:', body)

        const { productId } = body

        if (!productId) {
            user.cart = []
        } else {
            const stringToObjectId = new ObjectId(productId)
            const cartItem = user.cart.find((item: any) => item.product._id.equals(stringToObjectId))

            if (cartItem) {
                user.cart = user.cart.filter((item: any) => !item.product._id.equals(stringToObjectId))
            }
        }

        await user.save()
        const updatedUser = await UserModel.findOne({ _id: userId }).populate('cart.product')

        return NextResponse.json({ message: 'success', data: updatedUser.cart }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 })
    }
}

export const PUT = async (req: NextRequest) => {
    try {
        await DBConnect()
        //Auth
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

        //Update Cart
        const { updatedCartItems } = await req.json()
        const updatedCartItemsId = updatedCartItems?.map((item: CartType) => {
            return { product: item?.product?._id, quantity: item?.quantity }
        })
        user.cart = updatedCartItemsId
        console.log("🚀 ~ PUT ~ updatedCartItemsId:", updatedCartItemsId)
        if (updatedCartItemsId.length > 0) {
            user.wishlist = []
        }
        await user.save()

        return NextResponse.json({ message: 'success', data: user.cart }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 })
    }
}
