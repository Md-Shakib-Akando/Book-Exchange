"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { FiEdit2, FiTrash2, FiPlusSquare } from "react-icons/fi";

const COLORS = [
    "from-[#3a3060] to-[#221a40]", "from-[#2c4a3c] to-[#1a3028]",
    "from-[#60302a] to-[#401a14]", "from-[#2a4060] to-[#162535]",
    "from-[#4a3728] to-[#3a2820]", "from-[#4a3a1a] to-[#2a2010]",
];

export default function MyBooksPage() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editBook, setEditBook] = useState(null);
    const [editForm, setEditForm] = useState({});

    // ✅ LOAD BOOKS
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await fetch("/api/books/mybooks?mine=true");
                const data = await res.json();
                setBooks(data.books || []);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const openEdit = (book) => {
        setEditBook(book._id);
        setEditForm(book);
    };

    // ✅ SAVE (UPDATE)
    const handleSave = async () => {
        try {
            const res = await fetch(`/api/books/${editBook}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editForm),
            });

            const data = await res.json();

            if (res.ok) {
                setBooks((prev) =>
                    prev.map((b) =>
                        b._id === editBook ? data.book : b
                    )
                );
                setEditBook(null);
            } else {
                alert(data.message);
            }

        } catch (err) {
            console.log(err);
        }
    };

    // ✅ DELETE
    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/books/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (res.ok) {
                setBooks((prev) => prev.filter((b) => b._id !== id));
            } else {
                alert(data.message);
            }

        } catch (err) {
            console.log(err);
        }
    };

    if (loading) {
        return (
            <div className="text-[#7a7060]">Loading books...</div>
        );
    }

    return (
        <div className="px-5">

            {/* HEADER */}
            <div className="flex items-center justify-between  mb-8">

                <div>
                    <h1 className="font-serif text-2xl text-[#f5efe3]">
                        My Books
                    </h1>
                    <p className="text-[#7a7060] text-sm mt-1">
                        {books.length} books listed
                    </p>
                </div>

                <Link
                    href="/dashboard/add-book"
                    className="flex items-center gap-2 bg-[#b8933a] text-black px-4 py-2 text-xs uppercase tracking-widest hover:bg-[#d4aa56] transition"
                >
                    <FiPlusSquare size={14} /> Add Book
                </Link>

            </div>

            {/* EMPTY */}
            {books.length === 0 ? (
                <div className="bg-[#221a12] border border-white/5 p-16 text-center">
                    <div className="text-5xl mb-4">📚</div>
                    <p className="text-[#7a7060] mb-4">
                        No books yet.
                    </p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">

                    {books.map((book) => (
                        <div
                            key={book._id}
                            className="bg-[#221a12] border border-white/5 hover:border-[#b8933a]/20 transition overflow-hidden"
                        >

                            {/* IMAGE BACKGROUND SECTION */}
                            <div className="relative h-44 w-full overflow-hidden">

                                {book.image ? (
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-[#2a2010]" />
                                )}

                                {/* DARK OVERLAY */}
                                <div className="absolute inset-0 bg-black/40" />

                                {/* GENRE TEXT OVER IMAGE ONLY */}
                                <div className="absolute bottom-3 left-3 mt-2">
                                    <span className="text-[10px] bg-[#b8933a] tracking-widest uppercase px-3 py-2 rounded text-white">
                                        {book.genre}
                                    </span>
                                </div>

                            </div>

                            {/* BODY */}
                            <div className="p-4">

                                <h3 className="font-serif text-[#f5efe3] mb-1">
                                    {book.title}
                                </h3>

                                <p className="text-xs text-[#7a7060] italic mb-3">
                                    {book.author}
                                </p>

                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-[#7a7060]">
                                        {book.condition}
                                    </span>

                                    <span className={`px-2 py-0.5 border text-xs ${book.availability
                                        ? "border-green-500/30 text-green-400"
                                        : "border-red-500/30 text-red-400"
                                        }`}>
                                        {book.availability ? "Available" : "Exchanged"}
                                    </span>
                                </div>

                                {/* ACTIONS */}
                                <div className="flex gap-2 mt-4">

                                    <button
                                        onClick={() => openEdit(book)}
                                        className="flex-1 flex items-center justify-center gap-1 border border-[#b8933a]/30 text-[#b8933a] py-1.5 text-xs hover:bg-[#b8933a]/10 transition"
                                    >
                                        <FiEdit2 size={12} /> Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(book._id)}
                                        className="px-3 border border-red-500/30 text-red-400 py-1.5 text-xs hover:bg-red-500/10 transition"
                                    >
                                        <FiTrash2 size={12} />
                                    </button>

                                </div>

                            </div>
                        </div>
                    ))}

                </div>
            )}

            {/* EDIT MODAL */}
            {editBook && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">

                    <div className="bg-[#221a12] border border-[#b8933a]/30 p-6 w-full max-w-lg">

                        <h3 className="font-serif text-xl mb-6 text-[#f5efe3]">
                            Edit Book
                        </h3>

                        <div className="space-y-4">

                            {["title", "author", "genre"].map((field) => (
                                <div key={field}>
                                    <label className="text-xs text-[#b8933a] uppercase block mb-1">
                                        {field}
                                    </label>

                                    <input
                                        value={editForm[field] || ""}
                                        onChange={(e) =>
                                            setEditForm((f) => ({
                                                ...f,
                                                [field]: e.target.value,
                                            }))
                                        }
                                        className="w-full bg-white/5 border border-[#b8933a]/30 px-3 py-2 text-sm"
                                    />
                                </div>
                            ))}

                        </div>

                        <div className="flex gap-3 mt-6">

                            <button
                                onClick={handleSave}
                                className="flex-1 bg-[#b8933a] text-black py-2 text-xs uppercase"
                            >
                                Save
                            </button>

                            <button
                                onClick={() => setEditBook(null)}
                                className="px-4 border border-white/10 text-[#7a7060] text-xs"
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}