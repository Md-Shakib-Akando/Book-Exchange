import { NextResponse } from "next/server";
export async function POST() {

    const response = Response.json({
        message: "Logout successful",
    });

    response.cookies.set("token", "", {
        expires: new Date(0),
    });

    return response;
}