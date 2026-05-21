import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {


        await connectDB();
        console.log("✅ DB Connected");

        const body = await req.json();


        const { name, email, password } = body;

        if (!name || !email || !password) {
            return Response.json(
                { message: "Missing fields" },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({ email });
        console.log("Existing:", existingUser);

        if (existingUser) {
            return Response.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });



        return Response.json(
            { message: "User created successfully" },
            { status: 201 }
        );

    } catch (error) {
        console.error("❌ REGISTER ERROR FULL:", error);
        return Response.json(
            { message: error.message },
            { status: 500 }
        );
    }
}