import DBConnect from "@/lib/db"
import ProductModel from "@/lib/models/ProductModel"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
    try {
        await DBConnect()
        const slug = req.nextUrl.pathname.split('/').pop()
        const res = await ProductModel.findOne({ slug })

        return NextResponse.json({ message: "success", data: res, status: 200 })
    } catch (error) {
        
    }
}