import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Request from "@/models/Request";

export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const user = searchParams.get("user");

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User required"
            }, { status: 400 });
        }

        // 🔥 conversation extract from requests
        const requests = await Request.find({
            $or: [
                { ownerEmail: user },
                { requesterEmail: user }
            ]
        }).sort({ createdAt: -1 });

        // 🔥 group by book + user pair (simple conversation logic)
        const conversationsMap = new Map();

        requests.forEach((r) => {

            const key = r.bookId?.toString?.() || r.bookTitle;

            if (!conversationsMap.has(key)) {
                conversationsMap.set(key, {
                    _id: key,
                    user: {
                        name: r.ownerEmail === user
                            ? r.requesterName
                            : r.ownerEmail
                    },
                    lastMessage: {
                        text: r.message
                    }
                });
            }
        });

        return NextResponse.json({
            success: true,
            conversations: Array.from(conversationsMap.values())
        });

    } catch (err) {
        return NextResponse.json({
            success: false,
            error: err.message
        }, { status: 500 });
    }
}