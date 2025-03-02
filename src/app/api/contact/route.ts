import DBConnect from "@/lib/db";
import ContactModel from "@/lib/models/contact.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        await DBConnect()
        const body = await req.json()

        const res = await ContactModel.create(body)
        console.log(res)
        return NextResponse.json({message: "success"}, { status: 200 })       
    } catch (error: any) {
        return NextResponse.json({error: error.message}, { status: 400 })       
    }
}