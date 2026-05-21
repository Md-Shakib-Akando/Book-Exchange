"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useState, useEffect } from "react";

const GENRES = ["All", "Fiction", "Fantasy", "Sci-Fi", "Science", "History", "Self-Help"];
const CONDITIONS = ["Any Condition", "Like New", "Very Good", "Good"];
const SORTS = ["Newest First", "Title A–Z", "Most Pages"];

export default function BrowseView() {

    const [books, setBooks] = useState([]);   // 🔥 dynamic
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [search, setSearch] = useState("");
    const [activeGenre, setActiveGenre] = useState("All");
    const [condition, setCondition] = useState("Any Condition");
    const [sort, setSort] = useState("Newest First");
    const [view, setView] = useState("grid");
    const [wishlist, setWishlist] = useState([]);
    const [modal, setModal] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [page, setPage] = useState(1);
    const { user } = useAuth();
    const isOwnBook = user?.email === modal?.ownerEmail;

    const ITEMS_PER_PAGE = 10;

    // 🔥 FETCH FROM DB
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);

                const res = await fetch("/api/books");
                const data = await res.json();

                setBooks(data.books || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);


    const handleRequest = async () => {
        if (!user) {
            alert("Login first!");
            return;
        }

        if (!modal) return;

        if (user.email === modal.ownerEmail) {
            alert("You can't request your own book");
            return;
        }

        if (!message.trim()) {
            alert("Message cannot be empty");
            return;
        }

        try {
            const res = await fetch("/api/requests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    bookId: modal._id,
                    bookTitle: modal.title,
                    ownerEmail: modal.ownerEmail,
                    requesterName: user.name,
                    requesterEmail: user.email,
                    message
                })
            });

            const data = await res.json();

            if (data.success) {
                alert("Request sent!");
                setModal(null);
                setMessage("");
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        setPage(1);
    }, [search, activeGenre, condition, sort]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(true);
            }
        }
    }, []);

    const toggleWishlist = id => {
        setWishlist(w =>
            w.includes(id)
                ? w.filter(x => x !== id)
                : [...w, id]
        );
    };

    // 🔥 FILTER (same UI logic, just DB data)
    const filtered = books
        .filter(b => {
            const matchSearch =
                b.title?.toLowerCase().includes(search.toLowerCase()) ||
                b.author?.toLowerCase().includes(search.toLowerCase());

            const matchGenre =
                activeGenre === "All" || b.genre === activeGenre;

            const matchCond =
                condition === "Any Condition" || b.condition === condition;

            return matchSearch && matchGenre && matchCond;
        })
        .sort((a, b) => {
            if (sort === "Title A–Z")
                return a.title.localeCompare(b.title);

            if (sort === "Most Pages")
                return b.pages - a.pages;

            return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        });

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

    const paginated = filtered.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#1b1410] text-white">
                Loading books...
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen pt-20 bg-[#1b1410] text-[#f5efe3] overflow-hidden">

                <div className="w-full max-w-400 mx-auto flex relative">

                    {/* MOBILE OVERLAY */}
                    {sidebarOpen && (
                        <div
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden fixed inset-0 bg-black/60 z-40"
                        />
                    )}

                    {/* SIDEBAR */}
                    <aside
                        className={`
                        fixed lg:sticky top-0 left-0 z-50 lg:z-0
                        h-screen lg:h-auto
                        bg-[#17110d] lg:bg-white/5
                        border-r border-[#b8933a]/10
                        transition-all duration-300
                        overflow-y-auto
                        ${sidebarOpen
                                ? "translate-x-0 w-[280px]"
                                : "-translate-x-full lg:translate-x-0 lg:w-0"}
                    `}
                    >
                        <div className={`${sidebarOpen ? "p-6 sm:p-8" : "p-0"} space-y-8`}>

                            <div className="flex items-center justify-between lg:hidden">
                                <h2 className="text-sm tracking-[0.3em] text-[#b8933a]">
                                    FILTERS
                                </h2>

                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="text-2xl"
                                >
                                    ×
                                </button>
                            </div>

                            {/* GENRES */}
                            <div>
                                <div className="text-[10px] tracking-[0.3em] text-[#b8933a] mb-3">
                                    GENRE
                                </div>

                                {GENRES.map(g => (
                                    <button
                                        key={g}
                                        onClick={() => {
                                            setActiveGenre(g);
                                            if (window.innerWidth < 1024) {
                                                setSidebarOpen(false);
                                            }
                                        }}
                                        className={`
                                        block w-full text-left px-3 py-2 text-sm transition
                                        ${activeGenre === g
                                                ? "text-[#d4aa56] bg-[#b8933a]/10 border-l-2 border-[#b8933a]"
                                                : "text-[#7a7060] hover:text-white"}
                                    `}
                                    >
                                        {g}
                                    </button>
                                ))}
                            </div>

                            {/* CONDITION */}
                            <div>
                                <div className="text-[10px] tracking-[0.3em] text-[#b8933a] mb-3">
                                    CONDITION
                                </div>

                                <select
                                    value={condition}
                                    onChange={e => setCondition(e.target.value)}
                                    className="w-full bg-white/10 border border-[#b8933a]/30 px-3 py-2 text-sm outline-none"
                                >
                                    {CONDITIONS.map(c => (
                                        <option
                                            key={c}
                                            className="bg-[#1b1410]"
                                        >
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* WISHLIST */}
                            <div>
                                <div className="text-[10px] tracking-[0.3em] text-[#b8933a] mb-2">
                                    WISHLIST
                                </div>

                                <div className="flex justify-between border border-[#b8933a]/30 p-3 bg-[#b8933a]/10">
                                    <span className="text-sm text-[#7a7060]">
                                        Saved
                                    </span>

                                    <span className="text-2xl text-[#b8933a]">
                                        {wishlist.length}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </aside>

                    {/* MAIN */}
                    <main className="flex-1 w-full p-4 sm:p-6 lg:p-10">

                        {/* TOP BAR */}
                        <div className="flex flex-col lg:flex-row gap-4 mb-8">

                            <div className="flex gap-3 w-full lg:w-auto">

                                <button
                                    onClick={() => setSidebarOpen(s => !s)}
                                    className="border border-[#b8933a]/30 px-4 py-2 text-sm text-[#7a7060] hover:text-[#b8933a] whitespace-nowrap"
                                >
                                    Filters
                                </button>



                            </div>

                            <input
                                placeholder="Search by title or author"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full flex-1 bg-white/10 border border-[#b8933a]/30 px-4 py-3 outline-none"
                            />

                            <select
                                value={sort}
                                onChange={e => setSort(e.target.value)}
                                className="w-full sm:w-[220px] bg-white/10 border border-[#b8933a]/30 px-4 py-3 outline-none"
                            >
                                {SORTS.map(s => (
                                    <option
                                        key={s}
                                        className="bg-[#1b1410]"
                                    >
                                        {s}
                                    </option>
                                ))}
                            </select>

                            <div className="flex border border-[#b8933a]/30 shrink-0">
                                <button
                                    onClick={() => setView("grid")}
                                    className={`px-3 py-2 ${view === "grid" ? "bg-[#b8933a]/20" : ""}`}
                                >
                                    ⊞
                                </button>

                                <button
                                    onClick={() => setView("list")}
                                    className={`px-3 py-2 ${view === "list" ? "bg-[#b8933a]/20" : ""}`}
                                >
                                    ☰
                                </button>
                            </div>

                        </div>



                        {/* RESULT COUNT */}
                        <div className="mb-6 text-sm text-[#7a7060]">
                            <span className="text-[#b8933a] text-lg mr-1">
                                {filtered.length}
                            </span>
                            books found
                        </div>

                        {/* GRID VIEW */}
                        {view === "grid" ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
                                {paginated.map(book => (
                                    <div
                                        key={book._id}
                                        className="relative aspect-[3/4] group overflow-hidden rounded-xl"
                                    >

                                        <div className={`absolute inset-0 bg-gradient-to-br ${book.color}`} />

                                        {
                                            book.image ? (
                                                <img
                                                    src={book.image}
                                                    alt={book.title}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className={`absolute inset-0 bg-gradient-to-br ${book.color}`} />
                                            )
                                        }

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent p-4 flex flex-col justify-end">
                                            <div className="text-[10px] tracking-widest text-[#b8933a]">
                                                {book.genre}
                                            </div>

                                            <div className="font-serif text-lg leading-tight">
                                                {book.title}
                                            </div>

                                            <div className="text-xs text-gray-300 italic">
                                                {book.author}
                                            </div>

                                            <div className="text-xs text-[#7a7060] mt-1">
                                                📍 {book.city}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setModal(book)}
                                            className="absolute top-3 left-3 bg-black/60 px-3 py-1 text-xs rounded"
                                        >
                                            View
                                        </button>

                                        <button
                                            onClick={() => toggleWishlist(book.id)}
                                            className="absolute top-3 right-3 bg-black/60 px-2 py-1 rounded"
                                        >
                                            {wishlist.includes(book.id) ? "♥" : "♡"}
                                        </button>

                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {paginated.map(book => (
                                    <div
                                        key={book._id}
                                        className="
                                        flex flex-col sm:flex-row
                                        justify-between
                                        gap-5
                                        sm:items-center
                                        p-5
                                        bg-white/5
                                        border border-[#b8933a]/20
                                    "
                                    >
                                        <div>
                                            <div className="text-sm text-[#b8933a]">
                                                {book.genre}
                                            </div>

                                            <div className="text-xl font-serif">
                                                {book.title}
                                            </div>

                                            <div className="text-sm text-gray-400">
                                                {book.author}
                                            </div>
                                        </div>

                                        <div className="flex sm:block gap-3 sm:space-y-2">
                                            <button
                                                onClick={() => setModal(book)}
                                                className="bg-[#b8933a] text-black px-4 py-2 text-xs w-full sm:w-auto"
                                            >
                                                View
                                            </button>

                                            <button
                                                onClick={() => toggleWishlist(book.id)}
                                                className="border border-[#b8933a]/30 px-3 py-2 text-xs w-full sm:w-auto"
                                            >
                                                {wishlist.includes(book.id)
                                                    ? "Saved"
                                                    : "Wishlist"}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* PAGINATION */}
                        {totalPages > 1 && (
                            <div className="flex flex-wrap justify-center items-center gap-2 mt-10">

                                <button
                                    disabled={page === 1}
                                    onClick={() => setPage(p => p - 1)}
                                    className="px-3 py-1 border border-[#b8933a]/30 disabled:opacity-30"
                                >
                                    ←
                                </button>

                                {Array.from(
                                    { length: totalPages },
                                    (_, i) => i + 1
                                ).map(p => (
                                    <button
                                        key={p}
                                        onClick={() => setPage(p)}
                                        className={`
                                        px-3 py-1 border border-[#b8933a]/30
                                        ${page === p
                                                ? "bg-[#b8933a] text-black"
                                                : ""}
                                    `}
                                    >
                                        {p}
                                    </button>
                                ))}

                                <button
                                    disabled={page === totalPages}
                                    onClick={() => setPage(p => p + 1)}
                                    className="px-3 py-1 border border-[#b8933a]/30 disabled:opacity-30"
                                >
                                    →
                                </button>

                            </div>
                        )}

                    </main>

                    {/* MODAL */}
                    {modal && (
                        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">

                            <div
                                className="
                                bg-[#221a12]
                                border border-[#b8933a]/40
                                p-5 sm:p-8
                                w-full
                                max-w-xl
                                max-h-[95vh]
                                overflow-y-auto
                                relative
                                rounded-2xl
                            "
                            >

                                <button
                                    onClick={() => setModal(null)}
                                    className="absolute top-3 right-3 text-2xl"
                                >
                                    ×
                                </button>

                                {
                                    modal.image ? (
                                        <img
                                            src={modal.image}
                                            className="w-full h-60 sm:h-72 object-cover rounded-xl shadow-lg"
                                        />
                                    ) : (
                                        <div className={`h-44 sm:h-56 mb-6 rounded-xl bg-gradient-to-br ${modal.color}`} />
                                    )
                                }

                                <div className="space-y-2">

                                    <div className="text-[10px] tracking-[0.3em] text-[#b8933a]">
                                        {modal.genre}
                                    </div>

                                    <h3 className="text-2xl sm:text-3xl font-serif leading-tight">
                                        {modal.title}
                                    </h3>

                                    <div className="text-sm text-gray-300 italic">
                                        by {modal.author}
                                    </div>

                                    <div className="pt-4 space-y-1 text-sm text-[#7a7060]">
                                        <div>📍 {modal.city}</div>
                                        <div>📖 {modal.pages} pages</div>
                                        <div>🗓 {modal.year}</div>
                                        <div>✨ Condition: {modal.condition}</div>
                                        <div>👤 Owner: {modal.ownerName}</div>
                                    </div>

                                </div>

                                <div className="mt-8 space-y-3">

                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Write a message..."
                                        className="w-full bg-white/10 border border-[#b8933a]/30 p-3 text-sm outline-none"
                                        rows={4}
                                    />

                                    <button
                                        onClick={handleRequest}
                                        disabled={isOwnBook}
                                        className="w-full bg-[#b8933a] text-black py-3 text-sm tracking-widest"
                                    >
                                        Request Exchange
                                    </button>

                                </div>

                            </div>

                        </div>
                    )}
                </div>
            </div>

        </>
    );
}