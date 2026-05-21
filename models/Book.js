import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        author: {
            type: String,
            required: true,
            trim: true,
        },

        genre: {
            type: String,
            required: true,
            enum: [
                "Fiction",
                "Non-Fiction",
                "Fantasy",
                "Sci-Fi",
                "Science",
                "History",
                "Self-Help",
                "Mystery",
                "Romance",
                "Biography",
                "Poetry",
                "Thriller",
                "Children's",
                "Art & Design",
            ],
        },

        condition: {
            type: String,
            required: true,
            enum: [
                "Like New",
                "Very Good",
                "Good",
                "Worn with Love",
            ],
        },

        description: {
            type: String,
            default: "",
        },

        location: {
            type: String,
            default: "",
        },

        image: {
            type: String, // ImgBB URL
            default: "",
        },
        status: {
            type: String,
            default: "available" // available | requested | exchanged
        },
        // future use (important)
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        ownerEmail: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
    }
);

const Book = mongoose.models.Book || mongoose.model("Book", BookSchema);

export default Book;