"use client";

import { useState, useEffect } from "react";

const BOOKS = [
    { id: 1, title: "The Name of the Wind", author: "Patrick Rothfuss", genre: "Fantasy", condition: "Like New", city: "Denver, CO", color: "from-[#3a3060] to-[#221a40]", pages: 662, year: 2007, owner: "SM", ownerName: "Sofia M." },
    { id: 2, title: "Braiding Sweetgrass", author: "Robin Wall Kimmerer", genre: "Science", condition: "Good", city: "Portland, OR", color: "from-[#2c4a3c] to-[#1a3028]", pages: 390, year: 2013, owner: "JT", ownerName: "James T." },
    { id: 3, title: "Normal People", author: "Sally Rooney", genre: "Fiction", condition: "Like New", city: "Chicago, IL", color: "from-[#60302a] to-[#401a14]", pages: 288, year: 2018, owner: "LB", ownerName: "Lena B." },
    { id: 4, title: "Project Hail Mary", author: "Andy Weir", genre: "Sci-Fi", condition: "Very Good", city: "Seattle, WA", color: "from-[#2a4060] to-[#162535]", pages: 476, year: 2021, owner: "PK", ownerName: "Priya K." },
    { id: 5, title: "The Midnight Library", author: "Matt Haig", genre: "Fiction", condition: "Good", city: "Boston, MA", color: "from-[#4a3728] to-[#3a2820]", pages: 304, year: 2020, owner: "AR", ownerName: "Alex R." },
    { id: 6, title: "Dune", author: "Frank Herbert", genre: "Sci-Fi", condition: "Worn with Love", city: "Austin, TX", color: "from-[#4a3a1a] to-[#2a2010]", pages: 896, year: 1965, owner: "MK", ownerName: "Maya K." },
    { id: 7, title: "Sapiens", author: "Yuval Noah Harari", genre: "History", condition: "Like New", city: "New York, NY", color: "from-[#2a3a4a] to-[#141e28]", pages: 443, year: 2011, owner: "TC", ownerName: "Tom C." },
    { id: 8, title: "Circe", author: "Madeline Miller", genre: "Fantasy", condition: "Very Good", city: "Los Angeles, CA", color: "from-[#3a2a4a] to-[#1e1428]", pages: 393, year: 2018, owner: "EW", ownerName: "Emma W." },
    { id: 9, title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", condition: "Good", city: "Miami, FL", color: "from-[#3a3010] to-[#1e1a08]", pages: 208, year: 1988, owner: "DS", ownerName: "David S." },
    { id: 10, title: "Atomic Habits", author: "James Clear", genre: "Self-Help", condition: "Like New", city: "San Francisco, CA", color: "from-[#1a3a3a] to-[#0a1e1e]", pages: 320, year: 2018, owner: "NP", ownerName: "Nour P." },
    { id: 11, title: "Station Eleven", author: "Emily St. John Mandel", genre: "Sci-Fi", condition: "Very Good", city: "Toronto, CA", color: "from-[#2a3a2a] to-[#141e14]", pages: 333, year: 2014, owner: "RH", ownerName: "Ruth H." },
    { id: 12, title: "Piranesi", author: "Susanna Clarke", genre: "Fantasy", condition: "Like New", city: "Edinburgh, UK", color: "from-[#3a2a3a] to-[#1e141e]", pages: 272, year: 2020, owner: "FO", ownerName: "Finn O." },
];

const GENRES = ["All", "Fiction", "Fantasy", "Sci-Fi", "Science", "History", "Self-Help"];
const CONDITIONS = ["Any Condition", "Like New", "Very Good", "Good"];
const SORTS = ["Newest First", "Title A–Z", "Most Pages"];

export default function BrowseView() {
    const [search, setSearch] = useState("");
    const [activeGenre, setActiveGenre] = useState("All");
    const [condition, setCondition] = useState("Any Condition");
    const [sort, setSort] = useState("Newest First");
    const [view, setView] = useState("grid");
    const [wishlist, setWishlist] = useState([]);
    const [modal, setModal] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [page, setPage] = useState(1);

    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        setPage(1);
    }, [search, activeGenre, condition, sort]);

    const toggleWishlist = id => {
        setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
    };

    const filtered = BOOKS.filter(b => {
        const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
            b.author.toLowerCase().includes(search.toLowerCase());
        const matchGenre = activeGenre === "All" || b.genre === activeGenre;
        const matchCond = condition === "Any Condition" || b.condition === condition;
        return matchSearch && matchGenre && matchCond;
    }).sort((a, b) => {
        if (sort === "Title A–Z") return a.title.localeCompare(b.title);
        if (sort === "Most Pages") return b.pages - a.pages;
        return b.id - a.id;
    });

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    return (
        <div className="min-h-screen pt-20 bg-[#1b1410] text-[#f5efe3] ">

            <div className="md:max-w-10/12 md:mx-auto flex">
                <aside className={`${sidebarOpen ? "w-72 p-8" : "w-0 p-0"} transition-all duration-300 overflow-hidden  bg-white/5`}>
                    <div className="space-y-8">

                        <div>
                            <div className="text-[10px] tracking-[0.3em] text-[#b8933a] mb-3">GENRE</div>
                            {GENRES.map(g => (
                                <button key={g} onClick={() => setActiveGenre(g)}
                                    className={`block w-full text-left px-3 py-2 text-sm
                                ${activeGenre === g ? "text-[#d4aa56] bg-[#b8933a]/10 border-l-2 border-[#b8933a]" : "text-[#7a7060] hover:text-white"}`}>
                                    {g}
                                </button>
                            ))}
                        </div>

                        <div>
                            <div className="text-[10px] tracking-[0.3em] text-[#b8933a] mb-3">CONDITION</div>
                            <select value={condition} onChange={e => setCondition(e.target.value)}
                                className="w-full bg-white/10 border border-[#b8933a]/30 px-3 py-2 text-sm">
                                {CONDITIONS.map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>

                        <div>
                            <div className="text-[10px] tracking-[0.3em] text-[#b8933a] mb-2">WISHLIST</div>
                            <div className="flex justify-between border border-[#b8933a]/30 p-3 bg-[#b8933a]/10">
                                <span className="text-sm text-[#7a7060]">Saved</span>
                                <span className="text-2xl text-[#b8933a]">{wishlist.length}</span>
                            </div>
                        </div>

                    </div>
                </aside>

                <main className="flex-1 p-10">

                    <div className="flex flex-wrap gap-4 mb-8">
                        <button onClick={() => setSidebarOpen(s => !s)}
                            className="border border-[#b8933a]/30 px-4 py-2 text-sm text-[#7a7060] hover:text-[#b8933a]">
                            Filters
                        </button>

                        <input placeholder="Search by title or author"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="flex-1 min-w-50 bg-white/10 border border-[#b8933a]/30 px-4 py-2" />

                        <select value={sort} onChange={e => setSort(e.target.value)}
                            className="bg-white/10 border border-[#b8933a]/30 px-4 py-2">
                            {SORTS.map(s => <option key={s}>{s}</option>)}
                        </select>

                        <div className="flex border border-[#b8933a]/30">
                            <button onClick={() => setView("grid")} className={`px-3 ${view === "grid" ? "bg-[#b8933a]/20" : ""}`}>⊞</button>
                            <button onClick={() => setView("list")} className={`px-3 ${view === "list" ? "bg-[#b8933a]/20" : ""}`}>☰</button>
                        </div>
                    </div>

                    <div className="mb-6 text-sm text-[#7a7060]">
                        <span className="text-[#b8933a] text-lg mr-1">{filtered.length}</span>
                        books found
                    </div>

                    {view === "grid" ? (
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                            {paginated.map(book => (
                                <div key={book.id} className="relative aspect-3/4 group overflow-hidden">

                                    <div className={`absolute inset-0 bg-gradient-to-br ${book.color}`} />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent p-4 flex flex-col justify-end">
                                        <div className="text-[10px] tracking-widest text-[#b8933a]">{book.genre}</div>
                                        <div className="font-serif text-lg">{book.title}</div>
                                        <div className="text-xs text-gray-300 italic">{book.author}</div>
                                        <div className="text-xs text-[#7a7060] mt-1">📍 {book.city}</div>
                                    </div>

                                    <button
                                        onClick={() => setModal(book)}
                                        className="absolute top-3 left-3 bg-black/60 px-3 py-1 text-xs"
                                    >
                                        View
                                    </button>

                                    <button
                                        onClick={() => toggleWishlist(book.id)}
                                        className="absolute top-3 right-3 bg-black/60 px-2 py-1"
                                    >
                                        {wishlist.includes(book.id) ? "♥" : "♡"}
                                    </button>

                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {paginated.map(book => (
                                <div key={book.id} className="flex justify-between items-center p-5 bg-white/5 border border-[#b8933a]/20">
                                    <div>
                                        <div className="text-sm text-[#b8933a]">{book.genre}</div>
                                        <div className="text-xl font-serif">{book.title}</div>
                                        <div className="text-sm text-gray-400">{book.author}</div>
                                    </div>

                                    <div className="space-y-2 text-right">
                                        <button onClick={() => setModal(book)}
                                            className="bg-[#b8933a] text-black px-4 py-2 text-xs">
                                            View
                                        </button>
                                        <button onClick={() => toggleWishlist(book.id)}
                                            className="border border-[#b8933a]/30 px-3 py-1 text-xs">
                                            {wishlist.includes(book.id) ? "Saved" : "Wishlist"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-10">
                            <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                                className="px-3 py-1 border border-[#b8933a]/30 disabled:opacity-30">←</button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                <button key={p} onClick={() => setPage(p)}
                                    className={`px-3 py-1 border border-[#b8933a]/30 ${page === p ? "bg-[#b8933a] text-black" : ""}`}>
                                    {p}
                                </button>
                            ))}

                            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
                                className="px-3 py-1 border border-[#b8933a]/30 disabled:opacity-30">→</button>
                        </div>
                    )}

                </main>

                {modal && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                        <div className="bg-[#221a12] border border-[#b8933a]/40 p-10 w-105 relative">

                            <button onClick={() => setModal(null)} className="absolute top-3 right-3 text-xl">"×"</button>

                            <div className={`h-56 mb-6 bg-gradient-to-br ${modal.color}`} />

                            <div className="space-y-2">
                                <div className="text-[10px] tracking-[0.3em] text-[#b8933a]">{modal.genre}</div>
                                <h3 className="text-2xl font-serif">{modal.title}</h3>
                                <div className="text-sm text-gray-300 italic">by {modal.author}</div>

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
                                    placeholder="Write a message to request this book..."
                                    className="w-full bg-white/10 border border-[#b8933a]/30 p-3 text-sm"
                                    rows={4}
                                />
                                <button className="w-full bg-[#b8933a] text-black py-2 text-sm tracking-widest">
                                    Request Exchange
                                </button>
                            </div>

                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}