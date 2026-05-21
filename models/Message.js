import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
        },
        senderId: String,
        text: String,
    },
    { timestamps: true }
);

export default mongoose.models.Message ||
    mongoose.model("Message", messageSchema);