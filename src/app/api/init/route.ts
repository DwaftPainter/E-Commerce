import { validate } from '@/config/message'
import DBConnect from '@/lib/db'
import UserModel from '@/lib/models/user.model'
import { NextResponse } from 'next/server'
import { verifyJWT } from '@/utils/auth'
import { cookies } from 'next/headers'
import ProductModel from '@/lib/models/product.model'

export const GET = async () => {
    try {
        await DBConnect()

        const cookie = await cookies()
        const token = cookie.get('token')?.value
        let user
        if (token) {
            const userId = verifyJWT(token)
            user = await UserModel.findOne({ _id: userId }).populate('cart.product').populate('wishlist')
        }

        const featuredProducts = await ProductModel.find({ isFeatured: true }).limit(3)
        const remainingProducts = await ProductModel.find({
            _id: { $nin: featuredProducts.map(p => p._id) } // Avoid duplicates
        }).limit(10 - featuredProducts.length)

        const products = [...featuredProducts, ...remainingProducts]

        return NextResponse.json({ message: 'success', data: { user, products } }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 })
    }
}
