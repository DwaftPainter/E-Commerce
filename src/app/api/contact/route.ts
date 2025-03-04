import notifications from '@/config/message'
import DBConnect from '@/lib/db'
import ContactModel from '@/lib/models/contact.model'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
    try {
        await DBConnect()
        const body = await req.json()
        await ContactModel.create(body)

        return NextResponse.json({ message: notifications.contact.messageSent }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 })
    }
}
