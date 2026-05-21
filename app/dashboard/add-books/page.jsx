"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const GENRES = [
    "Fiction", "Non-Fiction", "Fantasy", "Sci-Fi", "Science", "History",
    "Self-Help", "Mystery", "Romance", "Biography", "Poetry", "Thriller",
    "Children's", "Art & Design",
];

const CONDITIONS = [
    "Like New", "Very Good", "Good", "Worn with Love",
];

export default function AddBookPage() {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        title: "",
        author: "",
        genre: "Fiction",
        condition: "Good",
        description: "",
        location: "",
        image: "", // will store URL after upload
    });

    const [file, setFile] = useState(null);

    const update = (key, val) => {
        setForm((f) => ({
            ...f,
            [key]: val,
        }));
    };

    // ✅ Upload to ImgBB
    const uploadToImgBB = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch(
            `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await res.json();

        if (!data.success) {
            throw new Error("Image upload failed");
        }

        return data.data.url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            let imageUrl = "";

            // 1️⃣ Upload image first if file selected
            if (file) {
                imageUrl = await uploadToImgBB(file);
            }

            // 2️⃣ Send book data
            const res = await fetch("/api/books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...form,
                    image: imageUrl,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Book added successfully");
                router.push("/dashboard/my-books");
            } else {
                alert(data.message);
            }

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto">

            {/* Header */}
            <div className="mb-8">
                <h1 className="font-serif text-2xl text-[#f5efe3]">
                    Add a New Book
                </h1>
                <p className="text-[#7a7060] text-sm mt-1">
                    List a book you&apos;d like to exchange with the community.
                </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Title + Author */}
                <div className="grid md:grid-cols-2 gap-5">

                    <div>
                        <label className="text-xs tracking-widest text-[#b8933a] uppercase mb-1 block">
                            Title *
                        </label>
                        <input
                            value={form.title}
                            onChange={(e) => update("title", e.target.value)}
                            className="w-full bg-white/5 border border-[#b8933a]/30 px-4 py-3 text-sm outline-none focus:border-[#d4aa56] transition"
                        />
                    </div>

                    <div>
                        <label className="text-xs tracking-widest text-[#b8933a] uppercase mb-1 block">
                            Author *
                        </label>
                        <input
                            value={form.author}
                            onChange={(e) => update("author", e.target.value)}
                            className="w-full bg-white/5 border border-[#b8933a]/30 px-4 py-3 text-sm outline-none focus:border-[#d4aa56] transition"
                        />
                    </div>

                </div>

                {/* Genre + Condition */}
                <div className="grid md:grid-cols-2 gap-5">

                    <div>
                        <label className="text-xs tracking-widest text-[#b8933a] uppercase mb-1 block">
                            Genre *
                        </label>
                        <select
                            value={form.genre}
                            onChange={(e) => update("genre", e.target.value)}
                            className="w-full bg-[#1b1410] border border-[#b8933a]/30 px-4 py-3 text-sm"
                        >
                            {GENRES.map((g) => (
                                <option key={g} value={g}>{g}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-xs tracking-widest text-[#b8933a] uppercase mb-1 block">
                            Condition *
                        </label>
                        <select
                            value={form.condition}
                            onChange={(e) => update("condition", e.target.value)}
                            className="w-full bg-[#1b1410] border border-[#b8933a]/30 px-4 py-3 text-sm"
                        >
                            {CONDITIONS.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                </div>

                {/* Location */}
                <div>
                    <label className="text-xs tracking-widest text-[#b8933a] uppercase mb-1 block">
                        Location
                    </label>
                    <input
                        value={form.location}
                        onChange={(e) => update("location", e.target.value)}
                        className="w-full bg-white/5 border border-[#b8933a]/30 px-4 py-3 text-sm"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="text-xs tracking-widest text-[#b8933a] uppercase mb-1 block">
                        Description
                    </label>
                    <textarea
                        value={form.description}
                        onChange={(e) => update("description", e.target.value)}
                        rows={4}
                        className="w-full bg-white/5 border border-[#b8933a]/30 px-4 py-3 text-sm resize-none"
                    />
                </div>

                {/* FILE UPLOAD */}
                <div>
                    <label className="text-xs tracking-widest text-[#b8933a] uppercase mb-1 block">
                        Cover Image (Upload)
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="w-full bg-white/5 border border-[#b8933a]/30 px-4 py-3 text-sm"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-2">

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#b8933a] text-black px-8 py-3 text-xs uppercase"
                    >
                        {loading ? "Adding..." : "Add Book"}
                    </button>

                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="border border-white/10 px-6 py-3 text-xs text-[#7a7060]"
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>
    );
}