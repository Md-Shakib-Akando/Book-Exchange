import { NextResponse } from "next/server";
import Request from "@/models/Request";
import Book from "@/models/Book"; // ❗ MISSING ছিল
import { connectDB } from "@/lib/mongodb";

export async function PATCH(req) {
    try {
        await connectDB();

        const body = await req.json();
        const { requestId, status, bookId } = body;

        // 1. update request
        const updated = await Request.findByIdAndUpdate(
            requestId,
            { status },
            { new: true }
        );

        // 2. status flow control
        if (status === "accepted") {
            await Book.findByIdAndUpdate(bookId, {
                status: "requested",
                availability: true
            });
        }

        if (status === "completed") {
            await Book.findByIdAndUpdate(bookId, {
                status: "exchanged",
                availability: false
            });
        }

        if (status === "rejected") {
            await Book.findByIdAndUpdate(bookId, {
                status: "available",
                availability: true
            });
        }

        return NextResponse.json({
            success: true,
            request: updated
        });

    } catch (err) {
        return NextResponse.json({
            success: false,
            error: err.message
        });
    }
}