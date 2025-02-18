import DBConnect from '@/lib/db'
import ProductModel from '@/lib/models/product.model'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
    try {
        await DBConnect()
        const slug = req.nextUrl.pathname.split('/').pop()
        const product = await ProductModel.findOne({ slug })

        console.log(product)
        return NextResponse.json({ message: 'success', data: product }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 })
    }
}
