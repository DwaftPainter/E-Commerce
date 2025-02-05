import DBConnect from '@/lib/db'
import ProductModel from '@/lib/models/ProductModel'
import { NextResponse } from 'next/server'

export const GET = async () => {
    try {
        await DBConnect()
        const products = await ProductModel.find({})

        return NextResponse.json({ message: 'success', data: products, status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message, status: 404 })
    }
}