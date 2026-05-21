import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Message from "@/models/Message";


// 🔥 GET messages
export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const conversationId = searchParams.get("conversationId");

        if (!conversationId) {
            return NextResponse.json({
                success: false,
                message: "conversationId required"
            }, { status: 400 });
        }

        const messages = await Message.find({ conversationId })
            .sort({ createdAt: 1 });

        return NextResponse.json({
            success: true,
            messages
        });

    } catch (err) {
        return NextResponse.json({
            success: false,
            error: err.message
        }, { status: 500 });
    }
}


// 🔥 POST message
export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();

        const newMessage = await Message.create(body);

        return NextResponse.json({
            success: true,
            message: newMessage
        });

    } catch (err) {
        return NextResponse.json({
            success: false,
            error: err.message
        }, { status: 500 });
    }
}