import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    bookId: String,
    ownerEmail: String,

    requesterName: String,
    requesterEmail: String,
    bookTitle: String,
    message: String,

    status: {
        type: String,
        default: "pending"
    },

    createdAt: Date
});

export default mongoose.models.Request ||
    mongoose.model("Request", requestSchema);