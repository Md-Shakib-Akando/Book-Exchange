import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Request from "@/models/Request";
import Conversation from "@/models/Conversation";
import Message from "@/models/Message";
import Book from "@/models/Book";

export async function GET() {
    try {
        await connectDB();

        const requests = await Request.find()
            .sort({ createdAt: -1 })
            .populate("bookId");

        return NextResponse.json({
            success: true,
            requests,
        });
    } catch (err) {
        return NextResponse.json({
            success: false,
            error: err.message,
        });
    }
}

export async function PATCH(req) {
    await connectDB();

    const { requestId, status, bookId } = await req.json();

    const request = await Request.findByIdAndUpdate(
        requestId,
        { status },
        { new: true }
    );

    // ✅ ACCEPT → create conversation
    if (status === "accepted") {

        await Book.findByIdAndUpdate(bookId, {
            status: "requested",
        });

        const convo = await Conversation.create({
            participants: [
                request.ownerEmail,
                request.requesterEmail,
            ],
            requestId,
            lastMessage: request.message,
        });

        await Message.create({
            conversationId: convo._id,
            senderId: request.requesterEmail,
            text: request.message,
        });
    }

    // ❌ REJECT
    if (status === "rejected") {
        await Book.findByIdAndUpdate(bookId, {
            status: "available",
        });
    }

    // ✅ COMPLETED
    if (status === "completed") {
        await Book.findByIdAndUpdate(bookId, {
            status: "exchanged",
            availability: false,
        });
    }

    return Response.json({ success: true, request });
}


export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();

        const newRequest = await Request.create({
            bookId: body.bookId,
            ownerEmail: body.ownerEmail,

            bookTitle: body.bookTitle,
            requesterName: body.requesterName,
            requesterEmail: body.requesterEmail,

            message: body.message,
            status: "pending",
            createdAt: new Date()
        });

        return NextResponse.json({
            success: true,
            request: newRequest
        });

    } catch (err) {
        return NextResponse.json({
            success: false,
            error: err.message
        });
    }
}