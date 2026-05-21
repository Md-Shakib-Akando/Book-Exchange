import { connectDB } from "@/lib/mongodb";


export async function GET() {
    try {
        const db = await connectDB();

        // simple query
        const collections = await db.listCollections().toArray();

        return Response.json({
            success: true,
            collections,
        });
    } catch (err) {
        return Response.json({ success: false, error: err.message });
    }
}