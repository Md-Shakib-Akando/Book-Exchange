import { connectDB } from "@/lib/mongodb";
import Book from "@/models/Book";

// UPDATE BOOK
export async function PUT(req, { params }) {
    try {
        await connectDB();

        const { id } = await params; // ✅ FIX HERE
        const body = await req.json();

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            body,
            {
                new: true,
                runValidators: true,
            }
        );

        return Response.json({
            message: "Book updated successfully",
            book: updatedBook,
        });

    } catch (error) {
        return Response.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// DELETE BOOK
export async function DELETE(req, { params }) {
    try {
        await connectDB();

        const { id } = await params; // ✅ FIX HERE

        await Book.findByIdAndDelete(id);

        return Response.json({
            message: "Book deleted successfully",
        });

    } catch (error) {
        return Response.json(
            { message: error.message },
            { status: 500 }
        );
    }
}