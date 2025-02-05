import DBConnect from '@/lib/db'
import EventModel from '@/lib/models/EventModel'
import ProductModel, { Product } from '@/lib/models/ProductModel'
import mongoose from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
    try {
        await DBConnect()
        const body = await req.json()
        body.startDate = new Date(body.startDate)
        body.endDate = new Date(body.endDate)
        console.log(body)
        const event = await EventModel.create(body)

        return NextResponse.json({ message: 'success', data: event, status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message, status: 400 })
    }
}

export const GET = async () => {
    try {
        await DBConnect()
        const event = await EventModel.find({ startDate: { $lte: new Date() }, endDate: { $gt: new Date() } }).limit(1)
        console.log(event)

        const products = (
            await Promise.all(
                event[0].products.map(async (productId: string) => {
                    return await ProductModel.findOne({ _id: new mongoose.Types.ObjectId(productId) })
                })
            )
        ).filter(product => product !== null)
        return NextResponse.json({ message: 'success', data: event, products }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message, status: 400 }, { status: 400 })
    }
}

const eventData = {
    products: [
    "67949761ced51b3a59435f2",
    "6794985bced51b3a59435f2",
    "6794985bced51b3a59435f2",
    "6794985bced51b3a59435f2",
    "6794985bced51b3a59435f2",
    "6794985bced51b3a59435f2"
    ],
    startDate:"2025-01-25T19:00-05:0",
    endDate:"2025-02-21T23:00-05:0"
}
