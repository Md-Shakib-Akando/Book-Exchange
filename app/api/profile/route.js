import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function PUT(req) {
    try {
        await connectDB();

        // ✅ FIXED
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return Response.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const body = await req.json();

        const updatedUser = await User.findByIdAndUpdate(
            decoded.id,
            {
                name: body.name,
                location: body.location,
                bio: body.bio,
                profileImage: body.profileImage,
            },
            { new: true }
        ).select("-password");

        return Response.json({
            message: "Profile updated successfully",
            user: updatedUser,
        });

    } catch (error) {
        return Response.json(
            { message: error.message },
            { status: 500 }
        );
    }
}