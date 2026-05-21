"use client";

import Link from "next/link";
import {
    FiBook,
    FiRepeat,
    FiMessageSquare,
    FiPlusSquare,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function DashboardPage() {

    const { user } = useAuth();

    const [books, setBooks] = useState([]);
    const [requests, setRequests] = useState([]);

    const [loading, setLoading] = useState(true);

    // 🔥 FETCH DATA
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const [bookRes, reqRes] = await Promise.all([
                    fetch("/api/books"),
                    fetch("/api/requests")
                ]);

                const bookData = await bookRes.json();
                const reqData = await reqRes.json();

                setBooks(bookData.books || []);
                setRequests(reqData.requests || []);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="text-center py-20 text-[#7a7060]">
                Loading dashboard...
            </div>
        );
    }

    // 🔥 FILTER USER DATA
    const myBooks = books.filter(b => b.ownerEmail === user?.email);

    const incoming = requests.filter(
        r => r.ownerEmail === user?.email
    );

    const outgoing = requests.filter(
        r => r.requesterEmail === user?.email
    );

    const completed = requests.filter(
        r =>
            (r.ownerEmail === user?.email ||
                r.requesterEmail === user?.email) &&
            r.status === "completed"
    );

    const unreadMessages = 0; // later message system

    // 🔥 STATS
    const stats = {
        books: myBooks.length,
        pending: incoming.filter(r => r.status === "pending").length,
        messages: unreadMessages,
        exchanges: completed.length,
    };

    const statCards = [
        {
            label: "My Books Listed",
            value: stats.books,
            icon: FiBook,
            href: "/dashboard/my-books",
            color: "text-[#b8933a]",
        },
        {
            label: "Pending Requests",
            value: stats.pending,
            icon: FiRepeat,
            href: "/dashboard/exchanges",
            color: "text-yellow-400",
        },
        {
            label: "Completed Exchanges",
            value: stats.exchanges,
            icon: FiRepeat,
            href: "/dashboard/exchanges",
            color: "text-green-400",
        },
        {
            label: "Unread Messages",
            value: stats.messages,
            icon: FiMessageSquare,
            href: "/dashboard/messages",
            color: "text-blue-400",
        },
    ];

    const recentBooks = myBooks.slice(0, 4);

    const recentRequests = incoming.slice(0, 3);

    return (
        <div className="px-5">

            {/* Header */}
            <div className="mb-8">

                <h1 className="font-serif text-3xl text-[#f5efe3] mb-1">
                    Welcome back,{" "}
                    <span className="text-[#d4aa56] italic">
                        {user?.name?.split(" ")[0]}
                    </span>
                </h1>

                <p className="text-[#7a7060] text-sm">
                    Here&apos;s what&apos;s happening with your books today.
                </p>

            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">

                {statCards.map((s) => (
                    <Link
                        key={s.label}
                        href={s.href}
                        className="bg-[#221a12] border border-white/5 p-5 hover:border-[#b8933a]/30 transition group"
                    >

                        <div className="flex items-center justify-between mb-3">

                            <span className="text-xs text-[#7a7060] uppercase tracking-widest">
                                {s.label}
                            </span>

                            <s.icon
                                size={16}
                                className={`${s.color} opacity-60 group-hover:opacity-100 transition`}
                            />

                        </div>

                        <div className={`font-serif text-3xl ${s.color}`}>
                            {s.value}
                        </div>

                    </Link>
                ))}

            </div>

            <div className="grid lg:grid-cols-2 gap-8">

                {/* Recent Books */}
                <div>

                    <div className="flex items-center justify-between mb-4">

                        <h2 className="text-sm uppercase tracking-widest text-[#b8933a]">
                            My Recent Books
                        </h2>

                        <Link
                            href="/dashboard/add-books"
                            className="flex items-center gap-1 text-xs text-[#7a7060] hover:text-[#b8933a] transition"
                        >
                            <FiPlusSquare size={14} />
                            Add Book
                        </Link>

                    </div>

                    <div className="space-y-2">

                        {recentBooks.map((book) => (
                            <div
                                key={book._id}
                                className="flex items-center justify-between bg-[#221a12] border border-white/5 p-4 hover:border-[#b8933a]/20 transition"
                            >

                                <div>

                                    <div className="font-serif text-sm text-[#f5efe3]">
                                        {book.title}
                                    </div>

                                    <div className="text-xs text-[#7a7060]">
                                        {book.author} · {book.genre}
                                    </div>

                                </div>

                                <span
                                    className={`text-xs px-2 py-1 border ${book.status === "available"
                                        ? "border-green-500/30 text-green-400"
                                        : book.status === "requested"
                                            ? "border-yellow-500/30 text-yellow-400"
                                            : "border-blue-500/30 text-blue-400"
                                        }`}
                                >
                                    {book.status === "available"
                                        ? "Available"
                                        : book.status === "requested"
                                            ? "Requested"
                                            : "Exchanged"}
                                </span>

                            </div>
                        ))}

                        <Link
                            href="/dashboard/my-books"
                            className="block text-center text-xs text-[#7a7060] hover:text-[#b8933a] mt-2 transition"
                        >
                            View all →
                        </Link>

                    </div>

                </div>

                {/* Incoming Requests */}
                <div>

                    <div className="flex items-center justify-between mb-4">

                        <h2 className="text-sm uppercase tracking-widest text-[#b8933a]">
                            Incoming Requests
                        </h2>

                        <Link
                            href="/dashboard/exchanges"
                            className="text-xs text-[#7a7060] hover:text-[#b8933a] transition"
                        >
                            View all →
                        </Link>

                    </div>

                    <div className="space-y-2">

                        {recentRequests.map((req) => (
                            <div
                                key={req._id}
                                className="bg-[#221a12] border border-white/5 p-4 hover:border-[#b8933a]/20 transition"
                            >

                                <div className="flex items-center justify-between mb-1">

                                    <span className="text-sm font-serif text-[#f5efe3]">
                                        {req.bookTitle}
                                    </span>

                                    <span
                                        className={`text-xs px-2 py-0.5 border ${req.status === "pending"
                                            ? "border-yellow-500/30 text-yellow-400"
                                            : req.status === "accepted"
                                                ? "border-green-500/30 text-green-400"
                                                : "border-blue-500/30 text-blue-400"
                                            }`}
                                    >
                                        {req.status}
                                    </span>

                                </div>

                                <div className="text-xs text-[#7a7060]">
                                    From: {req.requesterName}
                                </div>

                            </div>
                        ))}

                    </div>

                </div>

            </div>

            {/* Quick Actions */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">

                {[
                    { href: "/dashboard/add-books", label: "List a Book", icon: "📚" },
                    { href: "/browse", label: "Browse Books", icon: "🔍" },
                    { href: "/dashboard/exchanges", label: "View Exchanges", icon: "↕" },
                    { href: "/dashboard/messages", label: "Open Messages", icon: "💬" },
                ].map((a) => (
                    <Link
                        key={a.href}
                        href={a.href}
                        className="bg-[#221a12] border border-white/5 p-4 text-center hover:border-[#b8933a]/30 transition group"
                    >

                        <div className="text-2xl mb-2">
                            {a.icon}
                        </div>

                        <div className="text-xs text-[#7a7060] group-hover:text-[#b8933a] transition">
                            {a.label}
                        </div>

                    </Link>
                ))}

            </div>

        </div>
    );
}