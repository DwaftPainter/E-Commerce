import { validate } from "@/config/message";
import DBConnect from "@/lib/db";
import UserModel from "@/lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { jwt, verifyJWT } from "@/utils/auth";
import { cookies } from "next/headers";
import ProductModel from "@/lib/models/product.model";
import mongoose from "mongoose";

export const POST = async (req: NextRequest) => {
    try {
        await DBConnect();
        console.log("🚀 ~ ProductModel:", ProductModel);
        console.log(mongoose.models);
        const { email, password } = await req.json();
        const user = await UserModel.findOne({ email: email })
            .populate({ path: "cart.product", model: "Product" })
            .populate({ path: "wishlist", model: "Product" });
        if (!user) {
            return NextResponse.json({ message: validate.user_notfound }, { status: 404 });
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return NextResponse.json({ message: validate.wrong_password }, { status: 401 });
        }

        const token = jwt(user._id);

        const response = NextResponse.json({ message: "success", data: user }, { status: 200 });
        response.cookies.set("token", token, {
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60,
            path: "/"
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
};

export const GET = async () => {
    try {
        const cookie = await cookies();
        const token = cookie.get("token")?.value;
        if (!token) {
            return NextResponse.json({ message: validate.user_notfound }, { status: 401 });
        }
        const userId = verifyJWT(token);
        if (!userId) {
            return NextResponse.json({ message: validate.user_notfound }, { status: 401 });
        }
        const user = await UserModel.findOne({ _id: userId }).populate("cart.product").populate("wishlist");

        return NextResponse.json({ message: "success", data: user }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
};
