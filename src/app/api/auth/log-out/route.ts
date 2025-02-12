import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const res = NextResponse.json({ message: "success" }, { status: 200 });

        // Delete the token cookie
        res.cookies.delete('token')

        return res;
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
};