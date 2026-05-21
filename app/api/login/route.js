import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {

    try {

        await connectDB();

        const body = await req.json();

        const { email, password } = body;

        console.log(email, password);

        const user = await User.findOne({ email });

        if (!user) {

            return NextResponse.json(
                {
                    message: "User not found",
                },
                {
                    status: 400,
                }
            );
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return NextResponse.json(
                {
                    message: "Wrong password",
                },
                {
                    status: 400,
                }
            );
        }

        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        const response = NextResponse.json(
            {
                message: "Login successful",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            },
            {
                status: 200,
            }
        );

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;

    } catch (error) {

        console.log("LOGIN ERROR:", error);

        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}