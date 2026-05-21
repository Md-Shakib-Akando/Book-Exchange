import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
    {
        participants: [
            {
                type: String, // email or userId
                required: true,
            },
        ],
        requestId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Request",
        },
        lastMessage: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

export default mongoose.models.Conversation ||
    mongoose.model("Conversation", conversationSchema);