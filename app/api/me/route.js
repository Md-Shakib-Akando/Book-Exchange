import jwt from "jsonwebtoken";

export async function GET(req) {
    try {
        const token = req.cookies.get("token")?.value;

        if (!token) {
            return Response.json({
                user: null,
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        return Response.json({
            user: decoded,
        });
    } catch (error) {
        return Response.json({
            user: null,
        });
    }
}