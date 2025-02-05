import DBConnect from '@/lib/db'
import ProductModel from '@/lib/models/ProductModel'
import { NextRequest, NextResponse } from 'next/server'
import slugify from 'slugify'
import { Product } from '@/lib/models/ProductModel'

export const GET = async () => {
    try {
        await DBConnect()
        const products = await ProductModel.find({})

        return NextResponse.json({ message: 'success', data: products, status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message, status: 404 })
    }
}

export const POST = async (req: NextRequest) => {
    try {
        await DBConnect()
        const body = await req.json()
        // body.forEach((product: Product) => (product.slug = slugify(product.name)))

        const product = await ProductModel.create(body)

        return NextResponse.json({ message: 'success', data: product }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 })
    }
}

export const PUT = async () => {
    try {
        await DBConnect()
        const products = await ProductModel.find({})
        products.forEach(async (product: Product) => {
            await ProductModel.updateOne({ _id: product._id }, { $set: { discount: Math.floor(Math.random() * 100) } })
        })

        return NextResponse.json({ message: 'success' }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 })
    }
}
