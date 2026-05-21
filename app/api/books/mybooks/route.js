import { connectDB } from "@/lib/mongodb";
import Book from "@/models/Book";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const mine = searchParams.get("mine");

        // 🔥 ALL BOOKS
        if (!mine) {
            const books = await Book.find().sort({ createdAt: -1 });
            return Response.json({ books });
        }

        // 🔥 USER BOOKS ONLY
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return Response.json({ message: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const books = await Book.find({ owner: decoded.id });

        return Response.json({ books });

    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}