import DBConnect from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
    try {
        await DBConnect()
        const body = await req.json()
        console.log('🚀 ~ POST ~ body:', body)

        return NextResponse.json({ message: "success"}, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 })
    }
}
