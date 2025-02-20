import { validate } from "@/config/message";
import DBConnect from "@/lib/db";
import OrderModel from "@/lib/models/order.model";
import { verifyJWT } from "@/utils/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        await DBConnect();
        const cookie = await cookies();
        const token = cookie.get("token")?.value;
        if (!token) {
            return NextResponse.json({ message: validate.user_notfound }, { status: 401 });
        }
        const userId = verifyJWT(token);
        const body = await req.json();

        const order = await OrderModel.create({ ...body, userId });

        return NextResponse.json({ message: "success", data: order }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
};

export const GET = async (req: NextRequest) => {
    try {
        await DBConnect();
        const cookie = await cookies();
        const token = cookie.get("token")?.value;
        if (!token) {
            throw new Error("Unauthorized!");
        }
        const userId = verifyJWT(token);
        const { searchParams } = new URL(req.url);
        console.log(req.url)
        const orderId = searchParams.get("orderId") || null;

        const order = orderId
            ? await OrderModel.findOne({ _id: orderId, userId: userId }).populate('items.product')
            : await OrderModel.find({ userId: userId });

        return NextResponse.json({ message: "success", data: order }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
};
