import DBConnect from '@/lib/db'
import ProductModel from '@/lib/models/product.model'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
    try {
        await DBConnect()
        const slug = req.nextUrl.pathname.split('/').pop()
        const product = await ProductModel.findOne({ slug })
        const relatedProduct = await ProductModel.find({
            $or: [{ category: product.category }, { brand: product.brand }],
            _id: { $ne: product._id },
            countInStock: { $gt: 0 },
        }).limit(5);

        return NextResponse.json({ message: 'success', data: product, relatedProduct: relatedProduct}, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 })
    }
}
